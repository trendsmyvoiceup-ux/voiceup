import { comparisons, type Subject as ComparisonSubject, type VisualTheme } from "@/lib/comparisons";

/**
 * Derived, read-only navigation model: a "Subject" is any side that appears
 * in one or more battles. This file does not change battle/voting business
 * logic — it only reorganizes the existing static comparison data for
 * Subject/Category browsing.
 *
 * Scores and trends are MOCK placeholders (deterministic, not measured) so
 * the navigation surface can be built before any real Human Signal scoring
 * logic exists.
 */

export type SubjectEntry = {
  slug: string;
  name: string;
  category: string;
  visualTheme: VisualTheme;
  mediaHint: string;
  /** Mock Human Signal score (0-100). Not derived from real votes yet. */
  score: number;
  /** Mock trend, e.g. "+4%" or "-2%". Not derived from real history yet. */
  trend: string;
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Deterministic pseudo-score so mock data is stable across renders/builds. */
function mockScore(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return 55 + (hash % 40); // 55-94
}

function mockTrend(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 17 + seed.charCodeAt(i)) % 1000;
  }
  const delta = (hash % 13) - 4; // -4..+8
  return delta >= 0 ? `+${delta}%` : `${delta}%`;
}

function buildSubjects(): SubjectEntry[] {
  const bySlug = new Map<string, SubjectEntry>();

  for (const comparison of comparisons) {
    for (const subject of [comparison.subjectA, comparison.subjectB] as ComparisonSubject[]) {
      const slug = slugify(subject.name);
      if (bySlug.has(slug)) continue;
      bySlug.set(slug, {
        slug,
        name: subject.name,
        category: comparison.category,
        visualTheme: comparison.visualTheme,
        mediaHint: subject.mediaHint,
        score: mockScore(slug),
        trend: mockTrend(slug),
      });
    }
  }

  return Array.from(bySlug.values());
}

export const subjects: SubjectEntry[] = buildSubjects();

export function getSubjectBySlug(slug: string): SubjectEntry | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getSubjectsByCategory(category: string): SubjectEntry[] {
  return subjects
    .filter((s) => s.category === category)
    .sort((a, b) => b.score - a.score);
}

export function getRelatedSubjects(slug: string, limit = 3): SubjectEntry[] {
  const subject = getSubjectBySlug(slug);
  if (!subject) return [];
  return subjects
    .filter((s) => s.slug !== slug && s.category === subject.category)
    .slice(0, limit);
}

export function getBattlesForSubject(slug: string) {
  const subject = getSubjectBySlug(slug);
  if (!subject) return [];
  return comparisons.filter(
    (c) => slugify(c.subjectA.name) === slug || slugify(c.subjectB.name) === slug
  );
}

export function getTrendingSubjects(limit = 6): SubjectEntry[] {
  return [...subjects].sort((a, b) => b.score - a.score).slice(0, limit);
}

export { slugify };
