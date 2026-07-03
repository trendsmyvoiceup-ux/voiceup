import Link from "next/link";
import { db } from "@/lib/db";
import { comparisons } from "@/lib/comparisons";

export const dynamic = "force-dynamic";

async function getBattles() {
  try {
    const [battles, totalSignals] = await Promise.all([
      db.battle.findMany({
        where: { status: "active" },
        include: { subjectA: true, subjectB: true, _count: { select: { votes: true } } },
        orderBy: { createdAt: "desc" },
      }),
      db.vote.count(),
    ]);
    return { battles, totalSignals };
  } catch {
    return null;
  }
}

export default async function BattleIndexPage() {
  const result = await getBattles();

  if (result && result.battles.length > 0) {
    const { battles, totalSignals } = result;
    const byCategory = battles.reduce(
      (acc, b) => {
        (acc[b.category] ??= []).push(b);
        return acc;
      },
      {} as Record<string, typeof battles>
    );

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-12 px-5 py-14">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
        >
          ← Discover
        </Link>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Human Signal
          </p>
          <h1 className="text-3xl font-bold tracking-tight">All Battles</h1>
          {totalSignals > 0 && (
            <p className="mt-1 text-sm text-white/30">
              {totalSignals.toLocaleString()} signals cast across {battles.length} battles
            </p>
          )}
        </div>

        <div className="flex flex-col gap-9">
          {Object.entries(byCategory).map(([category, categoryBattles]) => (
            <section key={category} className="flex flex-col gap-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
                {category}
              </p>
              <div className="flex flex-col gap-1.5">
                {categoryBattles.map((battle) => (
                  <Link
                    key={battle.id}
                    href={`/battle/${battle.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-5 py-4 transition-all hover:border-white/14 hover:bg-white/6 active:scale-[0.99]"
                  >
                    <span className="font-medium text-white/80 transition-colors group-hover:text-white">
                      {battle.subjectA.name}{" "}
                      <span className="text-white/28">vs</span>{" "}
                      {battle.subjectB.name}
                    </span>
                    <span className="ml-4 shrink-0 text-xs tabular-nums text-white/25 transition-colors group-hover:text-white/50">
                      {battle._count.votes > 0
                        ? `${battle._count.votes.toLocaleString()}`
                        : "—"}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    );
  }

  // Static fallback
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-12 px-5 py-14">
      <Link
        href="/"
        className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
      >
        ← Discover
      </Link>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Human Signal
        </p>
        <h1 className="text-3xl font-bold tracking-tight">All Battles</h1>
      </div>
      <div className="flex flex-col gap-1.5">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.id}
            href={`/battle/${comparison.id}`}
            className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-5 py-4 transition-all hover:border-white/14 hover:bg-white/6 active:scale-[0.99]"
          >
            <span className="font-medium text-white/80 transition-colors group-hover:text-white">
              {comparison.subjectA.name}{" "}
              <span className="text-white/28">vs</span>{" "}
              {comparison.subjectB.name}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
