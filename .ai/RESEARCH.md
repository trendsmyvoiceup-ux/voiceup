# Human Signal — Motivation Evidence Base

**Epic:** 1 — Human Motivation Evidence Base
**Task:** TASK-0041
**Date:** 2026-07-05
**Type:** Research synthesis — no implementation
**Author:** Research Agent

> Evidence strength codes used throughout:
> **[S]** Strong — replicated, peer-reviewed, meta-analytic support
> **[M]** Moderate — peer-reviewed, limited replications or specific populations
> **[W]** Weak — single study, small N, or indirect evidence
> **[C]** Conflicting — mixed findings across studies
> **[H]** Hypothesis — not yet empirically validated for this context

---

## Deliverable 1 — Evidence Matrix

### RQ1: What makes a person interrupt scrolling and express a preference?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Information gap / curiosity | Cognitive psychology, neuroscience | When people perceive a gap between what they know and what they want to know, they are motivated to close it. The gap itself is experienced as mildly aversive and resolving it is rewarding. | **[S]** | Show the question and subjects — withhold results until after vote. The gap is "what do others think?" Resolution is the reward. | None significant if gap is genuine. Manufactured curiosity (clickbait) exploits the mechanism. | Loewenstein (1994) *Psychological Bulletin* 116(1); Kidd & Hayden (2015) *Neuron* 88(3) |
| Binary choice reduces cognitive load | HCI, cognitive psychology | Reducing the number of options decreases decision time and increases completion rate (Hick's Law). Binary choices eliminate "the paradox of choice" — too many options reduce satisfaction with the chosen option. | **[S]** | A vs B format is correct by evidence. Never expand to 3+ options without A/B evidence. | Binary framing forces false dichotomies; some questions are genuinely non-binary. | Hick (1952) *Quarterly Journal of Experimental Psychology*; Iyengar & Lepper (2000) *JPSP* 79(6) |
| Self-relevance of topic | Social psychology | People are more likely to form and express opinions on topics that are self-relevant — that connect to their identity, experience, or expertise. | **[S]** | Technology and pop culture battles are high self-relevance for most TikTok demographics (18–34). Avoid abstract or technical topics with low self-relevance. | Identity-based relevance can trigger identity-protective cognition rather than genuine preference. | Petty & Cacioppo (1986) *Advances in Experimental Social Psychology* 19 |
| Low effort threshold | Behavioral economics | Participation rates drop sharply with effort. Even adding one field (name, email) can reduce completion by 50%+. | **[S]** | Zero-friction vote: one tap, no account, no registration. Maintain this permanently. | Very low friction removes thoughtfulness — may produce low-quality signals. Balance with optional depth. | Cialdini (2001) *Influence* ch. 3; confirmed across digital conversion literature |
| Zeigarnik completion drive | Cognitive psychology | People have a drive to complete interrupted or unfinished tasks. Unanswered questions create tension that motivates closure. | **[M]** | A posed question is an incomplete task. Displaying the question without a verdict invites completion. | Can be exploited to create compulsive check-back behavior. | Zeigarnik (1927) *Psychologische Forschung* 9 |

---

### RQ2: What immediate reward makes voting worthwhile?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Curiosity resolution | Cognitive psychology | The strongest immediate reward for opinion expression is curiosity resolution: finding out what others think. This is the "reveal" — the moment results appear. | **[S]** | Post-vote reveal is the primary reward. Never show results before vote. The reveal must be immediate (< 500ms). | Rewarding only if the result is genuine. Fake or manipulated counts destroy trust and the reward. | Loewenstein (1994); Litman (2005) *Cognition and Emotion* 19(6) |
| Social comparison | Social psychology | People have a fundamental drive to evaluate their opinions by comparing them to others (Festinger, 1954). Knowing where you stand in a distribution is intrinsically motivating, not just informative. | **[S]** | Show percentage split immediately after vote. Frame as "X% chose A" not "A is winning." | If framing implies the minority "lost," it activates threat response rather than curiosity. | Festinger (1954) *Human Relations* 7(2) |
| Opinion validation | Social psychology, neuroscience | When others agree with our expressed opinion, we experience reward that reinforces the expression. This is well established but the effect varies by how much we identify with the agreeing group. | **[M]** | "You're in the 64% who chose A" — validation framing. Shown after vote to avoid conformity bias. | Strong validation may reinforce identity-protective cognition. Validation of majority opinion comes at cost to minority expression. | Cialdini (2001); Tajfel & Turner (1979) |
| Autonomy expression | Self-determination theory | Expressing a freely chosen preference is intrinsically rewarding independent of outcome — it satisfies the basic need for autonomy (Deci & Ryan). The key word is "freely chosen." | **[S]** | No social pressure before vote. No visible results, no friend counts, no influencer endorsements before the vote. | Any pre-vote social signal undermines autonomy — which undermines signal quality AND user wellbeing simultaneously. | Deci & Ryan (1985) *Intrinsic Motivation*; Ryan & Deci (2000) *American Psychologist* 55(1) |
| Distinctiveness surprise | Social psychology | Brewer's optimal distinctiveness theory: people are especially motivated when they discover they hold a *minority* position, not because losing is rewarding, but because distinctiveness satisfies the need to stand out from the crowd. | **[M]** | Minority-position framing must not imply loss. "You're in the 29% who chose X — a distinctive view" is more accurate and more motivating than "29% agreed with you." | Risk of false uniqueness claims — cannot manufacture distinctiveness. | Brewer (1991) *PSPB* 17(5) |

---

### RQ3: Which mechanisms increase repeated participation?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Intrinsic motivation preservation | SDT | Extrinsic rewards (points, streaks, badges) can undermine intrinsic motivation when they become controlling — the "overjustification effect." Once external rewards are introduced, removing them causes participation to drop below baseline. | **[S]** | Do not introduce points, streaks, or leaderboards as the primary engagement mechanic. Use curiosity and social comparison as intrinsic drivers. | Extrinsic gamification converts an intrinsically motivated act into a transaction. | Deci, Koestner & Ryan (1999) *Psychological Bulletin* 125(6) — meta-analysis of 128 studies |
| Autonomy support | SDT | Environments that support autonomy (optional participation, no pressure, genuine choice) produce higher long-term engagement than controlling environments. | **[S]** | Never guilt-trip non-voters. Never use streak-loss messaging. Make every session feel genuinely optional. | Autonomy-undermining patterns are both ethically bad and empirically counterproductive for long-term retention. | Ryan & Deci (2000) *American Psychologist* |
| Content novelty | Cognitive psychology | Curiosity is sensitive to novelty. Habituation reduces the information-gap effect over time. New topics are required to sustain curiosity-driven engagement. | **[S]** | Content freshness is a core retention mechanic. Consistent publishing cadence (new battles) matters more than UI mechanics. | Over-reliance on novelty can produce addictive novelty-seeking rather than genuine engagement. | Berlyne (1960) *Conflict, Arousal, and Curiosity* |
| Variable-ratio revelation | Behavioral psychology | Variable (unpredictable) rewards produce higher response rates than fixed rewards — the basis of slot machine mechanics. | **[S] — known mechanism but high ethical risk** | Not recommended. Variable ratio reinforcement is the foundation of compulsive use patterns in social media. | The mechanism is well-understood and the ethical cost is high. Do not design surprise reveals, mystery outcomes, or unpredictable reward schedules. | Skinner (1938); see also Schüll (2012) *Addiction by Design* |
| Social embedding | Social psychology | Participation increases when users know others in their social network participate. Social norms activate both descriptive ("others do it") and injunctive ("others approve of it") norm compliance. | **[M]** | Optional social sharing after vote activates this. Share mechanics must be genuine (show real result), not manufactured social proof. | Manufactured social proof is both a dark pattern and a GDPR risk. | Cialdini (2001); Schultz et al. (2007) on descriptive vs. injunctive norms |
| Gamification mixed evidence | HCI | Hamari et al. (2014) systematic review of 24 empirical gamification studies found mostly positive effects on engagement, but effect sizes were small, studies methodologically weak, and long-term effects unstudied. Most positive studies involved motivated, voluntary populations. | **[C]** | Gamification may work short-term on engaged populations but evidence is too weak to justify introducing its ethical risks. Re-evaluate only after intrinsic motivation mechanisms have been validated. | Point systems, leaderboards, and badge mechanics carry autonomy-undermining risks even in studies that show short-term engagement gains. | Hamari, Koivisto & Sarsa (2014) *HICSS* |

---

### RQ4: When does identity feedback motivate, and when does it become misleading or harmful?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Social identity threat | Social identity theory | When a person's expressed preference conflicts with their in-group identity, they experience identity threat. The response is typically to reassert in-group loyalty, not to update their view. | **[S]** | Category framing matters. "Technology people prefer X" activates identity threat in those who chose Y. Avoid category-identity framing in results. Present as "64% chose A" not "tech people chose A." | Category-identity framing can entrench polarization rather than reveal genuine preference. | Tajfel & Turner (1979); Kahan et al. (2017) *Behavioural Public Policy* |
| Identity-protective cognition | Political psychology | Kahan et al. show that numeracy increases identity-motivated reasoning rather than correcting it — better statistical understanding leads to more sophisticated motivated reasoning. | **[S]** | Detailed result breakdowns by demographic will activate identity-protective cognition. Keep results simple: percentage, count. No demographic segmentation at MVP. | Demographic breakdowns of vote data can cause groups to see results as threatening rather than informative. | Kahan et al. (2017) |
| Optimal distinctiveness | Social psychology | People want to be simultaneously included (similar enough) and distinctive (different enough). Finding oneself in a minority on a low-stakes topic (pop culture) is experienced as interesting rather than threatening. High-stakes topics reverse this. | **[M]** | Human Signal's topic restriction (pop culture, technology) is exactly the right domain for identity feedback to be motivating rather than threatening. Political and religious topics must stay excluded. | Topic scope is the primary risk management tool for identity feedback harm. | Brewer (1991) |
| Backlash against perceived manipulation | Social psychology | When users perceive that a platform is attempting to shape their opinion, they engage in reactance — deliberately moving toward the opposite position. | **[M]** | Never show results that appear to "want" a particular outcome. Neutral language, neutral framing. The platform has no opinion. | Attempts to nudge opinion (even toward consensus) activate reactance and undermine signal quality. | Brehm (1966) *A Theory of Psychological Reactance* |

---

### RQ5: How should majority/minority feedback be presented without encouraging unhealthy conformity or polarization?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Spiral of silence | Political communication | Noelle-Neumann (1974): people who perceive themselves to be in the minority become increasingly silent over time. On social media, this has been shown to suppress minority opinion expression and homogenize visible discourse. | **[S]** | Never show vote totals or trends before the user votes. Always show results after vote. Frame minority positions as "a distinctive view" not "the losing side." | If majority opinion is consistently amplified and minority suppressed, platform signals drift toward false consensus. | Noelle-Neumann (1974) *Journal of Communication* 24(2); Hampton et al. (2014) on Facebook spiral of silence |
| Asch conformity | Social psychology | When presented with social proof before making a judgment, a significant minority of people conform to the apparent majority — even when it contradicts their own perception. Effect is stronger when: (a) answers are ambiguous, (b) the group is unanimous, (c) the individual has low confidence. | **[S]** | Showing vote totals or trends before the user votes will bias the vote. This is non-negotiable: results must be post-vote only. | Pre-vote results corrupt signal quality and are autonomy-undermining. This is one of the clearest evidence-based product constraints in the platform. | Asch (1951, 1956) *Groups, Leadership, and Men*; replicated extensively |
| False consensus effect | Social psychology | People overestimate how many others share their views. Showing actual results corrects this bias and is experienced as informative rather than threatening on low-stakes topics. | **[M]** | Result reveal serves a genuine epistemic function. People learn something real about the distribution of opinion. This supports the "not scientific polling" framing — the data is imperfect but real. | On high-stakes topics, correcting false consensus activates identity threat (see RQ4). Domain restriction is the mitigation. | Ross, Greene & House (1977) *JESP* 13(3) |
| Framing effects | Behavioral economics | How results are framed significantly affects their interpretation. "64% chose A" vs "A leads 64-36" vs "B trails by 28 points" convey identical information but activate different cognitive responses (relative vs absolute, competition vs. distribution). | **[M]** | Use neutral percentage framing: "64% chose A, 36% chose B." No language of winning, leading, or losing. | Any competitive framing activates loss aversion in the minority and activates winner/loser dynamics that distort the signal. | Tversky & Kahneman (1981) *Science* 211(4481) |
| Group polarization | Social psychology | When like-minded people discuss an issue, their views become more extreme. Pure preference aggregation without deliberation can amplify this. | **[M]** | At MVP, anonymous voting without visible discussion is the safest design. Comment sections should be optional and carefully designed if introduced. | Public comments under battle results can accelerate polarization even on low-stakes topics. | Sunstein (2009) *Going to Extremes*; Isenberg (1986) *Psychological Bulletin* |

---

### RQ6: How should optional reasons, comments, and public profiles be designed?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Privacy as contextual integrity | Privacy theory | Nissenbaum (2004): information disclosure is appropriate when it matches the norms of the context in which it was originally shared. People expect their vote to stay at the platform level; they did not consent to it becoming social currency. | **[S]** | Reasons, comments, and profiles must be opt-in with explicit informed consent. Default state: anonymous. Changing the default (even gradually) violates contextual integrity. | A design that makes public profiles increasingly the "normal" path violates contextual integrity and GDPR principles of purpose limitation. | Nissenbaum (2004) *Washington Law Review* 79(1) |
| Chilling effect | Privacy, political communication | When people know their opinions are visible, they self-censor. The chilling effect is stronger for minority positions and on socially sensitive topics. Even on low-stakes topics, public visibility reduces honest expression. | **[M]** | Anonymous voting is not just a convenience — it is epistemically necessary for honest signals. Optional reason-giving should be anonymous unless the user explicitly chooses otherwise. | Mandatory public attribution would corrupt signal quality AND violate autonomy. | Penney (2016) *Columbia Law Review* 116(6) on chilling effects |
| Self-disclosure reciprocity | Social psychology | Derlega & Grzelak (1979): people disclose more when they perceive that others have disclosed. Optional reason-giving works best when sample reasons are shown (with consent). | **[M]** | Show anonymized sample reasons from others to trigger reciprocal disclosure. Never attribute reasons to specific users without explicit consent. | Displaying others' reasons (even anonymized) can create conformity pressure for reason-giving. | Derlega & Grzelak (1979) *Journal of Experimental Social Psychology* 15(5) |
| Autonomy preservation in design | SDT, HCI | Optional features that are genuinely optional — not nudged, not defaults, not socially pressured — satisfy the autonomy need. Features that appear optional but are designed to push toward participation undermine autonomy. | **[S]** | All optional features (reasons, comments, profiles) must have: visible skip option, no "0 people shared a reason" shaming, no streak or social pressure mechanics. | Dark patterns in optional features are among the most common GDPR consent violations (Nouwens et al., 2020). | Ryan & Deci (2000); Nouwens et al. (2020) *CHI* |

---

### RQ7: Which engagement techniques qualify as dark patterns or digital-wellbeing risks?

| Mechanism | Discipline | Finding | Strength | Product Implication | Ethical Risk | Source |
|-----------|-----------|---------|----------|--------------------|-----------|----|
| Variable ratio reinforcement | Behavioral psychology | The most robust mechanism for producing compulsive behavior. Used in slot machines, social media feeds, and notification systems. Produces high engagement rates but also compulsive checking, anxiety around not checking, and difficulty stopping. | **[S] — dark pattern** | Explicitly prohibited in Human Signal. No unpredictable reward reveals, no "mystery" outcomes, no variable notification timing. | Causes compulsive use patterns. High ethical risk even when engagement metrics improve. | Skinner (1938); Schüll (2012); Harris (2016) on social media slot machines |
| Streak mechanics with loss aversion | Behavioral psychology, HCI | Streak mechanics are effective but activate loss aversion (Kahneman & Tversky) — the fear of losing a streak is more motivating than the desire to build one. This creates compulsive obligation rather than genuine motivation. | **[S] — high risk** | No streak mechanics. No "your X-day streak is at risk" notifications. Retention through content quality, not loss aversion. | Loss aversion under streak mechanics is a documented source of anxiety and compulsive use. | Kahneman & Tversky (1979) *Econometrica* 47(2); confirmed in Duolingo research |
| Pre-vote social proof | Social psychology, HCI | Showing vote counts or results before the user votes biases the vote, reduces minority expression, and corrupts signal quality. | **[S] — dark pattern in this context** | Prohibited. Results always post-vote. | Signal corruption + autonomy violation + conformity activation = multiply harmful. | Asch (1956); Noelle-Neumann (1974) |
| Infinite scroll | HCI, digital wellbeing | Infinite scroll removes natural stopping cues, increasing total consumption beyond the user's intention. Replicated across multiple studies, though effect sizes are debated. | **[M]** | Not directly applicable to battle format, but relevant if a "battle feed" is introduced. Build in stopping cues: session counts, natural end points. | Tristan Harris and the Center for Humane Technology have documented this extensively; peer-reviewed evidence is more limited. | Haynes et al. (2018) *Computers in Human Behavior*; Orben & Przybylski (2019) *Nature Human Behaviour* |
| Manipulated social proof | Ethics, consumer psychology | Fake or inflated vote counts, manufactured "trending" labels, or misleading "X people are voting now" displays constitute dark patterns and in many jurisdictions are illegal under consumer protection law. | **[S] — bright-line prohibition** | Absolute prohibition. All vote counts must be real. All displays of social activity must be accurate. | Legal risk + trust destruction if discovered. | Brignull (2010) dark patterns taxonomy; FTC guidance on deceptive design |
| FOMO-based notifications | HCI, psychology | Notifications framed around what the user is missing ("Don't miss the latest battle!") exploit FOMO (Fear of Missing Out) rather than providing genuine value. FOMO is associated with reduced wellbeing. | **[M]** | No FOMO framing in any notification. Notifications, if introduced, should be purely informational: "New battle posted." | FoMO is negatively correlated with life satisfaction (Przybylski et al., 2013). | Przybylski et al. (2013) *Computers in Human Behavior* 29(4) |
| Deceptive consent in profiles | Privacy, HCI | Making public profiles appear to be the normal path (pre-checked, centrally positioned, shown to others as "more engaged users") constitutes deceptive design under GDPR Art. 7. | **[S] — legal risk** | Default is always anonymous. Opt-in for any public identity. No social pressure toward profile creation. | GDPR enforcement has specifically targeted pre-checked consent and social proof in consent flows. | Nouwens et al. (2020) *CHI*; GDPR Art. 7; EDPB consent guidelines |

---

## Deliverable 2 — Motivation Model for Human Signal

### The CORE Model (Curiosity → Opinion → Reveal → Embed)

The model is grounded in Self-Determination Theory (Deci & Ryan) as the primary framework, with Information Gap Theory (Loewenstein) governing the curiosity trigger and Social Comparison Theory (Festinger) governing the post-vote reward.

```
┌─────────────────────────────────────────────────────────────────┐
│                    HUMAN SIGNAL MOTIVATION MODEL                │
└─────────────────────────────────────────────────────────────────┘

Phase 1: CURIOSITY TRIGGER (pre-vote)
──────────────────────────────────────
Battle question presented
  → Information gap activated ("what do others think?")
  → Topic self-relevance creates engagement ("this matters to me")
  → Binary format reduces cognitive load ("this is easy to answer")
  → Results withheld (gap maintained until after vote)

Satisfies: Cognitive need for closure, curiosity
SDT need: None yet — this is the hook
Risk to manage: Manufactured curiosity (clickbait framing)

Phase 2: OPINION EXPRESSION (the vote)
────────────────────────────────────────
One-tap, anonymous, zero-friction vote
  → Freely chosen (no social pressure, no pre-vote results)
  → Self-relevant (genuine preference, not performance)
  → Low-commitment (single binary choice)

Satisfies: Need for autonomy (freely chosen expression)
SDT need: Autonomy ✓
Risk to manage: Identity-protective cognition if topics are too loaded

Phase 3: REVEAL (immediate post-vote reward)
─────────────────────────────────────────────
Immediate result display (< 500ms)
  → Curiosity resolved (information gap closed)
  → Social comparison ("64% agree / 36% chose X")
  → Position framing: neutral for majority, distinctiveness for minority
  → Optional: anonymous reason field

Satisfies: Curiosity resolution, social comparison, validation
SDT need: Competence (I'm calibrated), Relatedness (I know where I stand)
Risk to manage: Conformity (mitigated by post-vote timing), spiral of silence

Phase 4: EMBED (return driver)
───────────────────────────────
Content freshness (new battles)
  → Reactivates curiosity loop (novel information gap)
  → Social sharing (optional, genuine result sharing)
  → Topic variety (different categories sustain breadth of engagement)

Satisfies: Ongoing autonomy, novelty, social relatedness
SDT need: All three sustained
Risk to manage: Novelty addiction, notification misuse
```

### What this model explicitly excludes

The following motivation mechanisms are known to increase engagement but are excluded from the Human Signal model because they undermine signal quality, user autonomy, or wellbeing:

- Variable ratio reinforcement (compulsive use risk)
- Streak mechanics (loss aversion, obligation)
- Pre-vote social proof (conformity bias, signal corruption)
- Identity-based results segmentation (polarization risk)
- Leaderboards and competitive rankings (social comparison anxiety)
- FOMO notifications (wellbeing risk)

---

## Deliverable 3 — Taxonomy of Battle Motivations

People who vote on a Human Signal battle are motivated by one or more of the following. These are not mutually exclusive.

| Type | Definition | Signal Quality | Design Implication |
|------|-----------|----------------|-------------------|
| **Preference expression** | I genuinely prefer X and want to say so | Highest — authentic preference | Most battles should primarily attract this type |
| **Curiosity-seeking** | I want to know what others think, regardless of my own view | High — honest engagement with the question | Post-vote reveal is the core reward for this type |
| **Identity signaling** | This choice communicates something about who I am | Medium — genuine but socially filtered | Acceptable on low-stakes topics; becomes distorting on identity-loaded topics |
| **Social influence** | I want my side to win or I'm influenced by visible majority | Low — follows rather than expresses preference | Mitigated by post-vote-only results. Cannot be eliminated, only minimized. |
| **Entertainment** | This is fun and I have 3 seconds to spare | Medium — low-investment but honest in the moment | Fine as a motivation type; do not design to maximize this at expense of depth |
| **Information-seeking** | I'm genuinely uncertain and curious which is "better" | High — active opinion formation | Binary battles should ideally provoke this in addition to preference expression |
| **Contrarianism** | I'll choose the unexpected or minority option for its own sake | Low — performative rather than genuine | Small proportion in any population; hard to design against; acceptable noise |

### Dominant motivation by context

- **TikTok-referred users:** Entertainment + Curiosity-seeking first; Preference expression second
- **Direct URL users:** Preference expression + Information-seeking dominant
- **Return visitors:** Preference expression + Identity signaling (they know the platform)

---

## Deliverable 4 — Prohibited and High-Risk Patterns

### Tier 1 — Prohibited (never implement)

These patterns would corrupt signal quality, violate user autonomy, or create unacceptable ethical/legal risk.

1. **Pre-vote result display** — showing any vote count, percentage, or trend before the user votes. Violates: autonomy, signal quality, anti-conformity. *Evidence: Asch (1956), Noelle-Neumann (1974).*

2. **Manipulated or inflated vote counts** — fake votes, manufactured trending labels, false activity indicators. Violates: honesty, trust, consumer protection law. *Evidence: Brignull (2010) dark patterns taxonomy.*

3. **Variable ratio reward schedules** — unpredictable reveals, mystery outcomes, random reward timing. Violates: digital wellbeing, non-manipulation principle. *Evidence: Skinner (1938); Schüll (2012).*

4. **Loss-aversion streak mechanics** — "your X-day streak is at risk," penalty framing for non-participation. Violates: autonomy, wellbeing. *Evidence: Kahneman & Tversky (1979).*

5. **Category-identity results framing** — "people like you prefer X," demographic segmentation of visible results. Violates: anti-polarization, neutrality, privacy. *Evidence: Kahan et al. (2017).*

6. **Deceptive public-profile defaults** — pre-checked "make my vote public," social pressure toward profile creation. Violates: GDPR Art. 7, contextual integrity, autonomy. *Evidence: Nouwens et al. (2020).*

7. **"Not scientific polling" omission** — presenting results without the disclaimer on any public surface. Violates: trust model, emerging AI content transparency requirements.

### Tier 2 — High Risk (require evidence before implementing)

These patterns may increase engagement but carry significant ethical risk. Do not implement without (a) validated evidence of net benefit and (b) explicit Founder decision.

1. **Push notifications** — any notification timing that exploits off-hours, FOMO framing, or social proof. *Require: genuine value (new battle available), opt-in, one notification type max.*

2. **Social sharing with results** — sharing a result includes the actual percentage. *Risk: cherry-picked sharing of extreme results amplifies false consensus outside the platform.*

3. **Anonymous reason-giving** — optional reasons after vote. *Risk: if poorly designed, reasons create conformity pressure for subsequent voters who see aggregated reasons.*

4. **Return-visit reminders** — reminding users that a battle exists. *Risk: if implemented as FOMO ("don't miss the results!"), activates compulsive checking. If implemented as pure information, risk is low.*

5. **Infinite scroll battle feed** — a list of battles to vote on sequentially. *Risk: removes natural stopping cues. If introduced, build explicit session-end states.*

### Tier 3 — Monitor (acceptable with care)

1. **Social sharing without coercion** — a clear "share" button after the vote reveal, with the actual result, genuinely optional, no social pressure.

2. **Topic variety** — different categories across sessions. Healthy novelty, not addictive novelty. Monitor: is engagement becoming category-breadth-driven or depth-driven?

---

## Deliverable 5 — Four Testable UX Variants

Each variant tests one specific mechanism from the evidence matrix. Variants can be run sequentially on different battle releases.

---

### Variant A — Pure Curiosity (Control)

**Hypothesis:** Post-vote-only reveal with neutral percentage framing produces the highest quality signals (most aligned with genuine preference) and adequate engagement.

**Design:**
- Vote interface: A vs B, no visible counts, no social context
- Post-vote: "64% chose A / 36% chose B" in neutral percentage display
- No reason field, no sharing prompt
- "Not scientific polling" disclaimer always visible

**Primary metric:** Vote completion rate (entered page → voted)
**Secondary metrics:** Return visit rate (7-day), share rate (organic, not prompted)
**Control condition for all other variants**

---

### Variant B — Distinctiveness Framing

**Hypothesis:** Framing minority positions as "a distinctive view" (rather than neutral percentage display) increases minority expression, reduces spiral-of-silence suppression, and increases share rate among minority-position holders.

**Design:** Identical to Variant A except post-vote reveal:
- Majority: "You're among the 64% who chose A"
- Minority: "You hold a distinctive view — 29% chose B"
- No competitive language, no "lost"

**Primary metric:** Share rate among minority-position voters
**Secondary metric:** Vote distribution variance (are minority positions more represented vs. Variant A?)
**Expected direction:** Higher minority share rate; no change or slight increase in completion rate

---

### Variant C — Anonymous Reason-Giving

**Hypothesis:** An optional, anonymous, one-sentence reason field after the vote increases 7-day return rate by activating deeper cognitive engagement with the question.

**Design:** Identical to Variant A plus:
- Post-vote, after result reveal: "Optional: what influenced your choice?" (text field, one sentence max, anonymous)
- Show 3 anonymized sample reasons from others (randomly selected, consent obtained at time of entry)
- Skip option prominently visible

**Primary metric:** 7-day return visit rate
**Secondary metric:** Reason submission rate (voluntary engagement depth indicator)
**Ethical safeguard:** Sample reasons must be random, not majority-weighted. Must not create conformity pressure.

---

### Variant D — Contextual Curiosity Hook

**Hypothesis:** Adding a brief contextual hook to the battle question ("A surprising number of people have a strong view on this") increases vote completion rate without biasing vote direction.

**Design:** Identical to Variant A plus:
- Sub-headline on battle: "A surprisingly strong consensus has emerged — which side are you on?"
- Or: "Opinion is more divided than expected on this one"
- Hook is calibrated to actual result distribution (only triggered when result is genuinely surprising)

**Primary metric:** Vote completion rate
**Secondary metric:** Vote distribution (does the hook bias toward the implied majority?)
**Ethical safeguard:** Hook must be honest — only deployed when the described distribution is real. Requires post-publication data from prior battles, not manufactured.

---

## Deliverable 6 — Experimental Plan

### Design constraints

- Battles are the unit of experimentation, not users (users are anonymous, no persistent IDs at MVP)
- Cannot randomize individual users to conditions without persistent identity — variants are assigned per battle
- Minimum: 200 votes per battle for meaningful percentage estimates (wide confidence intervals below this)
- Confounds: topic (some categories drive more engagement), referral source (TikTok vs. direct), time of posting

### Primary metrics

| Metric | Definition | Measurement | Baseline target |
|--------|-----------|-------------|-----------------|
| Vote completion rate | (votes cast / page views) × 100 | Server log or analytics | > 60% |
| 7-day return rate | % of anonymous sessions that return within 7 days | Cookie/session analytics (privacy-preserving) | > 15% |
| Share rate | (share clicks / votes cast) × 100 | Click tracking on share button | > 8% |

### Secondary metrics

| Metric | Definition | Why it matters |
|--------|-----------|---------------|
| Vote distribution variance | Standard deviation of A/B split across battles in same category | Low variance signals social conformity dynamics at work |
| Minority share rate | Share rate among voters who chose the losing side | Spiral-of-silence proxy — if minority never shares, signal is being suppressed |
| Time-to-vote | Median seconds from page load to vote | Too fast (< 2s) = thoughtless tap; too slow (> 30s) = confusion or friction |
| Reason submission rate | % of voters who submit an optional reason (Variant C only) | Engagement quality proxy |

### Sample size and power

At 200 votes per battle and 50/50 split, a 5-percentage-point difference in vote completion rate is detectable with 80% power at 5% significance after ~8 battles per condition. For share rate (smaller absolute values), 15+ battles per condition are needed.

**Practical cadence:** At 3 battles per week, a 4-variant experiment (2 battles per variant per week) can produce actionable results in 6–8 weeks.

### Confound controls

- Run variants in rotation (not blocks) to control for topic-effect confounds
- Record referral source (TikTok vs. direct) and report metrics by source
- Exclude battles with fewer than 50 votes from analysis
- Report confidence intervals, not point estimates

---

## Deliverable 7 — Smallest Signal Motivation Layer MVP

### Recommendation: Four elements, no more

The evidence supports a minimal motivation layer that produces high-quality signals with low ethical risk. The temptation to add mechanics (streaks, points, profiles) should be resisted until the core loop is validated.

**Element 1: Post-vote curiosity reveal (required)**
Show results immediately after vote, never before.
*Evidence base: Strong. Satisfies curiosity resolution, enables social comparison, preserves autonomy.*

**Element 2: Neutral percentage display with distinctiveness framing for minority (required)**
"64% chose A / 36% chose B" with minority framing: "You're in the 36% who chose B."
*Evidence base: Moderate. Mitigates spiral of silence. Low ethical risk.*

**Element 3: "Not scientific polling" disclosure (required)**
Visible on every battle result display.
*Evidence base: Trust model requirement + emerging regulatory requirement. Non-negotiable.*

**Element 4: Optional anonymous reason (one sentence, genuinely optional) (recommended for first experiment)**
After the reveal. No social pressure. Skip is equally prominent.
*Evidence base: Moderate. Tests deeper engagement without autonomy risk if designed correctly.*

### What the MVP explicitly excludes and why

| Excluded element | Why |
|-----------------|-----|
| Pre-vote social proof | Corrupts signal quality, activates conformity (Strong evidence) |
| Streaks | Activates loss aversion, obligation over genuine motivation (Strong evidence) |
| Points / badges | Undermines intrinsic motivation via overjustification effect (Strong evidence, meta-analytic) |
| Leaderboards | Social comparison anxiety, competitive framing (Moderate evidence) |
| Push notifications | FOMO risk; premature without validated return-rate problem (Moderate evidence) |
| Public profiles | Privacy violation, chilling effect on honest signals (Strong evidence) |
| Demographic result segmentation | Polarization risk, identity-protective cognition activation (Strong evidence) |

### When to revisit

- After 500+ votes per battle have been collected across 10+ battles
- After Variant A–D experiments have been run
- After share rate and return rate baselines are established
- Not before

---

## Source index

| Author(s) | Year | Title | Journal / Publisher | Notes |
|-----------|------|-------|---------------------|-------|
| Asch, S.E. | 1951, 1956 | Effects of group pressure upon modification and distortion of judgments | Carnegie Press; *Scientific American* | Foundational conformity research |
| Berlyne, D.E. | 1960 | *Conflict, Arousal, and Curiosity* | McGraw-Hill | Curiosity and novelty |
| Brehm, J.W. | 1966 | *A Theory of Psychological Reactance* | Academic Press | Autonomy and reactance |
| Brewer, M.B. | 1991 | The social self: On being the same and different | *PSPB* 17(5) | Optimal distinctiveness |
| Brignull, H. | 2010 | Dark patterns | darkpatterns.org taxonomy | Dark patterns classification |
| Cialdini, R.B. | 2001 | *Influence: The Psychology of Persuasion* | HarperCollins | Social proof, reciprocity |
| Deci, E.L., Koestner, R., & Ryan, R.M. | 1999 | A meta-analytic review of experiments examining the effects of extrinsic rewards on intrinsic motivation | *Psychological Bulletin* 125(6) | Key: 128 studies meta-analysis |
| Deci, E.L., & Ryan, R.M. | 1985 | *Intrinsic Motivation and Self-Determination in Human Behavior* | Plenum | SDT foundation |
| Derlega, V.J., & Grzelak, J. | 1979 | Appropriateness of self-disclosure | *JESP* 15(5) | Self-disclosure reciprocity |
| Festinger, L. | 1954 | A theory of social comparison processes | *Human Relations* 7(2) | Social comparison |
| Gray, C.M. et al. | 2018 | The dark (patterns) side of UX design | *CHI 2018* | Dark patterns taxonomy |
| Hamari, J., Koivisto, J., & Sarsa, H. | 2014 | Does gamification work? | *HICSS 2014* | Gamification review |
| Hampton, K. et al. | 2014 | Social media and the spiral of silence | Pew Research | Online spiral of silence |
| Hick, W.E. | 1952 | On the rate of gain of information | *QJEP* 4(1) | Hick's Law |
| Iyengar, S.S., & Lepper, M.R. | 2000 | When choice is demotivating | *JPSP* 79(6) | Paradox of choice |
| Kahan, D.M. et al. | 2017 | Motivated numeracy and enlightened self-government | *Behavioural Public Policy* 1(1) | Identity-protective cognition |
| Kahneman, D., & Tversky, A. | 1979 | Prospect theory | *Econometrica* 47(2) | Loss aversion |
| Kidd, C., & Hayden, B.Y. | 2015 | The psychology and neuroscience of curiosity | *Neuron* 88(3) | Curiosity neuroscience |
| Litman, J.A. | 2005 | Curiosity and the pleasures of learning | *Cognition and Emotion* 19(6) | Curiosity types |
| Loewenstein, G. | 1994 | The psychology of curiosity | *Psychological Bulletin* 116(1) | Information gap theory |
| Nissenbaum, H. | 2004 | Privacy as contextual integrity | *Washington Law Review* 79(1) | Privacy theory |
| Noelle-Neumann, E. | 1974 | The spiral of silence | *Journal of Communication* 24(2) | Spiral of silence |
| Nouwens, M. et al. | 2020 | Dark patterns after the GDPR | *CHI 2020* | GDPR consent dark patterns |
| Orben, A., & Przybylski, A.K. | 2019 | The association between adolescent well-being and digital technology use | *Nature Human Behaviour* 3(2) | Digital wellbeing |
| Penney, J. | 2016 | Chilling effects: Online surveillance and Wikipedia use | *Columbia Law Review* 116(6) | Chilling effect evidence |
| Petty, R.E., & Cacioppo, J.T. | 1986 | The elaboration likelihood model of persuasion | *Advances in Exp. Soc. Psych.* 19 | Self-relevance and persuasion |
| Przybylski, A.K. et al. | 2013 | Motivational, emotional, and behavioral correlates of fear of missing out | *Computers in Human Behavior* 29(4) | FOMO and wellbeing |
| Ross, L., Greene, D., & House, P. | 1977 | The false consensus effect | *JESP* 13(3) | False consensus |
| Ryan, R.M., & Deci, E.L. | 2000 | Self-determination theory and the facilitation of intrinsic motivation | *American Psychologist* 55(1) | SDT core paper |
| Schüll, N.D. | 2012 | *Addiction by Design* | Princeton University Press | Variable ratio in design |
| Skinner, B.F. | 1938 | *The Behavior of Organisms* | Appleton-Century-Crofts | Reinforcement schedules |
| Sunstein, C.R. | 2009 | *Going to Extremes* | Oxford University Press | Group polarization |
| Tajfel, H., & Turner, J.C. | 1979 | An integrative theory of intergroup conflict | *The Social Psychology of Intergroup Relations* | Social identity theory |
| Tversky, A., & Kahneman, D. | 1981 | The framing of decisions and the psychology of choice | *Science* 211(4481) | Framing effects |
| Zeigarnik, B. | 1927 | Das Behalten erledigter und unerledigter Handlungen | *Psychologische Forschung* 9 | Completion drive |

---

## Limitations and caveats

1. **TikTok context generalizability**: The majority of studies in this evidence base were conducted in lab settings, online survey experiments, or on desktop web platforms. Peer-reviewed research specifically on TikTok as a platform for opinion expression is extremely limited (the platform is too recent). All product implications should be treated as hypotheses pending platform-specific validation.

2. **Population specificity**: Many social psychology studies used WEIRD (Western, Educated, Industrialized, Rich, Democratic) student populations. Conformity effects, identity salience, and privacy norms vary significantly across cultures.

3. **Effect size discipline**: This document cites directions of effects with confidence. Absolute effect sizes are not reproduced here because (a) they vary significantly across study populations and methods and (b) citing them without the full methodological context would be misleading. The experimental plan is designed to measure actual effect sizes in the Human Signal population.

4. **Neuroscience language**: The information gap theory involves neuroscience (Kidd & Hayden, 2015 is a genuine neuroscience paper). However, this document avoids "dopamine hits," "neural reward circuits," and similar language for behavioral findings that do not require neuroscience framing. Behavioral findings are described behaviorally.

5. **Correlation discipline**: All findings are described as established patterns or associations, not causal mechanisms, unless the cited study used experimental methods to establish causality.

---

# EXTENSION — Human Motivation Research: Streams 1–4

**Date:** 2026-07-05
**Status:** Extension of Epic 1, TASK-0041
**Note:** This section extends, does not replace, the preceding research. All prior findings remain valid unless explicitly contradicted below.

Evidence codes: **[S]** Strong · **[M]** Moderate · **[W]** Weak · **[C]** Conflicting · **[H]** Hypothesis · **[V]** Vision

---

## Stream 1 — Collective Contribution: Why Do People Voluntarily Build Commons?

### The core question the first research pass missed

The first pass answered why people *vote*. But the right long-term question is: why do people voluntarily contribute to a shared resource that does not pay them, may never be attributed to them, and benefits strangers?

This matters because sustained collective intelligence requires more than one-time participation. It requires people who return, who care, who identify with the project's mission. Voting alone has never produced this at scale. Wikipedia, Linux, Galaxy Zoo, Foldit, and Stack Overflow have. Understanding why is essential to Human Signal's 2035 trajectory.

---

### Why people contribute to commons: the evidence

| Platform | Primary studied motivations | Evidence strength | Key source |
|----------|----------------------------|-------------------|-----------|
| Wikipedia | Fun, ideology ("free knowledge"), values alignment, community belonging | **[S]** | Nov (2007) *Comms ACM* 50(11) |
| Linux / open source | Learning, fun, "scratching own itch," reputation in community | **[S]** | Lakhani & Wolf (2005) Harvard Business School Working Paper |
| GitHub / OSS broadly | Signaling expertise (to employers), intrinsic enjoyment, community identification | **[M]** | Hertel, Niedner & Herrmann (2003) *Research Policy* 32(7) |
| Galaxy Zoo / Zooniverse | Contribution to science, curiosity about results, community belonging | **[S]** | Raddick et al. (2010) *Astronomy Education Review* 9(1) |
| Foldit | Puzzle-solving enjoyment, contribution to science, competitive recognition | **[M]** | Cooper et al. (2010) *Nature* 466(7307) |
| Stack Overflow | Reputation (community currency), reciprocity, learning by teaching | **[M]** | Anderson et al. (2012) *ICWSM* |
| Reddit | Community belonging, in-group identity, karma as social signal | **[M]** | Massanari (2015) *Social Media + Society* |
| reCAPTCHA / Duolingo | Minimal cost contribution embedded in primary task (incidental) | **[S]** | Von Ahn et al. (2008) *Communications ACM* 51(8) |

---

### The four-layer motivation taxonomy for collective contribution

Evidence across these platforms separates into four distinct layers, not one:

**Layer 1 — Individual benefit (self-oriented, immediate)**
- Fun, curiosity satisfaction, learning
- Scratching an own itch (solving a problem I have)
- Signal to employers (GitHub contributions as portfolio)
- *Evidence: [S] across all platforms*
- *Human Signal analogy: curiosity resolution, entertainment — already captured in CORE model*

**Layer 2 — Community benefit (social, relational)**
- Belonging to a group of people I respect
- Reciprocity ("I answer because others answered my questions")
- Recognition within a specific community (Stack Overflow reputation, not money)
- *Evidence: [S] for Wikipedia, Stack Overflow, Galaxy Zoo*
- *Human Signal analogy: Currently absent. Anonymous voting provides no community layer.*

**Layer 3 — Mission benefit (ideological, collective)**
- Contribution to a goal larger than the self ("free knowledge for all," "protein folding research")
- Altruism toward unknown future users
- Alignment with a value system (open source, open science)
- *Evidence: [S] for Wikipedia ideology (Nov, 2007); [M] for Galaxy Zoo science contribution*
- *Human Signal analogy: Potential framing — "contributing to a permanent record of human preference." Not yet articulated in the product.*

**Layer 4 — Legacy / meaning (existential, long-term)**
- The desire to leave a permanent mark that outlasts participation
- Seeing one's contribution as part of something that will exist in 10 years
- *Evidence: [M] — less studied, identified in qualitative work on Wikipedia veteran editors*
- *Human Signal analogy: Speculative at current scale. Relevant to future contributor community.*

---

### The critical distinction: intrinsic vs. internalized extrinsic

SDT (Deci & Ryan) distinguishes not only intrinsic vs. extrinsic motivation, but degrees of internalization of extrinsic motivation:

- **External regulation**: "I do this because I'm paid / rewarded"
- **Introjected regulation**: "I do this because I'd feel guilty if I didn't"
- **Identified regulation**: "I do this because I've personally decided it matters"
- **Integrated regulation**: "Doing this is part of who I am"

Wikipedia's most sustained contributors exhibit *integrated regulation* — contributing to free knowledge is part of their identity, not a task they perform for reward. This is why removing badges or points from Wikipedia would have no retention effect: the sustained contributors never needed them. **[S]**

**Implication for Human Signal:** Anonymous voting keeps contributors at the *external regulation* end of this spectrum — there is no path to identity integration. This is the single most important structural limitation of the current model for long-term retention.

---

### The contribution ladder (evidence-based)

Every sustained collective intelligence platform shows a **power-law distribution of contribution depth**:
- ~90% consume only (read Wikipedia, lurk on Reddit)
- ~9% contribute occasionally (vote, comment, light editing)
- ~1% sustain deep contribution (Wikipedia editors, Stack Overflow top answerers, OSS core maintainers)

The 1% drives disproportionate value. Rotman et al. (2012) showed in citizen science that initial motivation (curiosity, fun) is sufficient to attract the 90% but not to retain the 1%. The 1% requires:
1. Clear contribution persistence ("my edit is there")
2. Community recognition (others can see it)
3. Mission alignment (it matters beyond me)
4. Learning progression (I get better)

**[S]** Rotman et al. (2012) *CSCW*

**Implication for Human Signal:** Current design can reach the 90% (anonymous voters). Reaching the 1% — people who build and curate the battle archive, propose topics, validate quality, form a community — requires a contribution model above the vote. This is not a V1 requirement. It is a V2-V3 architectural requirement.

---

### Ostrom's commons design principles — applied to Human Signal

Elinor Ostrom (1990 Nobel, *Governing the Commons*) identified eight design principles for sustainable commons. Not all apply to Human Signal now, but they are the long-term checklist: **[S]**

| Ostrom principle | Current Human Signal status | Future requirement |
|-----------------|----------------------------|-------------------|
| 1. Clearly defined boundaries | Partial — battle scope defined | Needs: who can propose battles? |
| 2. Rules match local conditions | N/A (single context) | Needed for multi-cultural expansion |
| 3. Collective choice arrangements | Absent — Founder decides all | Future: community curation |
| 4. Monitoring | Partial — Reviewer agent | Needs: community quality signals |
| 5. Graduated sanctions | Absent | Needs: abuse prevention beyond rate limiting |
| 6. Conflict resolution | Absent | Needed at scale |
| 7. Recognition by external authorities | N/A | Future: academic/institutional recognition |
| 8. Nested enterprises | N/A | Future: sub-communities by category/culture |

---

### Challenge to previous assumption: anonymity is a two-edged sword

The first research pass correctly identified anonymity as essential for honest signals and necessary to prevent chilling effects. This remains valid.

However, the collective contribution literature reveals a cost: **anonymous contributions cannot be owned, referenced, or built upon as identity assets**. Wikipedia contributors can point to their edit history. Stack Overflow contributors have a public reputation. Human Signal voters have nothing persistent.

This is not an argument against anonymity for voting. It is an argument that if Human Signal wants to build a contributor community above the vote level, it needs an optional identity layer for contributors who want one — designed with the privacy and autonomy protections that make it genuinely optional.

**This does not contradict the first research pass. It extends it: anonymity is correct for voting; optional attributed contribution is necessary for sustained community.**

---

## Stream 2 — Cross-Cultural Human Signal

### The critical caveat that applies to all previous findings

The entire first research pass — information gap theory, spiral of silence, Asch conformity, SDT, optimal distinctiveness — was primarily established in WEIRD populations (Western, Educated, Industrialized, Rich, Democratic) and predominantly in the United States. The generalizability of each finding must be assessed individually before deploying to a non-US market.

---

### Cultural dimension framework (Hofstede + Triandis)

The most empirically grounded framework for cross-cultural prediction uses Hofstede's dimensions (1980, revised with additional co-authors through 2010): **[S]**

| Dimension | High end | Low end | Relevant to Human Signal |
|-----------|---------|---------|--------------------------|
| Individualism (IDV) | US, UK, Australia | Japan, South Korea, China | Opinion expression, minority voice, self-disclosure |
| Power Distance (PDI) | Malaysia, Philippines | Denmark, Austria | Trust in platform authority, deference to visible majorities |
| Uncertainty Avoidance (UAI) | Greece, Portugal, Japan | Singapore, Denmark | Tolerance for ambiguous results, "not scientific polling" |
| Long-term Orientation (LTO) | China, South Korea, Japan | US, UK | Mission alignment, legacy motivation |
| Indulgence (IND) | US, UK, Australia | Russia, China | Entertainment motivation, low-stakes humor |

Sources: Hofstede (1980) *Culture's Consequences*; Hofstede et al. (2010) *Cultures and Organizations*; Triandis (1995) *Individualism and Collectivism*

---

### Country-by-country analysis

**United States (IDV=91, PDI=40, UAI=46)**
*Most research base.* High individualism, moderate power distance, moderate uncertainty avoidance. The CORE motivation model was effectively designed for US users. Post-vote reveal, distinctiveness framing, and "not scientific polling" disclaimers align with US cultural norms.
*TikTok generalizability:* High — US TikTok demographics were likely dominant in available behavioral literature.

**United Kingdom (IDV=89, PDI=35, UAI=35)**
Very similar individual-level dimensions to the US. Key difference: stronger conformity norms in public ("don't make a fuss") and lower tolerance for overt self-promotion. Distinctiveness framing ("You hold a distinctive view") may read as boastful in UK context — test before deploying.
*Translation vs. adaptation:* Primarily translation with tone adjustment (less assertive distinctiveness framing). **[M, Cultural observation]**

**France (IDV=71, PDI=68, UAI=86)**
High individualism but high power distance AND very high uncertainty avoidance. This combination is unusual and culturally important: French respondents prefer nuanced debate to binary choice, have high deference to intellectual authority, and are uncomfortable with ambiguity. Binary A/B format may feel reductive. Results without nuance may be dismissed. The "not scientific polling" disclaimer triggers high uncertainty avoidance — French users may find the ambiguity uncomfortable rather than refreshing. **[M, Cultural literature observation; W for specific platform effects]**
*Implication:* Consider an optional "It depends" response in France — or very strong contextual framing that legitimizes the binary as a thought experiment.

**Italy (IDV=76, PDI=50, UAI=75)**
High individualism, high uncertainty avoidance. Strong culture of public opinion expression, particularly in local/regional contexts. High identity investment in cultural topics. Human Signal's pop culture category likely performs well in Italy. Controversy tolerance is moderate — political topics especially sensitive. Regional identity (North/South) may produce interesting signal variation. **[W — limited empirical literature on Italian online opinion behavior]**

**Japan (IDV=46, PDI=54, UAI=92)**
*The most significant cross-cultural challenge for Human Signal.*

Japan has the highest uncertainty avoidance in the G7, moderate collectivism, and extreme social conformity norms. Key findings:

- **Spiral of silence is measurably stronger in Japan than in the US.** Minority opinion holders in Japan are significantly more likely to remain silent than their US counterparts. **[S]** (Scheufele et al., 2001 *International Journal of Public Opinion Research*)
- **"Kuuki wo yomu" (空気を読む / reading the air):** Implicit social norm to sense and conform to group sentiment before expressing a view publicly. Binary "pick one" format may feel socially aggressive.
- **Anonymous platforms are MORE valued in Japan** precisely because face-saving norms prevent honest public expression. Anonymous online communities (2channel, now 5channel; Nico Nico Douga) have been disproportionately large relative to Japan's population size, consistent with pent-up honest expression demand.
- **UAI=92 means numbers carry extreme epistemic authority.** "64% chose A" will not be read as "an informal signal" even with a disclaimer. High uncertainty avoidance cultures treat statistics as authoritative regardless of stated caveats.
- **Distinctiveness framing (Variant B) may backfire in Japan.** Being told "you hold a distinctive view" is not motivating in a high-conformity culture — it may activate shame rather than curiosity.

**[S for spiral of silence strength; M for platform implications; W for Human Signal specific effects]**

*Critical implication:* The "not scientific polling" disclaimer is insufficient in Japan. The product needs a culturally appropriate epistemic framing that acknowledges the limitation in a way that a high-UAI audience processes correctly. Numbers that appear authoritative require additional structural context, not just a text disclaimer.

**South Korea (IDV=18, PDI=60, UAI=85)**
Among the most collectivist of the markets considered. Key findings:

- Strong in-group / out-group dynamics. Opinion expression is heavily context-dependent — more open within trusted in-group, very constrained with strangers.
- Naver and KakaoTalk culture: opinion expression happens within closed social groups, not on public platforms. Public platforms for opinion are dominated by extreme voices (amplification bias).
- **"Nunchi" (눈치):** Social intelligence that reads the room — similar to Japanese "kuuki." Both are adaptive responses to collectivist conformity pressure.
- Spiral of silence likely as strong as Japan for public opinion.
- However: high social media usage and rapid platform adoption suggest strong potential for anonymous opinion expression *if trust is established*.
- Long-term orientation (LTO=100) is the highest in this set — South Korean users respond to "contributing to something lasting" framing more than entertainment framing. **[M]** (Hofstede et al., 2010)

*Implication:* South Korea may be the best market for Human Signal mission framing ("contribute to a permanent record") — but the worst for public distinctiveness framing. Anonymity is essential.

**China (IDV=20, PDI=80, UAI=30)**
*Limited applicability of Western research.* Key issues:

- Self-censorship on politically sensitive topics is extensive and documented. Political opinion cannot be treated as free expression.
- However, low uncertainty avoidance (UAI=30) means Chinese internet users are relatively comfortable with ambiguity and informal signals — "not scientific polling" would land more comfortably.
- WeChat and Weibo dynamics are poorly captured by WEIRD opinion expression literature.
- Pop culture and consumer preference battles (Apple vs. Huawei, bubble tea vs. coffee) likely generate high engagement with limited political risk.
- **Any use of Chinese user data requires compliance with China's PIPL (Personal Information Protection Law), which is more stringent than GDPR in some respects.** **[S — legal fact]**
- *Recommendation:* Treat China as a separate market requiring dedicated research and legal review before deployment. Do not generalize from other collectivist markets.

---

### Cross-cultural synthesis: what is universal, what is not

| Finding | US | UK | France | Italy | Japan | South Korea | Status |
|---------|----|----|--------|-------|-------|-------------|--------|
| Post-vote reveal reduces conformity | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Universal** |
| Binary format reduces friction | ✓ | ✓ | ⚠ | ✓ | ⚠ | ✓ | **Mostly universal; exceptions in high-nuance cultures** |
| Distinctiveness framing motivates minority | ✓ | ⚠ | ✓ | ✓ | ✗ | ✗ | **Culture-dependent** |
| "Not scientific polling" sufficient disclaimer | ✓ | ✓ | ⚠ | ✓ | ✗ | ⚠ | **Culture-dependent; insufficient in high-UAI markets** |
| Anonymity enables honest expression | ✓ | ✓ | ✓ | ✓ | ✓✓ | ✓✓ | **Universal; stronger in collectivist cultures** |
| Mission alignment sustains contribution | ✓ | ✓ | ✓ | ✓ | ✓✓ | ✓✓ | **Universal; stronger with high LTO** |
| Fun / entertainment motivation (initial) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Universal** |

**Key distinction — translation vs. cultural adaptation:**

*Translation* changes language. *Cultural adaptation* changes the product's epistemic and social contract. Human Signal requires both:

- **Translation**: Caption text, hashtags, battle subject names, UI labels
- **Cultural adaptation required**: Minority position framing (not "distinctive" in Japan/Korea), disclaimer depth (more structural context in Japan), binary format presentation (optional "nuanced view" in France), contribution model framing (mission-oriented in East Asia vs. entertainment-oriented in UK/US initial hook)

Human Signal cannot localize by translation alone. The motivation layer must be culturally parameterized.

---

## Stream 3 — AI Contribution

### The fundamental epistemic separation

**[S — by definitional argument; empirically established in ML literature]**

Human preference signals and AI model outputs are fundamentally different epistemic objects:

- A **human signal** represents a genuine preference at a point in time, influenced by experience, identity, cultural context, and partial information
- An **AI signal** represents a probabilistic output from a model trained on human-generated text, with no genuine preference, experience, or identity — only statistical patterns

These cannot be summed into the same aggregate without making the aggregate uninterpretable. "70% chose A" means something specific when 70% of humans chose it. It means nothing interpretable when it is 40% humans + 30% AI agents weighted equally.

**This is not a design preference. It is an epistemic and legal requirement:**
- EU AI Act transparency requirements (2024 into force): AI-generated content that could influence human opinions must be disclosed
- Trust model: Human Signal's core value proposition is *human* signals. Mixing AI signals destroys the product's epistemic claim.

---

### How AI should relate to Human Signal: the calibration model

The most promising architecture is **separation with comparison**, not mixing:

```
Human votes → Human Signal aggregate (64% chose A)
     ↓
AI model prediction → "Model predicted 71% would choose A"
     ↓
Divergence = +7% toward B (humans lean more toward B than model expected)
     ↓
The divergence IS the human signal — what humans prefer beyond statistical expectation
```

This approach is grounded in the **superforecasting** literature (Tetlock & Gardner, 2015) and prediction market research. The most epistemically valuable signal is not the raw aggregate but the **divergence from a calibrated prior**. When human preference differs significantly from model prediction, that divergence is evidence of genuine human preference versus cultural or linguistic pattern.

**[M]** — The calibration approach is theoretically grounded in Bayesian reasoning and superforecasting methodology. Its specific application to preference aggregation on a social platform is novel and unvalidated.

---

### AI signal design principles

| Principle | Rationale | Evidence status |
|-----------|-----------|-----------------|
| AI signals must never be included in human vote totals | Epistemic contamination, legal requirement | **[S]** |
| AI predictions should be labeled with model name and version | Provenance requirement — EU AI Act, trust model | **[S]** |
| AI-predicted distributions should be shown separately, after human results | Calibration value; not conformity risk (shown after, not before) | **[M, theoretical]** |
| AI confidence intervals must accompany AI predictions | A single AI prediction without uncertainty is misleading | **[M]** |
| AI disagreement with human majority should be highlighted | Divergence is the signal | **[H]** |
| AI agents should not be allowed to vote in any context that produces visible social proof | Social proof from AI is deceptive | **[S]** |

---

### Provenance and trust

The Coalition for Content Provenance and Authenticity (C2PA, 2021+) has established standards for content provenance metadata. Human Signal should track:

- Signal source: human (anonymous) / human (verified tier, future) / AI agent (model name + version)
- Signal timestamp
- Signal context: platform of origin (TikTok-referred / direct / API)

This provenance architecture enables:
1. Filtering human-only signals for research and publication
2. AI vs. human comparison (the calibration model above)
3. Longitudinal tracking (does the human signal change over time?)
4. Cultural segmentation (with appropriate privacy protections)

**[M for provenance architecture; H for specific Human Signal implementation]**

---

### The human oversight principle in AI collaboration

From the EU AI Act, the trust model, and the broader AI governance literature, a consistent principle emerges: where AI agents and humans interact in opinion or decision contexts, human oversight must be:

1. **Visible** — humans can see that AI is involved
2. **Separable** — humans can see the human signal independently of AI
3. **Controllable** — humans can choose not to see AI signals at all
4. **Correctable** — when AI predictions are wrong, the record shows it

**[S — EU AI Act Art. 14; trust model literature; consistent with NIST AI RMF]**

---

### Hybrid intelligence: the long-term opportunity

Malone & Bernstein (2015, MIT Handbook of Collective Intelligence) and Dellermann et al. (2019) describe "hybrid intelligence" — human-AI collaboration that systematically outperforms either alone.

For Human Signal, the hybrid intelligence architecture is:
- AI generates battle topics (already in pipeline)
- AI predicts human vote distribution (new — calibration layer)
- Humans vote (signal generation)
- Divergence between AI prediction and human vote = insight
- AI analyzes patterns in divergence (what topics produce highest human-AI disagreement? Those topics contain the most authentic human preference)

This transforms Human Signal from "a platform where humans vote" into "a platform that measures the gap between statistical patterns and genuine human preference." This is a fundamentally more defensible and more valuable long-term position.

**[H — theoretically grounded but unvalidated as a product architecture]**

---

## Stream 4 — Platform Economics: Why Sustained Contribution Happens

### The problem with virality-based retention

Virality metrics (shares, reach, referral coefficient) measure initial adoption. They do not predict sustained contribution. Wikipedia did not grow because of viral loops. Stack Overflow did not grow because of FOMO. GitHub did not grow because of streak mechanics.

They grew because a community of people found the contribution intrinsically worth making, and the platform's design sustained that community over years.

---

### What sustains contribution: cross-platform evidence

| Platform | Primary sustaining mechanism | Secondary mechanism | What fails without it |
|----------|-----------------------------|--------------------|----------------------|
| Wikipedia | Ideological commitment ("free knowledge") | Community recognition among editors | Without mission: edit wars, burnout |
| Stack Overflow | Reputation currency with capability unlocks | Reciprocity (help others who helped you) | Without reputation: why answer when lurking is free? |
| GitHub | Portfolio value for career | Community recognition + collaboration | Without attribution: no skin in the game |
| Galaxy Zoo / Zooniverse | Science contribution (mission) | Genuine curiosity about results | Without mission: single session then churn |
| Reddit | Sub-community belonging | Content creation identity | Without community: karma is worthless |
| Metaculus / Superforecasting | Calibration feedback (you learn if you were right) | Reputation for accuracy | Without feedback: no learning, no improvement |
| Polymarket | Real stakes (financial) | Calibration feedback | Without stakes: no epistemic investment |

**[S]** Sources: Nov (2007), Lakhani & Wolf (2005), Raddick et al. (2010), Wolfers & Zitzewitz (2004), Tetlock & Gardner (2015)

---

### The key lesson: stakes create quality

Prediction markets (Wolfers & Zitzewitz, 2004, *Journal of Economic Perspectives*) consistently outperform polls because participants have a stake in being correct. Anonymous votes have no stake. The implications:

1. **Staked signals** (calibrated, attributed, trackable over time) are epistemically superior to unstaked signals
2. Human Signal can create epistemic stakes without financial stakes or identity exposure: "Over time, does your intuition about what others think match reality?"
3. An opt-in calibration layer ("predict what % of people will choose A, then see the actual result") would create learning, stakes, and return visits without requiring identity or financial investment

**[M for calibration as retention mechanism; S for stakes-quality relationship in prediction markets]**

---

### Why the free-rider problem doesn't destroy collective platforms

Olson's (1965) collective action theory predicted that rational actors would not contribute to public goods because they can free-ride on others' contributions. Why do Wikipedia and Stack Overflow exist?

The answer is the *selective incentives* that collective contribution platforms provide:
- Wikipedia: internal community recognition, editor status
- Stack Overflow: public reputation that signals expertise to employers
- GitHub: public portfolio that signals capability
- Open source: learning, reputation, career advancement

These are **private goods** produced as a by-product of contributing to public goods. **[S]** (Lakhani & Wolf, 2005; Raymond, 1999)

**Implication for Human Signal:** To sustain contribution above the vote level, the platform must offer private goods to contributors — not just public goods. This could be:
- An accuracy record (calibration score) for those who opt in
- Community recognition within a category (pop culture enthusiast)
- Early access to results or patterns (insight reward for sustained participation)
- Credit as a "signal contributor" in academic/research contexts (mission alignment)

None of these require financial payment. All require a contribution model above anonymous voting.

---

## HUMAN SIGNAL 2035 [V — Vision]

> This section is explicitly marked as vision. It is grounded in the research above but describes a possible long-term trajectory, not a current plan. It does not modify the current roadmap. Designations in this section use **[V]** for Vision, not evidence codes, except where research grounding is noted.

---

### What the evidence suggests the platform could become

The research across four streams converges on a possibility that is larger than the current framing: Human Signal could become the world's first **trusted observatory of genuine human preference at scale** — not a polling tool, not a social platform, but a permanent archive of how humanity actually felt about the options it faced, at a given time, in a given cultural context, without the distortions of identity pressure, commercial interest, or social conformity.

This is not a polling company. It is not a social media company. It is something closer to what CERN is to physics, or what the Human Genome Project was to biology: a global infrastructure for producing a particular kind of knowledge that could not exist without coordinated contribution.

---

### The four pillars of the 2035 observatory

**Pillar 1: The human signal is always pure [V, grounded in Stream 3]**
AI predictions exist alongside human signals, never within them. The aggregate displayed on every public page represents only human contributors. AI calibration is a separate analytical layer, accessible to researchers, visible to users as context but never as the signal itself.

**Pillar 2: Culture is a dimension, not a confound [V, grounded in Stream 2]**
By 2035, Human Signal has enough cross-cultural volume that the most interesting data is not "64% chose A globally" but "64% chose A in the US vs. 41% in Japan." Cultural divergence — where human preference patterns break down by cultural context — is a primary product surface, not a footnote. This transforms the platform from a Western opinion tool into a genuine global human preference observatory.

**Pillar 3: A contribution community exists above the vote [V, grounded in Stream 1]**
A small but sustained community (the "1%" from the contribution ladder) curates battle quality, proposes topics, validates cultural relevance, and earns recognition within the Human Signal community. This community is optional — anonymous voting remains the primary participation mode. But its existence sustains quality and provides mission-driven long-term retention that curiosity alone cannot.

**Pillar 4: The signal is epistemically serious [V, grounded in Stream 4]**
Human Signal data is used in peer-reviewed research. Academic institutions cite it. Brands use it for genuine market sensing. The "not scientific polling" disclaimer has evolved into a structured methodology statement: "Human Signal measures expressed preference in anonymous, low-friction, zero-pressure contexts. It measures genuine preference, not deliberated judgment. For deliberated judgment, see academic polling. For our methodology, see [link]." The platform has a clear epistemic identity that distinguishes it from polls, prediction markets, and social media sentiment — it occupies a specific niche with defensible claims.

---

### What must remain true in 2035 that is true in 2026

The research does not suggest abandoning any of the current foundations. It suggests building on them:

| Foundation | 2026 status | 2035 requirement |
|-----------|-------------|-----------------|
| Post-vote-only results | ✓ Required | ✓ Must never change |
| Anonymous default | ✓ Required | ✓ Must remain default; attribution is opt-in |
| Binary format | ✓ Correct for MVP | ⚠ May require cultural variants (France, high-context markets) |
| "Not scientific polling" | ✓ Text disclaimer | Must evolve into structured methodology statement |
| Human signals only in aggregate | ✓ Current | ✓ Must be architecturally enforced, not just policy |
| Founder-curated content | ✓ V1 gate | V3+: community curation with quality standards |
| Topic restriction (pop culture, tech) | ✓ MVP | Evolves: categories expand with evidence, not assumptions |

---

### The 2035 challenge to the current vision: does it survive scrutiny?

The research was requested to challenge assumptions, not confirm them. Here is the honest scientific assessment:

**What the evidence strengthens:**
The core design choices — anonymous voting, post-vote reveal, binary format, topic restriction — are not only correct for MVP but correct for the long term. The evidence base for each is strong. A platform that executes these well will produce the cleanest, most trustworthy preference signals available from any consumer platform.

**What the evidence challenges:**

1. **Curiosity alone cannot sustain a platform for 10 years.** The entire collective intelligence literature is unambiguous: novelty and fun attract users; mission alignment and contribution community retain them. Human Signal currently has the former and not the latter. The 2035 vision requires building a mission narrative that gives contributors a reason to return beyond "there's a new battle." This is not built yet.

2. **The "not scientific polling" disclaimer is insufficient for global scale.** In high uncertainty-avoidance markets (Japan, France), numbers displayed on a screen carry epistemic authority that text disclaimers cannot override. The platform needs a more structural approach to epistemic humility that is designed, not disclaimed.

3. **The word "signal" implies precision the platform does not yet earn.** A signal — in the technical sense — is a measurable, reproducible, calibrated output. Human Signal's votes are not calibrated. They have no error bars. They have no cultural segmentation. They have no provenance beyond "a person tapped a screen." Calling them "signals" is aspirational in 2026. By 2035 it must be literal. This requires the provenance, calibration, and cultural segmentation architecture described in Streams 2 and 3.

4. **If AI agents can vote, the platform name becomes a liability, not an asset.** The name "Human Signal" implies human origin. If this guarantee is not architecturally enforced — not just as policy but as technical design — the name becomes a claim the platform cannot defend. This is the strongest single architectural requirement that the research identifies for the long-term platform.

---

## Extended source index (additions)

| Author(s) | Year | Title | Journal / Publisher | Notes |
|-----------|------|-------|---------------------|-------|
| Anderson, A. et al. | 2012 | Discovering Value from Community Activity on Focused Q&A Sites | *ICWSM 2012* | Stack Overflow motivation |
| Benkler, Y. | 2006 | *The Wealth of Networks* | Yale University Press | Commons-based peer production |
| Cooper, S. et al. | 2010 | Predicting protein structures with a multiplayer online game | *Nature* 466 | Foldit |
| Dellermann, D. et al. | 2019 | Hybrid Intelligence | *Business & Information Systems Engineering* 61(5) | Human-AI collaboration |
| Hertel, G., Niedner, S., & Herrmann, S. | 2003 | Motivation of software developers in Open Source projects | *Research Policy* 32(7) | Linux motivation |
| Hofstede, G. | 1980 | *Culture's Consequences* | Sage | Cultural dimensions |
| Hofstede, G. et al. | 2010 | *Cultures and Organizations: Software of the Mind* (3rd ed.) | McGraw-Hill | Updated dimensions |
| Lakhani, K., & Wolf, R. | 2005 | Why Hackers Do What They Do | *Perspectives on Free and Open Source Software* | OSS motivation |
| Malone, T., & Bernstein, M. (Eds.) | 2015 | *Handbook of Collective Intelligence* | MIT Press | Collective intelligence framework |
| Massanari, A. | 2015 | Participatory Culture, Community, and Play | *Social Media + Society* 1(1) | Reddit motivation |
| Nisbett, R.E. | 2003 | *The Geography of Thought* | Free Press | East-West cognitive styles |
| Nov, O. | 2007 | What Motivates Wikipedians? | *Communications of the ACM* 50(11) | Wikipedia motivation |
| Olson, M. | 1965 | *The Logic of Collective Action* | Harvard University Press | Free-rider problem |
| Ostrom, E. | 1990 | *Governing the Commons* | Cambridge University Press | Commons design principles |
| Raddick, M.J. et al. | 2010 | Galaxy Zoo: Motivations of Citizen Science Volunteers | *Astronomy Education Review* 9(1) | Citizen science motivation |
| Raymond, E.S. | 1999 | The Cathedral and the Bazaar | *First Monday* 3(3) | OSS contribution motivation |
| Rotman, D. et al. | 2012 | Dynamic Changes in Motivation in Collaborative Citizen-Science Projects | *CSCW 2012* | Citizen science retention |
| Scheufele, D.A. et al. | 2001 | Spiral of silence and the Internet | *Int'l Journal of Public Opinion Research* 13(1) | Cross-cultural spiral of silence |
| Tetlock, P., & Gardner, D. | 2015 | *Superforecasting* | Crown | Calibration, prediction accuracy |
| Triandis, H.C. | 1995 | *Individualism and Collectivism* | Westview Press | Cultural motivation |
| Von Ahn, L. et al. | 2008 | reCAPTCHA: Human-Based Character Recognition via Web Security Measures | *Communications ACM* 51(8) | Incidental contribution |
| Wolfers, J., & Zitzewitz, E. | 2004 | Prediction Markets | *Journal of Economic Perspectives* 18(2) | Prediction market mechanics |

---

# CRITICAL SCIENTIFIC REVIEW

**Date:** 2026-07-05
**Role:** Adversarial reviewer — attempting falsification, not confirmation
**Scope:** All major claims across Epic 1 and its extension

> This section is the result of an active attempt to falsify the preceding research.
> Its purpose is to correct overstatements, demote unvalidated inferences, and identify what remains genuinely unknown.
> Findings in this section supersede equivalent claims in earlier sections where noted.

---

## 0. Methodological biases in this research synthesis

Before reviewing individual claims, the synthesis itself has structural flaws that must be acknowledged.

**Selection bias.** All papers cited were selected by someone building the platform. The search process was not systematic (no pre-registered search protocol, no defined inclusion/exclusion criteria, no database search). Papers that contradict the platform's assumptions are systematically less likely to have been included. This is a known and serious bias in narrative reviews.

**WEIRD problem is understated.** The prior sections flag WEIRD bias as a caveat. It should be a first-order constraint. The majority of social psychology papers cited — Festinger (1954), Asch (1951), Brewer (1991), Brehm (1966), the SDT corpus — were conducted on university undergraduates in the United States or Western Europe. These populations are not representative of a global mobile application's user base in any meaningful sense. The effect sizes that were implied may not exist in the actual population.

**Lab-to-field transfer is not established.** Asch's conformity research, Noelle-Neumann's spiral of silence, and Loewenstein's curiosity studies were conducted in controlled laboratory or survey settings. Transfer to an anonymous, asynchronous, mobile application context is an assumption, not a finding. Effect sizes in field deployments are routinely much smaller than lab results. This was mentioned in the limitations section but understated throughout the main text.

**Publication bias.** Peer-reviewed psychology literature disproportionately publishes positive findings. The meta-analysis by Deci et al. (1999) may overstate the overjustification effect because null results and reversal results are less likely to be published. The replication crisis in social psychology (Nosek et al., 2015, Open Science Collaboration) has found that approximately 50% of social psychology findings fail to replicate. Several papers cited in this document come from domains with known replication problems (ego depletion, social priming, some conformity work).

**Synthesis conducted by an advocate.** The researcher producing this synthesis had prior knowledge of and interest in the platform's success. This is a conflict of interest that an independent systematic reviewer would not have. The "Human Signal 2035" section in particular reads as advocacy, not analysis.

---

## 1. Claim: Curiosity is sufficient for acquisition but not retention

### The stated claim
"Content freshness sustains curiosity-driven initial engagement. It cannot sustain a 10-year community." (Rotman et al., 2012, cited as [S])

### Adversarial challenge

**Alternative mechanisms demonstrate sustained engagement without mission alignment.** TikTok, Instagram, Reddit, YouTube, and Spotify achieve long-term retention through entertainment, algorithmic recommendation, social relationships, and continuous content supply — not mission framing. Reddit's highest-traffic communities (r/funny, r/memes, r/gaming) have been active for 15+ years on entertainment mechanics. Instagram's primary user action is a double-tap. These platforms do not directly disprove the value of mission alignment; they demonstrate that mission alignment is not the only route to retention. Entertainment, habit formation, social ties, and recommendation algorithms are viable alternatives whose relevance to Human Signal is untested.

**The cited evidence does not support the generalization.** Rotman et al. (2012) studied citizen science volunteers performing repetitive, effortful data labeling tasks (classifying bat calls, transcribing historical documents). This is categorically different from one-tap anonymous voting. The finding that "fun alone doesn't sustain complex contribution" cannot be generalized to "fun alone doesn't sustain simple participation." The effort level of the task is the critical variable, and it was ignored in the synthesis.

**The claim may be domain-specific to HIGH-EFFORT contribution.** For low-effort participation (one-tap voting, likes, short comments), entertainment + novelty appears sufficient to sustain engagement for years. The mechanism is different: habit formation, not mission alignment. Fogg (2009) and Wood & Neal (2007) on habit formation suggest that low-cost behaviors repeated in stable contexts become automatic regardless of mission alignment.

**Verdict:** This claim is OVERSTATED as applied to low-effort participation. It is better supported for high-effort contribution (editing, complex labeling, extended writing). The synthesis imported a finding from high-effort citizen science without establishing that one-tap voting belongs in the same effort category. Mission alignment and contribution ladders are not universally necessary; their value for Human Signal remains a product hypothesis requiring validation.

---

## 2. Claim: Mission alignment is required for long-term contribution

### Adversarial challenge

**The claim was not tested against alternative-mechanism platforms.** The claim was generated by studying mission-driven platforms (Wikipedia, Galaxy Zoo). It was not tested against platforms that sustain through entertainment, recommendation, or social relationships without stated mission. Reddit's r/AskReddit (17+ years), Twitter/X, TikTok, Discord gaming servers — all sustain through mechanisms other than mission alignment. This does not disprove mission alignment's value; it shows that other mechanisms exist and that mission alignment is one path among several. Even within the cited platforms, the evidence is weaker than stated:

- Wikipedia's most active editors do show ideological alignment with "free knowledge." But Wikipedia also has a documented long-term decline in editor retention (Suh et al., 2009, WikiSym). If mission alignment were sufficient, this decline would not be occurring.
- Galaxy Zoo sustained initial engagement but also shows declining engagement over time (Raddick et al. acknowledge this).

**Alternative mechanisms were not adequately considered:**
- **Habit and routine** (Wood & Neal, 2007): Regular, low-cost participation becomes habitual regardless of mission. Many Wikipedia editors may edit out of habit, not ideology.
- **Social ties**: Community belonging (not mission) sustains participation in many settings. Discord servers sustain without any stated mission.
- **Boredom and default behavior**: People return to familiar digital environments partly because they are the path of least resistance.

**The confound of contribution effort.** Mission alignment may be necessary for HIGH-EFFORT contribution when the intrinsic reward (curiosity, fun) is insufficient to justify the effort cost. For LOW-EFFORT participation, the cost is low enough that weak motivators (habit, mild curiosity, boredom) sustain it. Human Signal's one-tap vote has negligible effort cost.

**Verdict:** NEEDS SIGNIFICANTLY WEAKER WORDING. The correct claim is: "For high-effort contribution tasks, mission alignment is associated with sustained engagement in the studied platforms. For low-effort participation, alternative mechanisms (entertainment, recommendation, social ties, habit) are equally documented paths to retention. Mission alignment and contribution ladders are not universally necessary; their value for Human Signal remains a product hypothesis requiring validation." Move the strong version to hypothesis.

---

## 3. Claim: Gamification should be avoided

### This claim requires the most careful decomposition

**The Deci et al. (1999) meta-analysis is real and robust.** The overjustification effect is one of the more replicated findings in motivation psychology. When expected, tangible, contingent rewards are introduced for activities that were previously intrinsically motivated, intrinsic motivation decreases. This part of the claim is well-supported.

**However, the synthesis incorrectly treated "gamification" as a single category.** The literature distinguishes:

**A) Controlling expected rewards** (points for completing tasks, badges for hitting targets): These are the mechanics Deci et al. studied. Evidence against: **[S]**

**B) Informational feedback** (showing a score or rank that informs you about your performance without explicit contingent reward structure): Deci & Ryan themselves found that informational feedback does NOT undermine intrinsic motivation — it can enhance competence satisfaction. Evidence: **[S]** The synthesis did not make this distinction.

**C) Community reputation systems** (Stack Overflow points, GitHub stars, Reddit karma): These function as social signals within a community, not as external rewards for specific behaviors. The evidence that these undermine intrinsic motivation is much weaker. Stack Overflow contributors are highly motivated by their score AND show high long-term contribution. Wikipedia editors who do NOT have points sustain contribution through mission — but the absence of points in Wikipedia cannot be used as evidence that points harm contribution in other contexts.

**D) Unlockable capabilities** (Stack Overflow's model: higher reputation → more platform capabilities): This is qualitatively different from decorative badges. The capability unlock creates genuine value that is not purely a reward for behavior.

**E) Social recognition** (public leaderboards within a community): Evidence is mixed. Leaderboards increase engagement in competitive contexts (Landers et al., 2017) but can reduce engagement for those who expect to rank low (Garcia & Tor, 2009). The harm is context-dependent and not established across all user populations.

**The synthesis prohibited "streak mechanics" citing Kahneman & Tversky (1979).** But loss aversion is not inherently harmful — it can be a useful self-regulation tool. Duolingo's streak mechanic, which relies heavily on loss aversion, has sustained daily language learning in millions of users for years. Users who self-report valuing the streak often describe it as beneficial accountability. The blanket prohibition was not evidence-based — it was a value judgment presented as a research finding.

**Verdict:**
- Avoid CONTROLLING expected rewards for intrinsically motivated activities: **Confirmed [S]**
- Avoid ALL gamification: **SHOULD BE REMOVED — overstatement**
- Community reputation: **Reclassify as context-dependent, not prohibited**
- Streaks: **Reclassify as high-risk but not prohibited; evidence is mixed**
- Informational feedback: **Not contraindicated by evidence; remove from prohibited category**

---

## 4. Claim: Binary choice is optimal

### Adversarial challenge

**"Optimal" was never defined, and the claim conflates different outcomes.**

Binary choice is a low-friction V1 design decision, supported by cognitive-load principles (Hick's Law, paradox of choice research), that requires testing in the Human Signal context. Cognitive-load principles support the design choice; they do not confirm it as optimal for all outcomes in all contexts.

For **completion rate**: Binary choice reduces cognitive load. Hick's Law is well-supported in HCI. This sub-claim has a strong theoretical basis [S] but remains untested in the Human Signal deployment context specifically.

For **signal quality**: The evidence is weak. Forcing a binary response on a genuinely continuous or multidimensional preference compresses information. "iPhone vs. Android" is not a binary preference — it involves privacy, ecosystem, price, hardware quality, software experience. A binary vote captures the NET direction but loses the dimensional structure and the strength of preference. Semantic differential scales (Osgood et al., 1957), Likert scales, and slider-based preference elicitation all capture more nuanced signal. Conjoint analysis — widely used in consumer preference research — demonstrates that revealed preferences involve trade-offs across dimensions that binary choice cannot capture.

**Prediction market evidence contradicts binary optimality for precision.** In prediction markets, continuous probability estimates are more epistemically valuable than binary yes/no predictions because they capture confidence. Tetlock's superforecasting research shows that calibrated probabilistic forecasters significantly outperform those forced into binary predictions. For a platform aiming to be a "decision signal platform," binary voting may not be the right long-term format for all question types.

**The binary format may produce social desirability effects.** Forced choice between two named options makes people more aware that their choice is visible (even in aggregate) and may increase social desirability bias compared to a scale response. This has not been tested for Human Signal's specific design.

**Cross-cultural validity is unstated.** Likert-scale research has shown that response style (acquiescence bias, extreme response style, midpoint use) varies significantly across cultures. Binary formats eliminate midpoint bias but may introduce forced-choice discomfort in high-context cultures where "it depends" is a genuine answer. The synthesis mentioned this for France and Japan but then did not adequately revise the "binary is optimal" claim.

**Verdict:** Binary choice is a well-reasoned, low-friction V1 design choice supported by cognitive-load principles. It is not universally confirmed as optimal. Its effect on both completion rate and signal quality in the Human Signal context must be tested before treating it as a permanent constraint. It may require cultural variants (France, Japan) and may not be the right format for all question types long-term.

---

## 5. Claim: Post-vote reveal is always better

### Adversarial challenge

**The Asch conformity effect is reduced in anonymous online settings.** Bond's (1996) meta-analysis of 133 Asch-type studies found that conformity effects are significantly lower in: (a) written response formats vs. face-to-face, (b) anonymous settings vs. identified, (c) when the majority is not unanimous. An anonymous TikTok user voting on a pop culture battle in a non-identified context has lower conformity susceptibility than Asch's undergraduate participants responding verbally in a group. The effect is not zero — but it is likely smaller than the original research implies.

**Spiral of silence applies to PUBLIC EXPRESSION, not anonymous voting.** Noelle-Neumann's (1974) theory was developed for public opinion expression — whether people are willing to state their opinion in conversation, in letters to editors, in identifiable surveys. The mechanism requires perceived social visibility. An anonymous one-tap vote with no social audience may not trigger the spiral of silence mechanism at all. The transfer from public opinion expression to anonymous digital voting is a theoretical assumption, not an empirically validated generalization.

**Participation count (not direction) before vote may increase engagement without conformity bias.** The synthesis treated all pre-vote information as prohibited. But there is a meaningful distinction:
- **Direction information** ("64% chose A so far") — creates conformity risk, prohibited: **Confirmed**
- **Participation information** ("1,247 people have voted") — creates social relevance and legitimacy without revealing direction. The conformity mechanism requires knowing which direction the majority chose; knowing only that many people voted does not provide that information.

Research on social proof in ecommerce (Zhang et al., 2014) and crowdfunding (Burtch et al., 2013) shows that participation counts (not direction) increase subsequent participation. This distinction was not made in the synthesis, leading to an overbroad prohibition.

**The "< 500ms" implementation requirement** was stated without citation. This is an engineering heuristic (Nielsen's response time limits), not a cognitive psychology finding. The specific threshold is not supported by research on curiosity resolution.

**Verdict:** "Never show vote DIRECTION before voting" is confirmed. "Never show ANY participation information before voting" is an OVERGENERALIZATION that should be weakened and moved to testable hypothesis.

---

## 6. Claim: Human and AI signals should never be mixed

### Adversarial challenge

**"Never" is too strong and the argument conflates three distinct situations.**

**Situation A: AI agents vote and their votes count toward the displayed human aggregate (labeled or unlabeled).** This is clearly wrong. It corrupts the "human signal" claim and is legally problematic under EU AI Act. The prohibition here is: **Confirmed**.

**Situation B: AI predictions are displayed alongside human results, clearly labeled, in a combined view.** The synthesis prohibited this ("AI signals and human signals are fundamentally different epistemic objects and must never appear in the same aggregate"). But this conflates a display design choice with an epistemic contamination. Showing "64% of humans chose A; our model predicted 71% would choose A" does NOT mix the signals — it displays them in parallel. The human aggregate is not modified. This prohibition is an overextension.

**Situation C: AI-assisted content analysis or signal validation is used to flag suspicious votes (bot detection).** This is already common practice in election security and platform integrity. The synthesis prohibited AI involvement in the signal, but AI quality control of the signal is not the same as AI contribution to the signal. The prohibition is irrelevant here.

**Hybrid intelligence research directly contradicts "never mix."** Dellermann et al. (2019) and the broader human-AI collaboration literature show that human judgment + AI judgment in combination is often superior to either alone. In medical diagnosis, AI + human radiologist outperforms either alone. The synthesis used "hybrid intelligence" as a positive concept in Stream 3 while simultaneously prohibiting any combination of AI and human signals — an internal contradiction.

**The stronger and more precise claim:** AI signals must never be counted in the human aggregate displayed as "X% chose A." AI predictions may be shown alongside human results as a separate layer. AI quality control (bot detection, spam filtering) is acceptable and separate from signal contribution.

**Verdict:** The absolute prohibition NEEDS REWRITING to distinguish signal contribution (prohibited), parallel display (not prohibited, context-dependent), and quality control (unrelated, acceptable).

---

## 7. Claim: The contribution ladder is necessary

### Adversarial challenge

**Alternative-mechanism platforms sustain at scale with flat participation structures.** Instagram (one primary action: like), Spotify (one primary action: like/skip), TikTok (swipe + optional like), and Twitter/X all sustain large user bases through entertainment, social relationships, recommendation algorithms, and continuous content — without a formal contribution ladder. These platforms do not directly disprove the value of contribution ladders; they demonstrate that ladder structures are not the only route to retention, and that their necessity depends on contribution effort and platform type.

**The theoretical base was imported from high-effort domains.** The contribution ladder concept was drawn from citizen science (complex labeling), Wikipedia (article writing), and Stack Overflow (detailed technical answers). These are genuinely high-effort contributions where the 90/9/1 split reflects effort cost. For low-effort participation, the distribution is different — many more users sustain at the "occasional contributor" level because the cost of occasional contribution is negligible.

**The ladder may generate false complexity.** Adding contribution layers to a simple product may confuse users, create friction, and reduce the quality of the core signal. Instagram's success came partly from removing features (chronological feed, activity of followed users) to reduce complexity. The instinct to add a contribution ladder may be a design complexity bias rather than an evidence-based requirement.

**The actual requirement is clearer:** The synthesis should have said "High-effort collective contribution platforms require contribution diversity to sustain their most active contributors." For Human Signal's one-tap vote at MVP, the contribution ladder is a future architecture question, not a current requirement. It was presented with unwarranted urgency.

**Verdict:** "Contribution ladder is necessary" SHOULD BE WEAKENED to: "For high-effort contribution platforms, contribution diversity is associated with sustaining the most active contributors. Whether a contribution ladder is necessary for Human Signal — a low-effort voting platform — is a product hypothesis requiring validation, not an established requirement."

---

## 8. Cross-cultural claims: stereotype risk audit

The following statements from Stream 2 carry risk of cultural stereotyping. Each is reviewed for scientific appropriateness.

---

**Statement: "Japanese users may find 'Pick one' disrespectful of complexity."**
- Evidence source: Inference from Hofstede IDV/UAI scores applied to product behavior
- Steps of inference: Cultural dimension score → communication style preference → specific reaction to binary UI → "disrespectful"
- Risk: This is speculation presented as cultural insight. No direct research on Japanese user reaction to binary digital choice formats was cited.
- **Rewritten:** "Some research suggests that high-context communication norms in Japan may favor nuanced expression over forced binary choice (Nisbett, 2003; Hofstede et al., 2010). Whether this manifests as lower completion rates or user dissatisfaction with binary voting interfaces is untested. Cultural validation is required before any design changes."

**Statement: "South Korean users respond to mission framing more than entertainment framing."**
- Evidence source: LTO score (100 on Hofstede scale)
- Long-term orientation does not directly predict preference for mission framing in digital products. This is two steps of inference with no empirical grounding.
- **Rewritten:** "South Korea's high long-term orientation score (Hofstede) is sometimes associated with preference for durable, meaningful investments. Whether this predicts preference for mission-framing in a social platform context is entirely untested. Remove from actionable product guidance until validated."

**Statement: "Kuuki wo yomu (reading the air) — binary 'pick one' format may feel socially aggressive."**
- "Kuuki wo yomu" is a real cultural concept (reading implicit social atmosphere). However, inferring from this concept that a digital voting interface feels "aggressive" is not supported by any cited research. It is an analogy, not an empirical finding.
- **Rewritten:** "The concept of 'kuuki wo yomu' reflects strong implicit social sensitivity in Japanese communication norms. The implications for anonymous digital voting interfaces are untested and should be treated as a cultural hypothesis requiring in-market research."

**Statement: "French respondents prefer nuanced debate to binary choice."**
- Evidence source: High UAI (86) and cultural observation about French intellectual culture
- UAI measures discomfort with ambiguity, not preference for nuanced debate. High UAI can actually mean preference for CLEAR answers, which could support binary formats. The inference is ambiguous.
- **Rewritten:** "France's high uncertainty-avoidance score may influence how users interpret ambiguous results displays. Whether French users prefer nuanced preference elicitation over binary formats is untested. The relationship between UAI and binary format preference is theoretically ambiguous."

**Hofstede dimensions used as if predictive of individual behavior.**
Hofstede's cultural dimensions describe national average tendencies measured on specific populations (IBM employees in the 1970s). They predict small amounts of variance across cultural groups in specific organizational contexts. They do not predict individual user behavior. Every statement that says "Japanese users..." or "South Korean users..." should read "On average across populations that may differ from Human Signal's actual users, research suggests..."

**McSweeney (2002) critique of Hofstede** — *Human Resource Management Journal* 12(2) — argues that the cultural dimensions conflate within-country variation, use an unrepresentative sample (IBM employees), and assume national culture is the relevant unit of analysis. This critique is substantive and should be acknowledged before any product decisions are made based on Hofstede scores.

---

## Missing disciplines

The following disciplines add genuine explanatory power and were absent or insufficient in the synthesis.

### Trust research

**Why missing it matters:** Human Signal's core product claim — "these are genuine human signals" — is a trust claim. How users form, maintain, and revoke trust in a platform is not adequately explained by SDT, curiosity theory, or social comparison. Trust in digital systems has a separate and robust literature.

- Mayer, Davis & Schoorman (1995) *Academy of Management Review* 20(3): Trust has three components — perceived ability (competence to deliver), benevolence (cares about my interests), and integrity (honest principles). The "not scientific polling" disclaimer is an integrity signal. Showing real vote counts is an ability signal. Neither addresses benevolence.
- Gefen, Karahanna & Straub (2003) *MIS Quarterly* 27(1): Trust in online platforms is strongly predicted by familiarity, institutional trust (the platform is a real company), and disposition to trust. New users to Human Signal have none of the first, limited second, and variable third.
- **Product implication not previously stated:** Trust-building for Human Signal requires signals of all three: competence (real, accurate counts), integrity (honest about limitations), and benevolence (not exploiting the data). The current research addressed integrity but not competence or benevolence trust signals.

### Communication science: two-step flow and opinion leader effects

**Why missing it matters:** The spiral of silence and Asch conformity models assume direct individual → aggregate effects. Communication science identifies a mediating layer: opinion leaders.

- Lazarsfeld, Berelson & Gaudet (1944) / Katz & Lazarsfeld (1955): Information flows from media to opinion leaders to the general public. On TikTok, opinion leaders (influencers) mediate between the platform and voters. If an influencer reveals their vote preference before followers vote, this is a conformity mechanism OUTSIDE the platform's control that the post-vote reveal design cannot address.
- **Critical implication for Human Signal:** If TikTok influencers share "I voted for X, which side are you on?" before followers vote, the post-vote reveal design is irrelevant — the conformity mechanism has already operated externally. This is a fundamental limitation of the anonymity/post-vote architecture in a social media acquisition context that the research entirely missed.

### Network science

- Barabási & Albert (1999) *Science* 286(5439): Power-law distributions in networks emerge from preferential attachment, not random contribution. The 90/9/1 contribution distribution is not just a behavioral pattern — it is a structural property of networks that grows more extreme over time. The 1% who sustain platforms become proportionally more dominant as the platform grows.
- **Implication:** Platform design that only optimizes for the 90% (anonymous voters) will progressively lose influence over the small core that drives platform quality. The contribution ladder is a network architecture question, not just a motivation question.

### Behavioral economics: defaults and status quo bias

- Samuelson & Zeckhauser (1988) *Journal of Risk and Uncertainty* 1(1): Status quo bias — people strongly prefer the current state regardless of its optimality.
- Thaler & Sunstein (2008) *Nudge*: Default effects are among the most powerful behavioral interventions. Default anonymous opt-in for organ donation increases donation by 30+ percentage points in natural experiments.
- **Implication missed in synthesis:** The synthesis advocated for "anonymous default" based on SDT and privacy arguments. Status quo bias provides an additional and independent argument: once a user expects anonymity, moving toward any identity-required feature will face disproportionate resistance beyond rational preference. The default choice is unusually sticky in digital contexts.

### Institutional economics (beyond Ostrom)

- North (1990) *Institutions, Institutional Change and Economic Performance*: Institutions are the rules of the game — the formal and informal constraints that structure human interaction. Digital platforms are institutions in this sense, and their design constitutes rule-making.
- **Implication:** Changes to core rules (adding reputation, removing anonymity, introducing AI signals) face institutional inertia that goes beyond individual motivation. Early users shape expectations that constrain future design. The cost of changing rules increases over time. This is an argument for getting the core rules right at MVP — more important than the research acknowledged.

---

## Product advocacy biases identified

**1. The "Human Signal 2035" vision section is advocacy, not research.**
The section presents a highly optimistic trajectory for the platform. An independent researcher would note that most consumer platforms do not become decade-long institutions; most fail within 2–3 years. The vision is not grounded in base rates for platform longevity. The pessimistic scenario (platform fails to sustain engagement past 6 months, AI-generated spam degrades signal quality, regulatory action constrains data use) is entirely absent.

**2. The prohibition list is presented with higher confidence than the evidence warrants.**
Eight "prohibited" patterns and five "high-risk" patterns are identified as if clearly demarcated. In practice, most successful platforms use several of the "prohibited" patterns (Duolingo uses streaks, Instagram uses social proof, YouTube shows engagement before viewing). The presentation implies a binary (prohibited vs. acceptable) that does not reflect the continuous and context-dependent nature of the evidence.

**3. The synthesis cites the platform's own design choices as evidence for the platform's design choices.**
The binary format is supported partly by evidence (Hick's Law) and partly by the assertion that "the A vs. B format is correct by evidence — not just convention." This circular structure appears multiple times: the platform's existing choices are presented as validated by research that was selected after the choices were made.

**4. The calibration model for AI signals is presented as a product architecture rather than a hypothesis.**
"AI models predict the vote distribution; the divergence is the signal" is a theoretically interesting idea that has no empirical validation in this context. It was presented in the research as a grounded recommendation rather than a hypothesis to test.

---

## Consolidated output

### Confirmed findings (maintain with current evidence codes)

| Finding | Evidence | Why confirmed |
|---------|---------|--------------|
| Post-vote DIRECTION reveal only — never show vote direction before voting | [S] | Asch conformity + spiral of silence both support direction withholding, even if effect sizes in online anonymous settings are smaller than lab |
| Zero-friction voting increases completion rate | [S] | Broadly replicated across behavioral economics and digital product research |
| Controlling expected rewards undermine intrinsic motivation for already-motivated activities | [S] | Deci et al. meta-analysis (128 studies) is robust |
| Anonymous default is required for honest opinion expression | [S] | Chilling effect + contextual integrity + GDPR all converge |
| "Not scientific polling" disclosure required | [S] | Trust model + regulatory requirement + epistemically correct |
| Binary format maximizes COMPLETION RATE | [S] | Hick's Law well-supported in HCI |
| Spiral of silence is stronger in collectivist cultures than individualistic | [S] | Scheufele et al. (2001) cross-cultural evidence |
| Anonymity is MORE valuable in collectivist markets | [S] | Follows from above; consistent with documented use of anonymous platforms in Japan/South Korea |

---

### Findings that need weaker wording

| Current claim | Corrected wording |
|--------------|------------------|
| "Curiosity is sufficient for acquisition but not retention" | "For HIGH-EFFORT contribution tasks, curiosity alone is insufficient for long-term retention (Rotman et al., 2012). For low-effort participation, platforms sustaining through entertainment, recommendation, and social relationships show that alternative mechanisms exist. Whether curiosity + content freshness is sufficient for Human Signal is untested." |
| "Mission alignment is required for long-term engagement" | "Mission alignment is associated with sustained high-effort contribution in studied platforms. It is not universally necessary — entertainment, recommendation, social ties, and habit are documented alternative retention mechanisms. Mission alignment and contribution ladders are not universally necessary; their value for Human Signal remains a product hypothesis requiring validation." |
| "Gamification should be avoided" | "Controlling, expected, contingent rewards undermine intrinsic motivation [S]. Informational feedback and community reputation systems have a different evidence base and are not contraindicated. Streak mechanics with loss-aversion framing carry documented harm risk [M]." |
| "Binary choice is optimal" | "Binary choice is a low-friction V1 design choice, supported by cognitive-load principles (Hick's Law, paradox of choice research), whose effect on completion rate and signal quality must be tested in the Human Signal context. Not universally confirmed as optimal across question types or cultural markets." |
| "Post-vote reveal is always better than any pre-vote information" | "Showing vote DIRECTION before voting is contraindicated [S]. Showing PARTICIPATION COUNT (but not direction) before voting is a separate question with mixed evidence and should be tested." |
| "AI signals should never be mixed with human signals" | "AI votes must never be included in the human aggregate displayed as 'X% chose.' AI predictions displayed in a clearly labeled parallel layer do not contaminate the human signal. AI quality control is separate and acceptable." |
| "The contribution ladder is necessary" | "The contribution ladder is a useful architecture for HIGH-EFFORT collective intelligence platforms. Whether it is necessary for Human Signal — a low-effort voting platform — is a product hypothesis requiring validation, not an established requirement." |
| "Distinctiveness framing motivates minority voters" | "Distinctiveness framing is supported in individualistic cultures [M]. In collectivist cultures (Japan, South Korea), the effect may be reversed. This is an unvalidated assumption for cross-cultural deployment and must be experimentally confirmed per market before deployment." |

---

### Findings that should move to `future.md`

| Claim | Reason for demotion |
|-------|-------------------|
| "Mission framing as the recommended path for long-term retention" | Mission framing for a preference platform is speculative; no platform analogous to Human Signal has been studied |
| "Opt-in calibration layer creates learning and return visits" | Theoretically grounded but entirely unvalidated for this context |
| "Cultural adaptation required for Japan/South Korea before binary format" | Inference chain from cultural dimensions to specific UI preference is too long; treat as hypothesis requiring market research |
| "AI divergence from human preference is the primary signal" | Novel theoretical framework; interesting but not validated |
| "Contribution ladder enables the 10-year community" | Unvalidated for low-effort participation contexts |

---

### Findings that should be removed from the research document

| Claim | Reason |
|-------|--------|
| "Human Signal could become what CERN is to physics" | Analogy without evidential support; advocacy |
| Specific inference that "kuuki wo yomu implies binary choice feels aggressive" | Speculation presented as cultural finding; stereotype risk |
| "South Korean users respond to mission framing more than entertainment" | Inference from LTO score to product preference, unsupported |
| "The reveal must be immediate (< 500ms)" | Engineering heuristic from Nielsen presented as psychological research |
| The pessimistic scenario for Human Signal is entirely absent from the 2035 section | Not a "finding" to remove — but the 2035 section requires a failure scenario to be complete as analysis |

---

### Missing evidence (research gaps before implementation)

| Gap | What is needed | Priority |
|-----|---------------|----------|
| Online anonymous conformity effect size | Replicate Asch-type studies in anonymous mobile app context | High — core product assumption |
| Low-effort participation retention without mission | Longitudinal data on platforms analogous to Human Signal | High — contradicts current recommendation |
| Binary vs. scale voting for signal quality | Pre-registered experiment on information content of binary vs. Likert vs. slider votes | High — "binary is optimal" claim is unvalidated for signal quality |
| Participation count pre-vote effect | A/B test: no count vs. participation count (no direction) before vote on completion rate and vote distribution | Medium — may unlock engagement tool |
| Cross-cultural binary format preference | In-market usability research (not dimension-score inference) in Japan and South Korea | High before expansion |
| Trust-building mechanisms | Which trust signals most increase perceived legitimacy of Human Signal results | Medium — affects "decision signal" claim |
| Influencer mediation effect | Do influencers' expressed opinions before a vote bias follower votes? This bypasses the post-vote reveal design | High — fundamental limitation |

---

### Research priorities before implementation (ordered)

1. **Validate that post-vote reveal actually reduces vote bias in an online anonymous mobile context.** The lab-to-field transfer is not established. A pre-registered A/B test with real users is necessary before this is treated as definitively confirmed.

2. **Measure low-effort participation retention without mission alignment.** Before building mission framing into the product, establish the baseline: does curiosity + content freshness produce adequate retention on its own?

3. **Test binary vs. alternative formats for signal quality, not just completion rate.** The synthesis confirmed binary for completion rate. Whether it produces higher-quality signals is a separate empirical question.

4. **Assess influencer conformity pathways.** If TikTok influencers can contaminate signals before users reach the voting page, the post-vote reveal architecture needs supplemental countermeasures.

5. **Conduct in-market research (not Hofstede inference) before any cross-cultural adaptation.** Cultural dimension scores are not predictive enough to drive product decisions. Actual user research is required.

---

## Extended source index (critical review additions)

| Author(s) | Year | Title | Journal | Notes |
|-----------|------|-------|---------|-------|
| Bond, R. | 1996 | Group size and conformity | *Group Processes & Intergroup Relations* 8(4) | Meta-analysis: conformity reduced in written/anonymous settings |
| Garcia, S., & Tor, A. | 2009 | Rankings and the motivation to win | *Psychological Science* 20(7) | Leaderboards demotivate low-rankers |
| Gefen, D., Karahanna, E., & Straub, D. | 2003 | Trust and TAM in online shopping | *MIS Quarterly* 27(1) | Trust in digital platforms |
| Mayer, R.C., Davis, J.H., & Schoorman, F.D. | 1995 | An integrative model of organizational trust | *Academy of Management Review* 20(3) | Trust components: ability, benevolence, integrity |
| McSweeney, B. | 2002 | Hofstede's model of national cultural differences | *Human Resource Management Journal* 12(2) | Critique of Hofstede methodology |
| North, D.C. | 1990 | *Institutions, Institutional Change and Economic Performance* | Cambridge University Press | Institutional economics |
| Nosek, B.A. et al. (Open Science Collaboration) | 2015 | Estimating the reproducibility of psychological science | *Science* 349(6251) | Replication crisis baseline |
| Samuelson, W., & Zeckhauser, R. | 1988 | Status quo bias in decision making | *Journal of Risk and Uncertainty* 1(1) | Default effects |
| Suh, B. et al. | 2009 | The singularity is not near: Slowing growth of Wikipedia | *WikiSym 2009* | Wikipedia editor retention decline |
| Thaler, R.H., & Sunstein, C.R. | 2008 | *Nudge* | Yale University Press | Default design effects |
| Wood, W., & Neal, D.T. | 2007 | A new look at habits and the habit-goal interface | *Psychological Review* 114(4) | Habit formation for low-effort behavior |
