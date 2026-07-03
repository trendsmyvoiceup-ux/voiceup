"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { comparisons, type Comparison, type Subject, type VisualTheme } from "@/lib/comparisons";
import { slugify } from "@/lib/subjects";
import { BattleVisual } from "@/components/battle-visual";
import { cn } from "@/lib/utils";

// localStorage keys
const VOTED_KEY = "opinion-platform:voted";
const VOTER_ID_KEY = "opinion-platform:voter-id";

function getVotedMap(): Record<string, "a" | "b"> {
  try {
    const raw = window.localStorage.getItem(VOTED_KEY);
    return raw ? (JSON.parse(raw) as Record<string, "a" | "b">) : {};
  } catch {
    return {};
  }
}

function getAnonymousId(): string {
  try {
    const existing = window.localStorage.getItem(VOTER_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(VOTER_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

type Counts = { a: number; b: number; total: number };

export function ComparisonVoter({ comparison }: { comparison: Comparison }) {
  const [myVote, setMyVote] = useState<"a" | "b" | undefined>(undefined);
  const [counts, setCounts] = useState<Counts>({ a: 0, b: 0, total: 0 });
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const anonymousIdRef = useRef<string>("");

  useEffect(() => {
    const voted = getVotedMap();
    setMyVote(voted[comparison.id]);
    anonymousIdRef.current = getAnonymousId();
    setHydrated(true);

    // Load live vote counts from DB
    fetch(`/api/battles/${comparison.id}/votes`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: Counts | null) => {
        if (data) setCounts(data);
      })
      .catch(() => {/* DB unavailable — counts stay at 0 */});
  }, [comparison.id]);

  const hasVoted = myVote !== undefined;

  const pctA = counts.total > 0 ? Math.round((counts.a / counts.total) * 100) : 0;
  const pctB = counts.total > 0 ? 100 - pctA : 0;

  const currentIndex = comparisons.findIndex((c) => c.id === comparison.id);
  const next = comparisons[(currentIndex + 1) % comparisons.length];

  const confetti = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        dx: `${Math.round((Math.random() - 0.5) * 160)}px`,
        dy: `${-(80 + Math.random() * 100)}px`,
        delay: `${Math.random() * 150}ms`,
        left: `${10 + Math.random() * 80}%`,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myVote]
  );

  async function castVote(side: "a" | "b") {
    if (hasVoted) return;

    const subjectSlug = slugify(side === "a" ? comparison.subjectA.name : comparison.subjectB.name);

    // Optimistic update
    setMyVote(side);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          battleSlug: comparison.id,
          subjectSlug,
          anonymousId: anonymousIdRef.current,
        }),
      });

      const data = await res.json();

      if (data.counts) {
        setCounts(data.counts);
      }

      // Persist locally only after server confirms
      const voted = getVotedMap();
      voted[comparison.id] = side;
      window.localStorage.setItem(VOTED_KEY, JSON.stringify(voted));
    } catch {
      // Network error: persist locally anyway so UX isn't broken offline
      const voted = getVotedMap();
      voted[comparison.id] = side;
      window.localStorage.setItem(VOTED_KEY, JSON.stringify(voted));
    }
  }

  function battleUrl() {
    return `${window.location.origin}/battle/${comparison.id}`;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(battleUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  }

  async function share() {
    const url = battleUrl();
    const title = `${comparison.subjectA.name} vs ${comparison.subjectB.name}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled or share failed
      }
    } else {
      await copyLink();
    }
  }

  if (!hydrated) {
    return <div className="h-full w-full bg-black" />;
  }

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute left-0 right-0 top-3 z-10 flex justify-center">
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm">
          {comparison.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col sm:flex-row">
        <OptionZone
          subject={comparison.subjectA}
          theme={comparison.visualTheme}
          gradient="from-indigo-950 via-indigo-900 to-black"
          active={myVote === "a"}
          dimmed={hasVoted && myVote !== "a"}
          percentage={hasVoted ? pctA : null}
          onSelect={() => castVote("a")}
          disabled={hasVoted}
        />
        <OptionZone
          subject={comparison.subjectB}
          theme={comparison.visualTheme}
          gradient="from-rose-950 via-rose-900 to-black"
          active={myVote === "b"}
          dimmed={hasVoted && myVote !== "b"}
          percentage={hasVoted ? pctB : null}
          onSelect={() => castVote("b")}
          disabled={hasVoted}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="vs-badge flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg font-black tracking-widest backdrop-blur-sm sm:h-20 sm:w-20 sm:text-xl">
          VS
        </div>
      </div>

      {hasVoted && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-dot absolute h-1.5 w-1.5 rounded-full bg-white"
              style={
                {
                  left: c.left,
                  top: "50%",
                  animationDelay: c.delay,
                  "--dx": c.dx,
                  "--dy": c.dy,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {hasVoted && (
        <div className="sheet-up absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-3xl border-t border-white/10 bg-black/90 px-6 pb-8 pt-5 text-center backdrop-blur">
          <p className="text-sm font-semibold">
            Thanks for voting · {counts.total.toLocaleString()} total votes
          </p>

          <div className="flex w-full max-w-sm gap-3 text-sm">
            <Link
              href={`/subject/${slugify(comparison.subjectA.name)}`}
              className="flex-1 rounded-full border border-white/15 px-4 py-2 font-medium text-white/70 hover:bg-white/10"
            >
              View {comparison.subjectA.name}
            </Link>
            <Link
              href={`/subject/${slugify(comparison.subjectB.name)}`}
              className="flex-1 rounded-full border border-white/15 px-4 py-2 font-medium text-white/70 hover:bg-white/10"
            >
              View {comparison.subjectB.name}
            </Link>
          </div>

          <div className="flex w-full max-w-sm gap-3">
            <button
              onClick={copyLink}
              className="flex-1 rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 active:scale-[0.97]"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
            <button
              onClick={share}
              className="flex-1 rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 active:scale-[0.97]"
            >
              Share
            </button>
          </div>

          <Link
            href={`/battle/${next.id}`}
            className="w-full max-w-sm rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Next comparison
          </Link>

          <p className="text-[11px] text-white/40">
            Community signal, not a scientific poll · Source: website
          </p>
        </div>
      )}
    </div>
  );
}

function OptionZone({
  subject,
  theme,
  gradient,
  active,
  dimmed,
  percentage,
  onSelect,
  disabled,
}: {
  subject: Subject;
  theme: VisualTheme;
  gradient: string;
  active: boolean;
  dimmed: boolean;
  percentage: number | null;
  onSelect: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "group relative flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br transition-[flex-grow,opacity] duration-500 ease-out",
        gradient,
        active ? "flex-[1.4]" : "flex-1",
        dimmed && "opacity-40"
      )}
    >
      <BattleVisual subject={subject} theme={theme} />

      <span
        className={cn(
          "px-6 text-center text-3xl font-black uppercase tracking-tight drop-shadow-lg transition-transform duration-300 sm:text-5xl",
          !disabled && "group-active:scale-95"
        )}
      >
        {subject.name}
      </span>
      {percentage !== null && (
        <span className="text-2xl font-bold text-white/90 sm:text-3xl">{percentage}%</span>
      )}
      {!disabled && (
        <span className="absolute bottom-6 text-xs font-medium uppercase tracking-widest text-white/50">
          Tap to vote
        </span>
      )}
    </button>
  );
}
