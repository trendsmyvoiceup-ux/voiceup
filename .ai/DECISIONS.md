# Decisions (AI-facing summary)

This is a condensed, agent-facing summary of key decisions. The full decision log with rationale lives in `DECISIONS.md` at the repository root — that file remains the source of truth; this one is a quick-reference for AI agents.

## Summary

- Repository foundation (docs, templates, contribution process) was created first, before any application code.
- No application code exists yet.
- The repository will follow a monorepo strategy to support web, mobile, APIs, AI agents, n8n workflows, MCP server, analytics, and background workers under one roof.
- Working repository name: `opinion-platform` (technical name, explicitly not the future public brand).
- Architecture must support future automation, n8n workflows, AI agents, and an MCP server — these are not afterthoughts and should not be designed out by early architecture choices.

## Founder decisions — TASK-0007 (Domain Model)

- **Task ID:** TASK-0005 remains the repository rename; TASK-0007 is the domain model task. No history rewritten.
- **Voter identity at MVP:** lightweight/anonymous voting allowed; no verified account required. Basic abuse prevention instead: one vote per comparison per browser/session where possible, source tracking, audit log, server-side IP/rate limiting. Verified identity is a future upgrade path, not designed yet.
- **Topic:** stays a simple tag/value object for MVP; not promoted to a full entity/aggregate.
- **Comparisons:** strictly binary (Subject A vs Subject B) at MVP; N-way comparisons are future-only.
- **Minimum trust/anti-fraud bar for MVP:** source tracking, immutable vote records, audit log, rate limiting, basic anomaly flags, and clear disclosure that early results represent platform/community signals, not scientific polling.
- **Subject creation at MVP:** founder-curated only. User-proposed Subjects/Comparisons are future and require a moderation workflow not in MVP scope.

## Trust Model — TASK-0010 (requested as "TASK-0008"; filed as TASK-0010, pending founder confirmation)

- Trust philosophy documented in docs/10-TRUST_MODEL.md, MVP vs Future for every section: definition of trust, sources/signals of trust, reputation, abuse prevention, transparency, explainability, moderation, GDPR-by-design, AI governance, future verification tiers, and threat model.
- MVP trust posture: honesty about limitations (no claim of statistical rigor or bot-proofness), session/rate-based abuse prevention only, no persistent Voter reputation, founder-curated moderation (implicit, no open submission yet).
- Future trust posture: layered/weighted trust (never gatekeeping participation), verified-identity tiers, explainable trust-adjustment, proportionate and appealable moderation once open submission exists.
- AI governance principle established: AI agents consuming platform signals must receive the same "not scientific polling" disclosure as humans; no laundering informal signals into authoritative-looking data via an agent.

## MVP Technical Plan — TASK-0012

- MVP scope locked: public website only; 5 founder-curated binary comparisons; anonymous voting; one vote per comparison per browser/session where possible; results page; transparency block (total votes, source = website, "not scientific polling" disclaimer); shareable per-comparison URL slugs for TikTok-driven acquisition (link-only, no API integration).
- Explicitly excluded from MVP: TikTok API integration, authentication, AI automation, N-way comparisons, user-submitted Subjects, public/internal API, MCP server, n8n execution, weighted/trust-adjusted results.
- Future n8n hooks documented (not implemented): `VoteCast`, `ComparisonCreated`, `ComparisonClosed` events identified as future workflow triggers, consuming data the MVP already produces.
- Documented in docs/12-MVP_PLAN.md, traceable to Domain Model (TASK-0007) and Trust Model (TASK-0010) decisions.

## Founder follow-up decisions — TASK-0012

- **Docs numbering gap at `docs/11`:** accepted, will not be filled retroactively. Renumbering, if ever done, is deferred and not prioritized.
- **Topic restriction for MVP comparisons:** no sport, no politics, no religion — to avoid unmanageable controversy while validating the product. Allowed MVP topic space: technology, products, pop culture. The specific five Subject pairs remain a separate upcoming founder decision.
- **URL slug format:** deferred to implementation time (routing layer); explicitly not a strategic decision.

## Content Factory — Battle Package architecture (TASK-0025/0026/0027)

- **Battle Package is the single source of truth.** Once the Battle Designer writes `output/battles/<slug>/`, that folder (`manifest.json`, `battle.json`, `status.json`, `script.txt`, `caption.txt`, `hashtags.txt`, `image_prompt.txt`, `video_prompt.txt`) is authoritative. Website, Publisher, and any future consumer (Instagram, X, YouTube, API, MCP, etc.) read it **independently** — there is no sequential Website → Publisher dependency, and none is permitted. Each consumer writes only its own key in `status.json`.
- **All handoffs are file-based, permanently.** Planner writes `output/proposals/<slug>.json`; there is no in-memory or conversational handoff anywhere in the pipeline. This is a permanent architectural decision (TASK-0024/0025), not subject to change without a new founder decision.
- **Pipeline order:** Founder → Planner → Battle Designer → Battle Package → (Website, Publisher, future consumers, all independent). See `agents/shared/CONTRACT.md` for the authoritative diagram.
- **Output folders:** `output/proposals/`, `output/battles/`, `output/published/`, `output/reports/` — the latter two reserved/empty until real publishing and an automated runner exist.
- **First real agent — Planner (TASK-0027):** implemented as a deterministic, executable agent (`scripts/planner.ts`, orchestrated by `scripts/run-pipeline.ts`). Given a category name, it looks up a matching pair in a static catalog and writes a conforming proposal (`subjectA`, `subjectB`, `category`, `title`, `rationale`). No LLM, no randomness. Battle Designer, Website, and Publisher remain stubs.
- **Catalog duplication accepted as temporary:** `scripts/catalog.ts` is a manually-maintained snapshot of `apps/web/src/lib/comparisons.ts`, not a live cross-project import. Founder confirmed this is acceptable for now — no shared package should be built yet.
- **Planner scope accepted as sufficient for v1:** one Subject pair per category (a lookup, not a real multi-option selection) is acceptable for this first deterministic implementation. Multi-option selection and duplicate avoidance against existing battles/proposals are explicitly deferred, not required now.

## Battle Control Room — TASK-0028 (requested as "TASK-0027"; corrected to TASK-0028 per founder)

- Internal-only admin surface at `/admin` in `apps/web`: lists all battles with title, slug, category, website URL, proposal existence, and Battle Package existence; local-only status (Draft/Ready/Paused/Archived) via `localStorage`; quick links to the battle page and both subjects; a "Content Factory" section showing live counts of `output/proposals/`, `output/battles/`, `output/published/`, `output/reports/`.
- No authentication, no database, no external APIs, no TikTok publishing — explicitly a local/internal prototype, marked with a visible warning banner.
- Founder confirmed: filesystem reads on every request (`force-dynamic`) are acceptable for this internal tool, and `/admin` must remain unlinked from public navigation for now.

## Battle Designer — first real implementation (TASK-0030)

- **Battle Designer is now deterministic and real**, not a stub (`scripts/battle-designer.ts`, orchestrated by `scripts/run-pipeline.ts`). Given a proposal, it generates the full Battle Package (`manifest.json`, `battle.json`, `status.json`, `script.txt`, `caption.txt`, `hashtags.txt`, `image_prompt.txt`, `video_prompt.txt`) from fixed templates. No LLM, no randomness.
- **Pipeline output is authoritative.** Running the pipeline for `apple-vs-android` regenerated and overwrote the previously hand-written reference Battle Package (e.g. `mediaHint` changed from "Smartphone ecosystem" to the category name "Technology"; script/caption/hashtags replaced with generated templates). Founder confirmed: keep the regenerated version, do not restore the hand-written content — the pipeline's output is now the source of truth, not manually curated reference files.
- **`mediaHint` = category name** is accepted as the deterministic placeholder for subject media hints, since no LLM exists yet to produce richer per-subject hints.
- **Temporary duplication accepted again:** `scripts/battle-designer.ts` duplicates a category → `visualTheme` mapping that conceptually overlaps with `apps/web/src/lib/comparisons.ts`. Same tradeoff as `scripts/catalog.ts` (TASK-0027) — acceptable for now, no shared package to be built yet.

## Local LLM — Production Model Decision

**Benchmarked:** 2026-07-05. Three models evaluated across 3 categories × 2 prompt strategies × 3 runs = 54 inference calls per model. Full report: `output/reports/llm-benchmark.md`.

| Role | Model | Score | Rationale |
|------|-------|------:|-----------|
| **Production** | `qwen2.5:7b` | 88.0/100 | 100% JSON validity · 100% pair completeness · 0% duplicate rate · 7.9s p50 latency · best overall |
| **Fallback** | `llama3.1:8b` | 86.2/100 | 100% JSON validity · 97% completeness · 0% duplicates · viable alternative |
| **Rejected** | `gemma3:4b` | 74.3/100 | 63% completeness · 23% duplicate rate · removed from Ollama (`ollama rm gemma3:4b`) |

**Prompt strategy:** Strategy B (no `format:"json"` flag, explicit array instruction, explicit pair count, no example object). Strategy A (`format:"json"` + example) caused Gemma and Qwen to return single-pair objects instead of full arrays — confirmed via raw response inspection.

**Architectural impact:**
- `scripts/llm/ollama.ts` default model updated to `qwen2.5:7b`
- `buildPrompt()` now uses Strategy B
- `format:"json"` flag removed from Ollama API call
- `extractJsonText()` pre-processor added (strips markdown fences, extracts embedded arrays) for robustness across model variations

**Usage:**
```bash
# Production
PLANNER_MODE=local-llm node scripts/run-pipeline.ts technology

# Fallback (if Qwen unavailable)
PLANNER_MODE=local-llm OLLAMA_MODEL=llama3.1:8b node scripts/run-pipeline.ts technology
```

**Deterministic mode remains the default.** Set `PLANNER_MODE=local-llm` explicitly to use any LLM provider.

## Backlog

### Epic: Evaluate Gemma 4

**Status:** Backlog — no implementation.

**Trigger:** When `gemma4` (or equivalent next-generation Gemma variant) becomes stable and available in Ollama.

**Success criteria (must all pass to replace Qwen as production default):**
- Outperforms `qwen2.5:7b` overall benchmark score (> 88.0/100)
- Equal or better JSON validity (100%)
- Equal or better pair completeness (100%)
- Better creativity score (novel, high-quality pairs beyond catalog defaults)
- Similar or lower p50 latency (≤ 8s on current hardware)
- Similar or lower VRAM footprint (≤ 5 GB)

**Not a priority.** Qwen 2.5 7B is production-stable. Re-evaluate only when Gemma 4 is mature in Ollama.
