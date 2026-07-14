# Human Signal — AI Development OS Manifest

> **Every agent reads this file first. It is the single entry point.**
> Updated at the end of every engineering session by the Engineering Agent.

---

## Project

**Human Signal** — opinion infrastructure. Not a polling website. A platform for capturing, structuring, and publishing human signals at scale.

Working repo name: `opinion-platform`
Public brand: Human Signal
Stack: Next.js 15 · TypeScript · Tailwind v4 · Prisma · PostgreSQL · Ollama (Qwen 2.5 7B)

---

## Current State

| Field            | Value                                      |
|------------------|--------------------------------------------|
| Milestone        | Internal Operations                        |
| Active Epic      | Epic 0 — AI Development OS Foundation     |
| Active Task      | TASK-0040 (this file)                      |
| Last Completed   | Creator Studio V2 (battle-preview-panel)   |
| Build            | ✅ Passing                                 |
| Last Updated     | 2026-07-05                                 |

---

## Quick Navigation

| What you need              | Where to look                            |
|----------------------------|------------------------------------------|
| High-signal lessons (all)  | `.ai/memory/INDEX.md`                    |
| Your domain memory         | `.ai/memory/<domain>.md`                 |
| What to build next         | `.ai/state/TASK.md`                      |
| Active epic scope          | `.ai/state/EPIC.md`                      |
| Prioritized backlog        | `.ai/state/BACKLOG.md`                   |
| Awaiting founder review    | `.ai/state/REVIEW.md`                    |
| Your agent definition      | `.ai/roles/<your-role>.md`               |
| Binding rules              | `.ai/RULES.md`                           |
| Architecture decisions     | `DECISIONS.md` (root) · `.ai/DECISIONS.md` (summary) |
| Memory system guide        | `.ai/memory/README.md`                   |
| Pipeline contract          | `agents/shared/CONTRACT.md`              |
| Business vision            | `docs/00-VISION.md`                      |
| Architecture               | `docs/03-ARCHITECTURE.md`                |
| Domain model               | `docs/09-DOMAIN_MODEL.md`                |
| Trust model                | `docs/10-TRUST_MODEL.md`                 |
| Roadmap                    | `docs/08-ROADMAP.md`                     |
| What agents did (log)      | `.ai/log/AI_CHANGELOG.md`                |

---

## Pipeline Status (Content Factory)

```
Founder → Planner → Battle Designer → Reviewer → [Website · Publisher] → Report
```

- **Planner:** Real (Qwen 2.5 7B local LLM, `PLANNER_MODE=local-llm`)
- **Battle Designer:** Real (deterministic templates)
- **Reviewer:** Real (Qwen 2.5 7B)
- **Website:** Real
- **Publisher:** Real (TikTok package output)
- **Report:** Real

Run: `PLANNER_MODE=local-llm node scripts/run-pipeline.ts <category>`

---

## Active Agents

| Role               | Current Assignment           | Definition                          |
|--------------------|------------------------------|-------------------------------------|
| Engineering Agent  | TASK-0040 (Epic 0 build)     | `.ai/roles/engineering-agent.md`    |
| Product Agent      | Epic 0 review (pending)      | `.ai/roles/product-agent.md`        |
| Media Agent        | Idle — awaiting content run  | `.ai/roles/media-agent.md`          |

---

## Next Action

After Epic 0 is complete and reviewed by Founder:

1. Founder declares next epic in `.ai/state/EPIC.md`
2. Product Agent populates `.ai/state/BACKLOG.md` with tasks
3. Engineering Agent picks up first task from backlog → writes to `.ai/state/TASK.md`
4. Cycle repeats

---

## How to Update This File

At the end of every engineering session, update:
- `Current State` table (milestone, active epic, active task, last completed, build status, date)
- `Active Agents` table if assignments changed
- `Next Action` if the next step changed

Do not add prose. Keep this file scannable in under 60 seconds.
