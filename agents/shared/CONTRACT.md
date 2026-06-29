# Content Factory — Pipeline Contract

This is a **permanent architectural decision** (founder decision, TASK-0025).
It replaces the previous strictly sequential workflow (TASK-0024).

## Authoritative architecture

```
Founder
  ↓
Planner
  ↓  output/proposals/<slug>.json
Battle Designer
  ↓  output/battles/<slug>/         ← single source of truth (the "Battle Package")
  │
  ├── Website          (reads the Battle Package independently)
  ├── Publisher         (reads the Battle Package independently)
  └── Future consumers  (Instagram, X, YouTube, API, MCP, etc. — read independently)
```

There is no other valid order. Any earlier draft describing a strictly
sequential Website → Publisher dependency (or any in-memory handoff) is
superseded and must not be followed.

## The Battle Package is the single source of truth

Once the Battle Designer writes `output/battles/<slug>/`, that folder is
authoritative. Every downstream consumer — Website, Publisher, or any
future consumer — reads it independently and **never** reads another
consumer's output or waits on another consumer to finish. There is no
"Website then Publisher" or "Publisher then Website" ordering: both (and
any future consumer) can run in any order, in parallel, or not at all,
without affecting each other.

## Handoff artifacts — all on disk, no in-memory contracts

| Step | Producer | Artifact | Location |
|---|---|---|---|
| 1 | Planner | Battle proposal | `output/proposals/<slug>.json` |
| 2 | Battle Designer | Battle Package | `output/battles/<slug>/` |
| 3a | Website | Proposed code diff | `apps/web/src/lib/comparisons.ts` (uncommitted) |
| 3b | Publisher | Reviewed publication assets | `output/battles/<slug>/` (same files, confirmed/finalized) |

Steps 3a and 3b are independent siblings, not a sequence. Neither reads the
other's output, and neither requires the other to have run.

## Battle Package contents

`output/battles/<slug>/` always contains:

- `manifest.json` — package metadata (slug, schema version, source proposal, file list)
- `battle.json` — structured battle data (matches `Comparison`/`Subject` shape)
- `status.json` — independent per-consumer status tracking (each consumer writes only its own key)
- `script.txt`
- `caption.txt`
- `hashtags.txt`
- `image_prompt.txt`
- `video_prompt.txt`

See `output/battles/apple-vs-android/` for the reference template.

## Output folders

- `output/proposals/` — Planner output.
- `output/battles/` — Battle Packages (the source of truth).
- `output/published/` — reserved for records of real publishing once it exists. Empty for now.
- `output/reports/` — reserved for pipeline run reports/logs once an automated runner exists. Empty for now.

## Rules for every handoff

- Every handoff must exist on disk. No agent passes data to another agent
  in-memory or "directly" — each step reads its input from the file
  location documented above and nothing else.
- The Battle Designer reads only `output/proposals/<slug>.json`. It does not
  read anything from Website, Publisher, or any other consumer.
- Website and Publisher (and any future consumer) read only
  `output/battles/<slug>/`. They must not read from each other, depend on
  each other's status in `status.json`, or assume any execution order
  between them.
- Each agent writes only to its documented output location — never edits
  files outside its `OUTPUT_SPEC.md` scope. A consumer writing its own
  `status.json` key does not count as depending on another consumer.
- No agent commits, pushes, or calls an external API. See `skills/git.md`.
- No agent invents content beyond what its `INPUT_SPEC.md` provides — if an
  input is missing or ambiguous, the agent stops and surfaces the gap rather
  than filling it in.
- Every agent (including future consumers) must be independently
  executable: given a valid Battle Package on disk, it runs without
  needing any other consumer to have run, in any session, process, or day.

## Versioning

This fan-out architecture (Battle Package as single source of truth,
Website/Publisher/future consumers all independent) is a permanent
architectural decision and supersedes any prior sequential ordering. Each
agent's `INPUT_SPEC.md`/`OUTPUT_SPEC.md` must stay in sync with this file;
if they diverge, this file is authoritative.
