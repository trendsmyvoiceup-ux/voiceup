# Skill: Vision

Shared context every Content Factory agent should know before acting.

- Opinion Platform is an **opinion infrastructure startup**, not a polling
  website (see `.ai/PROJECT_CONTEXT.md`).
- The MVP is intentionally simple: founder-curated binary comparisons,
  anonymous voting, basic abuse prevention, honest disclosure that results
  are a community signal, not scientific polling (see `docs/12-MVP_PLAN.md`,
  `docs/10-TRUST_MODEL.md`).
- The platform is evolving toward a "Human Signal" exploration layer
  (Subjects, Categories), but the user journey remains battle-first — a new
  visitor should never need to understand Subjects/Categories/Signals before
  voting (TASK-0022 founder decision).
- Allowed MVP topic space: technology, products, pop culture. Never sport,
  politics, or religion (founder decision, TASK-0012).
- No backend, database, or external API integrations exist yet for content
  generation or publishing. Every agent in this Content Factory operates on
  static files only, pending future automation (n8n, MCP, real APIs).
