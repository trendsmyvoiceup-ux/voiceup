import Link from "next/link";
import { db } from "@/lib/db";
import { comparisons } from "@/lib/comparisons";

export const dynamic = "force-dynamic";

async function getBattles() {
  try {
    return await db.battle.findMany({
      where: { status: "active" },
      include: { subjectA: true, subjectB: true, _count: { select: { votes: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
}

export default async function BattleIndexPage() {
  const dbBattles = await getBattles();

  // Group by category for display
  if (dbBattles && dbBattles.length > 0) {
    const byCategory = dbBattles.reduce(
      (acc, b) => {
        (acc[b.category] ??= []).push(b);
        return acc;
      },
      {} as Record<string, typeof dbBattles>
    );

    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">← Featured battle</Link>
        <h1 className="text-3xl font-bold tracking-tight">All battles</h1>

        {Object.entries(byCategory).map(([category, battles]) => (
          <section key={category} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{category}</h2>
            <div className="grid gap-3">
              {battles.map((battle) => (
                <Link
                  key={battle.id}
                  href={`/battle/${battle.slug}`}
                  className="flex items-center justify-between rounded-3xl border bg-muted/40 px-7 py-5 font-medium transition-colors hover:bg-muted active:scale-[0.99]"
                >
                  <span className="text-lg">
                    {battle.subjectA.name} <span className="text-muted-foreground">vs</span> {battle.subjectB.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {battle._count.votes > 0 ? `${battle._count.votes.toLocaleString()} votes` : "Vote first"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    );
  }

  // Static fallback if DB unavailable or empty
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">← Featured battle</Link>
      <h1 className="text-3xl font-bold tracking-tight">All battles</h1>
      <div className="grid gap-3">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.id}
            href={`/battle/${comparison.id}`}
            className="rounded-3xl border bg-muted/40 p-7 text-center text-lg font-medium transition-colors hover:bg-muted active:scale-[0.99]"
          >
            {comparison.subjectA.name}{" "}
            <span className="text-muted-foreground">vs</span> {comparison.subjectB.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
