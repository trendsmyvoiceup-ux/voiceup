# Backlog

> Ordered by priority. Top = highest priority.
> Owner: Product Agent writes and re-orders; Founder approves priority changes.
> Engineering Agent pulls from the top when TASK.md is empty.

---

## How to use this file

1. When `state/TASK.md` is marked Done, Engineering Agent reads this file
2. Takes the first `Ready` item, creates a task entry, sets status to `In Progress`
3. Updates `TASK.md` with the new active task
4. Updates `MANIFEST.md` current state table

---

## Queue

### P0 — Must do next

| ID        | Title                                      | Status    | Depends on  | Notes |
|-----------|--------------------------------------------|-----------|-------------|-------|
| TASK-0041 | Creator Studio: battle detail page layout  | Ready     | —           | `/studio/[slug]` still at max-w-5xl; align to max-w-7xl with V2 design language |

---

### P1 — High priority

| ID        | Title                                      | Status    | Depends on  | Notes |
|-----------|--------------------------------------------|-----------|-------------|-------|
| TASK-0042 | Public battle page V2                      | Ready     | —           | Apply V2 design language to /battle/[slug]; improve vote UX |
| TASK-0043 | Reviewer Agent: improve scoring rubric     | Ready     | —           | Current rubric is basic; add creativity, virality, factual accuracy dimensions |
| TASK-0044 | Pipeline: duplicate prevention             | Ready     | —           | Planner should check existing output/battles/ before generating a pair already run |
| TASK-0045 | Database schema: design + Prisma models    | Ready     | TASK-0007   | Blocked until DB tech finalized (DECISIONS.md: Neon/PostgreSQL chosen) |

---

### P2 — Medium priority

| ID        | Title                                      | Status    | Depends on  | Notes |
|-----------|--------------------------------------------|-----------|-------------|-------|
| TASK-0046 | API: votes endpoint (real, not stub)       | Ready     | TASK-0045   | REST API for voting; currently localStorage-based |
| TASK-0047 | Analytics placeholder → real data          | Ready     | TASK-0045   | Studio analytics section (Views/Votes/CTR) |
| TASK-0048 | Growth: TikTok posting workflow            | Backlog   | TASK-0041   | Manual posting checklist → semi-automated n8n workflow |
| TASK-0049 | MCP server: initial implementation         | Backlog   | TASK-0045   | Expose battles, votes, subjects as MCP resources |

---

### P3 — Backlog / Ideas

| ID        | Title                                      | Status    | Notes |
|-----------|--------------------------------------------|-----------|-------|
| TASK-0050 | Research: evaluate Gemma 4 vs Qwen 2.5    | Backlog   | Only when Gemma 4 stable in Ollama; current bar is 88.0/100 |
| TASK-0051 | Instagram publishing package               | Backlog   | After TikTok workflow proven |
| TASK-0052 | User-submitted battles (moderation flow)   | Backlog   | Requires trust/moderation infrastructure |
| TASK-0053 | Verified identity tier                     | Backlog   | See docs/10-TRUST_MODEL.md |
| TASK-0054 | Public API v1                              | Backlog   | After MCP server proven |

---

## Recently completed

| ID        | Title                                           | Completed   |
|-----------|-------------------------------------------------|-------------|
| TASK-0040 | AI Development OS Foundation                    | 2026-07-05  |
| —         | Creator Studio V2 (studio-dashboard + preview)  | 2026-07-05  |
| —         | Local LLM benchmark + Qwen 2.5 7B selection     | 2026-07-05  |
| —         | Reviewer Agent integration                      | 2026-07-04  |
| TASK-0030 | Battle Designer: real deterministic impl        | Prior       |
| TASK-0028 | Battle Control Room (/admin)                    | Prior       |
| TASK-0027 | Planner: real deterministic impl                | Prior       |
