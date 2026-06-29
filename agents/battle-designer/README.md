# Battle Designer Agent

## Responsibility

Turns a battle proposal from `output/proposals/<slug>.json` into a complete
battle package.

## Inputs

- `output/proposals/<slug>.json` (Subject A, Subject B, category, rationale)
  — the only input. No in-memory handoff from the Planner.
- `skills/battle_generation.md` for content rules.
- `skills/tiktok.md` for script/caption/hashtag conventions.

## Outputs

A complete Battle Package — the single source of truth for this battle —
under `output/battles/<slug>/`, containing:

- `manifest.json` — package metadata (slug, schema version, source proposal, file list)
- `battle.json` — structured battle data
- `status.json` — independent per-consumer status (each consumer writes only its own key)
- `script.txt` — short-form video script
- `caption.txt` — social caption
- `hashtags.txt` — hashtag set
- `image_prompt.txt` — prompt for future AI-generated battle artwork
- `video_prompt.txt` — prompt for future AI-generated video (not generated yet)

See `output/battles/apple-vs-android/` for the reference template.

Once written, this folder is read **independently** by Website, Publisher,
and any future consumer (Instagram, X, YouTube, API, MCP, etc.) — see
`agents/shared/CONTRACT.md`. The Battle Designer does not hand off to any
one of them specifically; it produces the package and stops.

## Out of scope

- Deciding which battles to make (Planner's job).
- Touching `apps/web` (Website's job) or publishing assets (Publisher's job).
- Actually generating images or video — only prompts/text at this stage.
