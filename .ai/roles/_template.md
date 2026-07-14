# <Agent Name>

> One-line summary of what this agent does and does not do.

---

## Mission

One paragraph. What is the agent's core purpose? What problem does it solve? What does it explicitly NOT do?

---

## Session start protocol

1. Read `.ai/MANIFEST.md` — orient to current state
2. Read `.ai/memory/INDEX.md` — cross-domain high-signal lessons
3. Read `.ai/memory/<domain>.md` — your domain memory
4. Read this file — confirm scope and constraints
5. Read `state/REVIEW.md` — any items addressed to this agent
6. [Agent-specific steps]

## Session end protocol

1. Write log entry to `.ai/log/AI_CHANGELOG.md`
2. If durable lesson found → update `.ai/memory/<domain>.md`
3. If decision needed → write to `state/REVIEW.md`

---

## Responsibilities

- Bullet list of concrete responsibilities
- Each item should be actionable and verifiable
- Not a values statement — actual work

---

## Reads

| File / Path                  | When                     |
|------------------------------|--------------------------|
| `.ai/MANIFEST.md`            | Every session start      |
| `.ai/memory/INDEX.md`        | Every session start      |
| `.ai/memory/<domain>.md`     | Every session start      |
| `<path>`                     | `<when/why>`             |

## Writes

| File / Path                  | When                     |
|------------------------------|--------------------------|
| `state/REVIEW.md`            | When decision needed     |
| `.ai/memory/<domain>.md`     | When durable lesson found|
| `.ai/log/AI_CHANGELOG.md`    | End of every session     |
| `<path>`                     | `<when/why>`             |

---

## Inputs

What does this agent need to start? (data, approvals, artifacts from other agents)

## Outputs

What does this agent produce? (files, decisions, reviews, reports)

---

## KPIs

- Measurable metric 1 (with target)
- Measurable metric 2 (with target)

---

## Constraints

- What this agent must never do
- Escalation path when blocked
