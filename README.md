# Company OS

This repository is the foundation of the company: documentation, decisions, prompts, and operational scaffolding.

## Structure

- `.ai/` — **source of truth for AI-assisted development.** Agent-agnostic project context, rules, task queue, decisions, and agent workflow. Any AI agent (Claude, ChatGPT, or otherwise) working on this repo should read this folder first.
- `docs/` — vision, product, architecture, and operating documentation (numbered for reading order).
- `prompts/` — agent-specific operating instructions (e.g. `CLAUDE.md`), which point back to `.ai/` as the shared source of truth.
- `scripts/` — operational/automation scripts (none yet).
- `assets/` — static assets (logos, diagrams, etc.).
- `.github/` — issue and pull request templates.

## Status

Foundational scaffolding only. No application code has been written yet.

## Getting Started

This repository currently contains no application code, build system, or dependencies. See [docs/08-ROADMAP.md](docs/08-ROADMAP.md) for what comes next.
