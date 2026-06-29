/**
 * Agent Runner — executes the Content Factory pipeline in BATCH mode.
 *
 * `node scripts/run-pipeline.ts <category>` generates every valid battle
 * for that category (every unique subject pair — see `planner.ts`), not
 * just one. Planner, Battle Designer, Reviewer, and Publisher are real,
 * deterministic agents — no LLM, no randomness. Website remains a stub
 * that performs only the file-system bookkeeping described in
 * `agents/shared/CONTRACT.md` (read the Battle Package, write only its
 * own `status.json` key).
 *
 * Pipeline per battle (see `agents/shared/CONTRACT.md`):
 *   Battle Designer -> Reviewer -> [approved] -> Website + Publisher (parallel)
 * A rejected battle does NOT stop the batch — the runner logs it and
 * continues with the next battle. A summary report is written to
 * `output/reports/` at the end.
 *
 * Usage: node scripts/run-pipeline.ts <category>
 * Example: node scripts/run-pipeline.ts technology
 *
 * Exit codes:
 *   0 — batch ran to completion (regardless of individual rejections)
 *   1 — usage error, or the category itself could not be planned at all
 */

const fs = require("fs");
const path = require("path");
const { updateStatusKey, writeJSON, ensureDir } = require("./fsutil.ts");
const { runPlannerBatch } = require("./planner.ts");
const { runBattleDesigner } = require("./battle-designer.ts");
const { runReviewer } = require("./reviewer.ts");
const { runPublisher } = require("./publisher.ts");

const ROOT = path.resolve(__dirname, "..");
const PROPOSALS_DIR = path.join(ROOT, "output", "proposals");
const BATTLES_DIR = path.join(ROOT, "output", "battles");
const PUBLISHED_DIR = path.join(ROOT, "output", "published");
const REPORTS_DIR = path.join(ROOT, "output", "reports");

const EXIT_OK = 0;
const EXIT_FAILED = 1;

const REQUIRED_BATTLE_FILES = [
  "manifest.json",
  "battle.json",
  "status.json",
  "script.txt",
  "caption.txt",
  "hashtags.txt",
  "image_prompt.txt",
  "video_prompt.txt",
];

type BattleResult = {
  slug: string;
  title: string;
  packageGenerated: boolean;
  score: number | null;
  approved: boolean;
  error?: string;
};

/**
 * Runs Battle Designer -> Reviewer -> [approved] -> Website + Publisher
 * for ONE battle. Never throws — every failure (missing file, rejection,
 * etc.) is captured in the returned result so the batch can continue.
 */
function processBattle(slug: string, proposalPath: string, title: string): BattleResult {
  let battleDir: string;

  try {
    battleDir = runBattleDesigner(slug, proposalPath, BATTLES_DIR);
    for (const file of REQUIRED_BATTLE_FILES) {
      if (!fs.existsSync(path.join(battleDir, file))) {
        throw new Error(`Battle Package is missing ${file}`);
      }
    }
  } catch (err) {
    console.log(`  ✘ Battle Designer — ${errorMessage(err)}`);
    return { slug, title, packageGenerated: false, score: null, approved: false, error: errorMessage(err) };
  }
  console.log("  ✔ Battle Designer");

  let approved: boolean;
  let score: number;
  try {
    const review = runReviewer(battleDir);
    approved = review.approved;
    score = review.overall;
  } catch (err) {
    console.log(`  ✘ Reviewer — ${errorMessage(err)}`);
    return { slug, title, packageGenerated: true, score: null, approved: false, error: errorMessage(err) };
  }

  if (!approved) {
    console.log(`  ✘ Reviewer (${score}/100) — rejected, skipping Website/Publisher`);
    return { slug, title, packageGenerated: true, score, approved: false };
  }
  console.log(`  ✔ Reviewer (${score}/100)`);

  // Website and Publisher are independent of each other (see
  // agents/shared/CONTRACT.md) — neither reads the other's output. A
  // failure in one does not block the other.
  try {
    updateStatusKey(battleDir, "website", "done");
    console.log("  ✔ Website");
  } catch (err) {
    console.log(`  ✘ Website — ${errorMessage(err)}`);
  }

  try {
    runPublisher(slug, battleDir, PUBLISHED_DIR);
    updateStatusKey(battleDir, "publisher", "done");
    console.log("  ✔ Publisher");
  } catch (err) {
    console.log(`  ✘ Publisher — ${errorMessage(err)}`);
  }

  return { slug, title, packageGenerated: true, score, approved: true };
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function writeReport(category: string, startedAt: Date, results: BattleResult[]) {
  const finishedAt = new Date();
  const approved = results.filter((r) => r.approved);
  const rejected = results.filter((r) => !r.approved);
  const scored = results.filter((r) => r.score !== null) as (BattleResult & { score: number })[];
  const averageScore =
    scored.length > 0
      ? Math.round((scored.reduce((sum, r) => sum + r.score, 0) / scored.length) * 10) / 10
      : 0;

  const report = {
    category,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    executionTimeMs: finishedAt.getTime() - startedAt.getTime(),
    totalBattles: results.length,
    approved: approved.length,
    rejected: rejected.length,
    averageScore,
    generatedPackages: results.map((r) => ({
      slug: r.slug,
      title: r.title,
      score: r.score,
      approved: r.approved,
    })),
  };

  ensureDir(REPORTS_DIR);
  const fileName = `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${finishedAt
    .toISOString()
    .replace(/[:.]/g, "-")}.json`;
  writeJSON(path.join(REPORTS_DIR, fileName), report);

  return report;
}

function run(category: string): number {
  const startedAt = new Date();
  console.log(`Running pipeline for category: ${category}\n`);

  let proposals: { slug: string; proposalPath: string; subjectA: string; subjectB: string }[];
  try {
    proposals = runPlannerBatch(category, PROPOSALS_DIR);
  } catch (err) {
    console.log(`✘ Planner — ${errorMessage(err)}`);
    console.log("\nPipeline failed.");
    return EXIT_FAILED;
  }
  console.log(`✔ Planner — generated ${proposals.length} proposal(s)\n`);

  const results: BattleResult[] = [];
  proposals.forEach((proposal, i) => {
    const title = `${proposal.subjectA} vs ${proposal.subjectB}`;
    console.log(`[${i + 1}/${proposals.length}] ${proposal.slug}`);
    results.push(processBattle(proposal.slug, proposal.proposalPath, title));
    console.log("");
  });

  const report = writeReport(category, startedAt, results);

  console.log("Pipeline completed.\n");
  console.log(`${report.totalBattles} battles generated.\n`);
  console.log(`${report.approved} approved.\n`);
  console.log(`${report.rejected} rejected.\n`);
  console.log("Average score:\n");
  console.log(`${report.averageScore}`);

  return EXIT_OK;
}

function main() {
  const category = process.argv[2];
  if (!category) {
    console.error("Usage: node scripts/run-pipeline.ts <category>");
    process.exit(EXIT_FAILED);
  }

  try {
    process.exit(run(category));
  } catch (err) {
    // Defensive top-level catch: any error not already handled inside
    // run()/processBattle() (e.g. a bug in the runner itself) is reported
    // cleanly instead of as a raw stack trace.
    console.error("Unexpected runner error:", errorMessage(err));
    process.exit(EXIT_FAILED);
  }
}

main();
