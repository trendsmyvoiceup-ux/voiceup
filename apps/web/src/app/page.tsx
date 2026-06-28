import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Opinion Platform</h1>
        <p className="text-muted-foreground">Pick a battle and cast your vote.</p>
      </div>

      <div className="grid w-full max-w-md gap-4">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.id}
            href={`/battle/${comparison.id}`}
            className="rounded-xl border p-6 text-center text-lg font-medium transition-colors hover:bg-muted"
          >
            {comparison.optionA} <span className="text-muted-foreground">vs</span>{" "}
            {comparison.optionB}
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Community signal, not a scientific poll. Source: website
      </p>
    </main>
  );
}
