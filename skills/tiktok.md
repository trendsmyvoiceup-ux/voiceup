# Skill: TikTok Distribution

Conventions for preparing TikTok-facing assets for a battle. No API
integration exists — this skill only governs the text/prompt assets
produced in `output/battles/<slug>/`.

## script.txt

A short-form video script (a few lines), framed as a quick, punchy
A-vs-B setup ending with a direct call to vote via the battle's shareable
URL (`/battle/<slug>`).

## caption.txt

One or two sentences, casual tone, includes the battle question and a soft
call to action ("Tap to vote", "Which side are you on?").

## hashtags.txt

A short list (5-8) of relevant hashtags. Always include a branded tag once
one exists (placeholder for now). No engagement-bait or misleading tags.

## image_prompt.txt / video_prompt.txt

A descriptive prompt suitable for a future AI image/video generation step.
Do not generate actual media — text prompts only, per
`agents/battle-designer/SYSTEM_PROMPT.md`.

## Disclosure

Nothing in TikTok-facing copy should claim scientific accuracy. This is a
community signal, consistent with `docs/10-TRUST_MODEL.md`.
