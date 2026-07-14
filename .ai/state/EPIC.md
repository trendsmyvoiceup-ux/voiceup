# Active Epic

> One Epic at a time. Founder declares; Research/Engineering Agent executes.
> When Done, archive summary to `.ai/log/AI_CHANGELOG.md`.

---

## Epic 2 — Signal Motivation Layer: Experimental MVP

**Status:** Ready — Awaiting first task
**Opened:** 2026-07-14
**Type:** Product experiment — UI only; no database, no authentication, no gamification
**Goal:** Build and expose the smallest testable motivation layer on the public battle page, implementing only what is supported by confirmed evidence and structuring the experience so hypotheses can be measured against real voter behavior. Test, do not assume.

### Why this matters

Epic 1 established what the evidence supports and what remains a product hypothesis. This Epic implements the confirmed-evidence elements and exposes hypotheses to real measurement. No design choice in this Epic is treated as settled until field data confirms it. Mission alignment and contribution ladders are not built — they are hypotheses awaiting a retention baseline.

### What this Epic tests

Each element below corresponds to a research hypothesis. The implementation must make measurement possible.

| Element | Hypothesis being tested | Primary metric |
|---------|------------------------|----------------|
| Neutral post-vote reveal | Post-vote direction reveal reduces conformity bias vs. pre-vote | Vote distribution entropy (minority vs. majority share) |
| Contextual curiosity hook | A brief question frame increases vote completion vs. no frame | Completion rate per battle |
| Majority / counter-signal framing | Distinctiveness copy ("you're in the X% who chose B") increases share rate | Share rate by position (majority vs. minority) |
| Optional reason selection | Optional reason-giving increases engagement and 30-day return rate | Reason submission rate; 30-day return rate |
| Cultural wording configuration | Wording variants produce different completion rates by market | Completion rate by locale (when multi-market data available) |

### What this Epic does NOT build

- No user profiles or login
- No gamification (no points, no streaks, no leaderboards, no streak mechanics)
- No contribution ladder above the vote
- No pre-vote participation count display (hypothesis — not yet tested; see `memory/future.md`)
- No mission framing scaffold (hypothesis — measure retention baseline first before building)
- No database schema changes (votes remain localStorage at MVP)
- No AI signals visible to users

### Scope

- Public battle page `/battle/[slug]` — motivation layer on the vote experience
- Post-vote reveal UI — results display after vote is cast, not before
- Minority / majority post-vote framing — distinctiveness copy, neutral language
- Optional reason selection (preset options, no free text at MVP, zero-friction skip)
- Wording configuration layer (parameterized copy so variants can be swapped without code changes)

### Out of scope

- Creator Studio changes
- Pipeline changes
- Authentication
- Database
- Any application code not on the public battle page

### Success criteria

- [ ] Post-vote reveal is the only results display — no results shown before vote is cast
- [ ] Minority and majority post-vote copy is distinct and implements neutral distinctiveness framing
- [ ] Optional reason section is skippable with zero friction (no social pressure, no visual shaming)
- [ ] All copy lives in a configuration object (not scattered hardcoded strings)
- [ ] No gamification mechanics introduced
- [ ] `pnpm build` passes from `apps/web/`
- [ ] Founder can QA the full vote → reveal → reason flow in < 5 minutes

### Tasks

| ID        | Title                                              | Status  |
|-----------|----------------------------------------------------|---------|
| TASK-0042 | Signal Motivation Layer: public battle page V2     | Ready   |

### Research basis

`.ai/RESEARCH.md` — Deliverables 2, 3, 5, 7 and Critical Review (confirmed findings table)
`.ai/memory/product.md` — Motivation layer principles; prohibited mechanics tiers
`.ai/memory/future.md` — Hypotheses this Epic is designed to test
