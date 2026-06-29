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
        href="/"
        aria-label="All battles"
        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        ←
      </Link>
      <ComparisonVoter comparison={comparison} />
    </main>
  );
}
