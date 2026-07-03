import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-16 px-5 py-14">
      <Link
        href="/"
        className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
      >
        ← Discover
      </Link>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Human Signal
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Every opinion leaves a trace.
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-base leading-relaxed text-white/55">
          Most polls disappear. Human Signal accumulates. Every battle you
          vote in adds to a running record of what people actually prefer —
          not what they say they prefer, but what they choose when forced to
          pick a side.
        </p>

        <p className="text-base leading-relaxed text-white/55">
          The Signal Score is the product. It reflects win rate, confidence,
          and 7-day trend. A subject with a score of 80 has won most of its
          battles, across many signals, with conviction. That means something.
        </p>

        <p className="text-base leading-relaxed text-white/55">
          We built this because we believe community preferences — not
          algorithmic recommendations — should be legible. When enough
          humans signal, patterns emerge. That is Human Signal.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-px w-full bg-white/8" />
        <p className="text-xs leading-relaxed text-white/25">
          Signals are anonymous and deduplicated per device. This is
          community signal, not a scientific poll.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-88"
      >
        Cast your first signal →
      </Link>
    </main>
  );
}
