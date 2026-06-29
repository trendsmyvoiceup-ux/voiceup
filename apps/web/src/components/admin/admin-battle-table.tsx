"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type AdminBattleRow = {
  slug: string;
  title: string;
  category: string;
  websiteUrl: string;
  subjectASlug: string;
  subjectBSlug: string;
  subjectAName: string;
  subjectBName: string;
  hasProposal: boolean;
  hasPackage: boolean;
  reviewScore: number | null;
  reviewApproved: boolean | null;
  websiteStatus: string;
  publisherStatus: string;
  packageGenerated: boolean;
  readyForPublication: boolean;
};

type Status = "draft" | "ready" | "paused" | "archived";

const STATUS_KEY = "opinion-platform:admin-status";
const STATUSES: Status[] = ["draft", "ready", "paused", "archived"];

function readStatusMap(): Record<string, Status> {
  try {
    const raw = window.localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function AdminBattleTable({ battles }: { battles: AdminBattleRow[] }) {
  const [statusMap, setStatusMap] = useState<Record<string, Status>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStatusMap(readStatusMap());
    setHydrated(true);
  }, []);

  function setStatus(slug: string, status: Status) {
    const next = { ...statusMap, [slug]: status };
    setStatusMap(next);
    window.localStorage.setItem(STATUS_KEY, JSON.stringify(next));
  }

  return (
    <div className="flex flex-col gap-3">
      {battles.map((battle) => {
        const status = hydrated ? statusMap[battle.slug] ?? "draft" : "draft";
        return (
          <div key={battle.slug} className="rounded-2xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{battle.title}</p>
                <p className="text-xs text-muted-foreground">
                  {battle.slug} · {battle.category}
                </p>
              </div>
              <StatusBadge status={status} />
            </div>

            {/* Content Factory dashboard fields — read-only, no editing. */}
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
              <Field label="Proposal" value={battle.hasProposal ? "Exists" : "Missing"} />
              <Field
                label="Reviewer score"
                value={battle.reviewScore !== null ? `${battle.reviewScore}/100` : "Not reviewed"}
              />
              <Field
                label="Approved"
                value={
                  battle.reviewApproved === null
                    ? "Not reviewed"
                    : battle.reviewApproved
                      ? "Yes"
                      : "No"
                }
              />
              <Field label="Website status" value={capitalize(battle.websiteStatus)} />
              <Field label="Publisher status" value={capitalize(battle.publisherStatus)} />
              <Field
                label="Publication package"
                value={battle.packageGenerated ? "Generated" : "Not generated"}
              />
              <Field
                label="Ready to publish"
                value={battle.readyForPublication ? "Yes" : "No"}
              />
            </dl>

            <div className="mt-3 flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(battle.slug, s)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                    status === s
                      ? "border-foreground bg-foreground text-background"
                      : "hover:bg-muted"
                  )}
                >
                  Mark as {s}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <Link href={battle.websiteUrl} className="underline hover:no-underline">
                Open battle page
              </Link>
              <Link
                href={`/subject/${battle.subjectASlug}`}
                className="underline hover:no-underline"
              >
                Open {battle.subjectAName}
              </Link>
              <Link
                href={`/subject/${battle.subjectBSlug}`}
                className="underline hover:no-underline"
              >
                Open {battle.subjectBName}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function capitalize(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium capitalize">
      {status}
    </span>
  );
}
