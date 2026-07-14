# Memory Index — High-Signal Cross-Domain Lessons

> Read this before your domain file. It contains the lessons that cut across all roles.
> An agent who internalizes this index avoids the most expensive mistakes in this project.
> Entries here are the highest-signal lessons from all domain files combined.

---

## Critical engineering constraints

**Build from the right directory.** Run `pnpm build` from `apps/web/`, never from the workspace root. There is no `package.json` at root. This will silently fail or throw `ERR_PNPM_NO_PKG_MANIFEST`.

**Always clean before build when in doubt.** Mixed `.next/` artifacts from multiple build runs cause `Cannot find module './199.js'` 500 errors on all routes. When symptoms appear on all routes simultaneously, run `rm -rf .next && pnpm build` before any other diagnosis.

**Restart the server after every build.** A `next-server` process retains in-memory state from the old build. New on-disk files + old in-memory state = 500s everywhere. Kill the process, then restart.

---

## Critical product principles

**The mental model is: AI creates. Founder validates. Platform publishes.** Every UI decision in Creator Studio should reinforce this three-step flow. Any design that obscures which step you're in violates this principle.

**Human Signal is opinion infrastructure, not a polling website.** Never optimize the codebase, architecture, or product as if it will only ever be a voting site. The MVP's simplicity is a sequencing choice, not a ceiling.

**Topic restriction is a business decision, not a technical one.** MVP comparisons are restricted to technology, products, and pop culture. No sport, politics, or religion. This was a Founder decision. Do not add categories without a new Founder decision.

---

## Critical pipeline rules

**File-based handoffs are permanent and non-negotiable.** No in-memory, conversational, or sequential handoffs between agents. Every consumer reads the Battle Package independently from `output/battles/<slug>/`. This is the permanent architectural contract. See `agents/shared/CONTRACT.md`.

**Only publish approved battles.** Check `review.json.approved === true` before any publishing step. A rejected battle is a normal pipeline outcome, not an error. The batch continues with remaining battles.

---

## Critical LLM / AI lessons

**Qwen 2.5 7B is the production model.** Do not switch models without running the full benchmark (54 inference calls minimum) and beating 88.0/100. The benchmark methodology is in `output/reports/llm-benchmark.md`.

**Strategy B prompts.** Never add `format: "json"` or an example object to Ollama API calls — it causes models to return a single pair instead of an array. Use explicit array instruction + explicit count instead.

**Always preprocess LLM output.** Run `extractJsonText()` on all Ollama responses before `JSON.parse()`. Models wrap JSON in markdown fences unpredictably.

---

## Critical trust / compliance rules

**"Not scientific polling" disclosure is required everywhere.** Any surface that presents vote data — public pages, API responses, AI agent outputs — must include this disclosure. It is a trust model requirement, not optional copy.

**AI-generated content must be disclosed.** Any AI-generated content on public-facing pages requires disclosure. This is both a trust model requirement and an emerging regulatory requirement.

---

## Cross-cutting conventions

**`pnpm` only, never `npm` or `yarn`.** Enforced across the monorepo. Using npm in this project produces unexpected results due to workspace setup.

**No emojis in code or documentation** unless explicitly requested by the Founder.

**Internal tools are not linked from public navigation.** `/admin`, `/studio`, and any future internal routes must never appear in public nav. This is a deliberate separation, not an oversight.

**localStorage requires a mounted guard.** Any React component reading from localStorage must use a `mounted` state (`useEffect(() => setMounted(true), [])`) and render a loading skeleton until mounted. Skipping this causes hydration mismatches and flickers.
