# Rules

Binding principles for any human or AI agent contributing to this repository.

## Engineering principles

- **API First** — every capability should be designed as an API contract before (or alongside) any UI.
- **AI First** — assume AI agents are first-class consumers and operators of this system, not an afterthought bolted on later.
- **Automation First** — prefer automated, repeatable processes (n8n workflows, scripts, CI) over manual steps.
- **Security First** — security is a default property of design, not a later pass.
- **GDPR by Design** — privacy and data protection are built in from the start, not retrofitted.
- **Event Driven** — favor event-based communication between components over tight coupling, to support future agents, workflows, and analytics consuming the same signals.
- **Transparency by Design** — decisions, data flows, and system behavior should be legible and documented, not hidden.

## Operating constraints

- Do not invent product features. Product scope is owned by the founder/product role, not by any AI agent.
- Do not install dependencies without explicit approval.
- Do not create application code without explicit approval.
- Document every important decision in `.ai/DECISIONS.md` (or `DECISIONS.md` at root, per current convention).

## Memory discipline

- Read `.ai/memory/INDEX.md` at the start of any session where you will write code or make architectural choices.
- Read your domain memory file (`.ai/memory/<domain>.md`) before executing tasks in that domain.
- Update memory when you discover a durable lesson — a pattern, pitfall, or heuristic that will still be true next year.
- Never write task history or event logs to memory files. Logs go in `.ai/log/AI_CHANGELOG.md`.
- Prefer deleting stale memory over letting it accumulate. A smaller, accurate memory is more valuable than a large, partially outdated one.
- Unvalidated ideas go in `.ai/memory/future.md`, not in domain files.
