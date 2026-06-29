import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug, getBattlesForCategory } from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const trending = [...category.subjects].sort((a, b) => b.score - a.score).slice(0, 3);
  const recentBattles = getBattlesForCategory(category.title);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Discover
        </Link>
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Category
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{category.title}</h1>
      </div>

      {/* Search placeholder — not functional yet, static UI only. */}
      <div className="rounded-full border bg-muted/40 px-5 py-3 text-sm text-muted-foreground">
        Search {category.title.toLowerCase()} subjects… (coming soon)
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trending (demo signal)
        </h2>
        <div className="flex flex-wrap gap-2">
          {trending.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subject/${subject.slug}`}
              className="rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              {subject.name} · {subject.trend}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Ranked subjects (demo signal)
        </h2>
        <ol className="space-y-2">
          {category.subjects.map((subject, i) => (
            <li key={subject.slug}>
              <Link
                href={`/subject/${subject.slug}`}
                className="flex items-center justify-between rounded-2xl border p-4 hover:bg-muted/50"
              >
                <span className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">#{i + 1}</span>
                  <span className="font-medium">{subject.name}</span>
                </span>
                <span className="text-sm text-muted-foreground">
                  Signal {subject.score}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground">
          Placeholder ranking — not based on real votes yet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Recent battles
        </h2>
        <div className="grid gap-2">
          {recentBattles.map((battle) => (
            <Link
              key={battle.id}
              href={`/battle/${battle.id}`}
              className="rounded-2xl border p-4 text-center font-medium hover:bg-muted/50"
            >
              {battle.subjectA.name} <span className="text-muted-foreground">vs</span>{" "}
              {battle.subjectB.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
