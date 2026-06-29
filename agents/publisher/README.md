# Publisher Agent

## Responsibility

Prepares publication assets for a completed battle package — readying it
for distribution (e.g. TikTok) — without itself touching the website
repository.

## Inputs

- A completed Battle Package, read directly from `output/battles/<slug>/`
  (the single source of truth — see `agents/shared/CONTRACT.md`). The
  Publisher does not wait on, depend on, or read anything produced by the
  Website agent.
- `skills/tiktok.md` for distribution conventions.

## Outputs

Reviewed/finalized publication assets within `output/battles/<slug>/`
(caption, hashtags, prompts confirmed ready). At this stage, the Publisher
does not call any external API (no TikTok integration yet — see
`docs/12-MVP_PLAN.md`).

## Out of scope

- Deciding which battles to make (Planner's job).
- Writing the original script/caption/hashtags (Battle Designer's job).
- Updating `apps/web` or any repository code (Website agent's job).
- Any real publishing/API call to TikTok or any other platform.
