# Decisions (AI-facing summary)

This is a condensed, agent-facing summary of key decisions. The full decision log with rationale lives in `DECISIONS.md` at the repository root — that file remains the source of truth; this one is a quick-reference for AI agents.

## Summary

- Repository foundation (docs, templates, contribution process) was created first, before any application code.
- No application code exists yet.
- The repository will follow a monorepo strategy to support web, mobile, APIs, AI agents, n8n workflows, MCP server, analytics, and background workers under one roof.
- Working repository name: `opinion-platform` (technical name, explicitly not the future public brand).
- Architecture must support future automation, n8n workflows, AI agents, and an MCP server — these are not afterthoughts and should not be designed out by early architecture choices.
