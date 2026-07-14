# Research Memory

> Distilled research knowledge: LLM findings, AI behavior, human psychology, external observations.
> Not benchmarks in full — those live in `output/reports/`. This is the distilled findings.

---

## Local LLM knowledge

### Production model: Qwen 2.5 7B
Qwen 2.5 7B is the production local LLM (as of 2026-07-05). Full benchmark: `output/reports/llm-benchmark.md`.

| Metric              | Value       |
|---------------------|-------------|
| Overall score       | 88.0 / 100  |
| JSON validity       | 100%        |
| Pair completeness   | 100%        |
| Duplicate rate      | 0%          |
| p50 latency         | 7.9s        |
| VRAM footprint      | ~5 GB       |

Fallback: `llama3.1:8b` (86.2/100, 97% completeness). Set via `OLLAMA_MODEL=llama3.1:8b`.

### Rejected model: Gemma 3 4B
Gemma 3 4B was benchmarked and rejected: 63% pair completeness, 23% duplicate rate, 74.3/100. Removed from Ollama (`ollama rm gemma3:4b`). Do not attempt to use this model without re-benchmarking a newer version.

### Prompt Strategy B (the correct strategy)
Do NOT use `format: "json"` flag in Ollama API calls. Do NOT include an example JSON object in the prompt. This combination causes models to return a single-pair object instead of an array.

**Strategy B (correct):**
- Explicit instruction that output must be a JSON array
- Explicit pair count in the prompt ("generate exactly N pairs")
- No `format: "json"` API flag
- No example object

### Always preprocess Ollama output
Run `extractJsonText()` before `JSON.parse()` on any Ollama response. Models inconsistently wrap JSON in markdown fences (` ```json `, ` ``` `). The preprocessor strips fences and extracts embedded arrays. Without it, JSON.parse fails on valid model outputs.

### Re-evaluation criteria for new models
Before replacing Qwen 2.5 7B, a new model must exceed 88.0/100 on the full benchmark (54 inference calls: 3 categories × 2 prompt strategies × 3 runs). See `memory/future.md` for Gemma 4 evaluation backlog.

---

## LLM behavior patterns

### Models return single objects when given examples
Providing an example JSON object in a generation prompt — regardless of whether the instruction asks for an array — increases the probability that the model returns a single object matching the example structure. This behavior was observed across Qwen 2.5, Llama 3.1, and Gemma 3. Solution: remove example objects from generation prompts.

### Markdown fence wrapping is model-dependent, not version-dependent
Some models wrap JSON in markdown fences on every call; others do it inconsistently. Do not assume a model's wrapping behavior is stable across prompts or temperatures. Always preprocess.

### Longer context = higher completion rate (up to a point)
Including explicit constraints (pair count, category name, exclusion list) in the prompt increases completeness scores. Vague prompts produce vague completions. For structured JSON generation, over-specify the instruction.

---

## Human behavior (hypotheses)

> Entries in this section are observations, not proven facts. See `future.md` for full hypothesis tracking.

### Binary choice activates strong opinion
The binary format (A vs B, no middle ground) appears to produce stronger engagement than multi-option polls. The constraint forces a commitment. This is an observation from product intuition, not A/B test data.

### Social context amplifies signal
A vote shared from a TikTok context ("I saw this and voted B") carries more social weight than a vote with no context. The acquisition channel is part of the signal, not just a distribution mechanism.
