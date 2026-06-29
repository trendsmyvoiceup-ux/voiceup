"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Minimal global navigation. Battle is the primary entry point — this menu
 * only holds secondary navigation (Search, Categories, About) so it never
 * competes with the battle itself.
 */
export function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <span className="sr-only">Menu</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col gap-2 bg-background p-6 text-foreground shadow-xl transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mb-4 self-end text-sm text-muted-foreground hover:text-foreground"
          >
            Close
          </button>

          {/* Search placeholder — not functional yet, static UI only. */}
          <div className="rounded-full border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
            Search… (coming soon)
          </div>

          <Link
            href="/category"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-3 text-left font-medium hover:bg-muted"
          >
            Categories
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-3 text-left font-medium hover:bg-muted"
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
}
