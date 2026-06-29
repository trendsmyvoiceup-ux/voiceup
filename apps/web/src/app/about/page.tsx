import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:underline">
        ← Battle
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <p className="text-muted-foreground">
        Opinion Platform is evolving from a comparison app into a Human Signal
        platform. Every battle is a small, honest vote — the foundation for a
        broader picture of community opinion over time.
      </p>

      <p className="text-xs text-muted-foreground">
        Community signal, not a scientific poll · Source: website
      </p>
    </main>
  );
}
