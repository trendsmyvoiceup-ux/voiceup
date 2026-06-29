import { comparisons } from "@/lib/comparisons";
import { getSubjectsByCategory, type SubjectEntry } from "@/lib/subjects";

/**
 * Derived, read-only category model. Categories are not a new entity in
 * storage — they are grouped from the existing `category` string already
 * present on each comparison. Static data only, no backend/database.
 */

export type CategoryEntry = {
  slug: string;
  title: string;
  subjects: SubjectEntry[];
  battleCount: number;
};

export function slugifyCategory(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildCategories(): CategoryEntry[] {
  const titles = Array.from(new Set(comparisons.map((c) => c.category)));
  return titles.map((title) => ({
    slug: slugifyCategory(title),
    title,
    subjects: getSubjectsByCategory(title),
    battleCount: comparisons.filter((c) => c.category === title).length,
  }));
}

export const categories: CategoryEntry[] = buildCategories();

export function getCategoryBySlug(slug: string): CategoryEntry | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBattlesForCategory(categoryTitle: string) {
  return comparisons.filter((c) => c.category === categoryTitle);
}
