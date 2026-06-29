# Battle Designer — Output Spec

## Output location

`output/battles/<subject-a>-vs-<subject-b>/` — the **Battle Package**, the
single source of truth for this battle. Contains exactly:

- `manifest.json` — `{ slug, schemaVersion, createdFrom, files: [...] }`
- `battle.json` — matches `Comparison`/`Subject` shape in
  `apps/web/src/lib/comparisons.ts`
- `status.json` — `{ "<consumerName>": { "status": "pending", "updatedAt": null }, ... }`,
  initialized with one independent key per consumer (`reviewer`, `website`,
  `publisher`, and any future consumer). Each consumer writes only its own
  key.
- `script.txt`
- `caption.txt`
- `hashtags.txt`
- `image_prompt.txt`
- `video_prompt.txt` (prompt only — no actual video generation)

See `output/battles/apple-vs-android/` for the reference template.

## Consumption model

This folder is read **independently** by Website, Publisher, and any
future consumer. The Battle Designer does not target a specific next
agent — it produces the package and stops. See `agents/shared/CONTRACT.md`.

## What the Battle Designer must NOT output

- Any actual image or video file.
- Any change to `apps/web` or any other application code.
- Any file outside the single `output/battles/<slug>/` folder it is
  producing.
