# Decisions (AI-facing summary)

This is a condensed, agent-facing summary of key decisions. The full decision log with rationale lives in `DECISIONS.md` at the repository root — that file remains the source of truth; this one is a quick-reference for AI agents.

## Summary

- Repository foundation (docs, templates, contribution process) was created first, before any application code.
- No application code exists yet.
- The repository will follow a monorepo strategy to support web, mobile, APIs, AI agents, n8n workflows, MCP server, analytics, and background workers under one roof.
- Working repository name: `opinion-platform` (technical name, explicitly not the future public brand).
- Architecture must support future automation, n8n workflows, AI agents, and an MCP server — these are not afterthoughts and should not be designed out by early architecture choices.

## Founder decisions — TASK-0007 (Domain Model)

- **Task ID:** TASK-0005 remains the repository rename; TASK-0007 is the domain model task. No history rewritten.
- **Voter identity at MVP:** lightweight/anonymous voting allowed; no verified account required. Basic abuse prevention instead: one vote per comparison per browser/session where possible, source tracking, audit log, server-side IP/rate limiting. Verified identity is a future upgrade path, not designed yet.
- **Topic:** stays a simple tag/value object for MVP; not promoted to a full entity/aggregate.
- **Comparisons:** strictly binary (Subject A vs Subject B) at MVP; N-way comparisons are future-only.
- **Minimum trust/anti-fraud bar for MVP:** source tracking, immutable vote records, audit log, rate limiting, basic anomaly flags, and clear disclosure that early results represent platform/community signals, not scientific polling.
- **Subject creation at MVP:** founder-curated only. User-proposed Subjects/Comparisons are future and require a moderation workflow not in MVP scope.

## Trust Model — TASK-0010 (requested as "TASK-0008"; filed as TASK-0010, pending founder confirmation)

- Trust philosophy documented in docs/10-TRUST_MODEL.md, MVP vs Future for every section: definition of trust, sources/signals of trust, reputation, abuse prevention, transparency, explainability, moderation, GDPR-by-design, AI governance, future verification tiers, and threat model.
- MVP trust posture: honesty about limitations (no claim of statistical rigor or bot-proofness), session/rate-based abuse prevention only, no persistent Voter reputation, founder-curated moderation (implicit, no open submission yet).
- Future trust posture: layered/weighted trust (never gatekeeping participation), verified-identity tiers, explainable trust-adjustment, proportionate and appealable moderation once open submission exists.
- AI governance principle established: AI agents consuming platform signals must receive the same "not scientific polling" disclosure as humans; no laundering informal signals into authoritative-looking data via an agent.

## MVP Technical Plan — TASK-0012

- MVP scope locked: public website only; 5 founder-curated binary comparisons; anonymous voting; one vote per comparison per browser/session where possible; results page; transparency block (total votes, source = website, "not scientific polling" disclaimer); shareable per-comparison URL slugs for TikTok-driven acquisition (link-only, no API integration).
- Explicitly excluded from MVP: TikTok API integration, authentication, AI automation, N-way comparisons, user-submitted Subjects, public/internal API, MCP server, n8n execution, weighted/trust-adjusted results.
- Future n8n hooks documented (not implemented): `VoteCast`, `ComparisonCreated`, `ComparisonClosed` events identified as future workflow triggers, consuming data the MVP already produces.
- Documented in docs/12-MVP_PLAN.md, traceable to Domain Model (TASK-0007) and Trust Model (TASK-0010) decisions.

## Founder follow-up decisions — TASK-0012

- **Docs numbering gap at `docs/11`:** accepted, will not be filled retroactively. Renumbering, if ever done, is deferred and not prioritized.
- **Topic restriction for MVP comparisons:** no sport, no politics, no religion — to avoid unmanageable controversy while validating the product. Allowed MVP topic space: technology, products, pop culture. The specific five Subject pairs remain a separate upcoming founder decision.
- **URL slug format:** deferred to implementation time (routing layer); explicitly not a strategic decision.
