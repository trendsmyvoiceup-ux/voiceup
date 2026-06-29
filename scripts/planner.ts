/**
 * Planner agent — first real (non-stub) agent in the Content Factory.
 *
 * Deterministic only: no LLM, no randomness. Given a category name, it
 * selects the matching pair from the static catalog (see `catalog.ts`),
 * builds the proposal, and writes it to
 * `output/proposals/<slug>.json` — conforming to the shared contract in
 * `agents/shared/CONTRACT.md`.
 */

const fs = require("fs");
const path = require("path");
const { CATALOG } = require("./catalog.ts");

type CatalogEntry = { subjectA: string; subjectB: string; category: string };

type Proposal = {
  subjectA: string;
  subjectB: string;
  category: string;
  title: string;
  rationale: string;
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function slugFor(entry: CatalogEntry): string {
  return `${slugify(entry.subjectA)}-vs-${slugify(entry.subjectB)}`;
}

/**
 * Deterministically picks the catalog entry for a given category name
 * (case-insensitive). Always returns the same result for the same input —
 * no randomness, no AI.
 */
function selectEntry(category: string): CatalogEntry {
  const normalized = category.trim().toLowerCase();
  const match = (CATALOG as CatalogEntry[]).find(
    (entry) => entry.category.toLowerCase() === normalized
  );
  if (!match) {
    const known = (CATALOG as CatalogEntry[]).map((e) => e.category).join(", ");
    throw new Error(`No catalog entry for category "${category}". Known categories: ${known}`);
  }
  return match;
}

function buildProposal(entry: CatalogEntry): Proposal {
  return {
    subjectA: entry.subjectA,
    subjectB: entry.subjectB,
    category: entry.category,
    title: `${entry.subjectA} vs ${entry.subjectB}`,
    rationale: `Deterministically selected from the static ${entry.category} catalog entry — no AI, no randomness.`,
  };
}

/**
 * Runs the Planner for a given category, writing
 * `output/proposals/<slug>.json`. Returns the generated slug so the caller
 * (the pipeline runner) knows where the rest of the pipeline should look.
 */
function runPlanner(category: string, proposalsDir: string): { slug: string; proposalPath: string } {
  const entry = selectEntry(category);
  const slug = slugFor(entry);
  const proposal = buildProposal(entry);

  if (!fs.existsSync(proposalsDir)) {
    fs.mkdirSync(proposalsDir, { recursive: true });
  }

  const proposalPath = path.join(proposalsDir, `${slug}.json`);
  fs.writeFileSync(proposalPath, JSON.stringify(proposal, null, 2) + "\n");

  return { slug, proposalPath };
}

module.exports = { runPlanner, selectEntry, buildProposal, slugFor, slugify };
