# Planner — Input Spec

## Required inputs

- Existing battles: `apps/web/src/lib/comparisons.ts` (live) and
  `output/battles/` (in-pipeline), to avoid duplicates.
- Constraints from `skills/vision.md` and `skills/battle_generation.md`
  (topic space, category restrictions).

## Optional inputs

- A founder-provided hint or theme to prioritize (e.g. "focus on food this
  week"). If absent, the Planner selects freely within the allowed topic
  space.

## Invalid input handling

If the existing-battles list cannot be read, the Planner must stop and
report the gap rather than guessing what already exists.
