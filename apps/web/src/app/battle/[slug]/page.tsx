import { notFound } from "next/navigation";
import Link from "next/link";
import { ComparisonVoter } from "@/components/comparison-voter";
import { comparisons, getComparisonBySlug } from "@/lib/comparisons";

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.id }));
}

export default async function BattlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  return (
    <main className="relative h-screen w-screen">
      <Link
        href="/battle"
        aria-label="All battles"
        className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/90"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M8 1.5L3 6l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
      <ComparisonVoter comparison={comparison} />
    </main>
  );
}
