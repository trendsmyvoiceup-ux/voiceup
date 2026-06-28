"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { comparisons, type Comparison } from "@/lib/comparisons";
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
  const hasVoted = voted[comparison.id] !== undefined;

  const currentIndex = comparisons.findIndex((c) => c.id === comparison.id);
  const next = comparisons[(currentIndex + 1) % comparisons.length];

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
    const title = `${comparison.optionA} vs ${comparison.optionB}`;
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
    return null;
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border p-6 text-center">
      <div className="grid w-full grid-cols-2 gap-4">
        <Button
          variant={hasVoted ? "outline" : "default"}
          disabled={hasVoted}
          onClick={() => castVote("a")}
          className="h-16 text-lg"
        >
          {comparison.optionA}
        </Button>
        <Button
          variant={hasVoted ? "outline" : "default"}
          disabled={hasVoted}
          onClick={() => castVote("b")}
          className="h-16 text-lg"
        >
          {comparison.optionB}
        </Button>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {comparison.optionA}: {pctA}%
          </span>
          <span>
            {comparison.optionB}: {pctB}%
          </span>
        </div>
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-foreground" style={{ width: `${pctA}%` }} />
        </div>
        <p className="text-sm text-muted-foreground">{total} total votes</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        <Button variant="secondary" onClick={copyLink}>
          {copied ? "Link copied" : "Copy link"}
        </Button>
        <Button variant="secondary" onClick={share}>
          Share
        </Button>
      </div>

      <Link
        href={`/battle/${next.id}`}
        className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
      >
        Next comparison
      </Link>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p>Community signal, not a scientific poll.</p>
        <p>Source: website</p>
      </div>
    </div>
  );
}
