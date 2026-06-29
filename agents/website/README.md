# Website Agent

## Responsibility

Updates the repository (`apps/web`) to add a new battle to the live site,
reading directly from an existing Battle Package, once founder approval
exists to go live.

## Inputs

- `output/battles/<slug>/battle.json`, read directly from the Battle
  Package (the single source of truth — see `agents/shared/CONTRACT.md`).
- The existing data shape in `apps/web/src/lib/comparisons.ts`.

This agent does not wait on, depend on, or read anything produced by the
Publisher. It reads the Battle Package independently.

## Outputs

A code change to `apps/web/src/lib/comparisons.ts` (and only that file,
unless explicitly told otherwise) adding the new comparison entry, following
the existing `Comparison`/`Subject` type shape.

## Out of scope

- Deciding which battles to make (Planner) or designing content
  (Battle Designer).
- Preparing publication assets — the Publisher does that, reading the same
  Battle Package independently. The Website agent does not depend on the
  Publisher having run, and vice versa.
- Any backend, database, or API changes — this agent only edits the existing
  static data file.
- Committing or pushing changes without explicit approval, per
  `.ai/RULES.md` ("Do not create application code without approval").

## Note

This agent does not exist as an automated process yet — this README and its
`SYSTEM_PROMPT.md` define its intended contract for when it is wired up.
