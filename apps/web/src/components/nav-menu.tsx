"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/90"
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col border-l border-white/8 bg-[oklch(0.11_0.004_270)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
          <span className="text-sm font-semibold tracking-tight text-white/90">Human Signal</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/6 hover:text-white/90"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/45 transition-colors group-hover:border-white/20 group-hover:text-white/80">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5L6.5 1 12 6.5M2.5 5V11.5h3V8h2v3.5h3V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Discover
          </Link>

          <Link
            href="/battle"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/6 hover:text-white/90"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/45 transition-colors group-hover:border-white/20 group-hover:text-white/80">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M7.5 3L11 6.5 7.5 10M5.5 3L2 6.5l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            All Battles
          </Link>

          <Link
            href="/category"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/6 hover:text-white/90"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/45 transition-colors group-hover:border-white/20 group-hover:text-white/80">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </span>
            Categories
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/6 hover:text-white/90"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/45 transition-colors group-hover:border-white/20 group-hover:text-white/80">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M6.5 6v4M6.5 3.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </span>
            About
          </Link>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/8 px-6 py-5">
          <p className="text-[11px] leading-relaxed text-white/25">
            Community signal, not a scientific poll.
          </p>
        </div>
      </div>
    </>
  );
}
