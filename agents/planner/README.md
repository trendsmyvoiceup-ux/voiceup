# Planner Agent

## Responsibility

Decides which battles to create next.

The Planner does not design battle content itself — it selects subjects,
pairs, and categories for the Battle Designer to develop, based on the
platform's rules (see `skills/vision.md`, `skills/battle_generation.md`).

**Implementation status:** real and executable (`scripts/planner.ts`), as
of TASK-0027 — not a stub. It is deterministic: given a category name, the
same input always produces the same proposal. No LLM, no randomness.

## Inputs

- A category name (e.g. `"Technology"`), passed as the runner's argument.
- The static subject catalog (`scripts/catalog.ts`, a maintained snapshot
  of `apps/web/src/lib/comparisons.ts` — see that file's header comment for
  why it isn't a live cross-project import yet).
- Category constraints (no sport, no politics, no religion — see `.ai/DECISIONS.md`)
- Topic space: technology, products, pop culture (per founder decision, TASK-0012)

## Outputs

One `output/proposals/<slug>.json` file per proposed battle. This is the
only handoff to the Battle Designer — there is no in-memory handoff (see
`agents/shared/CONTRACT.md`). See `SYSTEM_PROMPT.md` for the exact contract.

## Out of scope

- Writing battle copy, scripts, or captions (Battle Designer's job).
- Touching `output/battles/`, `apps/web`, or any publication asset.
- Any backend, database, or live API integration.
