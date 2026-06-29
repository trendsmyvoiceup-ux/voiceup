# Tasks

## Format

```
TASK-ID
Status: Not Started | In Progress | Blocked | Done
Objective: what this task achieves
Acceptance criteria: how we know it's done
Notes: context, links, caveats
```

## Current tasks

```
TASK-0005
Status: Not Started
Objective: Rename repository folder to opinion-platform.
Acceptance criteria: Repository folder renamed; all tooling/paths still function; change confirmed before commit.
Notes: Working name only, not the public brand. Pending founder approval to execute.
```

```
TASK-0006
Status: Not Started
Objective: Implement the monorepo folder structure (apps/, agents/, workflows/, packages/, analytics/, infra/, docs/, prompts/, scripts/, assets/, .github/).
Acceptance criteria: Folders created with placeholder/readme content; no application code added; structure matches approved architecture review.
Notes: Structure already proposed and approved in architecture review; not yet executed.
```

```
TASK-0007
Status: Completed
Objective: Design the domain model (core entities, relationships, vocabulary).
Acceptance criteria: Domain model documented (e.g. in docs/03-ARCHITECTURE.md or a dedicated doc); reviewed and approved before implementation.
Notes: Documented in docs/09-DOMAIN_MODEL.md. Confirmed by founder: TASK-0005 remains the repository rename; TASK-0007 is the domain model task. No history rewritten.
```

```
TASK-0008
Status: Not Started
Objective: Design the database model based on the domain model.
Acceptance criteria: Schema/entities documented in docs/04-DATABASE.md; storage technology decision recorded in DECISIONS.md.
Notes: Depends on TASK-0007.
```

```
TASK-0010
Status: Completed
Objective: Design the trust model (philosophy of trust, abuse prevention, transparency, GDPR-by-design, AI governance, threat model) — MVP vs Future.
Acceptance criteria: Documented in docs/10-TRUST_MODEL.md, separated into MVP/Future per section; no technical/database/API design included.
Notes: Request referred to this as "TASK-0008," but the existing queue already defines TASK-0008 as the database model task. Filed as TASK-0010 instead to avoid overwriting an existing task; flagged for founder confirmation. This work should logically precede TASK-0008 (database model), since trust requirements (immutability, audit log, rate limiting) inform schema design.
```

```
TASK-0009
Status: Not Started
Objective: Create the MVP app (users compare two entities and vote).
Acceptance criteria: MVP scope explicitly approved; implementation follows approved architecture, domain model, and database model.
Notes: Must not begin before TASK-0006/0007/0008 are complete and approved.
```

```
TASK-0012
Status: Completed (planning only — no code)
Objective: Define the MVP technical plan: public website, 5 founder-curated binary comparisons, anonymous voting, one vote per comparison per browser/session, results page, transparency block, TikTok acquisition path via shareable slugs, documented future n8n readiness.
Acceptance criteria: Documented in docs/12-MVP_PLAN.md; explicitly excludes TikTok API integration, authentication, and AI automation; traces back to approved Domain Model (TASK-0007) and Trust Model (TASK-0010); no code or schema written.
Notes: Founder confirmed the docs/11 numbering gap is acceptable and will not be filled retroactively. Founder also decided MVP comparison topics are restricted to technology, products, and pop culture (no sport, no politics, no religion); specific Subject pairs are a separate upcoming decision. URL slug format deferred to implementation/routing layer. TASK-0009 (build the MVP app) remains blocked on TASK-0006 and TASK-0008, and now also logically depends on this plan (TASK-0012).
```

```
TASK-0013
Status: Completed
Objective: Initialize a runnable local application: Next.js 15 + TypeScript + Tailwind + shadcn/ui + Prisma (schema only) + PostgreSQL/Neon (no live connection required) + pnpm. Homepage shows "Opinion Platform / Coming soon / Repository initialized successfully." No business logic, auth, voting, API, tables, or seed.
Acceptance criteria: `pnpm dev` starts successfully and serves the homepage; `pnpm build` succeeds; Prisma schema has no models; no DB connection required to build/run.
Notes: Scaffolded at apps/web/ (monorepo convention from TASK-0006, executed ahead of full TASK-0006 since this is the first app). pnpm enabled locally via corepack (was not previously installed). Verified via `pnpm build` and a local `pnpm dev` smoke test (HTTP 200), then stopped.
```

```
TASK-0027
Status: Completed
Objective: Implement the first real (non-stub) Content Factory agent — the Planner. Given a category name, deterministically select two Subjects from a static catalog and write a conforming proposal to output/proposals/<slug>.json (subjectA, subjectB, category, title, rationale). No LLM, no randomness.
Acceptance criteria: `scripts/planner.ts` implements the real logic; `scripts/run-pipeline.ts` accepts a category argument and wires the Planner into the existing fan-out pipeline (Battle Designer, Website, Publisher remain stubs); `node scripts/run-pipeline.ts technology` produces output/proposals/apple-vs-android.json and completes all four steps; `pnpm build` unaffected.
Notes: Catalog lives in scripts/catalog.ts as a manually-maintained snapshot of apps/web/src/lib/comparisons.ts (founder decision: acceptable as a temporary duplication, no shared package yet). Founder confirmed one-pair-per-category lookup is acceptable for this first version; multi-option selection and duplicate avoidance against existing battles/proposals are explicitly deferred, not required now.
```

```
TASK-0028
Status: Completed
Objective: Build an internal Battle Control Room at /admin: lists all battles (title, slug, category, website URL, proposal existence, Battle Package existence), local-only status actions (Draft/Ready/Paused/Archived via localStorage), quick links (battle page, Subject A, Subject B), and a Content Factory section showing proposals/battle-packages/published/reports counts read from the local filesystem.
Acceptance criteria: No auth, no database, no external APIs, no TikTok publishing; visible warning banner ("Internal prototype. Local state only. Not production admin."); `pnpm build` succeeds with /admin as a new route; not linked from public navigation.
Notes: Founder confirmed this task is TASK-0028, not TASK-0027 (TASK-0027 is the Planner agent above — initially misnumbered in the originating request, corrected here). Founder confirmed filesystem reads on every request (force-dynamic) are acceptable for this internal prototype, and that /admin should remain unlinked from public navigation for now.
```
