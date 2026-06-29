# Skill: Website Integration

How a finalized battle package becomes a live battle on the website.

## Scope

Only `apps/web/src/lib/comparisons.ts` is touched. No other application
code, backend, or database is created or modified as part of this skill.

## Procedure

1. Take `battle.json` from `output/battles/<slug>/`.
2. Append it to the `comparisons` array in
   `apps/web/src/lib/comparisons.ts`, matching the existing `Comparison`
   type exactly (`id`, `subjectA`, `subjectB`, `category`, `visualTheme`).
3. Do not reorder or modify existing entries.
4. Run `pnpm build` inside `apps/web` to confirm the site still builds.
5. Stop and present the diff for human approval. Do not commit.

## Notes

This skill assumes the battle has already been approved for publication —
it does not itself decide whether a battle should go live.
