# Skill: Battle Generation

How to design a single battle (Subject A vs Subject B).

## Constraints

- Strictly binary: exactly two subjects, never more (locked MVP decision,
  TASK-0007).
- Topic space limited to technology, products, pop culture. Never sport,
  politics, religion (TASK-0012 founder decision).
- Subjects must be founder-curated/approved — this skill does not grant an
  agent authority to invent and ship a battle without approval; it only
  defines the shape of a well-formed battle.

## Required fields (battle.json)

```json
{
  "id": "subject-a-vs-subject-b",
  "subjectA": { "name": "...", "mediaLabel": "...", "mediaHint": "..." },
  "subjectB": { "name": "...", "mediaLabel": "...", "mediaHint": "..." },
  "category": "...",
  "visualTheme": "tech | lifestyle | entertainment | food"
}
```

This mirrors the `Comparison`/`Subject` types in
`apps/web/src/lib/comparisons.ts` exactly, so the Website agent can copy it
in without reshaping.

## Tone

Short, punchy, no false claims of statistical rigor. Every battle is a
community signal, not a scientific poll — content should never imply
otherwise.
