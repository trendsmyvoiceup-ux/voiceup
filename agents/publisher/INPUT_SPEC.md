# Publisher — Input Spec

## Required inputs

- A completed Battle Package, read directly from `output/battles/<slug>/`
  (the single source of truth — see `agents/shared/CONTRACT.md`).

This agent does not require, read, or wait on any output from the Website
agent. It is independent of every other consumer of the Battle Package.

## Invalid input handling

If any of the required Battle Package files are missing (`manifest.json`,
`battle.json`, `status.json`, `script.txt`, `caption.txt`, `hashtags.txt`,
`image_prompt.txt`, `video_prompt.txt`), stop and report which ones — do
not generate replacements yourself.
