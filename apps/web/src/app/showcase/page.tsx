import Link from "next/link";
import { comparisons } from "@/lib/comparisons";
import { categories } from "@/lib/categories";

// Internal dev/review page. Not linked from public nav.
export default function ShowcasePage() {
  const sampleBattle = comparisons[0];
  const sampleCategory = categories[0];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-5 py-14">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400/80">
            Internal
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/25">
            Dev only · not linked publicly
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">UI Showcase</h1>
        <p className="text-sm text-white/40">
          Review all pages and design system tokens in one place.
        </p>
      </div>

      <Divider />

      {/* ── Page Links ──────────────────────────────────── */}
      <Section label="Pages">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <PageCard href="/" label="Homepage" sub="Featured battle" />
          <PageCard href="/battle" label="Battle Index" sub="All battles list" />
          <PageCard
            href={`/battle/${sampleBattle.id}`}
            label="Battle Detail"
            sub={`${sampleBattle.subjectA.name} vs ${sampleBattle.subjectB.name}`}
          />
          <PageCard
            href={`/subject/${sampleBattle.subjectA.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            label="Subject"
            sub={sampleBattle.subjectA.name}
          />
          <PageCard
            href={`/category/${sampleCategory.slug}`}
            label="Category"
            sub={sampleCategory.title}
          />
          <PageCard href="/about" label="About" sub="Manifesto" />
          <PageCard href="/admin" label="Admin" sub="Internal dashboard" />
          <PageCard href="/this-does-not-exist" label="404" sub="Not found" variant="muted" />
        </div>
      </Section>

      <Divider />

      {/* ── Typography ──────────────────────────────────── */}
      <Section label="Typography">
        <div className="flex flex-col gap-5">
          <Row label="Display / Hero Score">
            <span className="text-[5.5rem] font-black leading-none tabular-nums text-white">
              74
            </span>
          </Row>
          <Row label="H1 — Page title">
            <span className="text-3xl font-bold tracking-tight">Signal Score</span>
          </Row>
          <Row label="H2 — Battle zone">
            <span className="text-[1.55rem] font-black uppercase leading-none tracking-tight">
              Apple
            </span>
          </Row>
          <Row label="Body">
            <span className="text-base leading-relaxed text-white/55">
              Every opinion leaves a trace. Human Signal accumulates.
            </span>
          </Row>
          <Row label="Label / Overline">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Signal Score
            </span>
          </Row>
          <Row label="Caption / Meta">
            <span className="text-xs text-white/25">
              Updated 3 Jul 2026 · website · deduplicated
            </span>
          </Row>
          <Row label="Tabular / Numeric">
            <span className="text-lg font-bold tabular-nums text-white/85">
              3,247
            </span>
          </Row>
        </div>
      </Section>

      <Divider />

      {/* ── Buttons & CTAs ──────────────────────────────── */}
      <Section label="Buttons & CTAs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary */}
          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-88 active:scale-[0.98]">
            Next battle →
          </button>
          {/* Ghost */}
          <button className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/85">
            Copy link
          </button>
          {/* Ghost — nav icon size */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/90">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {/* Inline text link */}
          <Link
            href="#"
            className="text-xs font-medium uppercase tracking-[0.1em] text-white/30 transition-colors hover:text-white/60"
          >
            ← Back
          </Link>
          {/* Chip / tag */}
          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 backdrop-blur-sm">
            Technology
          </span>
        </div>
      </Section>

      <Divider />

      {/* ── Signal Stat Cards ───────────────────────────── */}
      <Section label="Signal Stat Cards">
        <div className="flex flex-col gap-4">
          {/* Hero score display */}
          <div className="flex items-end gap-5 rounded-2xl border border-white/8 bg-white/3 p-6">
            <div className="flex flex-col gap-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Signal Score
              </p>
              <span className="text-[5.5rem] font-black leading-none tabular-nums text-white">
                74
              </span>
            </div>
            <div className="flex flex-col gap-2 pb-3">
              <span className="text-sm font-semibold text-emerald-400">↑ +4.2%</span>
              <span className="text-xs text-white/30">7-day trend</span>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="flex flex-col gap-1.5 rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
            <div className="flex justify-between text-[10px] text-white/30">
              <span className="font-semibold uppercase tracking-[0.1em]">Confidence</span>
              <span className="tabular-nums">68%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-[68%] rounded-full bg-white/35" />
            </div>
          </div>

          {/* Mini stat grid */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8">
            <MiniStatDemo label="Signals" value="3,247" />
            <MiniStatDemo label="Battles" value="5" />
            <MiniStatDemo label="Win rate" value="74%" />
          </div>

          {/* Split bar (post-vote) */}
          <div className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
            <div className="flex justify-between text-xs tabular-nums text-white/40 mb-1.5">
              <span className="font-semibold text-white/75">Apple 67%</span>
              <span className="font-semibold">33% Android</span>
            </div>
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div className="absolute inset-y-0 left-0 w-[67%] rounded-full bg-indigo-400/70" />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Battle Card ─────────────────────────────────── */}
      <Section label="Battle & Subject Cards">
        <div className="flex flex-col gap-1.5">
          {/* Battle card — default */}
          <div className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
            <span className="font-medium text-white/80">
              Apple <span className="text-white/28">vs</span> Android
            </span>
            <span className="text-xs tabular-nums text-white/25">3,247</span>
          </div>
          {/* Battle card — hover state */}
          <div className="group flex items-center justify-between rounded-2xl border border-white/14 bg-white/6 px-5 py-4">
            <span className="font-medium text-white">
              Coffee <span className="text-white/28">vs</span> Tea
            </span>
            <span className="text-xs tabular-nums text-white/50">892</span>
          </div>
          {/* Ranked subject with signal bar */}
          <div className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="w-5 text-right text-xs tabular-nums font-semibold text-white/60">1</span>
                <span className="font-semibold text-white/90">Apple</span>
              </span>
              <span className="flex items-center gap-2 text-xs">
                <span className="font-bold text-white/70">74</span>
                <span className="text-white/20">· 3,247</span>
              </span>
            </div>
            <div className="ml-8 h-0.5 overflow-hidden rounded-full bg-white/6">
              <div className="h-full w-[100%] rounded-full bg-white/45" />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="w-5 text-right text-xs tabular-nums font-semibold text-white/20">2</span>
                <span className="font-semibold text-white/75">Android</span>
              </span>
              <span className="flex items-center gap-2 text-xs">
                <span className="font-bold text-white/70">58</span>
                <span className="text-white/20">· 2,104</span>
              </span>
            </div>
            <div className="ml-8 h-0.5 overflow-hidden rounded-full bg-white/6">
              <div className="h-full w-[78%] rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Empty States ─────────────────────────────────── */}
      <Section label="Empty States">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* No signal */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/2 px-5 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl font-black text-white/20">
              —
            </div>
            <div>
              <p className="font-medium text-white/40">No signal yet</p>
              <p className="mt-1 text-xs text-white/22">
                Be the first to vote and start building this signal.
              </p>
            </div>
            <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-88">
              Cast your signal →
            </button>
          </div>
          {/* No battles */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/6 bg-white/2 px-5 py-8 text-center">
            <p className="text-sm font-medium text-white/30">No battles yet</p>
            <p className="text-xs text-white/18">Run the Content Factory pipeline.</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Status Badges ────────────────────────────────── */}
      <Section label="Status Badges">
        <div className="flex flex-wrap gap-2">
          <Badge label="Internal" color="amber" />
          <Badge label="Active" color="emerald" />
          <Badge label="Draft" color="neutral" />
          <Badge label="Trending ↑" color="indigo" />
          <Badge label="Declining ↓" color="rose" />
          <Badge label="Stable →" color="neutral" />
        </div>
      </Section>

      <Divider />

      {/* ── Colors & Gradients ───────────────────────────── */}
      <Section label="Colors & Gradients">
        <div className="flex flex-col gap-3">
          {/* Background scale */}
          <div className="flex gap-2">
            {[
              { bg: "bg-[oklch(0.07_0.004_270)]", label: "bg" },
              { bg: "bg-[oklch(0.11_0.004_270)]", label: "sidebar" },
              { bg: "bg-[oklch(0.13_0.004_270)]", label: "card" },
              { bg: "bg-white/3", label: "surface" },
              { bg: "bg-white/6", label: "hover" },
              { bg: "bg-white/10", label: "input" },
              { bg: "bg-white/20", label: "subtle" },
            ].map(({ bg, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className={`h-10 w-10 rounded-xl border border-white/10 ${bg}`} />
                <span className="text-[9px] text-white/25">{label}</span>
              </div>
            ))}
          </div>

          {/* Battle gradients */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex h-20 items-end rounded-2xl bg-gradient-to-br from-indigo-950/80 via-indigo-900/40 to-transparent p-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Option A · Indigo</span>
            </div>
            <div className="flex h-20 items-end rounded-2xl bg-gradient-to-br from-rose-950/80 via-rose-900/40 to-transparent p-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Option B · Rose</span>
            </div>
          </div>

          {/* Accent colors (trend) */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 px-5 py-3">
            <span className="text-sm font-semibold text-emerald-400">↑ Rising</span>
            <span className="text-sm font-semibold text-rose-400">↓ Declining</span>
            <span className="text-sm font-semibold text-white/35">→ Stable</span>
            <span className="text-sm font-semibold text-indigo-400/80">Split A</span>
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Animation Classes ───────────────────────────── */}
      <Section label="Animation Classes">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-center">
          {[
            { cls: "vs-badge", label: "vs-badge", desc: "VS glow pulse" },
            { cls: "sheet-up", label: "sheet-up", desc: "Bottom sheet slide" },
            { cls: "confetti-dot", label: "confetti-dot", desc: "Confetti particle" },
            { cls: "fade-in-up", label: "fade-in-up", desc: "Fade + translate" },
          ].map(({ cls, label, desc }) => (
            <div key={cls} className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-3 py-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8 text-xs font-black ${cls === "vs-badge" ? cls : ""}`}>
                {cls === "vs-badge" ? "VS" : "·"}
              </div>
              <span className="text-[10px] font-semibold text-white/50">{label}</span>
              <span className="text-[10px] text-white/25">{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <div className="border-t border-white/8 pt-6">
        <p className="text-[10px] text-white/20">
          Internal showcase · Human Signal · not indexed · not linked in public nav
        </p>
      </div>
    </main>
  );
}

/* ── Sub-components ──────────────────────────────────── */

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</p>
      {children}
    </section>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/6" />;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-white/6 bg-white/2 px-5 py-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/22">{label}</p>
      {children}
    </div>
  );
}

function PageCard({
  href,
  label,
  sub,
  variant = "default",
}: {
  href: string;
  label: string;
  sub: string;
  variant?: "default" | "muted";
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1.5 rounded-2xl border border-white/8 bg-white/3 px-4 py-4 transition-all hover:border-white/16 hover:bg-white/6"
    >
      <span
        className={`text-sm font-semibold transition-colors group-hover:text-white ${
          variant === "muted" ? "text-white/40" : "text-white/80"
        }`}
      >
        {label}
      </span>
      <span className="text-[10px] leading-relaxed text-white/25">{sub}</span>
      <span className="mt-1 text-[10px] font-medium text-white/18 transition-colors group-hover:text-white/35">
        {href} →
      </span>
    </Link>
  );
}

function MiniStatDemo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/3 py-4">
      <p className="text-lg font-bold tabular-nums text-white/85">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/28">{label}</p>
    </div>
  );
}

function Badge({
  label,
  color,
}: {
  label: string;
  color: "amber" | "emerald" | "indigo" | "rose" | "neutral";
}) {
  const styles: Record<string, string> = {
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-400/80",
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400/80",
    indigo: "border-indigo-400/30 bg-indigo-400/10 text-indigo-400/80",
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-400/80",
    neutral: "border-white/12 bg-white/5 text-white/45",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${styles[color]}`}
    >
      {label}
    </span>
  );
}
