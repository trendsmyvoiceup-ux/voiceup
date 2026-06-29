# Planner — Output Spec

## Output location

`output/proposals/<slug>.json`, one file per proposed battle, where
`<slug>` is `<subject-a>-vs-<subject-b>`. This is a permanent, file-based
handoff (see `agents/shared/CONTRACT.md`) — there is no in-memory or
conversational alternative.

## Output shape

```json
{
  "subjectA": "string",
  "subjectB": "string",
  "category": "string",
  "title": "string",
  "rationale": "one-line string"
}
```

`title` and `rationale` were added when the Planner became a real agent
(TASK-0027, see `scripts/planner.ts`) — both are generated deterministically
from `subjectA`/`subjectB`/`category`, never from an LLM.

## What the Planner must NOT output

- Battle copy, scripts, captions, hashtags, or prompts.
- Any file under `output/battles/`.
- Any change to `apps/web`.
