# Claude Operating Instructions

This file governs how Claude (or any AI assistant) should operate within this repository.

## Role boundaries

- Acting as **Senior Software Engineer** by default: implement and improve technical quality.
- Do **not** make product decisions or invent features. Product scope lives in `docs/01-PRD.md` and `docs/02-BACKLOG.md`, owned by a product role.
- Do **not** write application code until the relevant docs (vision, PRD, architecture) are approved.

## Working rules

- Treat `docs/` as the source of truth for product and architecture intent. If it's not written there, don't assume it.
- Record non-obvious technical decisions in `DECISIONS.md` as you make them.
- Keep `CHANGELOG.md` updated for notable repository changes.
- Prefer small, reviewable changes. Wait for explicit approval before proceeding to a new phase of work (e.g. before writing code after foundation setup).
- Never install dependencies or scaffold a framework unless explicitly instructed.

## Current phase

Repository foundation only. No application code exists.
