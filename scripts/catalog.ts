/**
 * Static subject catalog used by the Planner agent.
 *
 * This is a deliberately duplicated snapshot — not a live import from
 * `apps/web/src/lib/comparisons.ts`. Cross-importing an ESM TypeScript
 * module from `apps/web` into this standalone CommonJS script is not
 * reliable without adding a build step/dependency, which the founder has
 * confirmed is out of scope for now (see TASK-0027/0030 decisions in
 * `.ai/DECISIONS.md`). Keep this list in sync manually until a shared
 * package is introduced.
 *
 * Each category lists its known subjects. The Planner generates every
 * unique unordered pair within a category (see `planner.ts`), not just one
 * fixed pair — this is what lets `scripts/run-pipeline.ts technology`
 * produce every valid Technology battle.
 */

export type CategorySubjects = {
  category: string;
  subjects: string[];
};

const CATALOG: CategorySubjects[] = [
  { category: "Technology", subjects: ["Apple", "Android", "Windows", "macOS", "Linux"] },
  { category: "Lifestyle", subjects: ["Coffee", "Tea"] },
  { category: "Entertainment", subjects: ["Netflix", "YouTube"] },
  { category: "Pop Culture", subjects: ["Marvel", "DC"] },
  { category: "Food", subjects: ["Pizza", "Burger"] },
];

module.exports = { CATALOG };
