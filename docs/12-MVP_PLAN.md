# MVP Technical Plan

This document defines the scope of the MVP build. It is a planning document — no code, no database schema, no API design. It builds on the approved Domain Model (`docs/09-DOMAIN_MODEL.md`) and Trust Model (`docs/10-TRUST_MODEL.md`).

---

## 1. MVP Scope

### 1.1 Public website
A public-facing website is the only surface for MVP. No mobile app, no public/internal API exposure yet (those remain future platform per the domain model).

### 1.2 Five founder-curated binary comparisons
Exactly five Comparisons exist at launch, each strictly binary (Subject A vs Subject B), per the founder decision in `.ai/DECISIONS.md` (TASK-0007). All five Subjects/Comparisons are founder-curated; no user submission exists at MVP.

### 1.3 Anonymous voting
No account creation or login. Voting is lightweight/anonymous per the founder decision on Voter identity (TASK-0007) and the Trust Model's MVP posture (TASK-0010).

### 1.4 One vote per comparison per browser/session, where possible
Best-effort abuse prevention consistent with the Trust Model MVP posture — not bot-proof, not identity-verified, explicitly disclosed as a limitation (see §6).

### 1.5 Results page
A page per Comparison showing the current tally/outcome. Results are a direct, simple tally — no weighting, no trust-adjustment, no time-decay (those are Future Platform per the domain model's MVP vs Future table).

### 1.6 Basic transparency block
Displayed alongside results, per the Trust Model's Transparency Principle (TASK-0010):
- Total votes cast on that comparison.
- Source = website (disclosed plainly, since MVP has exactly one source).
- A clear disclaimer: results represent platform/community signals, not scientific polling.

### 1.7 TikTok acquisition path
- Each Comparison has a stable, shareable URL slug (e.g. a human-readable path identifying the comparison).
- TikTok videos (created and posted manually, outside this repository) link to that Comparison's page.
- This is a **distribution/acquisition pattern**, not an integration: the platform does nothing TikTok-specific beyond having a clean, shareable, linkable URL per Comparison.

### 1.8 Future n8n readiness (documented, not implemented)
No n8n workflow exists in MVP. This section documents where future automation could hook in, so the MVP doesn't need to be reworked later:
- `VoteCast` event (per Domain Model §8) is a natural future trigger for an n8n workflow (e.g. notify founder at vote-count milestones).
- `ComparisonCreated` / `ComparisonClosed` events could trigger future workflows (e.g. auto-posting prompts for new TikTok content when a comparison launches).
- Any future n8n hook should consume events/data the MVP already produces (vote tallies, comparison metadata) rather than requiring new MVP instrumentation — this is a documentation exercise now, not a build task.

---

## 2. Explicitly Out of Scope for MVP

- **TikTok API integration** — no automated posting, no API calls to TikTok; acquisition is manual, link-based only.
- **Authentication** — no accounts, no login, no verified identity (consistent with TASK-0007 founder decision).
- **AI automation** — no AI agents operate on MVP data; this is purely a Future Platform capability per the Domain Model and the AI Governance section of the Trust Model.
- **N-way comparisons** — strictly binary only (TASK-0007 founder decision).
- **User-submitted Subjects/Comparisons** — founder-curated only; moderation workflows are future (TASK-0007 founder decision).
- **Public/internal API, MCP server, n8n execution** — documented as future readiness only (§1.8); none are built or exposed in MVP.
- **Weighted/trust-adjusted results** — MVP shows simple tallies only.

---

## 3. Traceability to Prior Decisions

This plan does not introduce new product decisions — it sequences previously approved ones into a buildable scope:
- Domain Model (`docs/09-DOMAIN_MODEL.md`, TASK-0007) — binary comparisons, founder-curated Subjects, anonymous Voter.
- Trust Model (`docs/10-TRUST_MODEL.md`, TASK-0010) — abuse prevention floor, transparency block content, no AI automation without disclosure.

---

## 4. Founder Decisions (resolved)

1. **Documentation numbering gap (`docs/11`):** accepted as-is. The repository will not renumber to fill the gap; possible future renaming is deferred and not prioritized.
2. **Content of the five comparisons:** decided by the founder, not engineering. Topic restriction: **no sport, no politics, no religion**, to avoid unmanageable controversy while validating the product. Allowed topic space for MVP: **technology, products, and pop culture**. The specific five Subject pairs are a separate, upcoming founder decision, not part of this plan.
3. **URL slug format:** deferred to implementation time (the routing layer), as it is a technical, not strategic, decision.
