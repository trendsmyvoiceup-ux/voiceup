# Website — Output Spec

## Output

A proposed, uncommitted diff to `apps/web/src/lib/comparisons.ts` adding one
new entry to the `comparisons` array, copied directly from `battle.json`.

## What the Website agent must NOT output

- Any commit or push (see `skills/git.md`).
- Any change to a file other than `comparisons.ts`, unless explicitly
  instructed.
- Any backend, database, or API code.
