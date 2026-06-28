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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {comparison.optionA} vs {comparison.optionB}
        </h1>
        <p className="text-muted-foreground">Cast your vote below.</p>
      </div>
      <ComparisonVoter comparison={comparison} />
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← All battles
      </Link>
    </main>
  );
}
