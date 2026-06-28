export type Comparison = {
  id: string;
  optionA: string;
  optionB: string;
};

export const comparisons: Comparison[] = [
  { id: "apple-vs-android", optionA: "Apple", optionB: "Android" },
  { id: "coffee-vs-tea", optionA: "Coffee", optionB: "Tea" },
  { id: "netflix-vs-youtube", optionA: "Netflix", optionB: "YouTube" },
  { id: "marvel-vs-dc", optionA: "Marvel", optionB: "DC" },
  { id: "pizza-vs-burger", optionA: "Pizza", optionB: "Burger" },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((comparison) => comparison.id === slug);
}
