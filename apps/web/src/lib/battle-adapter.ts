import type { VisualTheme, Comparison } from "@/lib/comparisons";

const CATEGORY_THEME: Record<string, VisualTheme> = {
  Technology:   "tech",
  Lifestyle:    "lifestyle",
  Entertainment:"entertainment",
  "Pop Culture":"entertainment",
  Food:         "food",
};

function categoryToTheme(category: string): VisualTheme {
  return CATEGORY_THEME[category] ?? "tech";
}

type DbBattle = {
  slug: string;
  category: string;
  subjectA: { name: string; category: string };
  subjectB: { name: string; category: string };
};

export function dbBattleToComparison(b: DbBattle): Comparison {
  return {
    id: b.slug,
    subjectA: { name: b.subjectA.name, mediaLabel: b.subjectA.name, mediaHint: b.subjectA.category },
    subjectB: { name: b.subjectB.name, mediaLabel: b.subjectB.name, mediaHint: b.subjectB.category },
    category: b.category,
    visualTheme: categoryToTheme(b.category),
  };
}
