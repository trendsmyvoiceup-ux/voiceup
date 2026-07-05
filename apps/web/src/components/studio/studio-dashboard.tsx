"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StudioBattle, StudioStatus, StudioStore } from "@/types/studio";

const STORAGE_KEY = "opinion-platform:studio-status";

const CATALOG_CATEGORIES = [
  { label: "Technology",    slug: "technology"    },
  { label: "Lifestyle",     slug: "lifestyle"     },
  { label: "Entertainment", slug: "entertainment" },
  { label: "Pop Culture",   slug: "pop-culture"   },
  { label: "Food",          slug: "food"          },
];

const STATUS_META: Record<StudioStatus, { label: string; cls: string }> = {
  draft:                 { label: "Draft",            cls: "border-white/12 bg-white/4 text-white/40"           },
  generated:             { label: "Generated",        cls: "border-indigo-400/30 bg-indigo-400/8 text-indigo-400/90"  },
  needs_review:          { label: "Needs Review",     cls: "border-amber-400/30 bg-amber-400/8 text-amber-300/90"    },
  approved:              { label: "Approved",         cls: "border-emerald-400/30 bg-emerald-400/8 text-emerald-400/90" },
  rejected:              { label: "Rejected",         cls: "border-rose-400/30 bg-rose-400/8 text-rose-400/90"       },
  publish_ready:         { label: "Publish Ready",    cls: "border-violet-400/30 bg-violet-400/8 text-violet-400/90"  },
  published_placeholder: { label: "Published ✓",      cls: "border-emerald-300/30 bg-emerald-300/8 text-emerald-300/90" },
};

function defaultStatus(battle: StudioBattle): StudioStatus {
  if (battle.reviewApproved === true)  return "generated";
  if (battle.reviewApproved === false) return "needs_review";
  return "draft";
}

function loadStore(): StudioStore {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"); }
  catch { return {}; }
}

type FilterKey = "all" | StudioStatus;

export function StudioDashboard({ battles }: { battles: StudioBattle[] }) {
  const [store, setStore]         = useState<StudioStore>({});
  const [mounted, setMounted]     = useState(false);
  const [category, setCategory]   = useState(CATALOG_CATEGORIES[0].slug);
  const [showCmd, setShowCmd]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const [filter, setFilter]       = useState<FilterKey>("all");

  useEffect(() => {
    setStore(loadStore());
    setMounted(true);
  }, []);

  const getStatus = useCallback(
    (battle: StudioBattle): StudioStatus =>
      store[battle.slug]?.status ?? defaultStatus(battle),
    [store]
  );

  const cmd = `node scripts/run-pipeline.ts ${category}`;

  function handleCopy() {
    navigator.clipboard.writeText(cmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filtered = battles.filter((b) => {
    if (filter === "all") return true;
    return getStatus(b) === filter;
  });

  const counts = {
    all:                 battles.length,
    draft:               battles.filter((b) => getStatus(b) === "draft").length,
    generated:           battles.filter((b) => getStatus(b) === "generated").length,
    needs_review:        battles.filter((b) => getStatus(b) === "needs_review").length,
    approved:            battles.filter((b) => getStatus(b) === "approved").length,
    rejected:            battles.filter((b) => getStatus(b) === "rejected").length,
    publish_ready:       battles.filter((b) => getStatus(b) === "publish_ready").length,
    published_placeholder: battles.filter((b) => getStatus(b) === "published_placeholder").length,
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Generate section */}
      <section className="rounded-2xl border border-white/8 bg-white/3 p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-white/35">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setShowCmd(false); }}
              className="rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
            >
              {CATALOG_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-[#111]">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCmd(true)}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 transition-all hover:border-white/25 hover:bg-white/12 active:scale-95"
          >
            <span>⚡</span>
            Generate Battles
          </button>

          <Link
            href="/studio"
            className="rounded-xl border border-white/8 px-4 py-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            ↺ Refresh
          </Link>
        </div>

        {showCmd && (
          <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="mb-2 text-xs font-medium text-amber-300/80">
              Run this command in your terminal, then click Refresh:
            </p>
            <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-black/30 px-4 py-2.5">
              <code className="flex-1 font-mono text-sm text-emerald-400">{cmd}</code>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-white/25">
              This generates Battle Packages + TikTok publication packages for the selected category.
            </p>
          </div>
        )}
      </section>

      {/* Stats strip */}
      {mounted && battles.length > 0 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {(["all", "generated", "approved", "publish_ready", "published_placeholder", "needs_review", "rejected"] as FilterKey[]).map((key) => {
            const count = counts[key as keyof typeof counts] ?? 0;
            const meta  = key === "all" ? null : STATUS_META[key as StudioStatus];
            const isActive = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "flex flex-col items-center rounded-xl border px-2 py-2.5 text-center transition-all",
                  isActive
                    ? "border-white/20 bg-white/8"
                    : "border-white/6 bg-white/2 opacity-60 hover:opacity-90"
                )}
              >
                <span className="text-lg font-bold text-white">{count}</span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/40">
                  {key === "all" ? "All" : meta?.label ?? key}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Battle queue */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/35">
            Battle Queue
          </h2>
          <span className="text-xs text-white/25">{filtered.length} battles</span>
        </div>

        {!mounted ? (
          <div className="rounded-2xl border border-white/6 bg-white/2 py-10 text-center text-sm text-white/25">
            Loading…
          </div>
        ) : battles.length === 0 ? (
          <EmptyQueue />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/6 bg-white/2 py-10 text-center text-sm text-white/25">
            No battles match this filter.
          </div>
        ) : (
          <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/8">
            {filtered.map((battle) => (
              <BattleQueueRow
                key={battle.slug}
                battle={battle}
                status={getStatus(battle)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function BattleQueueRow({
  battle,
  status,
}: {
  battle: StudioBattle;
  status: StudioStatus;
}) {
  const meta = STATUS_META[status];

  return (
    <Link
      href={`/studio/${battle.slug}`}
      className="flex items-center gap-4 bg-white/2 px-5 py-4 transition-colors hover:bg-white/5"
    >
      {/* Title + category */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white/90">{battle.title}</p>
        <p className="mt-0.5 text-xs text-white/30">{battle.category}</p>
      </div>

      {/* Review score */}
      <div className="shrink-0 text-right">
        {battle.reviewScore !== null ? (
          <span
            className={cn(
              "text-sm font-bold tabular-nums",
              battle.reviewApproved ? "text-emerald-400/70" : "text-rose-400/70"
            )}
          >
            {battle.reviewScore}
          </span>
        ) : (
          <span className="text-xs text-white/20">—</span>
        )}
        <p className="text-[10px] text-white/20">score</p>
      </div>

      {/* TikTok badge */}
      <div className="shrink-0">
        {battle.hasTikTokPackage ? (
          <span className="rounded-full border border-indigo-400/20 bg-indigo-400/6 px-2 py-0.5 text-[10px] text-indigo-400/70">
            TikTok ✓
          </span>
        ) : (
          <span className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-white/20">
            No package
          </span>
        )}
      </div>

      {/* Studio status */}
      <span
        className={cn(
          "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
          meta.cls
        )}
      >
        {meta.label}
      </span>

      <span className="shrink-0 text-white/20">→</span>
    </Link>
  );
}

function EmptyQueue() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/2 py-16 text-center">
      <p className="text-4xl">⚡</p>
      <div>
        <p className="text-sm font-semibold text-white/60">No battles generated yet</p>
        <p className="mt-1 text-xs text-white/30">
          Select a category above, click Generate, then run the command in your terminal.
        </p>
      </div>
      <div className="rounded-xl border border-white/8 bg-black/20 px-4 py-2.5">
        <code className="font-mono text-xs text-emerald-400">
          node scripts/run-pipeline.ts technology
        </code>
      </div>
    </div>
  );
}
