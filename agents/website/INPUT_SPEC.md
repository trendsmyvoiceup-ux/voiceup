# Website — Input Spec

## Required inputs

- `output/battles/<slug>/battle.json`, read directly from the Battle
  Package (the single source of truth), with `review.json.approved ===
  true` (TASK-0031 Reviewer gate — see `agents/shared/CONTRACT.md`).
- Current contents of `apps/web/src/lib/comparisons.ts`.

This agent does not require, read, or wait on any output from the
Publisher. It is independent of every other consumer of the Battle
Package. The Reviewer's approval is a shared gate applying equally to
Website and Publisher — it is not a dependency on the Publisher itself.

## Invalid input handling

If `battle.json` doesn't match the existing `Comparison`/`Subject` type
shape, or the slug already exists in `comparisons.ts`, stop and report the
conflict. Do not reshape or de-duplicate automatically.
