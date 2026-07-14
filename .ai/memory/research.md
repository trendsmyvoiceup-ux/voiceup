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

## Human behavior (established, peer-reviewed)

Full evidence matrix and source index: `.ai/RESEARCH.md`

### Information gap theory (curiosity trigger) `[Strong evidence]`
When people perceive a gap between what they know and what they want to know, they are motivated to close it. The gap is experienced as mildly aversive; resolution is rewarding. This is the primary mechanism behind "what do others think?" — the question that makes someone vote. Source: Loewenstein (1994) *Psychological Bulletin*; Kidd & Hayden (2015) *Neuron*.

### Post-vote reveal — DIRECTION only, never DIRECTION before voting `[Strong evidence, with calibration]`
Never show which option leads (DIRECTION) before the user votes. Asch conformity and spiral of silence both support this prohibition. Calibration note: Bond (1996) meta-analysis found conformity effects are substantially reduced in anonymous online settings vs. face-to-face. The effect exists but may be smaller than original lab studies imply. A separate, open question: showing participation COUNT (not direction) before voting may increase engagement without biasing results — this distinction was not made in the original synthesis and requires testing before any prohibition is applied to participation count display.

### Binary choice: a supported V1 design decision, not a confirmed universal `[Theoretical support, untested in context]`
Binary choice is a low-friction V1 design decision supported by cognitive-load principles: Hick's Law (fewer options → faster decision) and Iyengar & Lepper (paradox of choice — more options reduces satisfaction). These principles support the design direction. They do not confirm binary as universally optimal. What must be tested in the Human Signal context: completion rate (expected to benefit from binary), signal quality (binary compresses multidimensional preferences — may lose information), and cultural preference (France, Japan may require variants). Do not treat binary as permanently settled — treat it as the correct starting point whose effects require field validation.

### Controlling extrinsic rewards undermine intrinsic motivation `[Strong evidence, meta-analytic]`
Deci, Koestner & Ryan (1999) meta-analysis (128 studies): expected, tangible, contingent rewards undermine intrinsic motivation. This is robust. Critical calibration: Deci et al. specifically studied CONTROLLING rewards. Informational feedback (scores that inform performance) does NOT undermine intrinsic motivation per the same research tradition. Community reputation systems (Stack Overflow karma) function as social currency, not controlling rewards — the evidence against them is weaker. Streak mechanics carry documented harm risk [M] but are not uniformly harmful — Duolingo demonstrates sustained use at scale. Never conflate "controlling rewards" with all gamification mechanics.

### Conformity risk is real and measurable `[Strong evidence]`
Asch (1951, 1956): social proof before a judgment causes a significant minority of people to conform — even when it contradicts their own perception. Effect is stronger when answers are ambiguous. Opinion battles are inherently ambiguous. Never show vote counts before the user votes.

### Spiral of silence applies to digital platforms `[Strong evidence]`
Noelle-Neumann (1974) + Hampton et al. (2014) on Facebook: people who perceive themselves in the minority become increasingly silent over time. On Human Signal this would manifest as minority-position holders not sharing results. Monitor minority share rate as a leading indicator.

### SDT: autonomy is the foundational need `[Strong evidence]`
Ryan & Deci (2000): autonomous participation (genuinely freely chosen) produces higher quality engagement and better long-term retention than controlled participation. The Human Signal vote must feel genuinely optional, never obligatory.

## Collective contribution (established, peer-reviewed)

Full analysis: `.ai/RESEARCH.md` Stream 1.

### Four layers of contribution motivation `[Strong evidence]`
Across Wikipedia, GitHub, Galaxy Zoo, Stack Overflow, and Linux: contribution is sustained by four distinct layers — individual benefit (fun, learning), community benefit (belonging, recognition), mission benefit (ideological alignment), and legacy/meaning. Initial participation is driven by Layer 1; long-term retention requires Layers 2–3. Source: Nov (2007); Lakhani & Wolf (2005); Raddick et al. (2010); Rotman et al. (2012).

### Extrinsic rewards require very careful design `[Strong evidence, meta-analytic]`
The overjustification effect (Deci et al., 1999 meta-analysis, 128 studies): once extrinsic rewards become controlling, intrinsic motivation drops and removing the rewards causes participation to fall below baseline. Wikipedia and Galaxy Zoo sustain contribution WITHOUT points/streaks. Stack Overflow's reputation system works because it functions as a capability-unlocking community currency, not a generic gamification layer.

### Mission alignment and contribution ladders: validated for high-effort platforms, hypothesis for Human Signal `[Moderate evidence — context-limited]`
Wikipedia, Stack Overflow, and GitHub require contribution persistence and mission alignment for long-term retention of their most active contributors. Rotman et al. (2012) found curiosity/fun insufficient for sustained citizen science contribution. These findings are robust within their original contexts. What they do NOT establish: that mission alignment or contribution ladders are necessary for Human Signal's low-effort one-tap voting. Platforms sustaining through entertainment, recommendation, social relationships, and continuous content (Instagram, TikTok, Spotify) demonstrate that alternative retention mechanisms exist. Mission alignment and contribution ladders are not universally necessary; their value for Human Signal remains a product hypothesis requiring validation. Measure 90-day retention before building any mission-framing scaffold.

### The contribution power law is universal `[Strong evidence]`
~90% consume, ~9% contribute occasionally, ~1% sustain deep contribution. The 1% drives disproportionate value in every measured platform. Designing for the 90% (anonymous voters) and the 1% (curators, proposers) requires different but compatible architectures.

### Ostrom's commons design principles apply to digital platforms `[Strong evidence]`
Ostrom (1990 Nobel): successful commons require defined boundaries, matching rules, collective choice, monitoring, graduated sanctions, and nested structures. These principles successfully predict which online communities sustain (Wikipedia, Stack Overflow, Reddit sub-communities) and which collapse (unmoderated forums, generic voting platforms). Source: Ostrom (1990).

## Cross-cultural findings (established)

Full analysis: `.ai/RESEARCH.md` Stream 2.

### The spiral of silence is stronger in collectivist cultures `[Strong evidence]`
Scheufele et al. (2001): minority opinion holders in Japan and collectivist cultures are significantly more likely to remain silent than in individualistic cultures (US, UK). Anonymity is MORE valuable in collectivist markets, not less. This is one of the most important cross-cultural implications for Human Signal.

### Distinctiveness framing does not generalize to collectivist cultures `[Moderate evidence]`
Brewer's (1991) optimal distinctiveness theory was established in individualistic-culture populations. In Japan and South Korea, being told "you hold a distinctive view" may activate social discomfort rather than curiosity — minority position signals deviation from group norm, which carries negative valence. Do not apply Variant B distinctiveness framing to East Asian markets without cultural validation.

### Numbers carry higher epistemic authority in high-UAI cultures `[Moderate evidence — cultural psychology]`
In high uncertainty-avoidance markets (Japan UAI=92, France UAI=86), displayed statistics carry epistemic authority regardless of accompanying disclaimers. "Not scientific polling" as a text disclaimer is structurally insufficient in these markets. Source: Hofstede et al. (2010).

### Translation is not adaptation `[Strong evidence — HCI cross-cultural literature]`
Cross-cultural UX research consistently shows that localizing language without adapting the underlying social contract fails. For Human Signal: the motivation layer (minority framing, disclaimer presentation, binary vs. nuanced option) must be culturally parameterized, not just translated.

### Hofstede cultural dimensions: use with explicit caution `[Methodology criticism — McSweeney 2002]`
Hofstede's national cultural dimensions (IDV, PDI, UAI, LTO, IND) are widely cited but methodologically criticized. The IBM employee sample (1970s) is not representative of national populations. Countries are internally heterogeneous. Dimension scores do not predict individual behavior — they describe distributional tendencies in the original sample population. All product inferences derived from Hofstede scores should be treated as directional hypotheses requiring in-market validation, not actionable product conclusions. Never write "Japanese users will X" based on UAI/IDV scores — write "In-market research in Japan should test whether X." Source: McSweeney (2002) *Human Resource Management Journal*.

## Human behavior (hypotheses)

> Entries in this section are observations, not proven facts. See `future.md` for full hypothesis tracking.

### Binary choice activates strong opinion
Supported by Hick's Law and Iyengar & Lepper (2000) for completion rate. Signal quality claim remains a hypothesis pending platform data. Note: binary format may require cultural variants in high-context cultures (France, Japan) — test before assuming universal applicability.

### Social context amplifies signal
A vote shared from a TikTok context ("I saw this and voted B") carries more social weight than a vote with no context. The acquisition channel is part of the signal, not just a distribution mechanism. Unvalidated for Human Signal specifically.
