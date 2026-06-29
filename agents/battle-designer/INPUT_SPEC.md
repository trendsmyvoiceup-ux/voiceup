# Battle Designer — Input Spec

## Required inputs

- `output/proposals/<slug>.json` — the only input artifact. No in-memory
  handoff from the Planner exists or is permitted (see
  `agents/shared/CONTRACT.md`). See `agents/planner/OUTPUT_SPEC.md` for its
  shape.
- `skills/battle_generation.md` and `skills/tiktok.md` for content
  conventions.

## Invalid input handling

If `output/proposals/<slug>.json` is missing, or missing `subjectA`,
`subjectB`, or `category`, stop and report the gap. Do not invent missing
fields.
