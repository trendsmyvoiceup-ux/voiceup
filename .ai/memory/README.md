# Agent Memory System

> Memory is distilled knowledge. It is not history. It is not a log. It is what survives.

---

## What this system is

The `.ai/memory/` directory is a long-lived knowledge layer. It accumulates what AI agents and the Founder have learned — stripped of context, dates, and narrative — into reusable principles, patterns, and heuristics.

An agent that reads its memory file before executing a task inherits years of prior work without reading a single log entry.

---

## The distinction that matters

| Concept   | Definition                                      | Lives in                        |
|-----------|-------------------------------------------------|---------------------------------|
| **Log**   | What happened, when, by whom                    | `.ai/log/AI_CHANGELOG.md`       |
| **Decision** | What was decided and why, with full context  | `DECISIONS.md` (root)           |
| **Rule**  | A binding constraint on all agents              | `.ai/RULES.md`                  |
| **Memory** | What has been learned — distilled, timeless    | `.ai/memory/<domain>.md`        |
| **Hypothesis** | Something believed but not yet proven      | `.ai/memory/future.md` only     |

A lesson belongs in memory when it:
- Can be applied immediately by a future agent with no additional context
- Would prevent a mistake or shortcut a decision that cost hours to reach
- Is general enough to survive beyond the specific task that generated it

A lesson does NOT belong in memory when it:
- Describes what was done in a specific task (→ log)
- Is a product or architecture decision with rationale (→ DECISIONS.md)
- Is a binding rule that applies to all agents (→ RULES.md)
- Has not yet been validated in practice (→ future.md)

---

## File structure

| File             | Domain                              | Audience                    |
|------------------|-------------------------------------|-----------------------------|
| `INDEX.md`       | Cross-domain high-signal index      | All agents — read first     |
| `engineering.md` | Code, architecture, tooling         | Engineering Agent           |
| `product.md`     | UX, design, product heuristics      | Product Agent, Engineering  |
| `business.md`    | Strategy, positioning, economics    | Product Agent, Founder      |
| `research.md`    | Models, external findings, data     | Research Agent, Engineering |
| `compliance.md`  | GDPR, AI Act, trust, security       | Compliance Agent, all       |
| `growth.md`      | Acquisition, content, virality      | Growth Agent, Media Agent   |
| `media.md`       | Prompts, creative, brand            | Media Agent                 |
| `future.md`      | Open hypotheses, unvalidated ideas  | All agents — treat as draft |

---

## Entry format

Every entry in a domain file follows this structure:

```markdown
### <Lesson title> (descriptive noun phrase)

<Distilled knowledge in 1–5 sentences or bullets.>
Lead with the most actionable part.
Do not explain the task that generated this lesson.
Write as if addressing a new agent on day one.

**Why it matters:** (optional — add only when non-obvious)
```

Organize entries under `##` section headers (sub-domain or theme). Headers are the navigation — make them specific.

---

## When to update memory

**Update memory** when, during a session, you discover:
- A pattern that repeated across two or more tasks (extract the pattern)
- A pitfall that cost significant time to diagnose (record the diagnosis)
- A convention that was established for the whole project (not just a task)
- A technology finding that will still be true next year

**Do not update memory** when:
- The lesson is task-specific (it goes in the log or task result)
- The lesson is a product decision (it goes in DECISIONS.md)
- You're unsure if the lesson will hold — put it in `future.md` instead

**How to add an entry:**
1. Find the relevant domain file and section
2. Add the entry in the format above
3. If no section fits, add a new `##` section
4. Update `INDEX.md` if the lesson is one of the highest-signal across all domains

---

## How to keep memory healthy

- **Prefer principles over examples.** "Tailwind v4 uses `@import` not config" is a principle. "We used this in the studio redesign" is an example. Keep the principle, drop the example.
- **Merge duplicates.** If two entries say similar things, combine them.
- **Retire stale entries.** Technology changes. If a lesson is no longer true, delete it. Stale memory is worse than no memory.
- **Promote from future.md.** When a hypothesis is validated, move it to the appropriate domain file.
- **Do not grow memory for its own sake.** Fifty sharp lessons are more valuable than five hundred mediocre ones.

---

## Memory in the agent workflow

```
Read MANIFEST.md
  ↓
Read memory/INDEX.md          ← cross-domain high-signal scan
  ↓
Read memory/<your-domain>.md  ← domain-specific depth
  ↓
Read state/TASK.md
  ↓
Execute
  ↓
Write log entry
  ↓
If durable lesson found → update memory/<domain>.md (and INDEX.md if top-tier)
```
