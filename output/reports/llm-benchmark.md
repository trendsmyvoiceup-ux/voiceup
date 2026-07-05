# Local LLM Benchmark — Human Signal Content Factory

**Date:** 2026-07-05T18:40:45.821Z  
**Models:** Llama 3.1 8B · Gemma 3 4B · Qwen 2.5 7B  
**Prompts:** 3 categories × 2 strategies × 3 runs each  
**Strategies:**
- **Strategy A** — `format:"json"` enabled, example pair in prompt
- **Strategy B** — No format flag, explicit count + array instruction, no example

**Scoring:** JSON validity 30% · Pair completeness 30% · No-duplicates 15% · Speed 15% · Creativity 10%

---

## Summary Rankings

| # | Model | Score | Best Strategy | JSON Valid | Completeness | Dup Rate | p50 Latency | Disk | VRAM |
|---|-------|------:|:-------------:|----------:|-------------:|--------:|------------:|------|------|
| 🥇 | **Qwen 2.5 7B** | 88.0 | B | 100% | 100% | 0% | 7.9s | 4.7 GB | 4.6 GB |
| 🥈 | **Llama 3.1 8B** | 86.2 | A | 100% | 97% | 0% | 11.6s | 4.9 GB | 5.1 GB |
| 🥉 | **Gemma 3 4B** | 74.3 | B | 100% | 63% | 23% | 4.5s | 3.3 GB | 4.0 GB |

---

## Strategy A vs B Comparison

| Model | Strategy A score | Strategy B score | Winner |
|-------|----------------:|-----------------:|--------|
| Qwen 2.5 7B | 62.5 | 88.0 | **B** |
| Llama 3.1 8B | 86.2 | 80.2 | **A** |
| Gemma 3 4B | 62.7 | 74.3 | **B** |

---

## Detailed Results

### Qwen 2.5 7B (`qwen2.5:7b`)

**Best strategy: B** · Overall score: **88.0/100**

| Metric | Strategy A | Strategy B |
|--------|----------:|----------:|
| JSON validity | 100% | 100% |
| Avg completeness | 10% | 100% |
| Avg dup rate | 0% | 0% |
| Avg novel pairs | 0.0 | 0.0 |
| p50 latency | 1.8s | 7.9s |
| p95 latency | 4.2s | 8.7s |
| Disk size | 4.7 GB | — |
| VRAM footprint | 4.6 GB | — |

**Per-prompt breakdown (best strategy B):**

| Category | JSON | Pairs/Expected | Complete | Dups | Latency | Novel pairs |
|----------|:----:|:--------------:|:--------:|:----:|--------:|-------------|
| Technology | ✔ | 10/10 | 100% | 0 | 7.2s | — |
| Food | ✔ | 10/10 | 100% | 0 | 7.8s | — |
| Entertainment | ✔ | 10/10 | 100% | 0 | 8.3s | — |

<details><summary>Raw response sample (first 150 chars)</summary>

```
[{"subjectA":"Pizza","subjectB":"Burger","category":"Food"},{"subjectA":"Pizza","subjectB":"Sushi","category":"Food"},{"subjectA":"Pizza","subjectB":"
```

</details>

### Llama 3.1 8B (`llama3.1:8b`)

**Best strategy: A** · Overall score: **86.2/100**

| Metric | Strategy A | Strategy B |
|--------|----------:|----------:|
| JSON validity | 100% | 100% |
| Avg completeness | 97% | 83% |
| Avg dup rate | 0% | 17% |
| Avg novel pairs | 0.0 | 0.0 |
| p50 latency | 11.6s | 8.7s |
| p95 latency | 12.4s | 9.5s |
| Disk size | 4.9 GB | — |
| VRAM footprint | 5.1 GB | — |

**Per-prompt breakdown (best strategy A):**

| Category | JSON | Pairs/Expected | Complete | Dups | Latency | Novel pairs |
|----------|:----:|:--------------:|:--------:|:----:|--------:|-------------|
| Technology | ✔ | 10/10 | 100% | 0 | 11.0s | — |
| Food | ✔ | 10/10 | 100% | 0 | 11.8s | — |
| Entertainment | ✔ | 9/10 | 90% | 0 | 11.4s | — |

<details><summary>Raw response sample (first 150 chars)</summary>

```
{
  "result": [
    {"subjectA":"Pizza","subjectB":"Burger","category":"Food"},
    {"subjectA":"Pizza","subjectB":"Sushi","category":"Food"},
    {"s
```

</details>

### Gemma 3 4B (`gemma3:4b`)

**Best strategy: B** · Overall score: **74.3/100**

| Metric | Strategy A | Strategy B |
|--------|----------:|----------:|
| JSON validity | 100% | 100% |
| Avg completeness | 10% | 63% |
| Avg dup rate | 0% | 23% |
| Avg novel pairs | 0.0 | 0.0 |
| p50 latency | 0.8s | 4.5s |
| p95 latency | 3.1s | 4.7s |
| Disk size | 3.3 GB | — |
| VRAM footprint | 4.0 GB | — |

**Per-prompt breakdown (best strategy B):**

| Category | JSON | Pairs/Expected | Complete | Dups | Latency | Novel pairs |
|----------|:----:|:--------------:|:--------:|:----:|--------:|-------------|
| Technology | ✔ | 10/10 | 50% | 1 | 4.5s | — |
| Food | ✔ | 10/10 | 70% | 3 | 4.5s | — |
| Entertainment | ✔ | 10/10 | 70% | 3 | 4.5s | — |

<details><summary>Raw response sample (first 150 chars)</summary>

```
[{"subjectA":"Pizza","subjectB":"Burger","category":"Food"},{"subjectA":"Sushi","subjectB":"Tacos","category":"Food"},{"subjectA":"Burger","subjectB":
```

</details>

---

## Visual Comparison

**Qwen 2.5 7B** (Strategy B)
`Score       ` ██████████████████░░ 88.0/100
`JSON valid  ` ████████████████████ 100%
`Completeness` ████████████████████ 100%
`Speed (inv) ` █████████████████░░░ p50 7.9s
`VRAM        ` 4.6 GB on-disk 4.7 GB

**Llama 3.1 8B** (Strategy A)
`Score       ` █████████████████░░░ 86.2/100
`JSON valid  ` ████████████████████ 100%
`Completeness` ███████████████████░ 97%
`Speed (inv) ` ████████████████░░░░ p50 11.6s
`VRAM        ` 5.1 GB on-disk 4.9 GB

**Gemma 3 4B** (Strategy B)
`Score       ` ███████████████░░░░░ 74.3/100
`JSON valid  ` ████████████████████ 100%
`Completeness` █████████████░░░░░░░ 63%
`Speed (inv) ` ██████████████████░░ p50 4.5s
`VRAM        ` 4.0 GB on-disk 3.3 GB

---

## Key Findings

- **Strategy A** (format:json) won for **1/3** models
- **Strategy B** (free-text array) won for **2/3** models

**Qwen 2.5 7B:** format:json valid but incomplete — partial pair lists only; perfect pair completeness across all prompts; zero duplicates
**Llama 3.1 8B:** zero duplicates
**Gemma 3 4B:** format:json valid but incomplete — partial pair lists only

---

## Recommendation

### Default model for Content Factory: `qwen2.5:7b` (Qwen 2.5 7B)

Overall score: **88.0/100** — best strategy: **B**

| Criterion | Value |
|-----------|-------|
| JSON validity | 100% |
| Pair completeness | 100% |
| Duplicate rate | 0% |
| p50 latency | 7.9s |
| VRAM | 4.6 GB |
| Disk | 4.7 GB |

**Run command:**
```bash
PLANNER_MODE=local-llm OLLAMA_MODEL=qwen2.5:7b node scripts/run-pipeline.ts technology
```

> **Implementation note:** Strategy B outperforms Strategy A for this model.
> The `OllamaProvider` (`scripts/llm/ollama.ts`) currently sends `format:"json"`.
> For production use with this model, remove the format flag and use Strategy B's prompt structure.

**Runner-up notes:**

- **Llama 3.1 8B** (score 86.2, -1.8): 4.9 GB on disk · 5.1 GB VRAM · viable alternative
- **Gemma 3 4B** (score 74.3, -13.7): 3.3 GB on disk · 4.0 GB VRAM · viable alternative

---

*Generated by Human Signal LLM Benchmark · 2026-07-05T18:40:45.821Z*