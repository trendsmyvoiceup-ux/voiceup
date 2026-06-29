import { notFound } from "next/navigation";
import Link from "next/link";
import {
  subjects,
  getSubjectBySlug,
  getRelatedSubjects,
  getBattlesForSubject,
} from "@/lib/subjects";
import { slugifyCategory } from "@/lib/categories";

export function generateStaticParams() {
  return subjects.map((subject) => ({ slug: subject.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    notFound();
  }

  const related = getRelatedSubjects(slug);
  const battles = getBattlesForSubject(slug);
  const categorySlug = slugifyCategory(subject.category);

  // Static timeline placeholder — no real history is tracked yet.
  const timelinePlaceholder = ["W1", "W2", "W3", "W4", "Now"];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Discover
      </Link>

      <div>
        <Link
          href={`/category/${categorySlug}`}
          className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:underline"
        >
          {subject.category}
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">{subject.name}</h1>
        <p className="mt-1 text-muted-foreground">{subject.mediaHint}</p>
      </div>

      <section className="space-y-3 rounded-2xl border p-6">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Human Signal score (demo)
            </p>
            <p className="text-3xl font-bold">{subject.score}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Trend (demo)
            </p>
            <p className="text-3xl font-bold">{subject.trend}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Demo signal — placeholder data, not real analytics.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Timeline (placeholder)
        </h2>
        <div className="flex items-end justify-between gap-2 rounded-2xl border p-6">
          {timelinePlaceholder.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-full bg-muted"
                style={{ height: `${20 + i * 12}px` }}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Related battles
        </h2>
        <div className="grid gap-2">
          {battles.map((battle) => (
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

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Related subjects
        </h2>
        <div className="flex flex-wrap gap-2">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/subject/${s.slug}`}
              className="rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
