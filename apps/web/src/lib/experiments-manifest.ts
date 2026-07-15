// Experiment manifest for the Signal Motivation Layer (Epic 2).
// Each entry declares one experimental element, its hypothesis, and the
// metrics needed to validate or falsify it.
//
// Status:
//   "active"    — element is live; accumulate data before drawing conclusions
//   "paused"    — element disabled; awaiting decision
//   "concluded" — decision made; move finding to .ai/memory/research.md
//
// No analytics implementation yet — this is the structural declaration.
// Wire to an analytics provider when instrumentation is ready.

export type ExperimentStatus = "active" | "paused" | "concluded";

export type Experiment = {
  id: string;
  name: string;
  element: string;         // which UI element implements it
  hypothesis: string;
  successMetric: string;
  failureIndicator: string;
  abTestable: boolean;     // can be isolated in a controlled A/B test
  status: ExperimentStatus;
};

export const EXPERIMENTS: Experiment[] = [
  {
    id: "EXP-001",
    name: "Curiosity Hint",
    element: "Pre-vote: 'Results reveal after you vote' text under VS badge",
    hypothesis:
      "A brief statement that results are withheld creates an information gap, increasing vote completion rate vs. no hint. Source: Loewenstein (1994) information gap theory.",
    successMetric:
      "Completion rate (vote cast / page view) increases by ≥ 5 percentage points vs. a control with no hint.",
    failureIndicator:
      "No measurable difference in completion rate, or completion rate decreases.",
    abTestable: true,
    status: "active",
  },
  {
    id: "EXP-002",
    name: "Distinctiveness Framing",
    element:
      "Post-vote reveal copy: minority (<50%) → 'A distinctive signal — you're in the X%'; majority (≥50%) → 'Your view — shared by X%'",
    hypothesis:
      "Distinctiveness framing for minority-position voters reduces post-vote abandonment and increases share rate, vs. conformity-neutral or loss-framed copy. Source: Brewer (1991) optimal distinctiveness theory.",
    successMetric:
      "Share rate for minority-position voters ≥ share rate for majority-position voters; minority voter return rate ≥ 80% of majority voter return rate.",
    failureIndicator:
      "Minority voters share at significantly lower rate or abandon at significantly higher rate than majority voters.",
    abTestable: true,
    status: "active",
  },
  {
    id: "EXP-003",
    name: "Optional Reason Selection",
    element:
      "Post-reveal: preset reason chips (5 options) + zero-friction skip. No free text, no account required.",
    hypothesis:
      "Offering optional reason selection creates a micro-contribution moment that increases 30-day return rate and session depth, without adding friction that reduces completion rate.",
    successMetric:
      "Reason submission rate ≥ 10%. 30-day return rate for reason-submitters ≥ 1.3× baseline return rate.",
    failureIndicator:
      "Reason submission rate < 5% (prompt adds friction without value). Or: reason step causes measurable completion rate drop (users exit the sheet).",
    abTestable: true,
    status: "active",
  },
  {
    id: "EXP-004",
    name: "Next Battle Continuity",
    element:
      "Post-reveal 'Next battle →' CTA — prominent, immediate, always visible in the 'done' phase without scrolling.",
    hypothesis:
      "A prominent next battle CTA immediately after the reveal increases battles per session vs. navigation-only discovery.",
    successMetric:
      "Battles per session ≥ 2.0 (vs. 1.0 baseline for single-entry visitors). Next battle click-through rate ≥ 20%.",
    failureIndicator:
      "Next battle click-through rate < 10%; or session depth unchanged vs. control.",
    abTestable: true,
    status: "active",
  },
];

// Lookup helper — returns undefined if experiment not found.
export function getExperiment(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id);
}
