# Battle Designer — Checklist

Before handing off a battle package, confirm:

- [ ] All eight required files exist in `output/battles/<slug>/`
      (`manifest.json`, `battle.json`, `status.json`, `script.txt`,
      `caption.txt`, `hashtags.txt`, `image_prompt.txt`, `video_prompt.txt`).
- [ ] `battle.json` matches the `Comparison`/`Subject` shape exactly.
- [ ] `manifest.json` lists all files actually present in the package.
- [ ] `status.json` initializes each known consumer independently as
      `"pending"` — no consumer's entry depends on another's.
- [ ] No claim of scientific accuracy anywhere in script/caption.
- [ ] No real brand logos or copyrighted assets referenced in
      `image_prompt.txt` / `video_prompt.txt`.
- [ ] `video_prompt.txt` clearly states video generation has not been
      executed.
- [ ] Nothing outside `output/battles/<slug>/` was modified.
