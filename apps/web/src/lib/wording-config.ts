// All user-facing copy for the public battle experience.
// Edit strings here for A/B testing or localization — never hardcode copy in components.
// Every key corresponds to one or more experiments defined in experiments-manifest.ts.

export type ReasonOption = { id: string; label: string };

export const REASON_OPTIONS: ReasonOption[] = [
  { id: "quality",      label: "Better quality"    },
  { id: "familiarity",  label: "I know it better"  },
  { id: "practicality", label: "More practical"    },
  { id: "feel",         label: "Just feels right"  },
  { id: "other",        label: "Other"             },
];

export const WORDING = {
  preVote: {
    cta:           "Add your signal",
    // EXP-001: Curiosity hint — information gap trigger
    curiosityHint: "Results reveal after you vote",
  },

  postVote: {
    confirmation: "Signal added.",

    signalCount:  (n: number) => `${n.toLocaleString()} signals on this battle`,
    firstSignal:  "You're among the first to signal this battle.",

    // EXP-002: Distinctiveness framing — minority vs. majority copy
    // Minority: < 50% share — emphasise distinctiveness, not defeat
    minorityFrame: (pct: number) =>
      `A distinctive signal — you're in the ${pct}% on this one.`,
    // Majority: >= 50% share — neutral, no "winning" language
    majorityFrame: (pct: number) =>
      `Your view — shared by ${pct}%.`,

    // EXP-003: Reason CTA — appears after reveal
    reasonCta:  "What shaped your view?",
    skipReason: "Skip",

    disclaimer: "Community signal · anonymous · not a scientific poll",
  },

  reason: {
    prompt:          "What shaped your view?",
    options:         REASON_OPTIONS,
    skipLabel:       "Skip — keep going",
    submittedPrefix: "You noted:",
  },

  next: {
    // EXP-004: Continuity CTA prominence
    ctaLabel:        "Next battle →",
    continuityNote:  "Keep exploring",
  },
} as const;
