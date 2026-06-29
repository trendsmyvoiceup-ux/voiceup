/**
 * Agent Runner — executes the Content Factory pipeline.
 *
 * Planner and Battle Designer are now real, deterministic agents (see
 * `planner.ts`, `battle-designer.ts`) — no LLM, no randomness. Website and
 * Publisher remain stubs that perform only the file-system bookkeeping
 * described in `agents/shared/CONTRACT.md` (read the Battle Package, write
 * only their own `status.json` key). Real agent logic for them replaces
 * these stubs later without changing this orchestrator.
 *
 * Usage: node scripts/run-pipeline.ts <category>
 * Example: node scripts/run-pipeline.ts technology
 */

const fs = require("fs");
const path = require("path");
const { runPlanner } = require("./planner.ts");
const { runBattleDesigner } = require("./battle-designer.ts");

const ROOT = path.resolve(__dirname, "..");
const PROPOSALS_DIR = path.join(ROOT, "output", "proposals");
const BATTLES_DIR = path.join(ROOT, "output", "battles");

type AgentContext = {
  category: string;
  slug?: string;
  proposalPath?: string;
  battleDir?: string;
};

type AgentFn = (ctx: AgentContext) => void;

function readJSON(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJSON(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

/** Updates only the caller's own key in status.json — never touches others. */
function updateOwnStatus(battleDir: string, agentName: string) {
  const statusPath = path.join(battleDir, "status.json");
  const status = readJSON(statusPath);
  status[agentName] = { status: "done", updatedAt: new Date().toISOString() };
  writeJSON(statusPath, status);
}

/**
 * Agent registry. Adding a future agent (Instagram, X, Analytics, ...)
 * means adding one entry here and one slug in PIPELINE's fan-out list below
 * — the orchestration loop itself never changes.
 */
const registry: Record<string, AgentFn> = {
  planner(ctx) {
    // Real agent (TASK-0027): deterministic, no LLM. Given a category, it
    // selects from the static catalog and writes the proposal to disk.
    const { slug, proposalPath } = runPlanner(ctx.category, PROPOSALS_DIR);
    ctx.slug = slug;
    ctx.proposalPath = proposalPath;
    ctx.battleDir = path.join(BATTLES_DIR, slug);
  },

  "battle-designer"(ctx) {
    // Real agent (TASK-0030): deterministic, no LLM. Reads the proposal
    // and writes the complete Battle Package.
    ctx.battleDir = runBattleDesigner(ctx.slug!, ctx.proposalPath!, BATTLES_DIR);

    const required = [
      "manifest.json",
      "battle.json",
      "status.json",
      "script.txt",
      "caption.txt",
      "hashtags.txt",
      "image_prompt.txt",
      "video_prompt.txt",
    ];
    for (const file of required) {
      if (!fs.existsSync(path.join(ctx.battleDir, file))) {
        throw new Error(`Battle Package is missing ${file}`);
      }
    }
  },

  website(ctx) {
    // Stub: a real Website agent would propose a comparisons.ts diff here.
    // No AI, no file outside status.json is touched by this stub.
    updateOwnStatus(ctx.battleDir!, "website");
  },

  publisher(ctx) {
    // Stub: a real Publisher agent would review captions/hashtags here.
    updateOwnStatus(ctx.battleDir!, "publisher");
  },
};

/**
 * Pipeline definition: a list of phases, each either "sequential" (run one
 * after another) or "parallel" (fan-out, run concurrently). To add a future
 * consumer, append its agent name to a parallel phase's `agents` list (or a
 * new phase) — the runner loop below does not need to change.
 */
const PIPELINE: { phase: "sequential" | "parallel"; agents: string[] }[] = [
  { phase: "sequential", agents: ["planner"] },
  { phase: "sequential", agents: ["battle-designer"] },
  { phase: "parallel", agents: ["website", "publisher"] },
];

function runAgent(name: string, ctx: AgentContext): { name: string; ok: boolean; error?: string } {
  try {
    const fn = registry[name];
    if (!fn) throw new Error(`No agent registered for "${name}"`);
    fn(ctx);
    return { name, ok: true };
  } catch (err) {
    return { name, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function main() {
  const category = process.argv[2];
  if (!category) {
    console.error("Usage: node scripts/run-pipeline.ts <category>");
    process.exit(1);
  }

  const ctx: AgentContext = { category };

  console.log(`Running pipeline for category: ${category}\n`);

  for (const step of PIPELINE) {
    const results =
      step.phase === "sequential"
        ? step.agents.map((name) => runAgent(name, ctx))
        : step.agents.map((name) => runAgent(name, ctx)); // stub execution is synchronous; parallel-ready shape regardless

    for (const result of results) {
      if (result.ok) {
        console.log(`✔ ${labelFor(result.name)}`);
      } else {
        console.log(`✘ ${labelFor(result.name)} — ${result.error}`);
        console.log("\nPipeline failed.");
        process.exit(1);
      }
    }
  }

  console.log("\nPipeline completed.");
}

function labelFor(agentName: string): string {
  const labels: Record<string, string> = {
    planner: "Planner",
    "battle-designer": "Battle Designer",
    website: "Website",
    publisher: "Publisher",
  };
  return labels[agentName] ?? agentName;
}

main();
