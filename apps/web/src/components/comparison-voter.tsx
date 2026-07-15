"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { comparisons, type Comparison, type Subject, type VisualTheme } from "@/lib/comparisons";
import { slugify } from "@/lib/subjects";
import { BattleVisual } from "@/components/battle-visual";
import { WORDING } from "@/lib/wording-config";
import { cn } from "@/lib/utils";

// ── localStorage keys ─────────────────────────────────────────────────────────

const VOTED_KEY  = "opinion-platform:voted";
const VOTER_KEY  = "opinion-platform:voter-id";
const REASON_KEY = "opinion-platform:reason";

function getVotedMap(): Record<string, "a" | "b"> {
  try {
    const raw = window.localStorage.getItem(VOTED_KEY);
    return raw ? (JSON.parse(raw) as Record<string, "a" | "b">) : {};
  } catch { return {}; }
}

function getReasonMap(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(REASON_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch { return {}; }
}

function saveReason(battleId: string, reasonId: string) {
  try {
    const map = getReasonMap();
    map[battleId] = reasonId;
    window.localStorage.setItem(REASON_KEY, JSON.stringify(map));
  } catch {}
}

function getAnonymousId(): string {
  try {
    const existing = window.localStorage.getItem(VOTER_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(VOTER_KEY, id);
    return id;
  } catch { return crypto.randomUUID(); }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Counts = { a: number; b: number; total: number };

// Explicit flow phases — drives what the post-vote sheet shows.
// "vote"   — pre-vote; sheet is hidden
// "reveal" — immediately after vote; shows distribution + distinctiveness frame
// "reason" — optional reason prompt
// "done"   — share + next battle CTA
type FlowPhase = "vote" | "reveal" | "reason" | "done";

// ── Main component ────────────────────────────────────────────────────────────

export function ComparisonVoter({ comparison }: { comparison: Comparison }) {
  const [myVote, setMyVote]   = useState<"a" | "b" | undefined>(undefined);
  const [counts, setCounts]   = useState<Counts>({ a: 0, b: 0, total: 0 });
  const [phase, setPhase]     = useState<FlowPhase>("vote");
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied]   = useState(false);
  const anonymousIdRef        = useRef<string>("");

  useEffect(() => {
    const voted   = getVotedMap();
    const reasons = getReasonMap();
    const vote    = voted[comparison.id];

    setMyVote(vote);
    anonymousIdRef.current = getAnonymousId();
    setHydrated(true);

    // Restore phase from prior session
    if (vote !== undefined) {
      setPhase(reasons[comparison.id] !== undefined ? "done" : "reveal");
    }

    // Fetch live counts
    fetch(`/api/battles/${comparison.id}/votes`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: Counts | null) => { if (data) setCounts(data); })
      .catch(() => {});
  }, [comparison.id]);

  const hasVoted = myVote !== undefined;

  const pctA = counts.total > 0 ? Math.round((counts.a / counts.total) * 100) : 50;
  const pctB = counts.total > 0 ? 100 - pctA : 50;

  // Percentages for the user's chosen option vs. the other
  const myPct    = myVote === "a" ? pctA : pctB;
  const isMinority = counts.total > 0 && myPct < 50;

  // For the center VS badge: show the leading percentage post-vote
  const leaderSide = pctA >= pctB ? "a" : "b";
  const leaderPct  = leaderSide === "a" ? pctA : pctB;

  // Navigation
  const currentIndex = comparisons.findIndex((c) => c.id === comparison.id);
  const next = comparisons[(currentIndex + 1) % comparisons.length];

  // ── Vote casting ─────────────────────────────────────────────────────────

  async function castVote(side: "a" | "b") {
    if (hasVoted) return;
    const subjectSlug = slugify(
      side === "a" ? comparison.subjectA.name : comparison.subjectB.name
    );
    setMyVote(side);
    setPhase("reveal");

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          battleSlug:  comparison.id,
          subjectSlug,
          anonymousId: anonymousIdRef.current,
        }),
      });
      const data = await res.json();
      if (data.counts) setCounts(data.counts);
    } catch {}

    // Persist vote to localStorage regardless of API success
    const voted = getVotedMap();
    voted[comparison.id] = side;
    window.localStorage.setItem(VOTED_KEY, JSON.stringify(voted));
  }

  // ── Reason selection ──────────────────────────────────────────────────────

  function selectReason(reasonId: string) {
    saveReason(comparison.id, reasonId);
    setPhase("done");
  }

  // ── Share helpers ─────────────────────────────────────────────────────────

  function battleUrl() {
    return `${window.location.origin}/battle/${comparison.id}`;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(battleUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function share() {
    const url   = battleUrl();
    const title = `${comparison.subjectA.name} vs ${comparison.subjectB.name}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      await copyLink();
    }
  }

  // ── Loading guard ─────────────────────────────────────────────────────────

  if (!hydrated) {
    return <div className="h-full w-full bg-[oklch(0.07_0.004_270)]" />;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-hidden bg-[oklch(0.07_0.004_270)] text-white">

      {/* Category pill */}
      <div className="pointer-events-none absolute left-0 right-0 top-3.5 z-10 flex justify-center">
        <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 backdrop-blur-sm">
          {comparison.category}
        </span>
      </div>

      {/* Battle zones */}
      <div className="flex flex-1 flex-col sm:flex-row">
        <OptionZone
          subject={comparison.subjectA}
          theme={comparison.visualTheme}
          gradient="from-indigo-950/80 via-indigo-900/40 to-transparent"
          side="left"
          active={myVote === "a"}
          dimmed={hasVoted && myVote !== "a"}
          percentage={hasVoted ? pctA : null}
          onSelect={() => castVote("a")}
          disabled={hasVoted}
        />
        <OptionZone
          subject={comparison.subjectB}
          theme={comparison.visualTheme}
          gradient="from-rose-950/80 via-rose-900/40 to-transparent"
          side="right"
          active={myVote === "b"}
          dimmed={hasVoted && myVote !== "b"}
          percentage={hasVoted ? pctB : null}
          onSelect={() => castVote("b")}
          disabled={hasVoted}
        />
      </div>

      {/* VS badge / leader % — with curiosity hint in pre-vote */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5">
        <div
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full border bg-black/80 backdrop-blur-md transition-all duration-700 sm:h-16 sm:w-16",
            hasVoted
              ? leaderSide === "a" ? "border-indigo-400/30" : "border-rose-400/30"
              : "border-white/15"
          )}
        >
          <span className="text-sm font-black tabular-nums tracking-tight transition-all duration-500 sm:text-base">
            {hasVoted && counts.total > 0 ? `${leaderPct}%` : "VS"}
          </span>
        </div>

        {/* EXP-001: Curiosity hint — information gap trigger */}
        {!hasVoted && (
          <p
            className="text-[10px] font-medium text-white/28 tracking-wide"
            data-experiment-id="EXP-001"
          >
            {WORDING.preVote.curiosityHint}
          </p>
        )}
      </div>

      {/* Post-vote motivation sheet */}
      {hasVoted && (
        <div className="sheet-up absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-5 rounded-t-[1.75rem] border-t border-white/10 bg-black/92 px-5 pb-8 pt-4 backdrop-blur-xl">
          <div className="h-1 w-8 rounded-full bg-white/12" />

          {/* ── Phase: reveal ────────────────────────────────────────────── */}
          {phase === "reveal" && (
            <>
              {/* Signal confirmation */}
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-base font-bold text-white/90">
                  {WORDING.postVote.confirmation}
                </p>
                <p className="text-xs text-white/35">
                  {counts.total > 0
                    ? WORDING.postVote.signalCount(counts.total)
                    : WORDING.postVote.firstSignal}
                </p>
              </div>

              {/* Distribution bar */}
              {counts.total > 0 && (
                <div className="w-full max-w-xs">
                  <div className="mb-1.5 flex justify-between text-xs tabular-nums text-white/40">
                    <span className={cn("font-semibold", myVote === "a" && "text-white/75")}>
                      {comparison.subjectA.name.split(" ")[0]} {pctA}%
                    </span>
                    <span className={cn("font-semibold", myVote === "b" && "text-white/75")}>
                      {pctB}% {comparison.subjectB.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-indigo-400/70 transition-all duration-700"
                      style={{ width: `${pctA}%` }}
                    />
                  </div>
                </div>
              )}

              {/* EXP-002: Distinctiveness framing */}
              {counts.total > 0 && myVote !== undefined && (
                <p
                  className="text-xs text-white/50 text-center"
                  data-experiment-id="EXP-002"
                >
                  {isMinority
                    ? WORDING.postVote.minorityFrame(myPct)
                    : WORDING.postVote.majorityFrame(myPct)}
                </p>
              )}

              {/* EXP-003: Reason prompt CTA */}
              <div
                className="flex w-full max-w-xs flex-col items-center gap-2"
                data-experiment-id="EXP-003"
              >
                <button
                  onClick={() => setPhase("reason")}
                  className="w-full rounded-xl border border-white/12 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/90 active:scale-[0.98]"
                >
                  {WORDING.postVote.reasonCta} →
                </button>
                <button
                  onClick={() => setPhase("done")}
                  className="text-xs text-white/25 transition-colors hover:text-white/45"
                >
                  {WORDING.postVote.skipReason}
                </button>
              </div>

              <p className="text-[10px] text-white/18">
                {WORDING.postVote.disclaimer}
              </p>
            </>
          )}

          {/* ── Phase: reason ─────────────────────────────────────────────── */}
          {phase === "reason" && (
            <>
              <p className="text-sm font-medium text-white/80 text-center">
                {WORDING.reason.prompt}
              </p>

              <div className="grid w-full max-w-xs grid-cols-2 gap-2">
                {WORDING.reason.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectReason(opt.id)}
                    className="rounded-xl border border-white/10 px-3 py-3 text-xs font-medium text-white/55 transition-all hover:border-white/20 hover:bg-white/6 hover:text-white/80 active:scale-[0.97]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPhase("done")}
                className="text-xs text-white/25 transition-colors hover:text-white/45"
              >
                {WORDING.reason.skipLabel}
              </button>

              <p className="text-[10px] text-white/18">
                {WORDING.postVote.disclaimer}
              </p>
            </>
          )}

          {/* ── Phase: done ───────────────────────────────────────────────── */}
          {phase === "done" && (
            <>
              {/* Distribution bar (compact) */}
              {counts.total > 0 && (
                <div className="w-full max-w-xs">
                  <div className="mb-1.5 flex justify-between text-xs tabular-nums text-white/40">
                    <span className={cn("font-semibold", myVote === "a" && "text-white/75")}>
                      {comparison.subjectA.name.split(" ")[0]} {pctA}%
                    </span>
                    <span className={cn("font-semibold", myVote === "b" && "text-white/75")}>
                      {pctB}% {comparison.subjectB.name.split(" ")[0]}
                    </span>
                  </div>
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-indigo-400/70 transition-all duration-700"
                      style={{ width: `${pctA}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Subject deep-dive links */}
              <div className="flex w-full max-w-xs gap-2">
                <Link
                  href={`/subject/${slugify(comparison.subjectA.name)}`}
                  className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-center text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/80"
                >
                  {comparison.subjectA.name} signal →
                </Link>
                <Link
                  href={`/subject/${slugify(comparison.subjectB.name)}`}
                  className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-center text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/80"
                >
                  {comparison.subjectB.name} signal →
                </Link>
              </div>

              {/* Share row */}
              <div className="flex w-full max-w-xs gap-2">
                <button
                  onClick={copyLink}
                  className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/80 active:scale-[0.97]"
                >
                  {copied ? "✓ Copied" : "Copy link"}
                </button>
                <button
                  onClick={share}
                  className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white/80 active:scale-[0.97]"
                >
                  Share
                </button>
              </div>

              {/* EXP-004: Next battle CTA — prominent and always visible */}
              <Link
                href={`/battle/${next.id}`}
                className="w-full max-w-xs rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition-opacity hover:opacity-88 active:scale-[0.98]"
                data-experiment-id="EXP-004"
              >
                {WORDING.next.ctaLabel}
              </Link>

              <p className="text-[10px] text-white/18">
                {WORDING.postVote.disclaimer}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── Option zone ───────────────────────────────────────────────────────────────

function OptionZone({
  subject,
  theme,
  gradient,
  side,
  active,
  dimmed,
  percentage,
  onSelect,
  disabled,
}: {
  subject: Subject;
  theme: VisualTheme;
  gradient: string;
  side: "left" | "right";
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
        "group relative flex flex-1 flex-col items-center justify-center gap-5 overflow-hidden transition-[flex-grow,opacity] duration-600 ease-out",
        active ? "flex-[1.45]" : "flex-1",
        dimmed ? "opacity-30" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
          gradient,
          !disabled && "group-hover:opacity-100",
          "opacity-90"
        )}
      />

      {side === "left" && (
        <div className="absolute right-0 top-0 h-full w-px bg-white/6" />
      )}

      <div className="relative z-10 flex flex-col items-center gap-4">
        <BattleVisual subject={subject} theme={theme} />

        <span
          className={cn(
            "max-w-[155px] px-4 text-center text-[1.55rem] font-black uppercase leading-none tracking-tight drop-shadow-lg sm:max-w-none sm:text-5xl",
            !disabled && "transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.97]"
          )}
        >
          {subject.name}
        </span>

        {percentage !== null && (
          <span className="text-xl font-bold tabular-nums text-white/75 sm:text-2xl">
            {percentage}%
          </span>
        )}
      </div>

      {!disabled && (
        <div className="absolute bottom-6 z-10 flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 transition-opacity duration-300 group-hover:text-white/55">
            {WORDING.preVote.cta}
          </span>
        </div>
      )}
    </button>
  );
}
