# Media Memory

> Distilled creative knowledge: prompt engineering, content production, brand consistency.
> For AI-assisted content generation and human creative direction.

---

## Prompt engineering (Ollama / local LLM)

### Effective battle generation prompt structure
1. Role context: "You are generating opinion battle pairs for a social media platform"
2. Category specification: name the category explicitly
3. Quality criteria: viral potential, strong opinions, universal recognition
4. Output format: explicit JSON array instruction, explicit count
5. Constraints: no politics, no religion, no sport
6. Anti-duplication: provide existing pairs to avoid (when available)

**Never include:**
- `format: "json"` in the API call body
- An example JSON object in the prompt body
- Vague instructions like "be creative"

### Video prompt structure (for future video generation)
The `video_prompt.txt` field in the Battle Package is written for a human videographer or future AI video generator. Effective structure:
```
Visual: [what the video shows]
Audio: [narration or text overlay]
Hook: [first 2 seconds]
CTA: [call to action at the end]
```

### Image prompt structure
The `image_prompt.txt` field is for AI image generation (DALL-E, Midjourney, Flux). Effective structure: `[style] [subject A] versus [subject B], [composition], [lighting], [mood]`. Always specify: style first, subject contrast explicit, no text in image (text is added in post).

---

## Brand consistency

### Human Signal visual identity (V1)
- **Background:** near-black, dark oklch values
- **Accent color:** indigo/violet for AI pipeline elements; white opacity levels for neutral UI
- **State colors:** see `memory/product.md` → Design aesthetic → Color conventions
- **Typography:** Geist (sans + mono), configured in `apps/web/src/app/layout.tsx`
- **No logo yet** — text wordmark only in V1

### Battle visual format conventions
- Subject A: left side, indigo tint
- Subject B: right side, rose tint
- VS divider: centered, bold, white/40 opacity
- Score overlay: large, font-black, color matches approval state
- Category label: small caps, white/35 opacity, above subject names

### Content tone
- Authoritative but not stuffy
- Opinion-inviting, not leading ("Pick a side" not "Who wins?")
- Binary and direct (no "it depends" framing)
- No profanity, no political positioning

---

## Platform-specific creative conventions

### TikTok
- Hook frame (0–2s): show both subjects side-by-side with "VS"
- Body (2–20s): brief case for each subject, one fact or opinion per side
- CTA (last 3s): "Vote at link in bio"
- Captions: match spoken audio, < 150 characters, with hashtags below

### Instagram (Reels)
- Adapt TikTok script; adjust pacing for slightly longer average view time
- Caption: < 2200 characters; first 125 characters must hook before "more"
- Cover image: 1:1 crop of the strongest visual frame

### Website battle card
- Subject A / VS / Subject B — this visual hierarchy is fixed
- Score and approval state visible in Studio only, not on public page
- Public page shows real-time vote counts and percentage split

---

## Creative production workflow

```
1. Pipeline generates Battle Package (caption, script, hashtags, prompts)
2. Reviewer grades and approves/rejects
3. Founder reviews in Studio → "Approve" → "Publish Ready"
4. Media Agent assembles TikTok package from output/published/<slug>/tiktok/
5. Human records or generates video using video_prompt.txt
6. Post manually, update Studio status to Published
```

## Known pitfalls

### Over-engineering the prompt for deterministic agents
Battle Designer is deterministic (template-based, no LLM). Applying LLM prompt engineering advice to deterministic agents adds complexity without benefit. Keep templates clean and logic in code.

### AI-generated captions need human review for tone
LLM-generated captions occasionally use corporate or overly formal language inconsistent with TikTok's casual register. Always review captions before posting. The Reviewer scores factual accuracy and engagement potential but does not catch tone mismatches.
