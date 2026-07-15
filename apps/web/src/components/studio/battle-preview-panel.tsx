"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StudioBattle, StudioStatus, StudioEntry, StudioStore } from "@/types/studio";

const STORAGE_KEY = "opinion-platform:studio-status";

const STATUS_META: Record<StudioStatus, { label: string; cls: string }> = {
  draft:                 { label: "Draft",         cls: "border-white/12 bg-white/4 text-white/40"              },
  generated:             { label: "Generated",     cls: "border-indigo-400/30 bg-indigo-400/8 text-indigo-400/90"  },
  needs_review:          { label: "Needs Review",  cls: "border-amber-400/30 bg-amber-400/8 text-amber-300/90"    },
  approved:              { label: "Approved",      cls: "border-emerald-400/30 bg-emerald-400/8 text-emerald-400/90" },
  rejected:              { label: "Rejected",      cls: "border-rose-400/30 bg-rose-400/8 text-rose-400/90"       },
  publish_ready:         { label: "Publish Ready", cls: "border-violet-400/30 bg-violet-400/8 text-violet-400/90"  },
  published_placeholder: { label: "Published",     cls: "border-emerald-300/30 bg-emerald-300/8 text-emerald-300/90" },
};

type Tab = "flow" | "tiktok" | "instagram" | "website";

function loadEntry(slug: string): StudioEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const store: StudioStore = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return store[slug] ?? null;
  } catch { return null; }
}

function saveEntry(slug: string, entry: StudioEntry) {
  if (typeof window === "undefined") return;
  try {
    const store: StudioStore = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    store[slug] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

function defaultStatus(battle: StudioBattle): StudioStatus {
  if (battle.reviewApproved === true)  return "generated";
  if (battle.reviewApproved === false) return "needs_review";
  return "draft";
}

// ── Pipeline visualization ────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type PipelineNodeDef = {
  key: string;
  label: string;
  done: boolean;
  sub?: string;
  error?: boolean;
};

function BattlePipeline({ battle }: { battle: StudioBattle }) {
  const nodes: PipelineNodeDef[] = [
    { key: "planner",   label: "Planner",   done: true },
    { key: "creative",  label: "Creative",  done: true },
    {
      key: "reviewer",
      label: "Reviewer",
      done: !!battle.pipeline.reviewer || battle.reviewScore !== null,
      sub: battle.reviewScore !== null ? `${battle.reviewScore}/100` : undefined,
    },
    {
      key: "publisher",
      label: "Publisher",
      done: battle.pipeline.publisher?.status === "done" || battle.hasTikTokPackage,
    },
  ];

  const channels: PipelineNodeDef[] = [
    { key: "tiktok",    label: "TikTok",    done: battle.hasTikTokPackage },
    { key: "website",   label: "Website",   done: battle.hasPublishedPackage },
    { key: "instagram", label: "Instagram", done: false },
  ];

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/25">
        Agent Pipeline
      </p>
      <div className="flex items-start gap-0 overflow-x-auto">
        {nodes.map((node, i) => (
          <div key={node.key} className="flex items-start">
            <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
              <div className={cn(
                "w-9 h-9 rounded-xl border flex items-center justify-center transition-colors",
                node.done
                  ? "border-emerald-400/30 bg-emerald-400/8 text-emerald-400"
                  : "border-white/8 bg-white/[0.02] text-white/20"
              )}>
                {node.done ? <CheckIcon /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
              </div>
              <div className="text-center">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/35">{node.label}</p>
                {node.sub && (
                  <p className={cn(
                    "text-[9px] tabular-nums font-bold",
                    battle.reviewApproved ? "text-emerald-400/70" : "text-rose-400/70"
                  )}>
                    {node.sub}
                  </p>
                )}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center pt-4 shrink-0">
                <div className="w-4 h-px bg-white/10" />
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="text-white/15">
                  <path d="M1 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-2 h-px bg-white/10" />
              </div>
            )}
          </div>
        ))}

        {/* Fork */}
        <div className="flex items-center pt-4 shrink-0">
          <div className="w-4 h-px bg-white/8" />
          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="text-white/12">
            <path d="M1 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-1.5 pt-0.5 shrink-0">
          {channels.map(ch => (
            <div key={ch.key} className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2 py-1",
              ch.done
                ? "border-emerald-400/20 bg-emerald-400/6"
                : "border-white/6 bg-white/[0.01]"
            )}>
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                ch.done
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                  : "border-white/8 text-white/15"
              )}>
                {ch.done
                  ? <svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : <div className="w-1 h-1 rounded-full bg-current" />}
              </div>
              <span className={cn("text-[9px] font-semibold", ch.done ? "text-white/60" : "text-white/20")}>
                {ch.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Platform tabs ─────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "flow",      label: "Flow"      },
  { key: "tiktok",    label: "TikTok"    },
  { key: "instagram", label: "Instagram" },
  { key: "website",   label: "Website"   },
];

// ── Motivation Flow preview ────────────────────────────────────────────────────

function FlowStep({
  number, label, detail, experiment,
}: {
  number: number; label: string; detail: string; experiment?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/4 text-[10px] font-bold text-white/40">
        {number}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white/80">{label}</p>
          {experiment && (
            <span className="rounded-full border border-indigo-400/25 bg-indigo-400/8 px-2 py-0.5 text-[9px] font-semibold text-indigo-400/70">
              {experiment}
            </span>
          )}
        </div>
        <p className="text-xs text-white/35">{detail}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="ml-[11px] flex items-center">
      <div className="h-4 w-px bg-white/10" />
    </div>
  );
}

function FlowTab({ battle }: { battle: StudioBattle }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-xl border border-indigo-400/15 bg-indigo-400/5 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">Epic 2 — Signal Motivation Layer</p>
        <p className="mt-1 text-xs text-white/45">This preview shows the complete voter experience for this battle. Each experiment is labelled with its ID from the manifest.</p>
      </div>

      {/* Flow steps */}
      <div className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-white/25">Motivation Flow</p>
        <div className="flex flex-col">
          <FlowStep
            number={1}
            label="Pre-vote"
            detail={`"${battle.subjectA} vs ${battle.subjectB}" — category pill, two choice zones, VS badge`}
          />
          <FlowArrow />
          <FlowStep
            number={2}
            label="Curiosity hint"
            detail="'Results reveal after you vote' — surfaces information gap without showing direction"
            experiment="EXP-001"
          />
          <FlowArrow />
          <FlowStep
            number={3}
            label="Vote"
            detail="User taps their choice. Signal is cast immediately. No confirmation required."
          />
          <FlowArrow />
          <FlowStep
            number={4}
            label="Reveal"
            detail="Distribution bar + signal count. Majority or minority framing based on user's position."
            experiment="EXP-002"
          />
          <FlowArrow />
          <FlowStep
            number={5}
            label="Optional reason"
            detail="5 preset reasons + skip. Zero friction. No login. Stored locally."
            experiment="EXP-003"
          />
          <FlowArrow />
          <FlowStep
            number={6}
            label="Next battle"
            detail="Prominent CTA. Objective is continuity, not engagement maximisation."
            experiment="EXP-004"
          />
        </div>
      </div>

      {/* Battle-specific wording preview */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25">Wording Preview — this battle</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Majority copy",  text: `Your view — shared by X%.` },
            { label: "Minority copy",  text: `A distinctive signal — you're in the X% on this one.` },
            { label: "Reason prompt",  text: "What shaped your view?" },
            { label: "Next CTA",       text: "Next battle →" },
          ].map(({ label, text }) => (
            <div key={label} className="flex flex-col gap-1 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-white/25">{label}</p>
              <p className="text-xs text-white/55 italic">&ldquo;{text}&rdquo;</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/20">All copy is configurable in <code className="font-mono text-white/30">lib/wording-config.ts</code></p>
      </div>

      {/* Live link */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Live Battle</p>
        <Link
          href={`/battle/${battle.slug}`}
          target="_blank"
          className="font-mono text-sm text-indigo-400/80 transition-colors hover:text-indigo-400 hover:underline underline-offset-2"
        >
          /battle/{battle.slug} ↗
        </Link>
      </div>
    </div>
  );
}

// ── TikTok preview ────────────────────────────────────────────────────────────

function TikTokPhone({ battle }: { battle: StudioBattle }) {
  const t = battle.tiktok;
  return (
    <div className="relative mx-auto w-[160px] overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl" style={{ aspectRatio: "9/16" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.04_270)] via-black to-[oklch(0.12_0.04_20)]" />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest">Human Signal</span>
        <span className="text-[7px] text-white/30">Live</span>
      </div>

      {/* Battle content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-white/35">{battle.category}</p>
        <p className="text-base font-black leading-tight text-white">{battle.subjectA}</p>
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-[8px] font-black text-white/40">VS</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>
        <p className="text-base font-black leading-tight text-white">{battle.subjectB}</p>
        <p className="mt-1 text-[7px] text-white/30">Pick a side →</p>
      </div>

      {/* Caption overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent px-3 pt-8 pb-3">
        {t?.caption && (
          <p className="text-[7px] text-white/75 leading-relaxed line-clamp-3">{t.caption}</p>
        )}
        {t?.hashtags && (
          <p className="mt-1 text-[6px] text-white/35 truncate">{t.hashtags?.split(" ").slice(0, 4).join(" ")}</p>
        )}
      </div>

      {/* Right side actions */}
      <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3">
        {[["♥", "Like"], ["💬", "Comment"], ["↗", "Share"]].map(([icon, lbl]) => (
          <div key={lbl} className="flex flex-col items-center gap-0.5">
            <div className="w-6 h-6 rounded-full border border-white/10 bg-white/8 flex items-center justify-center">
              <span className="text-[8px] text-white/50">{icon}</span>
            </div>
            <span className="text-[6px] text-white/25">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TikTokTab({ battle }: { battle: StudioBattle }) {
  const t    = battle.tiktok;
  const link = t?.battleLink ?? `/battle/${battle.slug}`;

  if (!t) return <MissingPackage platform="TikTok" category={battle.category.toLowerCase()} />;

  return (
    <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
      <div className="flex flex-col items-center gap-2">
        <TikTokPhone battle={battle} />
        <p className="text-[10px] text-white/25">9:16 preview</p>
      </div>

      <div className="flex flex-col gap-5">
        <ContentBlock label="Caption" text={t.caption} />
        <ContentBlock label="Script" text={t.script} mono />
        <ContentBlock label="Hashtags" text={t.hashtags} mono />
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Battle Link</p>
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="font-mono text-sm text-indigo-400/80 hover:text-indigo-400 transition-colors underline-offset-2 hover:underline"
          >
            {link}
          </Link>
        </div>
        {t.videoPrompt && (
          <ContentBlock label="Video Prompt" text={t.videoPrompt} dim />
        )}
      </div>
    </div>
  );
}

// ── Instagram preview ─────────────────────────────────────────────────────────

function InstagramSquare({ battle }: { battle: StudioBattle }) {
  return (
    <div className="relative mx-auto w-[160px] overflow-hidden rounded-2xl border border-white/10 bg-black" style={{ aspectRatio: "1/1" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.04_270)] via-black to-[oklch(0.12_0.04_20)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-white/35">{battle.category}</p>
        <p className="text-sm font-black text-white leading-tight">{battle.subjectA}</p>
        <span className="text-[8px] font-black text-white/35">VS</span>
        <p className="text-sm font-black text-white leading-tight">{battle.subjectB}</p>
        <p className="mt-1 text-[7px] text-white/30">humansignal.com/battle/{battle.slug}</p>
      </div>
    </div>
  );
}

function InstagramTab({ battle }: { battle: StudioBattle }) {
  const caption  = battle.tiktok?.caption ?? battle.battleCaption;
  const hashtags = battle.tiktok?.hashtags ?? battle.battleHashtags;

  return (
    <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
      <div className="flex flex-col items-center gap-2">
        <InstagramSquare battle={battle} />
        <p className="text-[10px] text-white/25">1:1 preview</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-amber-400/15 bg-amber-950/15 px-4 py-2.5 text-[11px] text-amber-300/60">
          No separate Instagram package in V1. Adapt TikTok content for square format.
        </div>
        <ContentBlock label="Caption" text={caption} />
        <ContentBlock label="Hashtags" text={hashtags} mono />
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Battle Link</p>
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="font-mono text-sm text-indigo-400/80 hover:text-indigo-400 transition-colors underline-offset-2 hover:underline"
          >
            /battle/{battle.slug}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Website preview ───────────────────────────────────────────────────────────

function WebsiteTab({ battle }: { battle: StudioBattle }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Battle card preview */}
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-3 bg-white/[0.02]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{battle.category}</span>
          {battle.reviewScore !== null && (
            <span className="text-xs text-white/25">Reviewer: {battle.reviewScore}/100</span>
          )}
        </div>
        <div className="flex items-center gap-3 px-5 py-6 bg-white/[0.01]">
          <div className="flex flex-1 flex-col items-center rounded-xl border border-indigo-400/15 bg-indigo-400/5 py-5">
            <p className="text-lg font-black text-white">{battle.subjectA}</p>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <span className="text-[10px] font-bold text-white/35">VS</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-xl border border-rose-400/15 bg-rose-400/5 py-5">
            <p className="text-lg font-black text-white">{battle.subjectB}</p>
          </div>
        </div>
        <div className="border-t border-white/6 bg-white/[0.02] px-5 py-3">
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="text-sm text-indigo-400/75 hover:text-indigo-400 transition-colors underline-offset-2 hover:underline"
          >
            /battle/{battle.slug} ↗
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ContentBlock label="Page Title" text={battle.title} />
        <ContentBlock label="Live URL"   text={`/battle/${battle.slug}`} mono />
      </div>

      {battle.battleScript && (
        <ContentBlock label="Battle Script" text={battle.battleScript} mono />
      )}
    </div>
  );
}

// ── Analytics placeholder ─────────────────────────────────────────────────────

function Analytics() {
  const metrics = [
    { label: "Views",          value: "—" },
    { label: "Votes",          value: "—" },
    { label: "CTR",            value: "—" },
    { label: "Human Signals",  value: "—" },
  ];
  return (
    <section>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/25">Analytics</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(m => (
          <div key={m.label} className="rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4">
            <p className="text-xl font-black text-white/15 tabular-nums">{m.value}</p>
            <p className="mt-1 text-[10px] text-white/25 uppercase tracking-widest">{m.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-white/18 text-center">
        Live metrics require platform API connections — coming in a future release.
      </p>
    </section>
  );
}

// ── Shared components ─────────────────────────────────────────────────────────

function ContentBlock({
  label, text, mono = false, dim = false,
}: {
  label: string; text: string | null | undefined; mono?: boolean; dim?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
      {text ? (
        <p className={cn(
          "whitespace-pre-wrap rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed",
          mono ? "font-mono text-xs text-white/55" : "text-white/70",
          dim && "text-white/30"
        )}>
          {text}
        </p>
      ) : (
        <p className="text-sm text-white/20 italic">Not available</p>
      )}
    </div>
  );
}

function MissingPackage({ platform, category }: { platform: string; category: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.01] py-14 text-center">
      <p className="text-sm font-semibold text-white/35">No {platform} package generated yet</p>
      <p className="text-xs text-white/20">Run the pipeline to generate publication packages:</p>
      <div className="rounded-xl border border-white/8 bg-black/20 px-4 py-2.5">
        <code className="font-mono text-xs text-emerald-400">
          PLANNER_MODE=local-llm node scripts/run-pipeline.ts {category}
        </code>
      </div>
    </div>
  );
}

function ApprovalBtn({
  label, active, onClick, cls,
}: {
  label: string; active: boolean; onClick: () => void; cls: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95",
        active
          ? cn("scale-[1.02]", cls.replace("hover:", ""))
          : cn("border-white/10 text-white/40", cls)
      )}
    >
      {label}
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function BattlePreviewPanel({ battle }: { battle: StudioBattle }) {
  const [tab, setTab]           = useState<Tab>("flow");
  const [entry, setEntry]       = useState<StudioEntry | null>(null);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setEntry(loadEntry(battle.slug));
    setMounted(true);
  }, [battle.slug]);

  const status: StudioStatus = entry?.status ?? defaultStatus(battle);
  const meta = STATUS_META[status];

  function applyStatus(next: StudioStatus) {
    const newEntry: StudioEntry = {
      status: next,
      updatedAt: new Date().toISOString(),
      ...(entry?.publishedAt ? { publishedAt: entry.publishedAt } : {}),
    };
    setEntry(newEntry);
    saveEntry(battle.slug, newEntry);
  }

  function handlePublish() {
    const now = new Date().toISOString();
    const newEntry: StudioEntry = { status: "published_placeholder", updatedAt: now, publishedAt: now };
    setEntry(newEntry);
    saveEntry(battle.slug, newEntry);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Pipeline */}
      <BattlePipeline battle={battle} />

      {/* Platform tabs */}
      <div>
        <div className="flex gap-1 rounded-xl border border-white/8 bg-white/[0.02] p-1 mb-7">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                tab === t.key
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/35 hover:text-white/60"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "flow"      && <FlowTab      battle={battle} />}
        {tab === "tiktok"    && <TikTokTab    battle={battle} />}
        {tab === "instagram" && <InstagramTab battle={battle} />}
        {tab === "website"   && <WebsiteTab   battle={battle} />}
      </div>

      {/* Analytics */}
      <Analytics />

      {/* Approval bar */}
      <div className="sticky bottom-4 rounded-2xl border border-white/10 bg-[oklch(0.11_0.004_270/0.96)] px-5 py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Current status + timestamp */}
          <div className="flex items-center gap-3">
            <span className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
              mounted ? meta.cls : "border-white/8 bg-white/3 text-white/25"
            )}>
              {mounted ? meta.label : "Loading…"}
            </span>
            {entry?.updatedAt && (
              <span className="text-[11px] text-white/20">
                {new Date(entry.updatedAt).toLocaleString()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="ml-auto flex flex-wrap gap-2">
            <ApprovalBtn
              label="Approve"
              active={status === "approved"}
              onClick={() => applyStatus("approved")}
              cls="border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-400"
            />
            <ApprovalBtn
              label="Needs Changes"
              active={status === "needs_review"}
              onClick={() => applyStatus("needs_review")}
              cls="border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-300"
            />
            <ApprovalBtn
              label="Reject"
              active={status === "rejected"}
              onClick={() => applyStatus("rejected")}
              cls="border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400"
            />
            <ApprovalBtn
              label="Publish Ready"
              active={status === "publish_ready"}
              onClick={() => applyStatus("publish_ready")}
              cls="border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-400"
            />
            <button
              onClick={() => {}}
              title="Regenerate — calls the Creative Agent (coming soon)"
              className="rounded-xl border border-white/8 px-3 py-1.5 text-xs text-white/25 transition-colors hover:text-white/40 cursor-not-allowed"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Publish action */}
        {status === "publish_ready" && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-400/5 px-4 py-3">
            <div className="flex-1">
              <p className="text-xs font-semibold text-violet-300/90">Ready to publish</p>
              <p className="mt-0.5 text-[11px] text-white/30">
                Manual publishing only in V1. API publishing requires platform OAuth and approval.
              </p>
            </div>
            <button
              onClick={handlePublish}
              className="shrink-0 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-300 transition-all hover:bg-violet-400/20 active:scale-95"
            >
              Mark Published
            </button>
          </div>
        )}

        {status === "published_placeholder" && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-emerald-400">
                <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-300/90">Marked as published</p>
              {entry?.publishedAt && (
                <p className="text-[11px] text-white/30">{new Date(entry.publishedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
