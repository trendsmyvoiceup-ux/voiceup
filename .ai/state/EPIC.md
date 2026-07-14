# Active Epic

> One epic at a time. When this epic closes, the Founder declares the next one.
> Owner: Product Agent writes; Founder approves; Engineering Agent executes.

---

## Epic 0 — AI Development OS Foundation

**Status:** In Progress
**Opened:** 2026-07-05
**Goal:** Transform the repository into a self-describing communication bus that any AI agent can navigate without a human briefing.

### Why this matters

The project has outgrown ad-hoc collaboration. As agent count grows, every session currently starts with re-orientation. This epic eliminates that cost permanently.

### Scope

- MANIFEST.md — single entry point (current state at a glance)
- state/ — living work items (epic, task, backlog, review queue)
- roles/ — agent definitions (mission, reads, writes, KPIs)
- log/ — append-only AI changelog
- Deprecate AGENT_WORKFLOW.md and TASKS.md (superseded)

### Out of scope

- Application code changes
- Database changes
- Pipeline changes
- Studio changes

### Success criteria

- [ ] Any AI agent can orient itself by reading MANIFEST.md in < 60 seconds
- [ ] Every agent role has a definition file with mission, reads, writes, KPIs
- [ ] Active task is always obvious (state/TASK.md)
- [ ] Founder can understand project status in < 3 minutes from MANIFEST.md
- [ ] `pnpm build` passes unchanged

### Tasks

| ID        | Title                           | Status      |
|-----------|---------------------------------|-------------|
| TASK-0040 | Build AI Development OS         | In Progress |

### Review

When complete, Engineering Agent writes findings to `.ai/state/REVIEW.md`.
Founder reviews and marks epic Closed.
