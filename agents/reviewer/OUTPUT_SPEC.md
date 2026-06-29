# Reviewer — Output Spec

## Output location

`output/battles/<slug>/review.json` — written inside the existing Battle
Package, alongside the files the Battle Designer produced. No new
directory.

The Reviewer also updates its own `reviewer` key in the Battle Package's
`status.json` (status `"approved"` or `"rejected"`) — the same
"each consumer writes only its own key" pattern Website and Publisher
follow (see `agents/shared/CONTRACT.md`). This is the only other file it
touches.

## Output shape

```json
{
  "overall": 94,
  "approved": true,
  "checks": {
    "completeness": true,
    "jsonFiles": true,
    "duplicates": true,
    "metadata": true,
    "slug": true,
    "title": true,
    "caption": true,
    "hashtags": true,
    "prompts": true
  },
  "reviewedAt": "2026-06-29T20:00:00.000Z"
}
```

## Checks (see `CHECKLIST.md` for exact pass criteria)

| Check | What it verifies |
|---|---|
| `completeness` | All 8 required Battle Package files exist |
| `jsonFiles` | `manifest.json`, `battle.json`, `status.json` all parse as valid JSON |
| `duplicates` | `manifest.json`'s `files` list has no duplicate entries |
| `metadata` | `battle.json` has non-empty `id`, `subjectA`/`subjectB` (`name`, `mediaLabel`, `mediaHint`), `category`, `visualTheme` |
| `slug` | `battle.json.id` matches `<subject-a>-vs-<subject-b>` slug format (lowercase, hyphenated) |
| `title` | A derivable title (`subjectA.name vs subjectB.name`) is non-empty and a reasonable length (3-80 chars) |
| `caption` | `caption.txt` is non-empty and within a reasonable length (10-300 chars) |
| `hashtags` | `hashtags.txt` has 5-10 lines, each starting with `#` |
| `prompts` | `image_prompt.txt` and `video_prompt.txt` are both non-trivially non-empty (>10 chars) |

## Scoring and approval

- `overall` = percentage of the 9 checks that passed, rounded to the
  nearest integer.
- `approved` = `true` only when `overall >= 90`. This threshold is a fixed
  constant (`REVIEW_APPROVAL_THRESHOLD` in `scripts/reviewer.ts`) —
  deterministic, not configurable per run.

## What the Reviewer must NOT output

- Any change to `battle.json`, `caption.txt`, `hashtags.txt`, or any other
  existing Battle Package file.
- Any key in `status.json` other than its own `reviewer` key.
- Any file outside `output/battles/<slug>/`.
