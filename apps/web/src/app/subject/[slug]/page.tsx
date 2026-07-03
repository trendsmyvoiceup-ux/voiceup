import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSnapshot } from "@/lib/signal-engine";
import { getComparisonBySlug, comparisons } from "@/lib/comparisons";
import { slugifyCategory } from "@/lib/categories";

export const dynamic = "force-dynamic";

async function getSubjectData(slug: string) {
  try {
    const subject = await db.subject.findUnique({ where: { slug } });
    if (!subject) return null;

    const snapshot = await getSnapshot(subject.id);

    const battles = await db.battle.findMany({
      where: { OR: [{ subjectAId: subject.id }, { subjectBId: subject.id }] },
      include: { subjectA: true, subjectB: true },
      orderBy: { createdAt: "desc" },
    });

    const battleIds = battles.map((b) => b.id);
    const voteCounts =
      battleIds.length > 0
        ? await db.vote.groupBy({
            by: ["battleId", "subjectId"],
            where: { battleId: { in: battleIds } },
            _count: { id: true },
          })
        : [];

    const countMap = new Map<string, Map<string, number>>();
    for (const row of voteCounts) {
      if (!countMap.has(row.battleId)) countMap.set(row.battleId, new Map());
      countMap.get(row.battleId)!.set(row.subjectId, row._count.id);
    }

    let wins = 0;
    for (const battle of battles) {
      const bMap = countMap.get(battle.id) ?? new Map<string, number>();
      const myVotes = bMap.get(subject.id) ?? 0;
      const theirId =
        battle.subjectAId === subject.id ? battle.subjectBId : battle.subjectAId;
      const theirVotes = bMap.get(theirId) ?? 0;
      if (myVotes > theirVotes) wins++;
    }

    const related = await db.subject.findMany({
      where: { category: subject.category, slug: { not: slug } },
      include: { signalSnapshot: true },
      orderBy: { signalSnapshot: { score: "desc" } },
      take: 5,
    });

    const sourceBreakdown = await db.vote.groupBy({
      by: ["sourceId"],
      where: { subjectId: subject.id },
      _count: { id: true },
    });
    const sourceIds = sourceBreakdown.map((s) => s.sourceId);
    const sources = await db.source.findMany({ where: { id: { in: sourceIds } } });
    const sourceMap = Object.fromEntries(sources.map((s) => [s.id, s.name]));

    const winRatio =
      battles.length > 0 ? Math.round((wins / battles.length) * 100) : null;

    return {
      subject,
      snapshot,
      battles,
      winRatio,
      related,
      sourceBreakdown: sourceBreakdown.map((s) => ({
        name: sourceMap[s.sourceId] ?? "Unknown",
        count: s._count.id,
      })),
    };
  } catch {
    return null;
  }
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getSubjectData(slug);

  if (!data) {
    const staticComparison = comparisons.find(
      (c) =>
        c.subjectA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug ||
        c.subjectB.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
    if (!staticComparison) notFound();

    const isA =
      staticComparison.subjectA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") ===
      slug;
    const subject = isA ? staticComparison.subjectA : staticComparison.subjectB;
    const categorySlug = slugifyCategory(staticComparison.category);

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-12 px-5 py-14">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
        >
          ← Discover
        </Link>
        <div className="flex flex-col gap-1">
          <Link
            href={`/category/${categorySlug}`}
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white/55"
          >
            {staticComparison.category}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
        </div>
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/8 bg-white/2 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl font-black text-white/20">
            —
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-white/50">No signal yet</p>
            <p className="text-sm text-white/28">
              Be the first to vote and start building this signal.
            </p>
          </div>
          <Link
            href={`/battle/${staticComparison.id}`}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-88"
          >
            Cast your signal →
          </Link>
        </div>
      </main>
    );
  }

  const { subject, snapshot, battles, winRatio, related, sourceBreakdown } = data;
  const categorySlug = slugifyCategory(subject.category);
  const hasSignal = snapshot !== null && snapshot.totalSignals > 0;
  const score = snapshot ? Math.round(snapshot.score) : 0;

  function trendLabel(trend: number): string {
    if (trend > 0.5) return `↑ +${trend.toFixed(1)}%`;
    if (trend < -0.5) return `↓ ${trend.toFixed(1)}%`;
    return "Stable";
  }

  function trendColor(trend: number): string {
    if (trend > 0.5) return "text-emerald-400";
    if (trend < -0.5) return "text-rose-400";
    return "text-white/35";
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-12 px-5 py-14">
      <Link
        href="/"
        className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
      >
        ← Discover
      </Link>

      {/* Identity */}
      <div className="flex flex-col gap-1">
        <Link
          href={`/category/${categorySlug}`}
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white/55"
        >
          {subject.category}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
      </div>

      {/* Signal Score — the product output, hero element */}
      {hasSignal ? (
        <div className="flex flex-col gap-6">
          {/* Giant score */}
          <div className="flex items-end gap-5">
            <div className="flex flex-col gap-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Signal Score
              </p>
              <span
                className="text-[5.5rem] font-black leading-none tabular-nums text-white"
                style={{
                  textShadow:
                    score >= 70
                      ? "0 0 60px rgba(255,255,255,0.12)"
                      : "none",
                }}
              >
                {score}
              </span>
            </div>
            <div className="flex flex-col gap-2 pb-3">
              <span className={`text-sm font-semibold ${trendColor(snapshot!.trend)}`}>
                {trendLabel(snapshot!.trend)}
              </span>
              <span className="text-xs text-white/30">7-day trend</span>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px] text-white/30">
              <span className="font-semibold uppercase tracking-[0.1em]">Confidence</span>
              <span className="tabular-nums">{Math.round(snapshot!.confidence)}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-white/35 transition-all duration-700"
                style={{ width: `${Math.round(snapshot!.confidence)}%` }}
              />
            </div>
          </div>

          {/* Secondary stats row */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8">
            <MiniStat label="Signals" value={snapshot!.totalSignals.toLocaleString()} />
            <MiniStat label="Battles" value={snapshot!.battleCount.toString()} />
            {winRatio !== null && <MiniStat label="Win rate" value={`${winRatio}%`} />}
          </div>

          <p className="text-[10px] text-white/20">
            Updated {new Date(subject.updatedAt).toLocaleDateString()} · website
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/2 px-6 py-8 text-center">
          <p className="font-medium text-white/35">No signal yet</p>
          <p className="text-xs text-white/22">
            Vote in a battle to start building this signal.
          </p>
        </div>
      )}

      {/* Source breakdown */}
      {sourceBreakdown.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
            Sources
          </p>
          <div className="flex flex-wrap gap-2">
            {sourceBreakdown.map((s) => (
              <span
                key={s.name}
                className="rounded-xl border border-white/8 bg-white/3 px-3.5 py-2 text-xs font-medium text-white/50"
              >
                {s.name} · {s.count.toLocaleString()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Related battles */}
      <section className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
          Battles
        </p>
        {battles.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {battles.map((battle) => {
              const comp = getComparisonBySlug(battle.slug);
              return (
                <Link
                  key={battle.id}
                  href={`/battle/${battle.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-5 py-3.5 transition-all hover:border-white/14 hover:bg-white/6"
                >
                  <span className="font-medium text-white/75 transition-colors group-hover:text-white">
                    {battle.subjectA.name}{" "}
                    <span className="text-white/25">vs</span>{" "}
                    {battle.subjectB.name}
                  </span>
                  {comp && (
                    <span className="ml-3 text-xs text-white/20 transition-colors group-hover:text-white/40">
                      {battle.category}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-white/25">No battles yet.</p>
        )}
      </section>

      {/* Related subjects */}
      {related.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
            Related
          </p>
          <div className="flex flex-wrap gap-2">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/subject/${s.slug}`}
                className="rounded-xl border border-white/8 bg-white/3 px-3.5 py-2 text-xs font-medium text-white/55 transition-all hover:border-white/16 hover:bg-white/6 hover:text-white/90"
              >
                {s.name}
                {s.signalSnapshot && s.signalSnapshot.totalSignals > 0 && (
                  <span className="ml-1.5 text-white/25">
                    {Math.round(s.signalSnapshot.score)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/3 py-4">
      <p className="text-lg font-bold tabular-nums text-white/85">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/28">{label}</p>
    </div>
  );
}
