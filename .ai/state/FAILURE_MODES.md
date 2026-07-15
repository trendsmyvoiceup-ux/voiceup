# Failure Mode Analysis — Epic 2: Signal Motivation Layer

> Written at implementation time. Review after 30 days of production data.
> Each failure mode is paired with its mitigation and the signal that would confirm it.

---

## FM-01: Curiosity hint increases drop-off, not completion

**Assumption broken:** Information gap theory predicts motivation to close the gap.
**Risk:** The phrase "Results reveal after you vote" may be read as a threat ("I have to vote to see anything") rather than a reward promise. Users who arrived via TikTok with low intent may exit rather than vote.
**Mitigation:** EXP-001 is A/B testable. Measure completion rate with vs. without. If completion rate drops, remove the hint — the information gap mechanism operates without it (the split-screen battle format implies hidden information).
**Signal to watch:** Completion rate (votes cast / page views). If < 60% and declining, investigate.

---

## FM-02: Distinctiveness framing backfires for minority voters

**Assumption broken:** Brewer (1991) optimal distinctiveness theory was established in individualistic-culture populations.
**Risk:** "A distinctive signal — you're in the X% on this one" may read as "you're wrong" to users from collectivist backgrounds, or to users who simply dislike being told they're in the minority. It may increase share rate in individualistic contexts while reducing it in collectivist ones.
**Mitigation:** EXP-002 is A/B testable. Track share rate AND abandonment rate by position (minority vs. majority). If minority voters have significantly higher abandonment than majority voters, revert to neutral copy ("You voted for X").
**Signal to watch:** Post-reveal abandonment rate by vote position. Share rate by vote position. Minority vote = user's option < 50% of distribution.

---

## FM-03: Optional reason prompt adds friction and reduces session depth

**Assumption broken:** The reason prompt is "zero friction."
**Risk:** Any additional step creates an exit opportunity. Users who complete the vote but encounter the reason prompt may exit the sheet entirely rather than tap skip. This would reduce next-battle click-through rate.
**Mitigation:** The skip is always visible above the fold. If reason submission rate < 5% AND post-reveal exit rate > 40%, the reason prompt is adding friction without value — remove it. If skip rate > 90%, the prompt is not providing any signal value — consider removing it rather than showing a mostly-skipped step.
**Signal to watch:** Reason submission rate. Post-reveal → next battle click-through rate vs. control (same flow without reason prompt).

---

## FM-04: Next battle CTA is ignored — sessions stay at 1 battle

**Assumption broken:** EXP-004 assumes that a prominent next battle CTA increases session depth.
**Risk:** Users may arrive specifically for one battle (linked from TikTok) and have no intention of browsing. Prominence of the CTA won't overcome intent. Session depth may remain at 1.0 regardless.
**Mitigation:** Do not optimise the next battle CTA further before measuring. If next battle click-through < 10% after 200 sessions, investigate: is the referral source (TikTok) the dominant factor? If yes, session depth is a referral-channel problem, not a CTA problem. Consider whether the next battle suggested is relevant to the current one.
**Signal to watch:** Next battle click-through rate. Battles per session by referral source.

---

## FM-05: wording-config.ts becomes a bottleneck

**Assumption broken:** Centralised wording config accelerates localisation.
**Risk:** If copy is changed for A/B testing or localisation, the single config file becomes a shared dependency. Multiple concurrent experiments may conflict.
**Mitigation:** When multiple A/B variants are needed simultaneously, extend the config to accept a `variant` parameter per key, or create variant config files that override defaults. The current single-object structure is correct for V1 (one active variant per experiment). Do not over-engineer before variants are needed.
**Signal to watch:** Any need to show different copy to different user segments before a single variant is validated.

---

## FM-06: localStorage state management diverges across devices

**Assumption broken:** localStorage provides reliable vote and reason persistence.
**Risk:** A user who votes on mobile and returns on desktop sees the "reveal" or "done" phase with no counts (API may return 0 if battle is new). The phase logic uses `getVotedMap()[comparison.id]` to restore state, which is device-specific. Multi-device users see inconsistent experiences.
**Mitigation:** This is an acceptable MVP limitation — database-backed state is TASK-0045. The current implementation matches the pre-existing localStorage-only approach. Document clearly: the single-device assumption is intentional at MVP.
**Signal to watch:** User complaint patterns about "starting over" on a different device. When database schema (TASK-0045) is implemented, migrate phase state to server-side.

---

## FM-07: Influencer conformity contamination upstream of the vote

**Assumption broken:** The post-vote reveal design prevents conformity bias.
**Risk:** If TikTok influencers include their own vote preference in the video ("I voted Apple — comment which side you picked"), the conformity mechanism has already operated before the user reaches the battle page. The post-vote reveal design cannot prevent this. This is identified in RESEARCH.md Critical Review (Communication science — two-step flow).
**Mitigation:** No in-product mitigation possible — this is a distribution strategy question. Content briefs for TikTok should instruct creators NOT to reveal their vote preference before linking out. This should be documented as a content creation guideline, not a product constraint.
**Signal to watch:** If vote distribution is biased toward the "side" endorsed in referring TikTok content, the influencer contamination hypothesis is confirmed.

---

## FM-08: Signal quality does not improve over iterations

**Assumption broken:** The motivation layer improves vote signal quality, not just completion rate.
**Risk:** All four experiments optimise for behavioural metrics (completion rate, share rate, return rate) that do not directly measure signal quality. A motivation layer that maximises engagement could produce engaged but biased signals. Optimising for engagement is not the same as optimising for honest preference expression.
**Mitigation:** After each experiment iteration, ask: does the change that increased engagement also increase minority vote share? Minority share is a proxy for autonomy (people express genuine minority preferences rather than conforming). If engagement increases but minority share decreases, the change may be improving engagement at the cost of signal quality.
**Signal to watch:** Minority vote share (% of voters choosing the lower-percentage option) over time. Should remain stable or increase. Significant decline suggests conformity pressure is increasing.

---

## Summary table

| ID    | Failure mode                                     | Probability | Severity | Mitigated by        |
|-------|--------------------------------------------------|-------------|----------|---------------------|
| FM-01 | Curiosity hint reduces completion rate            | Medium      | Medium   | EXP-001 A/B test    |
| FM-02 | Distinctiveness framing backfires for minority    | Medium      | Medium   | EXP-002 A/B test    |
| FM-03 | Reason prompt adds friction                       | Medium      | Low      | Skip always visible |
| FM-04 | Next battle CTA ignored — sessions at 1.0        | High        | Low      | Accept at MVP       |
| FM-05 | wording-config becomes A/B bottleneck             | Low         | Low      | Extend when needed  |
| FM-06 | localStorage diverges across devices              | High        | Low      | Accepted MVP limit  |
| FM-07 | Influencer conformity upstream of vote            | Medium      | High     | Content brief       |
| FM-08 | Engagement improves but signal quality degrades   | Low         | High     | Monitor minority %  |
