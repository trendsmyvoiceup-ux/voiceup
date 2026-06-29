# Publisher — Checklist

Before considering a battle publication-ready, confirm:

- [ ] `review.json.approved` is `true` before running at all.
- [ ] `output/published/<slug>/` contains `README.md`, `tiktok/` (5 files),
      `instagram/` (2 files), `youtube/` (3 files).
- [ ] Every value written was copied/derived from existing Battle Package
      content — nothing invented.
- [ ] Caption and hashtags follow `skills/tiktok.md` conventions.
- [ ] No claim of scientific accuracy.
- [ ] No external API was called.
- [ ] No new video or image file was generated (prompts only, reused as-is).
- [ ] No file inside `output/battles/<slug>/` was touched other than the
      Publisher's own `status.json` key.
- [ ] No dependency was taken on the Website agent or its status.
