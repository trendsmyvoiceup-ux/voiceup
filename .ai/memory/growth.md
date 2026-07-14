# Growth Memory

> Distilled growth knowledge: acquisition, content strategy, viral mechanics, publishing conventions.
> Findings and patterns from content distribution. Not campaign history.

---

## Core acquisition loop (V1)

### The TikTok → vote loop
```
TikTok video (battle content)
  → link in bio → /battle/<slug>
  → anonymous vote
  → results page (shareable URL)
  → new TikTok video (repeat)
```
This is the only validated acquisition path at V1. Every other channel (Instagram, X, YouTube Shorts, email) is hypothesis. Validate TikTok first before investing in any other channel.

### The viral coefficient target
Each piece of battle content should drive > 1 new voter who then shares or creates their own content. A viral coefficient < 1 means the channel is a linear cost. The coefficient must be measured before additional content investment is justified.

---

## TikTok content principles

### Hook within 0–2 seconds
TikTok retention drops sharply after 2 seconds without a hook. Battle content must establish the conflict (A vs B) within the first 2 seconds. Do not open with branding or context-setting.

### Binary conflict is the hook
"Would you rather: X or Y?" and "This or that?" formats consistently outperform open-ended questions on TikTok. The binary structure of Human Signal battles maps perfectly to the platform's highest-performing content format. This is a structural advantage.

### Hashtag strategy (current)
- Category hashtags (`#techbattle`, `#popculture`) for discovery
- Broad opinion hashtags (`#wouldyourather`, `#thisorthat`) for algorithm reach
- Battle-specific hashtags for series recognition
Keep to 4–7 hashtags. More than 10 shows diminishing returns on TikTok.

### Battle link placement
Battle link goes in bio, not in the video caption. TikTok does not make caption links clickable. Bio link must be updated to the most recent battle or a linktree-style page that lists recent battles.

---

## Content production conventions

### Output folder is the publishing checklist
The full TikTok package lives at `output/published/<slug>/tiktok/`. The posting checklist (`posting_checklist.md`) in that folder is the workflow. Always follow it before marking a battle as published in Studio.

### Never publish without Reviewer approval
Before any battle content is posted to any platform, `output/battles/<slug>/review.json.approved` must be `true`. This is both a quality gate and a trust model requirement.

### Approved ≠ Publish Ready
Reviewer approval means the AI found the content high-quality. "Publish Ready" (Studio status) means the Founder has reviewed it and approved it for distribution. Both gates are required before posting.

---

## Publishing cadence (hypothesis, not validated)

3 battles per week appears to be the minimum viable posting frequency to maintain TikTok algorithm visibility. Below 3/week, the account loses momentum. Above 7/week, content quality risk increases. This is a hypothesis — validate with 4–6 weeks of consistent posting data before treating it as fact.

---

## Platform-specific observations

### TikTok
- 9:16 vertical video is the only format worth investing in
- Captions should match the video audio (accessibility + retention)
- The "VS" framing outperforms single-subject content for engagement

### Instagram (V1 adaptation)
- No separate Instagram package in V1; adapt TikTok caption for 1:1 square
- Reels outperform static posts; produce both when possible
- Hashtag strategy differs from TikTok — fewer, more specific tags

### Cross-posting
Do not cross-post identical content verbatim across platforms. Each platform's algorithm penalizes content detected as repurposed. At minimum, adjust caption and hashtags per platform.
