# Reviewer — Input Spec

## Required inputs

- A Battle Package, read directly from `output/battles/<slug>/`:
  `manifest.json`, `battle.json`, `status.json`, `script.txt`,
  `caption.txt`, `hashtags.txt`, `image_prompt.txt`, `video_prompt.txt`.

This agent does not require, read, or wait on the original proposal in
`output/proposals/`, nor anything produced by Website or Publisher. It is
independent of every other consumer of the Battle Package (see
`agents/shared/CONTRACT.md`).

## Invalid input handling

If `output/battles/<slug>/` does not exist at all, the Reviewer cannot run
(there is nowhere to write `review.json`) and the pipeline step fails with
an error, the same as any other missing-prerequisite failure.

If the directory exists but individual required files are missing,
unreadable, or invalid, that is captured as a failed check (e.g.
`completeness`, `jsonFiles`) inside a normally-written `review.json` —
not a crash. The Reviewer always produces a `review.json` for an existing
package, even a badly broken one, so the failure is visible rather than
silent.
