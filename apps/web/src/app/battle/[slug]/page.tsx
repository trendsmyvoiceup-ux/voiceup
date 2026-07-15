import { notFound } from "next/navigation";
import Link from "next/link";
import { ComparisonVoter } from "@/components/comparison-voter";
import { getComparisonBySlug } from "@/lib/comparisons";
import { db } from "@/lib/db";
import { dbBattleToComparison } from "@/lib/battle-adapter";

export const dynamic = "force-dynamic";

export default async function BattlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-first: covers pipeline-imported battles
  try {
    const battle = await db.battle.findUnique({
      where: { slug },
      include: { subjectA: true, subjectB: true },
    });
    if (battle) {
      return (
        <main className="relative h-screen w-screen">
          <BackButton />
          <ComparisonVoter comparison={dbBattleToComparison(battle)} />
        </main>
      );
    }
  } catch {}

  // Static fallback: covers the 5 hardcoded comparisons before any import
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <main className="relative h-screen w-screen">
      <BackButton />
      <ComparisonVoter comparison={comparison} />
    </main>
  );
}

function BackButton() {
  return (
    <Link
      href="/battle"
      aria-label="All battles"
      className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/90"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M8 1.5L3 6l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
