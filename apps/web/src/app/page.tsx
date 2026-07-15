import Link from "next/link";
import { getComparisonBySlug } from "@/lib/comparisons";
import { ComparisonVoter } from "@/components/comparison-voter";
import { db } from "@/lib/db";
import { dbBattleToComparison } from "@/lib/battle-adapter";
import type { Comparison } from "@/lib/comparisons";

export const dynamic = "force-dynamic";

const FALLBACK_SLUG = "apple-vs-android";

async function getFeatured(): Promise<Comparison> {
  try {
    const battle = await db.battle.findFirst({
      where: { status: "active" },
      include: { subjectA: true, subjectB: true },
      orderBy: { createdAt: "desc" },
    });
    if (battle) return dbBattleToComparison(battle);
  } catch {}
  return getComparisonBySlug(FALLBACK_SLUG)!;
}

async function getTotalSignals(): Promise<number | null> {
  try {
    return await db.vote.count();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [featured, totalSignals] = await Promise.all([getFeatured(), getTotalSignals()]);

  return (
    <main className="relative flex h-screen w-screen flex-col bg-[oklch(0.07_0.004_270)]">
      <div className="relative flex-1">
        <ComparisonVoter comparison={featured} />
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-white/6 bg-[oklch(0.07_0.004_270)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
            Human Signal
          </span>
          {totalSignals !== null && totalSignals > 0 && (
            <span className="text-[10px] text-white/22">
              · {totalSignals.toLocaleString()} signals
            </span>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/category"
            className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
          >
            Categories
          </Link>
          <Link
            href="/battle"
            className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white/60"
          >
            All battles
          </Link>
        </div>
      </div>
    </main>
  );
}
