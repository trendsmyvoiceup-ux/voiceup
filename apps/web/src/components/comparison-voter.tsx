"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { comparisons, type Comparison, type Subject, type VisualTheme } from "@/lib/comparisons";
import { slugify } from "@/lib/subjects";
import { BattleVisual } from "@/components/battle-visual";
import { cn } from "@/lib/utils";

type Tally = { a: number; b: number };
type VotesState = Record<string, Tally>;
type VotedState = Record<string, "a" | "b">;

const VOTES_KEY = "opinion-platform:votes";
const VOTED_KEY = "opinion-platform:voted";

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ComparisonVoter({ comparison }: { comparison: Comparison }) {
  const [votes, setVotes] = useState<VotesState>({});
  const [voted, setVoted] = useState<VotedState>({});
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVotes(readJSON<VotesState>(VOTES_KEY, {}));
    setVoted(readJSON<VotedState>(VOTED_KEY, {}));
    setHydrated(true);
  }, []);

  const tally = votes[comparison.id] ?? { a: 0, b: 0 };
  const total = tally.a + tally.b;
  const pctA = total > 0 ? Math.round((tally.a / total) * 100) : 0;
  const pctB = total > 0 ? 100 - pctA : 0;
  const myVote = voted[comparison.id];
  const hasVoted = myVote !== undefined;

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
    [myVote] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function castVote(side: "a" | "b") {
    if (hasVoted) return;

    const nextTally: Tally = {
      a: tally.a + (side === "a" ? 1 : 0),
      b: tally.b + (side === "b" ? 1 : 0),
    };
    const nextVotes = { ...votes, [comparison.id]: nextTally };
    const nextVoted = { ...voted, [comparison.id]: side };

    setVotes(nextVotes);
    setVoted(nextVoted);
    window.localStorage.setItem(VOTES_KEY, JSON.stringify(nextVotes));
    window.localStorage.setItem(VOTED_KEY, JSON.stringify(nextVoted));
  }

  function battleUrl() {
    return `${window.location.origin}/battle/${comparison.id}`;
  }

  async function copyLink() {
    const url = battleUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable; silently ignore
    }
  }

  async function share() {
    const url = battleUrl();
    const title = `${comparison.subjectA.name} vs ${comparison.subjectB.name}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled or share failed; no fallback needed
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
      {/* Category badge: reinforces that this screen is a self-contained,
          shareable "battle asset", not just a generic voting form. */}
      <div className="pointer-events-none absolute left-0 right-0 top-3 z-10 flex justify-center">
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm">
          {comparison.category}
        </span>
      </div>

      {/* Two halves create visual tension between the choices. Winning
          side grows after a vote; losing side recedes. */}
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

      {/* The VS moment: the emotional center of the screen. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="vs-badge flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg font-black tracking-widest backdrop-blur-sm sm:h-20 sm:w-20 sm:text-xl">
          VS
        </div>
      </div>

      {/* Delight after voting: a brief confetti burst around the badge. */}
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

      {/* Bottom sheet: appears only after the decision is made. */}
      {hasVoted && (
        <div className="sheet-up absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 rounded-t-3xl border-t border-white/10 bg-black/90 px-6 pb-8 pt-5 text-center backdrop-blur">
          <p className="text-sm font-semibold">
            Thanks for voting · {total.toLocaleString()} total votes
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
      {/* Media rendering is fully delegated to BattleVisual, kept separate
          from voting logic/state above. */}
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
        <span className="text-2xl font-bold text-white/90 sm:text-3xl">
          {percentage}%
        </span>
      )}
      {!disabled && (
        <span className="absolute bottom-6 text-xs font-medium uppercase tracking-widest text-white/50">
          Tap to vote
        </span>
      )}
    </button>
  );
}
