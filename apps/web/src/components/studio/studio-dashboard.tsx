"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StudioBattle, StudioStatus, StudioStore, StudioStats } from "@/types/studio";

const STORAGE_KEY = "opinion-platform:studio-status";

const CATALOG_CATEGORIES = [
  { label: "Technology",    slug: "technology"    },
  { label: "Lifestyle",     slug: "lifestyle"     },
  { label: "Entertainment", slug: "entertainment" },
  { label: "Pop Culture",   slug: "pop-culture"   },
  { label: "Food",          slug: "food"          },
];

const STATUS_META: Record<StudioStatus, { label: string; cls: string }> = {
  draft:                 { label: "Draft",         cls: "border-white/12 bg-white/4 text-white/40"              },
  generated:             { label: "Generated",     cls: "border-indigo-400/30 bg-indigo-400/8 text-indigo-400/90"  },
  needs_review:          { label: "Needs Review",  cls: "border-amber-400/30 bg-amber-400/8 text-amber-300/90"    },
  approved:              { label: "Approved",      cls: "border-emerald-400/30 bg-emerald-400/8 text-emerald-400/90" },
  rejected:              { label: "Rejected",      cls: "border-rose-400/30 bg-rose-400/8 text-rose-400/90"       },
  publish_ready:         { label: "Publish Ready", cls: "border-violet-400/30 bg-violet-400/8 text-violet-400/90"  },
  published_placeholder: { label: "Published",     cls: "border-emerald-300/30 bg-emerald-300/8 text-emerald-300/90" },
};

function defaultStatus(battle: StudioBattle): StudioStatus {
  if (battle.reviewApproved === true)  return "generated";
  if (battle.reviewApproved === false) return "needs_review";
  return "draft";
}

// ── Shared ───────────────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">{eyebrow}</p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">{title}</h2>
      </div>
      {right}
    </div>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ size = 6 }: { size?: number }) {
  return (
    <svg width={size} height={size * (10 / 6)} viewBox="0 0 6 10" fill="none">
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Stat Pill ─────────────────────────────────────────────────────────────────

function StatPill({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className={cn("text-base font-bold tabular-nums leading-none", accent ?? "text-white/60")}>
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-widest text-white/20">{label}</span>
    </div>
  );
}

// ── Generate Card ─────────────────────────────────────────────────────────────

function GenerateCard() {
  const [category, setCategory] = useState(CATALOG_CATEGORIES[0].slug);
  const [showCmd, setShowCmd]   = useState(false);
  const [copied, setCopied]     = useState(false);

  const cmd = `PLANNER_MODE=local-llm node scripts/run-pipeline.ts ${category}`;

  function handleCopy() {
    navigator.clipboard.writeText(cmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 lg:p-10">
      <div className="flex flex-col gap-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Primary Action</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Generate New Battles
          </h2>
          <p className="mt-1.5 text-sm text-white/40">
            Initiate the full AI production pipeline for a new category.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setShowCmd(false); }}
              className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-white/25 transition-colors"
            >
              {CATALOG_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-[#0d0d0f]">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCmd(true)}
            className="h-11 flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/8 px-6 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/12 active:scale-95"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Generate
          </button>

          <Link
            href="/studio"
            className="h-11 flex items-center rounded-xl border border-white/8 px-4 text-sm text-white/35 transition-colors hover:text-white/60"
          >
            Refresh
          </Link>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-white/25">
          <span>Model: <span className="text-white/45">Qwen 2.5 7B</span></span>
          <span>·</span>
          <span>Mode: <span className="text-white/45">local-llm</span></span>
          <span>·</span>
          <span>Output: <span className="text-white/45">~10 battle pairs per run</span></span>
        </div>

        {showCmd && (
          <div className="rounded-2xl border border-white/8 bg-black/30 p-5">
            <p className="mb-3 text-xs font-medium text-amber-300/70">
              Run in your terminal, then click Refresh:
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/30 px-4 py-3">
              <code className="flex-1 font-mono text-sm text-emerald-400 break-all">{cmd}</code>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-2.5 text-[11px] text-white/20">
              Generates Planner proposals, Battle Packages, and publication assets for all pairs in the category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ── AI Factory ────────────────────────────────────────────────────────────────

type PipelineStep = {
  id: string;
  label: string;
  sublabel: string;
  count: number;
  total: number;
  score?: number | null;
};

function PipelineNode({ step, isLast }: { step: PipelineStep; isLast?: boolean }) {
  const active = step.count > 0;
  const pct    = step.total > 0 ? Math.round((step.count / step.total) * 100) : 0;

  return (
    <div className={cn("flex flex-col items-center gap-2.5 px-3 min-w-[80px]", isLast && "opacity-40")}>
      <div className={cn(
        "w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors",
        active
          ? "border-emerald-400/30 bg-emerald-400/8 text-emerald-400"
          : "border-white/8 bg-white/[0.02] text-white/20"
      )}>
        {active
          ? <CheckIcon size={14} />
          : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
      </div>

      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 leading-tight">
          {step.label}
        </p>
        <p className={cn(
          "text-2xl font-black tabular-nums leading-tight mt-0.5",
          active ? "text-white" : "text-white/15"
        )}>
          {step.count}
        </p>
        {step.score != null && (
          <p className={cn(
            "text-[10px] tabular-nums leading-none",
            step.score >= 80 ? "text-emerald-400/60" : "text-amber-400/60"
          )}>
            avg {step.score}/100
          </p>
        )}
        <p className="text-[9px] text-white/20 mt-0.5 leading-tight max-w-[70px] mx-auto">
          {step.sublabel}
        </p>
      </div>

      <div className="w-full max-w-[56px] h-0.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", active ? "bg-emerald-400/35" : "")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ChannelNode({ label, count }: { label: string; count: number }) {
  const active = count > 0;
  return (
    <div className={cn(
      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors",
      active
        ? "border-emerald-400/20 bg-emerald-400/6"
        : "border-white/6 bg-white/[0.01]"
    )}>
      <div className={cn(
        "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0",
        active
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
          : "border-white/8 text-white/15"
      )}>
        {active ? <CheckIcon size={10} /> : <div className="w-1 h-1 rounded-full bg-current" />}
      </div>
      <div>
        <p className={cn("text-[11px] font-semibold", active ? "text-white/70" : "text-white/25")}>{label}</p>
        <p className={cn("text-xs font-bold tabular-nums leading-none", active ? "text-white" : "text-white/15")}>
          {count}
        </p>
      </div>
    </div>
  );
}

function AIFactory({ stats }: { stats: StudioStats }) {
  const linear: PipelineStep[] = [
    { id: "planner",   label: "Planner",   sublabel: "Pairs proposed",   count: stats.total,     total: stats.total },
    { id: "creative",  label: "Creative",  sublabel: "Packages built",   count: stats.total,     total: stats.total },
    { id: "reviewer",  label: "Reviewer",  sublabel: "Reviews complete", count: stats.reviewed,  total: stats.total, score: stats.avgScore },
    { id: "publisher", label: "Publisher", sublabel: "Assets packaged",  count: stats.withTikTok, total: stats.total },
  ];

  const channels = [
    { label: "TikTok",    count: stats.withTikTok   },
    { label: "Website",   count: stats.withPublished },
    { label: "Instagram", count: 0                   },
  ];

  return (
    <section>
      <SectionHeader
        eyebrow="AI Factory"
        title="Production Pipeline"
        right={
          <span className="text-xs text-white/20 tabular-nums">
            {stats.total} battle{stats.total !== 1 ? "s" : ""} in system
          </span>
        }
      />

      <div className="rounded-3xl border border-white/8 bg-white/[0.015] px-8 py-8">
        <div className="flex items-start gap-0 overflow-x-auto">
          {linear.map((step, i) => (
            <Fragment key={step.id}>
              <PipelineNode step={step} />
              {i < linear.length - 1 && (
                <div className="flex items-start pt-6 shrink-0">
                  <div className="w-6 h-px bg-white/10 mt-[22px]" />
                  <ChevronRight />
                  <div className="w-2 h-px bg-white/10 mt-[22px]" />
                </div>
              )}
            </Fragment>
          ))}

          {/* Fork to channels */}
          <div className="flex items-start pt-6 shrink-0">
            <div className="w-6 h-px bg-white/8 mt-[22px]" />
            <ChevronRight />
            <div className="w-3 h-px bg-white/8 mt-[22px]" />
          </div>

          {/* Channel outputs */}
          <div className="flex flex-col gap-2 pt-2 shrink-0">
            {channels.map(ch => (
              <ChannelNode key={ch.label} label={ch.label} count={ch.count} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Production Queue ──────────────────────────────────────────────────────────

type FilterKey = "all" | StudioStatus;

function ChannelBadge({ label, ready }: { label: string; ready: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none",
      ready
        ? "border-emerald-400/20 bg-emerald-400/6 text-emerald-400/80"
        : "border-white/6 bg-white/[0.02] text-white/20"
    )}>
      {label}
      <span>{ready ? "✓" : "○"}</span>
    </span>
  );
}

function BattleCard({
  battle,
  status,
  mounted,
}: {
  battle: StudioBattle;
  status: StudioStatus;
  mounted: boolean;
}) {
  const meta = STATUS_META[status];

  return (
    <Link href={`/studio/${battle.slug}`} className="group block h-full">
      <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all hover:border-white/14 hover:bg-white/[0.04] cursor-pointer">
        {/* Score + title */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white/90 leading-tight">{battle.subjectA}</p>
            <p className="text-[11px] text-white/28 mt-0.5">vs {battle.subjectB}</p>
          </div>
          {battle.reviewScore !== null && (
            <div className="shrink-0 text-right">
              <p className={cn(
                "text-xl font-black tabular-nums leading-none",
                battle.reviewApproved ? "text-emerald-400/90" : "text-rose-400/80"
              )}>
                {battle.reviewScore}
              </p>
              <p className="text-[9px] text-white/20 mt-0.5">/ 100</p>
            </div>
          )}
        </div>

        {/* Category */}
        <p className="text-[10px] uppercase tracking-widest text-white/22">{battle.category}</p>

        {/* Channel status */}
        <div className="flex flex-wrap gap-1.5">
          <ChannelBadge label="TikTok"    ready={battle.hasTikTokPackage} />
          <ChannelBadge label="Website"   ready={battle.hasPublishedPackage} />
          <ChannelBadge label="Instagram" ready={false} />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-1">
          {mounted ? (
            <span className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              meta.cls
            )}>
              {meta.label}
            </span>
          ) : (
            <span className="h-4 w-14 rounded-full bg-white/5 animate-pulse" />
          )}
          <span className="text-white/15 transition-colors group-hover:text-white/40 text-sm">→</span>
        </div>
      </div>
    </Link>
  );
}

const FILTER_DEFS: { key: FilterKey; label: string }[] = [
  { key: "all",                  label: "All"           },
  { key: "needs_review",         label: "Needs Review"  },
  { key: "approved",             label: "Approved"      },
  { key: "publish_ready",        label: "Ready"         },
  { key: "published_placeholder",label: "Published"     },
  { key: "rejected",             label: "Rejected"      },
  { key: "draft",                label: "Draft"         },
];

function ProductionQueue({
  battles,
  mounted,
  getStatus,
}: {
  battles: StudioBattle[];
  mounted: boolean;
  getStatus: (b: StudioBattle) => StudioStatus;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const counts = FILTER_DEFS.reduce<Record<FilterKey, number>>((acc, f) => {
    acc[f.key] = f.key === "all"
      ? battles.length
      : battles.filter(b => getStatus(b) === f.key).length;
    return acc;
  }, {} as Record<FilterKey, number>);

  const filtered = filter === "all"
    ? battles
    : battles.filter(b => getStatus(b) === filter);

  return (
    <section>
      <SectionHeader
        eyebrow="Production Queue"
        title="Battle Queue"
        right={
          <span className="text-xs text-white/20 tabular-nums">{filtered.length} battles</span>
        }
      />

      {/* Filter tabs */}
      {mounted && battles.length > 0 && (
        <div className="mb-5 flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {FILTER_DEFS.map(f => {
            const count  = counts[f.key] ?? 0;
            if (f.key !== "all" && count === 0) return null;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/35 hover:bg-white/5 hover:text-white/60"
                )}
              >
                {f.label}
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                  active ? "bg-white/15 text-white/70" : "bg-white/8 text-white/30"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {battles.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/6 bg-white/[0.01] py-12 text-center">
          <p className="text-sm text-white/30">No battles match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(battle => (
            <BattleCard
              key={battle.slug}
              battle={battle}
              status={getStatus(battle)}
              mounted={mounted}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/6 bg-white/[0.01] py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/20">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-white/50">No battles generated yet</p>
        <p className="mt-1.5 text-xs text-white/25 max-w-[280px] mx-auto leading-relaxed">
          Select a category above and click Generate to initiate the AI production pipeline.
        </p>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function StudioDashboard({
  battles,
  stats,
}: {
  battles: StudioBattle[];
  stats: StudioStats;
}) {
  const [store, setStore]     = useState<StudioStore>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try { setStore(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")); } catch {}
    setMounted(true);
  }, []);

  const getStatus = useCallback(
    (battle: StudioBattle): StudioStatus =>
      store[battle.slug]?.status ?? defaultStatus(battle),
    [store]
  );

  // Client stats (localStorage-dependent)
  const cNeedsReview  = mounted ? battles.filter(b => getStatus(b) === "needs_review").length  : null;
  const cApproved     = mounted ? battles.filter(b => getStatus(b) === "approved").length      : null;
  const cPublishReady = mounted ? battles.filter(b => getStatus(b) === "publish_ready").length : null;
  const cPublished    = mounted ? battles.filter(b => getStatus(b) === "published_placeholder").length : null;

  return (
    <div className="flex flex-col gap-14">
      {/* Stats row */}
      <div className="flex items-center justify-end gap-6 flex-wrap">
        <StatPill label="Generated" value={stats.total} />
        {mounted && cNeedsReview !== null && cNeedsReview > 0 && (
          <StatPill label="Needs Review" value={cNeedsReview} accent="text-amber-400" />
        )}
        {mounted && cApproved !== null && cApproved > 0 && (
          <StatPill label="Approved" value={cApproved} accent="text-emerald-400" />
        )}
        {mounted && cPublishReady !== null && cPublishReady > 0 && (
          <StatPill label="Ready" value={cPublishReady} accent="text-violet-400" />
        )}
        {mounted && cPublished !== null && cPublished > 0 && (
          <StatPill label="Published" value={cPublished} accent="text-indigo-400" />
        )}
        {stats.avgScore !== null && (
          <StatPill label="Avg Score" value={`${stats.avgScore}/100`} accent="text-white/80" />
        )}
      </div>

      <GenerateCard />
      <AIFactory stats={stats} />
      <ProductionQueue battles={battles} mounted={mounted} getStatus={getStatus} />
    </div>
  );
}
