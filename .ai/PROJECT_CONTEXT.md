# Project Context

This is an **opinion infrastructure startup** — not just a polling website.

The MVP is intentionally simple: users compare two entities and vote. But the MVP is a thin entry point into a much larger long-term system.

## Long-term scope

- Web application
- Public and internal APIs
- AI agents
- n8n workflows
- MCP server
- Analytics
- Background automation

## What this means for any AI agent working here

- Do not optimize the codebase as if it will only ever be "a voting website." Architecture decisions should leave room for the full scope above.
- The MVP's simplicity is a sequencing choice, not a ceiling on ambition.
- Working repository name: `opinion-platform` (technical name, not the public brand).

See `.ai/RULES.md`, `.ai/DECISIONS.md`, and `docs/` for further detail.
