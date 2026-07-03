import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { categories, getCategoryBySlug } from "@/lib/categories";

export const dynamic = "force-dynamic";

async function getCategoryData(slug: string) {
  // Derive category title from slug
  const staticCategory = getCategoryBySlug(slug);
  if (!staticCategory) return null;

  const categoryTitle = staticCategory.title;

  try {
    const [subjects, battles, totalVotes] = await Promise.all([
      db.subject.findMany({
        where: { category: categoryTitle },
        include: { signalSnapshot: true },
        orderBy: { signalSnapshot: { score: "desc" } },
      }),
      db.battle.findMany({
        where: { category: categoryTitle },
        include: { subjectA: true, subjectB: true },
        orderBy: { createdAt: "desc" },
      }),
      db.vote.count({
        where: { battle: { category: categoryTitle } },
      }),
    ]);

    return { categoryTitle, subjects, battles, totalVotes };
  } catch {
    // DB unavailable — return static fallback data
    return {
      categoryTitle,
      subjects: staticCategory.subjects.map((s) => ({
        id: s.slug,
        slug: s.slug,
        name: s.name,
        category: categoryTitle,
        signalSnapshot: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      battles: [],
      totalVotes: 0,
    };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) notFound();

  const { categoryTitle, subjects, battles, totalVotes } = data;
  const hasSignal = totalVotes > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">← Discover</Link>

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Category</p>
        <h1 className="text-4xl font-bold tracking-tight">{categoryTitle}</h1>
      </div>

      {/* Runtime stats */}
      {hasSignal && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total signals" value={totalVotes.toLocaleString()} />
          <StatCard label="Subjects" value={subjects.length.toString()} />
          <StatCard label="Battles" value={battles.length.toString()} />
        </div>
      )}

      {/* Ranked subjects */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {hasSignal ? "Ranked Subjects" : "Subjects"}
        </h2>
        {subjects.length > 0 ? (
          <ol className="space-y-2">
            {subjects.map((subject, i) => {
              const snap = subject.signalSnapshot;
              const hasData = snap && snap.totalSignals > 0;
              return (
                <li key={subject.slug}>
                  <Link
                    href={`/subject/${subject.slug}`}
                    className="flex items-center justify-between rounded-2xl border p-4 hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 text-sm text-muted-foreground">#{i + 1}</span>
                      <span className="font-medium">{subject.name}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {hasData ? (
                        <>Signal {Math.round(snap.score)} · {snap.totalSignals.toLocaleString()} votes</>
                      ) : (
                        "No data yet"
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">No subjects yet.</p>
        )}
        {!hasSignal && (
          <p className="text-xs text-muted-foreground">Rankings will appear after the first votes are cast.</p>
        )}
      </section>

      {/* Battles */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Battles</h2>
        {battles.length > 0 ? (
          <div className="grid gap-2">
            {battles.map((battle) => (
              <Link
                key={battle.id}
                href={`/battle/${battle.slug}`}
                className="rounded-2xl border p-4 text-center font-medium hover:bg-muted/50"
              >
                {battle.subjectA.name} <span className="text-muted-foreground">vs</span> {battle.subjectB.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid gap-2">
            {/* Fallback to static battles if DB empty */}
            {getCategoryBySlug(slug)?.subjects && (
              <p className="text-sm text-muted-foreground">No battles in database yet. Run the Content Factory pipeline.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
