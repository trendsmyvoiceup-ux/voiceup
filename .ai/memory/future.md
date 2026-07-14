# Future — Open Hypotheses

> Unvalidated ideas and open questions. Not proven knowledge.
> This is the only memory file where entries have not been confirmed in practice.
>
> **Lifecycle:** When a hypothesis is validated → promote to the appropriate domain file.
> When falsified → delete. Do not let this file become a graveyard.
>
> Format: hypothesis + confidence (low/medium/high) + validation criteria.

---

## Product hypotheses

### Binary format drives stronger engagement than multi-option
**Confidence:** Medium
**Hypothesis:** Forcing a binary choice produces stronger opinions and higher engagement than presenting 3+ options, because it eliminates the "it depends" escape and forces commitment.
**Validation criteria:** Run A/B test on TikTok: binary vs. 3-option battle on same topic. Measure comment rate and link-in-bio click-through.

### Series mechanics increase retention
**Confidence:** Low
**Hypothesis:** Releasing battles as a named series ("Tech Week", "Pop Culture Showdown") creates return visits and follow-through better than standalone battles.
**Validation criteria:** Measure TikTok follower growth and battle page returning visitors on series vs. standalone content over 4 weeks.

### Results transparency increases trust and sharing
**Confidence:** Medium
**Hypothesis:** Showing real-time vote counts immediately after voting (rather than hiding them until after the user votes) increases both trust and the likelihood of sharing the result.
**Validation criteria:** A/B test: show results immediately vs. show only after vote. Measure share rate.

---

## Business / Revenue hypotheses

### Signal data is the long-term revenue asset
**Confidence:** Medium
**Hypothesis:** The platform's value in years 3–5 is not the web app but the structured dataset of human signals on opinion topics. Revenue comes from licensing signal data to market researchers, brands, and AI training data buyers.
**Validation criteria:** First commercial signal data inquiry from a third party. Market research firm benchmarking.

### Brand sponsorship of battle pairs
**Confidence:** Low
**Hypothesis:** Brands pay to sponsor specific battle pairs ("Battle brought to you by [Brand]") as a native advertising format that doesn't break the opinion-formation experience.
**Validation criteria:** One inbound inquiry from a brand wanting to sponsor a battle. Test one sponsored battle and measure engagement drop vs. organic.

### Premium API access
**Confidence:** Low
**Hypothesis:** Companies building products on top of human signal data (sentiment analysis, trend detection, social intelligence tools) pay for API access with higher rate limits and richer data.
**Validation criteria:** Three developer sign-up requests for API access before building the API.

---

## Technical hypotheses

### MCP server enables AI agent consumers at scale
**Confidence:** High
**Hypothesis:** Exposing battles, votes, and subjects via an MCP server allows AI agents (from any provider) to consume Human Signal data natively, making the platform a data layer for AI applications.
**Validation criteria:** One external AI agent successfully reads battle data via MCP and produces a useful output.

### n8n workflows replace custom scripts at scale
**Confidence:** Medium
**Hypothesis:** As the pipeline grows (more categories, more stages, more consumers), n8n visual workflows will be easier to maintain than TypeScript scripts for non-engineering operators.
**Validation criteria:** A workflow change can be made by the Founder in n8n without Engineering Agent involvement.

### Gemma 4 will outperform Qwen 2.5 7B
**Confidence:** Low
**Hypothesis:** When Gemma 4 (or equivalent) becomes stable in Ollama, it will exceed 88.0/100 on the benchmark with better creativity scores.
**Validation criteria:** Full benchmark run (54 calls) scoring > 88.0/100 with equal or better latency and VRAM footprint.

---

## Growth hypotheses

### TikTok viral coefficient > 1 is achievable with binary battles
**Confidence:** Medium
**Hypothesis:** Human Signal battle content can achieve a viral coefficient > 1 on TikTok because the binary format naturally generates comments and shares from people defending their choice.
**Validation criteria:** Measure over 8 weeks: (new voters who found the platform via TikTok) / (number of videos posted). Target: ratio > 1.2.

### Top-performing categories are Technology and Pop Culture
**Confidence:** Medium
**Hypothesis:** Technology and pop culture battle pairs outperform food, travel, and lifestyle pairs on TikTok engagement because they trigger stronger opinion-formation and more comment-worthy debates.
**Validation criteria:** Run 5 battles per category across 3 categories. Compare comment rate, share rate, and click-through to battle page.

---

## Compliance / Trust hypotheses

### GDPR exemption for fully anonymous aggregate signals
**Confidence:** Low
**Hypothesis:** If vote data is stored only as aggregate counts (never individual records), GDPR data subject rights (access, erasure, portability) may not apply, simplifying compliance.
**Validation criteria:** Legal opinion from a GDPR-qualified counsel before implementing aggregate-only storage.
