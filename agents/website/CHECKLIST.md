# Website — Checklist

Before presenting the diff for approval, confirm:

- [ ] Only `comparisons.ts` was touched.
- [ ] The new entry matches `battle.json` exactly (no invented fields).
- [ ] No existing entry was reordered or modified.
- [ ] `pnpm build` succeeds inside `apps/web`.
- [ ] The change has not been committed or pushed.
- [ ] No dependency was taken on the Publisher agent or its status.
- [ ] Only the `website` key in `status.json` was written, if any.
