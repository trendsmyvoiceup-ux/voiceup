# Output

This is the Content Factory's data layer. The **Battle Package**
(`output/battles/<slug>/`) is the single source of truth for a battle —
every downstream consumer reads it independently, never through another
consumer.

## Folders

- `proposals/` — Planner output. One `<slug>.json` per proposed battle.
  Read only by the Battle Designer.
- `battles/` — Battle Packages. One `<slug>/` folder per battle, produced by
  the Battle Designer. Read independently by Website, Publisher, and any
  future consumer (Instagram, X, YouTube, API, MCP, etc.).
- `published/` — Reserved for records of what has actually been published
  externally (e.g. by the Publisher, once real publishing exists). Empty
  for now — no real publishing is implemented yet.
- `reports/` — Reserved for pipeline run reports/logs (e.g. which battles
  were processed, by which agent, when). Empty for now — no automated
  runner exists yet.

See `agents/shared/CONTRACT.md` for the full architecture.
