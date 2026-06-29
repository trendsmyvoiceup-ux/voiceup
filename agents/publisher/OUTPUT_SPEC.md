# Publisher — Output Spec

## Output location

`output/published/<slug>/`:

```
README.md
tiktok/
  caption.txt
  hashtags.txt
  script.txt
  video_prompt.txt
  image_prompt.txt
instagram/
  caption.txt
  hashtags.txt
youtube/
  title.txt
  description.txt
  hashtags.txt
```

## Content derivation (all deterministic, no invention)

- `tiktok/*` — copied as-is from the Battle Package's `caption.txt`,
  `hashtags.txt`, `script.txt`, `video_prompt.txt`, `image_prompt.txt`.
- `instagram/caption.txt`, `instagram/hashtags.txt` — same content as the
  Battle Package's `caption.txt`/`hashtags.txt`.
- `youtube/title.txt` — `${subjectA.name} vs ${subjectB.name}` from `battle.json`.
- `youtube/description.txt` — the Battle Package's `caption.txt` plus a
  fixed trailing disclosure line ("Community signal, not a scientific poll.").
- `youtube/hashtags.txt` — same content as the Battle Package's `hashtags.txt`.

## What the Publisher must NOT output

- Any actual call to an external platform API (TikTok, Instagram, YouTube,
  or otherwise).
- Any generated image or video file (only the existing prompt text is reused).
- Any change to `apps/web` or `comparisons.ts`.
- Any new file inside `output/battles/<slug>/` other than its own
  `publisher` key in `status.json`.
