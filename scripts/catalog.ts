/**
 * Static subject catalog used by the Planner agent.
 *
 * This is a deliberately duplicated snapshot of
 * `apps/web/src/lib/comparisons.ts`, not a live import. Cross-importing an
 * ESM TypeScript module from `apps/web` into this standalone CommonJS
 * script is not reliable without adding a build step/dependency, which is
 * out of scope for this stub stage (see TASK-0027 reply for the tradeoff
 * flagged to the founder). Keep this list in sync manually until a shared
 * package is introduced.
 */

export type CatalogEntry = {
  subjectA: string;
  subjectB: string;
  category: string;
};

const CATALOG: CatalogEntry[] = [
  { subjectA: "Apple", subjectB: "Android", category: "Technology" },
  { subjectA: "Coffee", subjectB: "Tea", category: "Lifestyle" },
  { subjectA: "Netflix", subjectB: "YouTube", category: "Entertainment" },
  { subjectA: "Marvel", subjectB: "DC", category: "Pop Culture" },
  { subjectA: "Pizza", subjectB: "Burger", category: "Food" },
];

module.exports = { CATALOG };
