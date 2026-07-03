import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getCategoryBySlug } from "@/lib/categories";

export const dynamic = "force-dynamic";

async function getCategoryData(slug: string) {
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

  // Compute max score for bar normalization
  const maxScore = subjects.reduce(
    (m, s) => Math.max(m, s.signalSnapshot?.score ?? 0),
    0
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-12 px-5 py-14">
      <Link
        href="/category"
        className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
      >
        ← Categories
      </Link>

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Category</p>
        <h1 className="text-3xl font-bold tracking-tight">{categoryTitle}</h1>
        {hasSignal && (
          <p className="mt-1 text-sm text-white/30">
            {totalVotes.toLocaleString()} signals · {subjects.length} subjects · {battles.length} battles
          </p>
        )}
      </div>

      {/* Rankings */}
      <section className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
          {hasSignal ? "Signal Rankings" : "Subjects"}
        </p>

        {subjects.length > 0 ? (
          <ol className="flex flex-col gap-1.5">
            {subjects.map((subject, i) => {
              const snap = subject.signalSnapshot;
              const hasData = snap && snap.totalSignals > 0;
              const score = snap ? Math.round(snap.score) : 0;
              const barWidth = hasData && maxScore > 0 ? (score / maxScore) * 100 : 0;
              const isFirst = i === 0 && hasData;

              return (
                <li key={subject.slug}>
                  <Link
                    href={`/subject/${subject.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/3 px-5 py-4 transition-all hover:border-white/14 hover:bg-white/6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 text-right text-xs tabular-nums font-semibold ${
                            isFirst ? "text-white/60" : "text-white/20"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`font-semibold transition-colors group-hover:text-white ${
                            isFirst ? "text-white/90" : "text-white/75"
                          }`}
                        >
                          {subject.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 text-xs tabular-nums">
                        {hasData ? (
                          <>
                            <span className="font-bold text-white/70">{score}</span>
                            <span className="text-white/20">
                              · {snap.totalSignals.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </span>
                    </div>

                    {/* Signal strength bar */}
                    {hasData && (
                      <div className="ml-8 h-0.5 overflow-hidden rounded-full bg-white/6">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${barWidth}%`,
                            background: isFirst
                              ? "rgba(255,255,255,0.45)"
                              : "rgba(255,255,255,0.2)",
                          }}
                        />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <EmptyState label="No subjects yet" />
        )}

        {!hasSignal && subjects.length > 0 && (
          <p className="text-xs text-white/22">
            Rankings appear after the first signals are cast.
          </p>
        )}
      </section>

      {/* Battles */}
      <section className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">Battles</p>
        {battles.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {battles.map((battle) => (
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
                <svg
                  className="h-3.5 w-3.5 text-white/18 transition-colors group-hover:text-white/45"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            label="No battles yet"
            hint="Run the Content Factory pipeline."
          />
        )}
      </section>
    </main>
  );
}

function EmptyState({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/2 px-5 py-6 text-center">
      <p className="text-sm font-medium text-white/30">{label}</p>
      {hint && <p className="mt-1 text-xs text-white/18">{hint}</p>}
    </div>
  );
}
