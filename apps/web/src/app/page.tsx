import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 px-6 py-20">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Opinion Platform</h1>
        <p className="mt-2 text-muted-foreground">Pick a side. Cast your vote.</p>
      </div>

      <div className="grid w-full max-w-md gap-3">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.id}
            href={`/battle/${comparison.id}`}
            className="rounded-3xl border bg-muted/40 p-7 text-center text-lg font-medium transition-colors hover:bg-muted active:scale-[0.99]"
          >
            {comparison.subjectA.name} <span className="text-muted-foreground">vs</span>{" "}
            {comparison.subjectB.name}
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Community signal, not a scientific poll · Source: website
      </p>
    </main>
  );
}
