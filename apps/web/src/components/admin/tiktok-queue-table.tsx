"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type TikTokQueueRow = {
  slug: string;
  title: string;
  reviewScore: number | null;
  hasCaption: boolean;
  hasScript: boolean;
  hasVideoPrompt: boolean;
  battleLink: string;
};

type TikTokStatus = "draft" | "ready" | "posted" | "skipped";
const STATUSES: TikTokStatus[] = ["draft", "ready", "posted", "skipped"];
const STORAGE_KEY = "opinion-platform:tiktok-status";

const STATUS_STYLES: Record<TikTokStatus, string> = {
  draft: "border-white/12 bg-white/4 text-white/45",
  ready: "border-emerald-400/35 bg-emerald-400/10 text-emerald-400/90",
  posted: "border-indigo-400/35 bg-indigo-400/10 text-indigo-400/90",
  skipped: "border-white/8 bg-white/2 text-white/25",
};

function readStatusMap(): Record<string, TikTokStatus> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, TikTokStatus>) : {};
  } catch {
    return {};
  }
}

export function TikTokQueueTable({ rows }: { rows: TikTokQueueRow[] }) {
  const [statusMap, setStatusMap] = useState<Record<string, TikTokStatus>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStatusMap(readStatusMap());
    setHydrated(true);
  }, []);

  function setStatus(slug: string, status: TikTokStatus) {
    const next = { ...statusMap, [slug]: status };
    setStatusMap(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/6 bg-white/2 px-5 py-6 text-center">
        <p className="text-sm text-white/30">No approved TikTok packages found.</p>
        <p className="mt-1 text-xs text-white/18">
          Run <code className="rounded bg-white/6 px-1.5 py-0.5">node scripts/run-pipeline.ts &lt;category&gt;</code> first.
        </p>
      </div>
    );
  }

  const summary = hydrated
    ? {
        ready: rows.filter((r) => statusMap[r.slug] === "ready").length,
        posted: rows.filter((r) => statusMap[r.slug] === "posted").length,
        draft: rows.filter(
          (r) => !statusMap[r.slug] || statusMap[r.slug] === "draft"
        ).length,
        skipped: rows.filter((r) => statusMap[r.slug] === "skipped").length,
      }
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Summary strip */}
      {summary && (
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              { label: "Draft", count: summary.draft, status: "draft" },
              { label: "Ready", count: summary.ready, status: "ready" },
              { label: "Posted", count: summary.posted, status: "posted" },
              { label: "Skipped", count: summary.skipped, status: "skipped" },
            ] as const
          ).map(({ label, count, status }) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-2xl border py-3",
                STATUS_STYLES[status]
              )}
            >
              <span className="text-lg font-bold tabular-nums">{count}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-70">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Queue rows */}
      {rows.map((row) => {
        const status: TikTokStatus =
          hydrated ? statusMap[row.slug] ?? "draft" : "draft";
        const allFilesReady = row.hasCaption && row.hasScript && row.hasVideoPrompt;

        return (
          <div
            key={row.slug}
            className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/3 p-5"
          >
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-white/90">{row.title}</p>
                <p className="text-[10px] text-white/30">{row.slug}</p>
              </div>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
                  STATUS_STYLES[status]
                )}
              >
                {status}
              </span>
            </div>

            {/* File / data checks */}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
              <CheckField
                label="Reviewer score"
                value={row.reviewScore !== null ? `${row.reviewScore}/100` : "—"}
                ok={row.reviewScore !== null && row.reviewScore >= 80}
              />
              <CheckField label="caption.txt" value={row.hasCaption ? "✓" : "Missing"} ok={row.hasCaption} />
              <CheckField label="script.txt" value={row.hasScript ? "✓" : "Missing"} ok={row.hasScript} />
              <CheckField
                label="video_prompt.txt"
                value={row.hasVideoPrompt ? "✓" : "Missing"}
                ok={row.hasVideoPrompt}
              />
              <div className="col-span-2 sm:col-span-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/28">
                  Battle link
                </dt>
                <dd className="mt-0.5 font-mono text-[11px] text-white/50">{row.battleLink}</dd>
              </div>
              <CheckField
                label="Package complete"
                value={allFilesReady ? "Ready to post" : "Files missing"}
                ok={allFilesReady}
              />
            </dl>

            {/* Status controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/25">
                Mark as:
              </span>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(row.slug, s)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-medium capitalize transition-all",
                    status === s
                      ? "border-white/30 bg-white/12 text-white/90"
                      : "border-white/8 text-white/35 hover:border-white/18 hover:bg-white/5 hover:text-white/65"
                  )}
                >
                  {s}
                </button>
              ))}
              <Link
                href={`/battle/${row.slug}`}
                className="ml-auto text-xs text-white/28 underline-offset-2 transition-colors hover:text-white/60 hover:underline"
              >
                Open battle →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CheckField({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/28">{label}</dt>
      <dd className={cn("mt-0.5 font-medium", ok ? "text-white/75" : "text-rose-400/80")}>{value}</dd>
    </div>
  );
}
