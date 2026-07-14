# Active Task

> One task at a time. Engineering Agent updates Status and Result inline.
> When Done, move summary to `.ai/log/AI_CHANGELOG.md`, then pull next task from BACKLOG.md.

---

## TASK-0042 — Signal Motivation Layer: public battle page V2

**Epic:** Epic 2 — Signal Motivation Layer: Experimental MVP
**Status:** Ready
**Owner:** Engineering Agent
**Opened:** 2026-07-14

### Objective

Implement the motivation layer on the public battle page (`/battle/[slug]`). Deliver a complete vote → reveal → reason flow that is testable against real voter behavior.

### Scope

- Post-vote reveal: results display after vote only, never before
- Minority / majority post-vote framing: neutral distinctiveness copy ("You're in the 29% who chose B — a distinctive view")
- Optional reason selection: preset options (3–5), zero-friction skip, no free text
- Wording configuration layer: all copy in a central config object, not hardcoded inline

### Acceptance criteria

- [ ] No vote results displayed before the user casts a vote
- [ ] Post-vote reveal shows correct percentage for both options
- [ ] Minority result copy uses distinctiveness framing (not loss/defeat language)
- [ ] Majority result copy is neutral (not "winning" language)
- [ ] Optional reason section has a visible, zero-friction skip
- [ ] Reason selection does not require login, profile, or any account action
- [ ] All display copy lives in a named config object in the component or a separate config file
- [ ] No gamification mechanics introduced (no streaks, points, badges, leaderboards)
- [ ] `pnpm build` passes from `apps/web/`
- [ ] Founder QA pass: full vote → reveal → reason flow works end-to-end

### Implementation notes

- Start from: `apps/web/src/app/battle/[slug]/page.tsx` (or equivalent route)
- Votes are currently localStorage-based — do not change the storage mechanism
- The reason selection result does not need to persist at MVP — localStorage is acceptable
- Follow V2 design language: dark, minimal, Linear/Vercel aesthetic; see `memory/product.md`
- Do NOT implement mission framing, contribution ladder, or pre-vote participation count
- Read `memory/product.md` motivation layer principles before implementing any copy
- Read `memory/compliance.md` prohibited mechanics list before implementing any engagement mechanic

### Research basis

`.ai/RESEARCH.md` — Deliverable 7 (MVP recommendation); Deliverable 5 (UX variants); Critical Review (confirmed findings)
`.ai/memory/product.md` — Post-vote reveal (non-negotiable), neutral framing, minority framing, prohibited mechanics
