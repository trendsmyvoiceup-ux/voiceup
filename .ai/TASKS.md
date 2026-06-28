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
