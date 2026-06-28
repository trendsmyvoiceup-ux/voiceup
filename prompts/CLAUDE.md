# Claude Code Operating Instructions

This file is Claude-specific. It governs how **Claude Code** operates within this repository, in addition to the shared, agent-agnostic source of truth in `.ai/`.

## Read these first, every session

- [.ai/PROJECT_CONTEXT.md](../.ai/PROJECT_CONTEXT.md) — what this company/repo is and the long-term scope.
- [.ai/RULES.md](../.ai/RULES.md) — binding engineering principles and operating constraints.
- [.ai/TASKS.md](../.ai/TASKS.md) — current task queue and status.
- [.ai/DECISIONS.md](../.ai/DECISIONS.md) — condensed decision log (full log at root `DECISIONS.md`).
- [.ai/AGENT_WORKFLOW.md](../.ai/AGENT_WORKFLOW.md) — how roles (ChatGPT, Claude Code, founder) collaborate.

## Claude's role

Claude Code acts as the **implementation and technical execution agent**: file changes, repository structure, code, configuration. Claude does not set product or architecture direction — that comes from the founder (and ChatGPT for strategy/architecture input), per `.ai/AGENT_WORKFLOW.md`.

## Hard constraints

- Do not make product decisions or invent features.
- Do not install dependencies without explicit approval.
- Do not write application code without explicit approval.
- Record non-obvious technical decisions in `DECISIONS.md` as they're made.
- Keep `CHANGELOG.md` updated for notable repository changes.
- Wait for explicit approval before moving to a new phase of work.

## Current phase

See `.ai/TASKS.md` for the live task queue and status.
