# Domain Model

This document defines the company's domain model using Domain-Driven Design (DDD) principles.

**Framing:** we are not building a polling website. We are building **trusted opinion infrastructure** — a system whose long-term purpose is to capture, structure, and expose comparative human judgment (opinions, preferences, rankings) in a way that is trustworthy, automatable, and consumable by humans, APIs, and AI agents alike. The MVP (compare two entities, vote) is the smallest expression of that infrastructure, not its definition.

---

## 1. Core Business Concepts

- **Entity (subject of opinion)** — anything that can be compared or judged (e.g. a product, a person, a place, an idea). Distinct from a DDD "Entity" object — see §7 for disambiguation; this document uses "Subject" going forward to avoid collision.
- **Comparison** — a structured act of putting two (or more, in the future) Subjects against each other for judgment.
- **Vote** — a single unit of judgment cast by a Voter on a Comparison.
- **Voter** — an identity (human or, in the future, agent-mediated) capable of casting a Vote.
- **Opinion Signal** — the aggregated, derived result of Votes over time; the actual valuable output of the system.
- **Trust** — the system's confidence in the integrity of a Vote, Voter, or Opinion Signal (e.g. resistance to manipulation, bots, brigading).
- **Topic / Category** — a classification grouping Subjects and Comparisons for relevance and discovery.

---

## 2. Core / Supporting / Generic Domains

DDD classifies subdomains by strategic importance to focus design effort where it matters most.

### Core domain (where competitive advantage lives)
- **Opinion Aggregation & Trust** — collecting votes, deriving signals, and guaranteeing their integrity. This is the company's reason to exist.
- **Comparison Modeling** — how Subjects and Comparisons are structured so that opinion signals remain meaningful and comparable over time and across domains.

### Supporting domains (necessary, not differentiating, but owned by us)
- **Identity & Voter Trust** — managing who a Voter is and how much their vote should count.
- **Subject Catalog** — managing the canonical set of comparable Subjects (creation, deduplication, metadata).
- **Distribution & Automation** — exposing opinion signals outward (APIs, agents, workflows) and pulling data inward (n8n, MCP, agents).

### Generic domains (solved problems, candidates for off-the-shelf solutions)
- **Authentication** — login/session mechanics.
- **Notifications** — email/push delivery.
- **Analytics instrumentation** — event collection plumbing (not the opinion signals themselves, which are core).

---

## 3. Ubiquitous Language

A shared, precise vocabulary to be used consistently in code, docs, and conversation — avoiding generic "poll/quiz" language, which undersells the system's purpose.

| Term | Definition |
|---|---|
| Subject | A thing that can be the object of an opinion (replaces generic "entity" to avoid DDD ambiguity). |
| Comparison | A structured face-off between two or more Subjects. |
| Vote | A single judgment cast on a Comparison by a Voter. |
| Voter | An identity capable of casting Votes. |
| Opinion Signal | Aggregated, derived output computed from Votes. |
| Trust Score | A measure of confidence in a Voter, Vote, or Signal. |
| Topic | A categorization used to group Subjects/Comparisons. |
| Contribution | Any Voter action that produces data (a Vote, a Subject submission, a report/flag). |

This vocabulary should be used verbatim across `docs/`, `.ai/`, and any future code or API naming — not reinterpreted per-component.

---

## 4. Bounded Contexts

Each context owns its own model of the world; terms can mean subtly different things across boundaries — that's expected and acceptable in DDD.

1. **Comparison Context** — owns Subjects, Comparisons, and the rules for how they're constructed and presented.
2. **Voting Context** — owns the act of voting: Vote, Voter session, eligibility rules.
3. **Trust & Integrity Context** — owns fraud/bot detection, Trust Score computation, anti-manipulation rules. Consumes Voting Context data but is conceptually separate because its rules evolve independently and fast.
4. **Signal Aggregation Context** — owns turning raw Votes into Opinion Signals (rankings, scores, trends). Downstream of Voting + Trust.
5. **Identity Context** — owns who a Voter is across the system (generic domain, likely to use external/standard tooling).
6. **Distribution Context** — owns exposing Opinion Signals and accepting structured input via public/internal APIs, MCP server, and n8n workflows. This is the seam where AI agents and automation plug in.
7. **Catalog Context** — owns the canonical lifecycle of Subjects independent of any single Comparison (creation, merging duplicates, metadata enrichment).

Bounded context boundaries are intentionally drawn around **rate and reason of change**, not around current team structure (there is no team yet) — e.g. Trust & Integrity is separated from Voting because anti-fraud logic will change far more often, and for different reasons, than the act of voting itself.

---

## 5. Aggregates

(Conceptual aggregates — not a database or persistence design.)

- **Comparison Aggregate** — root: `Comparison`. Owns the set of Subjects being compared in that instance and the rules governing it (e.g. is it still open). Votes do not belong inside this aggregate — they reference it.
- **Vote Aggregate** — root: `Vote`. A single immutable judgment; small and append-only by nature, which matters for trust/audit later.
- **Subject Aggregate** — root: `Subject`. Owns its own identity/metadata lifecycle, independent of any Comparison it appears in.
- **VoterProfile Aggregate** — root: `Voter`. Owns identity and trust-relevant attributes (not raw auth credentials, which belong to the generic Identity context).
- **OpinionSignal Aggregate** — root: `OpinionSignal`. A derived, recomputable aggregate — conceptually a projection, not a primary source of truth (Votes are the source of truth).

Keeping `Vote` immutable and `OpinionSignal` derived/recomputable is a deliberate trust property: signals must always be reproducible from the underlying votes.

---

## 6. Value Objects

Immutable, identity-less concepts defined entirely by their attributes:

- **TrustScore** — a value (and the rules that produced it), not an entity with its own lifecycle independent of its inputs.
- **ComparisonOutcome** — the resolved result of a single Vote (e.g. "Subject A preferred over Subject B").
- **TimeWindow** — a period over which an Opinion Signal is computed (e.g. "last 30 days").
- **Topic Tag** — a label value, not an entity, even though Topics may later need their own lifecycle (see open questions).

---

## 7. Domain Entities

(DDD sense: objects with identity that persists over time, as distinct from "Subject" defined in §1.)

- **Subject** — has identity persisting across all Comparisons it appears in.
- **Comparison** — has identity, lifecycle (open/closed), and history.
- **Voter** — has identity persisting across all Votes cast.
- **Vote** — arguably an entity with identity (for audit/trust purposes) despite being immutable — identity matters even though state never changes after creation.

---

## 8. Domain Events

Named in past tense, representing facts that happened — the natural seam for automation, n8n workflows, AI agents, and analytics to subscribe to (per the Event Driven principle in `.ai/RULES.md`).

- `SubjectCreated`
- `SubjectMerged` (duplicate resolution)
- `ComparisonCreated`
- `ComparisonClosed`
- `VoteCast`
- `VoteFlaggedAsSuspicious`
- `TrustScoreRecalculated`
- `OpinionSignalRecomputed`
- `VoterRegistered`

These events are the intended foundation for the Event Driven principle — every context above should be designed to emit and consume these rather than relying on synchronous coupling, so that future agents/workflows/analytics can attach without modifying core logic.

---

## 9. MVP vs. Future Platform

| Capability | MVP | Future Platform |
|---|---|---|
| Subjects | Founder-curated only, simple metadata | Rich catalog, user-proposed (moderated), deduplication, enrichment |
| Comparison | Strictly binary: Subject A vs Subject B | N-way comparisons, ranked choice, varied formats |
| Voter | Lightweight/anonymous voting, no verified account required | Full trust scoring, verified identity tiers |
| Topic | Simple tag / value object | Possibly promoted to full entity/aggregate, if proven necessary |
| Opinion Signal | Simple tally/percentage, with disclosure that results are platform/community signals, not scientific polling | Weighted, trust-adjusted, time-decayed signals |
| Distribution | None (web-only display) | Public API, internal API, MCP server, n8n workflows |
| Automation | None | AI agents consuming/producing signals and comparisons |
| Trust & Integrity | Basic abuse prevention: one vote per comparison per browser/session where possible, source tracking, immutable vote records, audit log, server-side IP/rate limiting, basic anomaly flags | Full Trust & Integrity bounded context, verified-identity upgrade path |

The MVP intentionally implements a thin vertical slice through Comparison and Voting contexts only. It must still emit the Domain Events in §8 from day one, even with simple internal logic — this is what keeps the future platform additive rather than a rewrite.

### Founder decisions locked for MVP (TASK-0007)

- **Voter identity:** lightweight/anonymous voting allowed; no verified account required. Abuse prevention instead relies on one-vote-per-comparison-per-browser/session (where possible), source tracking, audit log, and server-side IP/rate limiting. A future upgrade path to verified identity is assumed, not designed yet.
- **Topic:** remains a simple tag/value object for MVP; not promoted to an entity/aggregate.
- **Comparison shape:** strictly binary (A vs B) for MVP; N-way comparison is future-only.
- **Trust/anti-fraud floor for MVP:** source tracking, immutable vote records, audit log, rate limiting, basic anomaly flags, and a clear user-facing disclosure that early results represent platform/community signals, not scientific polling.
- **Subject creation:** founder-curated only at MVP. User-proposed Subjects/Comparisons are a future capability and will require a moderation workflow — explicitly out of MVP scope.

---

## 10. Concepts to Reject (Unnecessary Complexity)

Explicitly out of scope to prevent premature complexity:

- **Multi-tenant white-labeling** — not a real need until proven by demand.
- **Real-time live voting infrastructure** (e.g. sub-second leaderboard updates) — not required for trust or for the MVP's value proposition.
- **Complex ranking algorithms (e.g. ELO, Bayesian ranking)** at MVP stage — start with simple, explainable tallies; sophistication can be added inside the Signal Aggregation context later without changing the domain model.
- **Treating "Topic" as a heavyweight entity with its own workflow** at MVP stage — a simple tag/value object is sufficient until proven otherwise.
- **Building a generic "survey/poll builder"** — this would pull the product back toward "polling website," which is explicitly rejected as the company's identity.

---

## 11. Open Architectural Questions

Questions 1–5 below were resolved by founder decision (see `.ai/DECISIONS.md`) and are kept here for traceability, not as open items.

1. ~~Does "Voter" require verified human identity at MVP?~~ **Resolved:** lightweight/anonymous voting allowed at MVP; basic abuse prevention required; verified identity is a future upgrade path.
2. ~~Should `Topic` be promoted to a full entity/aggregate?~~ **Resolved:** stays a simple tag/value object for MVP.
3. ~~Is N-way comparison near-term or future-only?~~ **Resolved:** future-only; MVP is strictly binary.
4. ~~What is the minimum trust/anti-fraud bar at MVP?~~ **Resolved:** source tracking, immutable vote records, audit log, rate limiting, basic anomaly flags, and disclosure that results are platform/community signals, not scientific polling.
5. ~~Who may create a Subject at MVP?~~ **Resolved:** founder-curated only; user proposals are future and require moderation.

### Remaining open questions
- None outstanding from this round. New architectural questions should be appended here as they arise.
