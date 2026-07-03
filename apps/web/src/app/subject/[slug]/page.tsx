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

    // Win ratio: battles where this subject received more votes
    let wins = 0;
    for (const battle of battles) {
      const [votesA, votesB] = await Promise.all([
        db.vote.count({ where: { battleId: battle.id, subjectId: battle.subjectAId } }),
        db.vote.count({ where: { battleId: battle.id, subjectId: battle.subjectBId } }),
      ]);
      const myVotes = battle.subjectAId === subject.id ? votesA : votesB;
      const theirVotes = battle.subjectAId === subject.id ? votesB : votesA;
      if (myVotes > theirVotes) wins++;
    }

    // Related subjects in the same category
    const related = await db.subject.findMany({
      where: { category: subject.category, slug: { not: slug } },
      include: { signalSnapshot: true },
      orderBy: { signalSnapshot: { score: "desc" } },
      take: 5,
    });

    // Source breakdown
    const sourceBreakdown = await db.vote.groupBy({
      by: ["sourceId"],
      where: { subjectId: subject.id },
      _count: { id: true },
    });
    const sourceIds = sourceBreakdown.map((s) => s.sourceId);
    const sources = await db.source.findMany({ where: { id: { in: sourceIds } } });
    const sourceMap = Object.fromEntries(sources.map((s) => [s.id, s.name]));

    const winRatio = battles.length > 0 ? Math.round((wins / battles.length) * 100) : null;
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
    // Try static fallback for subjects not yet in DB
    const staticComparison = comparisons.find(
      (c) =>
        c.subjectA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug ||
        c.subjectB.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
    if (!staticComparison) notFound();

    const isA = staticComparison.subjectA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug;
    const subject = isA ? staticComparison.subjectA : staticComparison.subjectB;
    const categorySlug = slugifyCategory(staticComparison.category);

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-12">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">← Discover</Link>
        <div>
          <Link href={`/category/${categorySlug}`} className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:underline">
            {staticComparison.category}
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">{subject.name}</h1>
        </div>
        <div className="rounded-2xl border p-6 text-center text-muted-foreground">
          <p className="font-medium">No signal data yet</p>
          <p className="mt-1 text-sm">Vote in a battle to start building this signal.</p>
          <Link href={`/battle/${staticComparison.id}`} className="mt-4 inline-block rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90">
            Vote now
          </Link>
        </div>
      </main>
    );
  }

  const { subject, snapshot, battles, winRatio, related, sourceBreakdown } = data;
  const categorySlug = slugifyCategory(subject.category);
  const hasSignal = snapshot !== null && snapshot.totalSignals > 0;

  function trendLabel(trend: number): string {
    if (trend > 0) return `+${trend}%`;
    if (trend < 0) return `${trend}%`;
    return "Stable";
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">← Discover</Link>

      <div>
        <Link href={`/category/${categorySlug}`} className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:underline">
          {subject.category}
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{subject.name}</h1>
      </div>

      {/* Human Signal panel */}
      {hasSignal ? (
        <section className="space-y-4 rounded-2xl border p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Human Signal</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Signal Score" value={`${snapshot!.score}`} />
            <Stat label="Confidence" value={`${snapshot!.confidence}%`} />
            <Stat label="Trend (7d)" value={trendLabel(snapshot!.trend)} highlight={snapshot!.trend > 0 ? "positive" : snapshot!.trend < 0 ? "negative" : undefined} />
            <Stat label="Total Signals" value={snapshot!.totalSignals.toLocaleString()} />
            <Stat label="Battles" value={snapshot!.battleCount.toString()} />
            {winRatio !== null && <Stat label="Win ratio" value={`${winRatio}%`} />}
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated {new Date(subject.updatedAt).toLocaleString()} · Source: website
          </p>
        </section>
      ) : (
        <section className="rounded-2xl border p-6 text-center">
          <p className="font-medium text-muted-foreground">No signal data yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Vote in a battle to start building this signal.</p>
        </section>
      )}

      {/* Source breakdown */}
      {sourceBreakdown.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Source Breakdown</h2>
          <div className="flex flex-wrap gap-2">
            {sourceBreakdown.map((s) => (
              <span key={s.name} className="rounded-full border bg-muted/40 px-4 py-2 text-sm">
                {s.name}: {s.count.toLocaleString()} votes
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Related battles */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Related Battles</h2>
        {battles.length > 0 ? (
          <div className="grid gap-2">
            {battles.map((battle) => {
              const comp = getComparisonBySlug(battle.slug);
              return (
                <Link key={battle.id} href={`/battle/${battle.slug}`} className="rounded-2xl border p-4 text-center font-medium hover:bg-muted/50">
                  {battle.subjectA.name} <span className="text-muted-foreground">vs</span> {battle.subjectB.name}
                  {comp && <span className="ml-2 text-xs text-muted-foreground">· {battle.category}</span>}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No battles yet.</p>
        )}
      </section>

      {/* Related subjects */}
      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Related Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((s) => (
              <Link key={s.slug} href={`/subject/${s.slug}`} className="rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium hover:bg-muted">
                {s.name}
                {s.signalSnapshot && s.signalSnapshot.totalSignals > 0 && (
                  <span className="ml-2 text-muted-foreground">· {s.signalSnapshot.score}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: "positive" | "negative" }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={cn("text-2xl font-bold", highlight === "positive" && "text-green-500", highlight === "negative" && "text-red-500")}>
        {value}
      </p>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
