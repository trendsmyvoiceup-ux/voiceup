# Reviewer — Checklist

These are the Reviewer's own checks (run by `scripts/reviewer.ts`), listed
here for human/agent reference — not a checklist to run manually.

- [ ] **completeness** — `manifest.json`, `battle.json`, `status.json`,
      `script.txt`, `caption.txt`, `hashtags.txt`, `image_prompt.txt`,
      `video_prompt.txt` all exist in the Battle Package.
- [ ] **jsonFiles** — `manifest.json`, `battle.json`, `status.json` each
      parse as valid JSON.
- [ ] **duplicates** — `manifest.json.files` contains no duplicate entries.
- [ ] **metadata** — `battle.json` has non-empty `id`, `category`,
      `visualTheme`, and both `subjectA`/`subjectB` with non-empty `name`,
      `mediaLabel`, `mediaHint`.
- [ ] **slug** — `battle.json.id` is lowercase, hyphenated, and contains
      `-vs-` separating two non-empty sides.
- [ ] **title** — `${subjectA.name} vs ${subjectB.name}` is non-empty and
      between 3 and 80 characters.
- [ ] **caption** — `caption.txt` is non-empty and between 10 and 300
      characters.
- [ ] **hashtags** — `hashtags.txt` has between 5 and 10 lines, each
      starting with `#`.
- [ ] **prompts** — `image_prompt.txt` and `video_prompt.txt` are both
      longer than 10 characters.

Approval: `overall >= 90` (see `OUTPUT_SPEC.md`).
