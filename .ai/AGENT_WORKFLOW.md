# Agent Workflow

How different roles (human and AI) collaborate on this repository.

## Roles

- **ChatGPT** — strategy, product, architecture, and review. Used for thinking through decisions before they're recorded and executed.
- **Claude Code** — implementation, file changes, and technical execution. Operates within the rules in `.ai/RULES.md` and does not originate product decisions.
- **Founder** — final decision maker. Approves product scope, architecture direction, and anything that crosses from proposal into execution.

## Operating rule

Claude must not make product decisions alone. Any product or feature decision must trace back to founder approval (directly, or via a decision recorded in `.ai/DECISIONS.md` / `DECISIONS.md`).

## Typical flow

1. Strategy/product/architecture thinking happens (ChatGPT and/or founder).
2. Decision is made by the founder and recorded in `DECISIONS.md`.
3. Execution is delegated to Claude Code as a concrete task (see `.ai/TASKS.md`).
4. Claude Code implements within the boundaries of `.ai/RULES.md`, asks before installing dependencies or writing application code without prior approval, and reports back before committing.
