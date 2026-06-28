# Trust Model

This document defines the **philosophy** of trust on this platform — not its technical implementation. We are building trusted opinion infrastructure, not a polling website; trust is the product's core differentiator, not a feature bolted onto voting.

Database and API design are explicitly out of scope here (see `docs/04-DATABASE.md` and future API docs).

---

## 1. What "Trust" Means on This Platform

Trust is the platform's guarantee that an Opinion Signal reflects genuine, independent judgment — not manipulation, automation abuse, or misrepresentation of who/how many actually expressed a view.

- **MVP:** Trust means *honesty about limitations*. The platform does not yet claim statistical rigor — it claims that votes are recorded faithfully, immutably, and with basic safeguards against trivial abuse.
- **Future:** Trust means *verifiable integrity* — the platform can demonstrate, not just assert, that a signal is resistant to manipulation, with graded confidence levels exposed to consumers (humans, APIs, agents).

---

## 2. Sources of Trust

Where trust is derived from.

- **MVP:** Process integrity (immutable records, audit logs) and transparency (disclosure of method and limitations) are the sources of trust — not the Voter's identity, which is intentionally lightweight.
- **Future:** Additional sources: verified identity tiers, historical Voter behavior, cross-validation across signals, and potentially external attestation (e.g. verified professional/expert status relevant to a Topic).

---

## 3. Signals of Trust

Observable indicators used to assess trust (conceptually — not the storage/computation mechanism).

- **MVP:** Session/browser-level vote uniqueness, source/referrer tracking, request rate, basic timing patterns (e.g. implausibly fast voting).
- **Future:** Voter reputation history, device/network fingerprint diversity across a Voter's activity, agreement/disagreement patterns with known-trustworthy cohorts, verified-identity status.

---

## 4. Reputation Model

Whether and how a Voter's trust changes over time.

- **MVP:** No persistent Voter reputation. Every Vote is evaluated independently using session-level and rate-based signals only — there is no concept of a Voter "building" trust yet.
- **Future:** Voters accumulate a reputation informed by consistency, longevity, and verification status. Reputation should be a *weight* on influence, never a *gate* on participation — everyone can still vote; trusted voters' signals may simply carry more analytical weight.

---

## 5. Abuse Prevention

- **MVP:** One vote per comparison per browser/session where technically feasible, source tracking, server-side rate limiting, basic anomaly flags (e.g. burst voting from one source). No claim of bot-proofness.
- **Future:** Layered defenses — behavioral analysis, optional verified identity for higher-weight participation, coordinated-manipulation detection (brigading patterns across many sessions), graduated response (flagging vs. soft-discounting vs. blocking) rather than binary allow/block.

---

## 6. Transparency Principles

- **MVP:** The platform discloses, plainly and near the data itself, that results represent **platform/community signals, not scientific polling**. Methodology limitations are stated, not hidden.
- **Future:** Publish a versioned, public methodology describing how signals are computed and what trust safeguards are active at any given time; disclose meaningful changes to method as they happen.

---

## 7. Explainability Principles

- **MVP:** A Voter or observer can understand, in plain language, *what a vote contributes to* (a binary comparison tally) — no opaque scoring.
- **Future:** Any weighting or trust-adjustment applied to a signal should be explainable in principle (even if the full algorithm isn't public) — no black-box scoring that cannot be justified if questioned, including to regulators or to AI agents consuming the signal who may need to reason about its reliability.

---

## 8. Moderation Philosophy

- **MVP:** Founder-curated Subjects only (per domain model decision) — moderation is implicit because there is no open submission surface yet. Abuse response at MVP is limited to the technical safeguards in §5, not content moderation.
- **Future:** When user-proposed Subjects/Comparisons are introduced, moderation should be: proportionate (light-touch by default), transparent (clear criteria, not arbitrary), and appealable (a rejected proposal can be contested). Moderation is a trust mechanism, not a censorship mechanism — it exists to protect signal integrity, not to control opinions expressed through votes.

---

## 9. GDPR-by-Design Principles

- **MVP:** Collect the minimum data necessary to support abuse prevention (e.g. session identifiers, coarse rate-limiting signals) — not full behavioral profiles. Lightweight/anonymous voting is itself a privacy-protective default, not just a UX choice.
- **Future:** As verified identity and reputation are introduced, apply purpose limitation (data collected for trust must be used for trust, not repurposed silently), data minimization, retention limits, and clear user rights (access/erasure) by design from the first verified-identity feature, not retrofitted after the fact.

---

## 10. AI Governance Principles

Relevant because this platform is explicitly AI-first (per `.ai/RULES.md`) and Opinion Signals will be consumed by AI agents via APIs/MCP.

- **MVP:** Any AI agent (internal or external) consuming platform data must receive the same disclosure a human would — that signals are platform/community signals, not scientific polling. No silent laundering of informal signals into "data" that appears authoritative once it passes through an agent.
- **Future:** Define what AI agents are permitted to do *autonomously* (e.g. surface signals, summarize trends) versus what requires human-in-the-loop (e.g. actions with real-world consequence derived from signals). Agents should be able to query and represent the platform's own confidence/trust level in a signal, not just its raw value.

---

## 11. Future Verification Model

- **MVP:** No verification tiers exist. Voting is anonymous/lightweight by design (founder decision, TASK-0007).
- **Future:** A tiered model is anticipated — e.g. anonymous → session-verified → identity-verified → domain-expert-verified — where higher tiers may carry more analytical weight in signals, never more *right to participate*. Exact tiers and verification methods are intentionally undesigned at this stage.

---

## 12. Threat Model

Philosophical framing of threats, not technical countermeasure design.

| Threat | MVP posture | Future posture |
|---|---|---|
| **Spam votes** | Mitigated by session-level uniqueness + rate limiting; accepted residual risk, disclosed via transparency principle. | Behavioral + reputation-informed detection; graduated response. |
| **Bots** | Not strongly defended against at MVP; basic anomaly flags only; explicitly disclosed as a current limitation. | Stronger behavioral/device-diversity signals; optional verified tiers reduce bot impact on weighted signals. |
| **Brigading (coordinated mass voting)** | Acknowledged as a known MVP weakness; mitigated only by basic rate/source signals. | Coordinated-pattern detection across sessions/sources; soft-discounting of suspicious clusters rather than hard blocking. |
| **Manipulation by interested parties** (e.g. a Subject's stakeholders voting for themselves) | Disclosed risk; no special defense at MVP beyond general abuse prevention. | Conflict-of-interest-aware trust scoring once verified identity exists. |
| **Fake accounts** | Largely moot at MVP since no verified accounts exist — risk shifts to session/device-level abuse instead. | Identity verification tiers directly address this; reputation model penalizes detected fake-identity clusters. |

The unifying philosophy across all threats: **at MVP, disclose limitations honestly rather than overclaim protection; at Future stage, make trust mechanisms layered, weighted, and explainable rather than binary and opaque.**
