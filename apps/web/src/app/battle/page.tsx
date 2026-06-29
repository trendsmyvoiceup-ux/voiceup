import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export default function BattleIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Featured battle
      </Link>

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
