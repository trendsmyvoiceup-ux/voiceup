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

## Communication discipline

The repository is the source of truth. Agent responses are implementation reports, not documentation.

**Output budget:** 200–500 words per response. Hard ceiling: ~700 words. Treat output tokens as a scarce resource.

**Standard output format:**

```
STATUS          — completed / partial / blocked
KEY DECISIONS   — max 5 bullets; only what cannot be inferred from code
FILES           — (+) created, (~) modified; names only when not obvious
EXPERIMENTS     — newly introduced experiments only
RISKS           — important risks only
BUILD           — result only
BLOCKERS        — only if they exist
```

**Never include:**
- Explanation of obvious implementation details
- Narration of the coding process
- Restatement of the prompt
- File-by-file listings when the diff is self-explanatory
- Line-by-line code description
- Justification of standard choices

**Only report** information the Founder cannot infer by reading the diff, commit, or code. If a decision is strategically important, explain it. Otherwise, remain silent on it.

## Memory discipline

- Read `.ai/memory/INDEX.md` at the start of any session where you will write code or make architectural choices.
- Read your domain memory file (`.ai/memory/<domain>.md`) before executing tasks in that domain.
- Update memory when you discover a durable lesson — a pattern, pitfall, or heuristic that will still be true next year.
- Never write task history or event logs to memory files. Logs go in `.ai/log/AI_CHANGELOG.md`.
- Prefer deleting stale memory over letting it accumulate. A smaller, accurate memory is more valuable than a large, partially outdated one.
- Unvalidated ideas go in `.ai/memory/future.md`, not in domain files.
