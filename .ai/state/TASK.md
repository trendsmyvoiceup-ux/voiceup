# Active Task

> One task at a time. Engineering Agent updates Status and Result inline.
> When Done, move summary to `.ai/log/AI_CHANGELOG.md`, then pull next task from BACKLOG.md.

---

## TASK-0043 — V1 completion: pipeline → database bridge + dynamic battle pages

**Epic:** V1 Ship
**Status:** Done
**Owner:** Engineering Agent
**Completed:** 2026-07-15

### What was built

1. `apps/web/scripts/import-battle.ts` — bridge script: reads `output/battles/<slug>/battle.json`,
   upserts Source/Subject/Battle into Neon. Idempotent. Run with:
   `cd apps/web && npx tsx scripts/import-battle.ts <slug>`

2. `apps/web/src/lib/battle-adapter.ts` — maps DB battle row to the `Comparison` type
   the existing ComparisonVoter expects. Derives visualTheme from category.

3. `apps/web/src/app/battle/[slug]/page.tsx` — now DB-first with static fallback.
   Changed from static generation to `force-dynamic`. Any imported battle gets a
   public page without code changes.

4. `apps/web/src/app/page.tsx` — homepage now shows the most recently created DB battle,
   falling back to the hardcoded `apple-vs-android` if the DB is empty.

### V1 end-to-end flow is now complete

After running `import-battle.ts`, the full pipeline is connected:
Pipeline (filesystem) → import script → Neon DB → public battle page → votes → reveal → reason → next
