/**
 * Planner agent — deterministic, no LLM, no randomness.
 *
 * Given a category name, generates a proposal for EVERY unique unordered
 * pair of subjects in that category's static catalog entry (see
 * `catalog.ts`), writing each to `output/proposals/<slug>.json`. Same
 * input always produces the same set of proposals.
 */

const path = require("path");
const { CATALOG } = require("./catalog.ts");
const { writeJSON, ensureDir, slugify } = require("./fsutil.ts");

type CategorySubjects = { category: string; subjects: string[] };

type Pair = { subjectA: string; subjectB: string };

type Proposal = {
  subjectA: string;
  subjectB: string;
  category: string;
  title: string;
  rationale: string;
};

function slugFor(pair: Pair): string {
  return `${slugify(pair.subjectA)}-vs-${slugify(pair.subjectB)}`;
}

/**
 * Deterministically finds the catalog entry for a given category name
 * (case-insensitive). Always returns the same result for the same input —
 * no randomness, no AI.
 */
function selectCategory(category: string): CategorySubjects {
  const normalized = category.trim().toLowerCase();
  const match = (CATALOG as CategorySubjects[]).find(
    (entry) => entry.category.toLowerCase() === normalized
  );
  if (!match) {
    const known = (CATALOG as CategorySubjects[]).map((e) => e.category).join(", ");
    throw new Error(`No catalog entry for category "${category}". Known categories: ${known}`);
  }
  return match;
}

/**
 * Every unique unordered pair from a list of subjects, in a fixed
 * (catalog-order) sequence — no duplicates, no (B, A) mirror of an
 * already-listed (A, B) pair.
 */
function buildPairs(subjects: string[]): Pair[] {
  const pairs: Pair[] = [];
  for (let i = 0; i < subjects.length; i++) {
    for (let j = i + 1; j < subjects.length; j++) {
      pairs.push({ subjectA: subjects[i], subjectB: subjects[j] });
    }
  }
  return pairs;
}

function buildProposal(pair: Pair, category: string): Proposal {
  return {
    subjectA: pair.subjectA,
    subjectB: pair.subjectB,
    category,
    title: `${pair.subjectA} vs ${pair.subjectB}`,
    rationale: `Deterministically selected from the static ${category} catalog — no AI, no randomness.`,
  };
}

/**
 * Runs the Planner for a given category: generates and writes one
 * proposal file per unique subject pair in that category. Returns the
 * full batch so the caller (the pipeline runner) knows every battle to
 * process next.
 */
function runPlannerBatch(
  category: string,
  proposalsDir: string
): { slug: string; proposalPath: string; subjectA: string; subjectB: string }[] {
  const entry = selectCategory(category);
  const pairs = buildPairs(entry.subjects);

  ensureDir(proposalsDir);

  return pairs.map((pair) => {
    const slug = slugFor(pair);
    const proposal = buildProposal(pair, entry.category);
    const proposalPath = path.join(proposalsDir, `${slug}.json`);
    writeJSON(proposalPath, proposal);
    return { slug, proposalPath, subjectA: pair.subjectA, subjectB: pair.subjectB };
  });
}

module.exports = {
  runPlannerBatch,
  selectCategory,
  buildPairs,
  buildProposal,
  slugFor,
  slugify,
};
