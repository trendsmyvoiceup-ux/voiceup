# Publisher Agent

## Responsibility

Generates a complete, per-platform publication package from an existing,
**Reviewer-approved** Battle Package — without itself touching the website
repository, calling any external API, or uploading anything.

**Implementation status:** real and executable (`scripts/publisher.ts`), as
of TASK-0031 — not a stub. Deterministic: it only reformats content already
present in the Battle Package, never invents new copy.

## Inputs

- A completed Battle Package, read directly from `output/battles/<slug>/`
  (the single source of truth — see `agents/shared/CONTRACT.md`), only
  after `review.json.approved === true`. The Publisher does not wait on,
  depend on, or read anything produced by the Website agent.
- `skills/tiktok.md` for distribution conventions.

## Outputs

`output/published/<slug>/`:

```
README.md
tiktok/      caption.txt, hashtags.txt, script.txt, video_prompt.txt, image_prompt.txt
instagram/   caption.txt, hashtags.txt
youtube/     title.txt, description.txt, hashtags.txt
```

All content is derived directly from the Battle Package's existing files
(`battle.json`, `caption.txt`, `hashtags.txt`, `script.txt`,
`image_prompt.txt`, `video_prompt.txt`). No API call, no upload — package
generation only.

## Out of scope

- Deciding which battles to make (Planner's job).
- Writing the original script/caption/hashtags (Battle Designer's job).
- Approving the package (Reviewer's job) — the Publisher does not run on a
  rejected package.
- Updating `apps/web` or any repository code (Website agent's job).
- Any real publishing/API call to TikTok, Instagram, YouTube, or any other
  platform.
