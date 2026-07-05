"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StudioBattle, StudioStatus, StudioEntry, StudioStore } from "@/types/studio";

const STORAGE_KEY = "opinion-platform:studio-status";

const STATUS_META: Record<StudioStatus, { label: string; cls: string }> = {
  draft:                 { label: "Draft",            cls: "border-white/12 bg-white/4 text-white/40"              },
  generated:             { label: "Generated",        cls: "border-indigo-400/30 bg-indigo-400/8 text-indigo-400/90"  },
  needs_review:          { label: "Needs Review",     cls: "border-amber-400/30 bg-amber-400/8 text-amber-300/90"    },
  approved:              { label: "Approved",         cls: "border-emerald-400/30 bg-emerald-400/8 text-emerald-400/90" },
  rejected:              { label: "Rejected",         cls: "border-rose-400/30 bg-rose-400/8 text-rose-400/90"       },
  publish_ready:         { label: "Publish Ready",    cls: "border-violet-400/30 bg-violet-400/8 text-violet-400/90"  },
  published_placeholder: { label: "Published ✓",      cls: "border-emerald-300/30 bg-emerald-300/8 text-emerald-300/90" },
};

type Tab = "tiktok" | "instagram" | "website";

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

export function BattlePreviewPanel({ battle }: { battle: StudioBattle }) {
  const [tab, setTab]           = useState<Tab>("tiktok");
  const [entry, setEntry]       = useState<StudioEntry | null>(null);
  const [mounted, setMounted]   = useState(false);
  const [published, setPublished] = useState(false);

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

  function handlePublishPlaceholder() {
    const now = new Date().toISOString();
    const newEntry: StudioEntry = {
      status: "published_placeholder",
      updatedAt: now,
      publishedAt: now,
    };
    setEntry(newEntry);
    saveEntry(battle.slug, newEntry);
    setPublished(true);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "tiktok",    label: "TikTok"    },
    { key: "instagram", label: "Instagram" },
    { key: "website",   label: "Website"   },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Pipeline status strip */}
      <PipelineStatusStrip battle={battle} />

      {/* Tab switcher */}
      <div className="flex gap-1 rounded-xl border border-white/8 bg-white/3 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
              tab === t.key
                ? "bg-white/10 text-white"
                : "text-white/35 hover:text-white/60"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "tiktok" && <TikTokTab battle={battle} />}
      {tab === "instagram" && <InstagramTab battle={battle} />}
      {tab === "website" && <WebsiteTab battle={battle} />}

      {/* Approval bar */}
      <div className="sticky bottom-4 rounded-2xl border border-white/10 bg-[oklch(0.13_0.004_270/0.95)] p-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Current status */}
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
              mounted ? meta.cls : "border-white/8 bg-white/3 text-white/25"
            )}
          >
            {mounted ? meta.label : "Loading…"}
          </span>

          {entry?.updatedAt && (
            <span className="text-xs text-white/25">
              Updated {new Date(entry.updatedAt).toLocaleString()}
            </span>
          )}

          <div className="ml-auto flex flex-wrap gap-2">
            <ApprovalButton
              label="Approve"
              active={status === "approved"}
              onClick={() => applyStatus("approved")}
              cls="border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-400"
            />
            <ApprovalButton
              label="Needs Changes"
              active={status === "needs_review"}
              onClick={() => applyStatus("needs_review")}
              cls="border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-300"
            />
            <ApprovalButton
              label="Reject"
              active={status === "rejected"}
              onClick={() => applyStatus("rejected")}
              cls="border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400"
            />
            <ApprovalButton
              label="Publish Ready"
              active={status === "publish_ready"}
              onClick={() => applyStatus("publish_ready")}
              cls="border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-400"
            />
          </div>
        </div>

        {/* Publish placeholder action */}
        {status === "publish_ready" && !published && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-400/5 px-4 py-3">
            <div className="flex-1">
              <p className="text-xs font-semibold text-violet-300/90">Ready to publish</p>
              <p className="mt-0.5 text-[11px] text-white/35">
                Manual publishing only in V1. API publishing requires TikTok/Instagram OAuth and platform approval.
              </p>
            </div>
            <button
              onClick={handlePublishPlaceholder}
              className="shrink-0 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-300 transition-all hover:bg-violet-400/20 active:scale-95"
            >
              Mark Published
            </button>
          </div>
        )}

        {status === "published_placeholder" && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
            <span className="text-emerald-400">✓</span>
            <div>
              <p className="text-xs font-semibold text-emerald-300/90">Marked as published</p>
              {entry?.publishedAt && (
                <p className="text-[11px] text-white/35">
                  {new Date(entry.publishedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab panels ────────────────────────────────────────────────────────────────

function TikTokTab({ battle }: { battle: StudioBattle }) {
  const t = battle.tiktok;
  const link = t?.battleLink ?? `/battle/${battle.slug}`;

  if (!t) {
    return (
      <MissingPackage
        platform="TikTok"
        hint={`node scripts/run-pipeline.ts ${battle.category.toLowerCase()}`}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
      {/* Vertical preview card */}
      <div className="mx-auto w-[140px] lg:mx-0 lg:w-[160px]">
        <VerticalCard battle={battle} link={link} />
        <p className="mt-2 text-center text-[10px] text-white/25">9:16 preview</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <ContentBlock label="Script" text={t.script} mono />
        <ContentBlock label="Caption" text={t.caption} />
        <ContentBlock label="Hashtags" text={t.hashtags} mono />
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Battle Link
          </p>
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="font-mono text-sm text-indigo-400/80 underline-offset-2 hover:underline"
          >
            {link}
          </Link>
        </div>
        {t.videoPrompt && (
          <ContentBlock label="Video Prompt (placeholder)" text={t.videoPrompt} dim />
        )}
      </div>
    </div>
  );
}

function InstagramTab({ battle }: { battle: StudioBattle }) {
  const caption  = battle.tiktok?.caption ?? battle.battleCaption;
  const hashtags = battle.tiktok?.hashtags ?? battle.battleHashtags;

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
      {/* Square preview card */}
      <div className="mx-auto w-[180px] lg:mx-0 lg:w-[200px]">
        <SquareCard battle={battle} />
        <p className="mt-2 text-center text-[10px] text-white/25">1:1 preview</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-amber-400/20 bg-amber-950/20 px-4 py-2.5 text-[11px] text-amber-300/70">
          No separate Instagram package in V1. Adapt TikTok content below for square format.
        </div>
        <ContentBlock label="Caption (adapted from TikTok)" text={caption} />
        <ContentBlock label="Hashtags" text={hashtags} mono />
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Battle Link
          </p>
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="font-mono text-sm text-indigo-400/80 underline-offset-2 hover:underline"
          >
            /battle/{battle.slug}
          </Link>
        </div>
      </div>
    </div>
  );
}

function WebsiteTab({ battle }: { battle: StudioBattle }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Mini battle card preview */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            {battle.category}
          </span>
          {battle.reviewScore !== null && (
            <span className="text-xs text-white/30">
              Score: {battle.reviewScore}/100
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex flex-1 flex-col items-center rounded-xl border border-indigo-400/20 bg-indigo-400/6 py-4">
            <p className="text-lg font-black text-white">{battle.subjectA}</p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4">
            <span className="text-[10px] font-bold text-white/40">VS</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-xl border border-rose-400/20 bg-rose-400/6 py-4">
            <p className="text-lg font-black text-white">{battle.subjectB}</p>
          </div>
        </div>
        <div className="border-t border-white/6 px-5 py-3">
          <Link
            href={`/battle/${battle.slug}`}
            target="_blank"
            className="text-sm text-indigo-400/80 underline-offset-2 hover:underline"
          >
            /battle/{battle.slug} ↗
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ContentBlock label="Page title" text={battle.title} />
        <ContentBlock
          label="Live URL"
          text={`/battle/${battle.slug}`}
          mono
        />
      </div>

      {battle.battleScript && (
        <ContentBlock label="Battle script" text={battle.battleScript} mono />
      )}
    </div>
  );
}

// ── Preview cards ─────────────────────────────────────────────────────────────

function VerticalCard({
  battle,
  link,
}: {
  battle: StudioBattle;
  link: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black"
      style={{ aspectRatio: "9/16" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-rose-950" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-white/30">
          {battle.category}
        </p>
        <p className="mt-1 text-sm font-black leading-tight text-white">
          {battle.subjectA}
        </p>
        <div className="my-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/8">
          <span className="text-[7px] font-bold text-white/50">VS</span>
        </div>
        <p className="text-sm font-black leading-tight text-white">
          {battle.subjectB}
        </p>
        <p className="mt-3 text-[7px] text-white/30">Pick a side →</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/8 bg-black/60 px-2 py-1.5 backdrop-blur-sm">
        <p className="truncate text-[7px] text-white/40">humansignal.com{link}</p>
      </div>
    </div>
  );
}

function SquareCard({ battle }: { battle: StudioBattle }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black"
      style={{ aspectRatio: "1/1" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-rose-950" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-widest text-white/30">
          {battle.category}
        </p>
        <p className="mt-2 text-base font-black text-white">{battle.subjectA}</p>
        <span className="my-0.5 text-[9px] text-white/30">VS</span>
        <p className="text-base font-black text-white">{battle.subjectB}</p>
        <p className="mt-3 text-[8px] text-white/40">humansignal.com/battle/{battle.slug}</p>
      </div>
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function ContentBlock({
  label,
  text,
  mono = false,
  dim = false,
}: {
  label: string;
  text: string | null | undefined;
  mono?: boolean;
  dim?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
      {text ? (
        <p
          className={cn(
            "whitespace-pre-wrap rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-sm leading-relaxed",
            mono ? "font-mono text-xs text-white/60" : "text-white/75",
            dim && "text-white/35"
          )}
        >
          {text}
        </p>
      ) : (
        <p className="text-sm text-white/20 italic">Not available</p>
      )}
    </div>
  );
}

function ApprovalButton({
  label,
  active,
  onClick,
  cls,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  cls: string;
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

// ── Pipeline status strip ─────────────────────────────────────────────────────

function PipelineStatusStrip({ battle }: { battle: StudioBattle }) {
  const { pipeline } = battle;

  const steps = [
    { label: "Planner",  done: true,                                   key: "planner"  },
    { label: "Designer", done: true,                                   key: "designer" },
    { label: "Reviewer", done: !!pipeline.reviewer,                    key: "reviewer" },
    { label: "Website",  done: pipeline.website?.status === "done",    key: "website"  },
    { label: "Publisher",done: pipeline.publisher?.status === "done",  key: "publisher"},
    { label: "TikTok",   done: battle.hasTikTokPackage,                key: "tiktok"   },
  ];

  return (
    <div className="rounded-2xl border border-white/6 bg-white/2 px-5 py-4">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/25">
        Agent Pipeline
      </p>
      <div className="flex items-start justify-between gap-2">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-1 flex-col items-center">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold",
                step.done
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
                  : "border-white/10 bg-white/4 text-white/25"
              )}
            >
              {step.done ? "✓" : "·"}
            </div>
            {i < steps.length - 1 && (
              <div className="absolute" />
            )}
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/30 text-center">
              {step.label}
            </p>
            {step.key === "reviewer" && (
              <>
                {battle.reviewScore !== null && (
                  <p className={cn(
                    "text-[9px] tabular-nums",
                    battle.reviewApproved ? "text-emerald-400/60" : "text-rose-400/60"
                  )}>
                    {battle.reviewScore}/100
                  </p>
                )}
                {pipeline.reviewer?.status && (
                  <p className="text-[8px] text-white/20">{pipeline.reviewer.status}</p>
                )}
              </>
            )}
            {step.key === "publisher" && pipeline.publisher?.status && (
              <p className="text-[8px] text-white/20">{pipeline.publisher.status}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MissingPackage({
  platform,
  hint,
}: {
  platform: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/2 py-12 text-center">
      <p className="text-sm font-semibold text-white/40">
        No {platform} package generated yet
      </p>
      <p className="text-xs text-white/25">Run the pipeline to generate publication packages:</p>
      <div className="rounded-xl border border-white/8 bg-black/20 px-4 py-2">
        <code className="font-mono text-xs text-emerald-400">{hint}</code>
      </div>
    </div>
  );
}
