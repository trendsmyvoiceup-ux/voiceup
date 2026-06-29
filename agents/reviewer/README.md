# Reviewer Agent

## Responsibility

Reviews every Battle Package before publication, using deterministic rules
only — no AI. Sits between the Battle Designer and the Website/Publisher
fan-out in the pipeline (see `agents/shared/CONTRACT.md`).

## Inputs

- A completed Battle Package, read directly from `output/battles/<slug>/`
  (the single source of truth). The Reviewer reads only this folder — not
  the original proposal, not any other consumer's output.

## Outputs

`output/battles/<slug>/review.json`:

```json
{
  "overall": 94,
  "approved": true,
  "checks": { "...": true },
  "reviewedAt": "ISO timestamp"
}
```

See `OUTPUT_SPEC.md` for the full check list and approval threshold.

## Gate behavior

If `approved` is `false` for a given battle, Website and Publisher do not
run **for that battle**. As of the Content Validation sprint, the runner
processes battles in a batch (see `agents/shared/CONTRACT.md`): a single
rejected battle does not stop the batch — the runner logs it and continues
with the next battle, then includes it in the final report
(`output/reports/`).

## Out of scope

- Deciding which battles to make, designing content, or writing the
  Battle Package itself (Planner / Battle Designer's jobs).
- Updating `apps/web` or generating publication packages (Website /
  Publisher's jobs).
- Any AI-based judgment — every check is a fixed, deterministic rule.
