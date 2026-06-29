export type VisualTheme = "tech" | "lifestyle" | "entertainment" | "food";

export type Subject = {
  /** Display name shown on the battle screen. */
  name: string;
  /**
   * Short label used by media rendering (BattleVisual) and, later, by any
   * MediaProvider lookup (e.g. a Wikimedia/Openverse search term).
   */
  mediaLabel: string;
  /** One-line caption shown under the placeholder visual. */
  mediaHint: string;
};

export type Comparison = {
  id: string;
  subjectA: Subject;
  subjectB: Subject;
  category: string;
  visualTheme: VisualTheme;
};

export const comparisons: Comparison[] = [
  {
    id: "apple-vs-android",
    subjectA: { name: "Apple", mediaLabel: "Apple", mediaHint: "Smartphone ecosystem" },
    subjectB: { name: "Android", mediaLabel: "Android", mediaHint: "Smartphone ecosystem" },
    category: "Technology",
    visualTheme: "tech",
  },
  {
    id: "coffee-vs-tea",
    subjectA: { name: "Coffee", mediaLabel: "Coffee", mediaHint: "Morning ritual" },
    subjectB: { name: "Tea", mediaLabel: "Tea", mediaHint: "Morning ritual" },
    category: "Lifestyle",
    visualTheme: "lifestyle",
  },
  {
    id: "netflix-vs-youtube",
    subjectA: { name: "Netflix", mediaLabel: "Netflix", mediaHint: "Streaming platform" },
    subjectB: { name: "YouTube", mediaLabel: "YouTube", mediaHint: "Streaming platform" },
    category: "Entertainment",
    visualTheme: "entertainment",
  },
  {
    id: "marvel-vs-dc",
    subjectA: { name: "Marvel", mediaLabel: "Marvel", mediaHint: "Comic universe" },
    subjectB: { name: "DC", mediaLabel: "DC", mediaHint: "Comic universe" },
    category: "Pop Culture",
    visualTheme: "entertainment",
  },
  {
    id: "pizza-vs-burger",
    subjectA: { name: "Pizza", mediaLabel: "Pizza", mediaHint: "Comfort food" },
    subjectB: { name: "Burger", mediaLabel: "Burger", mediaHint: "Comfort food" },
    category: "Food",
    visualTheme: "food",
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.id === slug);
}
