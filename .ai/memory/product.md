# Product Memory

> Distilled product knowledge: UX principles, design heuristics, Founder preferences, Human Signal philosophy.
> Not decisions. Not task results. Principles that apply to every future product session.

---

## Human Signal philosophy

### The three-step mental model
"AI creates. Founder validates. Platform publishes." This is the operating logic of Human Signal in its current form. Every UI decision in Creator Studio should reinforce which step the user is in. Any design that makes the boundary between steps ambiguous violates this principle.

### Opinion infrastructure, not a polling website
Human Signal's MVP is a voting site, but its architecture, vocabulary, and design decisions must leave room for the full scope: APIs, AI agents, n8n workflows, MCP server, analytics, weighted trust, verified identity. Never optimize or simplify as if only a voting site will ever exist.

### Human Signal, not automated signal
The platform's core value proposition is that signals come from humans, not bots. Every product decision — from anti-abuse design to "not scientific polling" disclosures — reinforces this. AI assists creation and distribution; humans generate the signals.

---

## UX principles

### Founder must orient in < 3 minutes
The Creator Studio, admin panel, and any internal dashboard must be designed so the Founder understands the full production state within 3 minutes of opening it. This is a hard UX target, not an aspiration.

### Hierarchy: stats → pipeline → queue
For operational dashboards (Studio): aggregate stats at the top, process visualization in the middle, actionable work queue at the bottom. This order matches the mental model: understand state → understand process → take action.

### Cards over flat rows
Production queues use cards, not table rows or flat lists. Cards communicate value at a glance (score, status, channels, subject names). Flat rows require the eye to parse left-to-right for every item.

### Platform previews must visually resemble the platform
When previewing content for a specific platform (TikTok, Instagram, Website), the preview should use that platform's actual visual conventions — not just display text. A TikTok preview should look like a phone in 9:16. An Instagram preview should be a 1:1 square. This makes editorial judgment easier and errors more obvious.

### Sticky approval bars
Any flow with a final human approval action (approve/reject/publish) should use a sticky footer or fixed panel. The action should never require scrolling. Approval is the highest-value action on an internal page.

---

## Design aesthetic (Human Signal V2)

### Reference points
Linear, Vercel Dashboard, GitHub Actions. The aesthetic is: dark, minimal, premium, high contrast, generous whitespace, soft borders. Never cluttered. Never playful. Never colorful unless communicating state.

### Color conventions for state
| State         | Color       | Usage                               |
|---------------|-------------|-------------------------------------|
| Approved      | Emerald     | `border-emerald-400/30 bg-emerald-400/8` |
| Rejected      | Rose        | `border-rose-400/30 bg-rose-400/8`       |
| Needs review  | Amber       | `border-amber-400/30 bg-amber-400/8`     |
| Publish ready | Violet      | `border-violet-400/30 bg-violet-400/8`   |
| Published     | Emerald (lighter) | Same family as approved         |
| AI / indigo   | Indigo      | AI-generated content, pipeline, tech |
| Neutral       | White/10–20% opacity | Default borders, subtle UI  |

### Typography scale (internal dashboards)
- Section eyebrows: `text-[10px] font-semibold uppercase tracking-widest text-white/25`
- Card titles: `text-base font-black`
- Scores: `text-xl font-black tabular-nums`
- Body copy: `text-sm text-white/70`
- Labels: `text-[10px] text-white/30`

### Border radius conventions
- Large containers (sections, panels): `rounded-3xl` or `rounded-2xl`
- Cards: `rounded-2xl`
- Buttons, inputs, badges: `rounded-xl`
- Pill labels: `rounded-full`

### Gradient backgrounds (section containers)
`bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent` — subtle depth without heavy backgrounds.

---

## Naming conventions

### Vocabulary to use consistently
| Concept              | Term to use         | Never use            |
|----------------------|---------------------|----------------------|
| A battle pair        | Battle              | Comparison, poll     |
| The subjects         | Subject A, Subject B | Option, choice      |
| Votes               | Human Signals        | Votes (in marketing) |
| Internal status     | Studio status        | Admin status         |
| AI pipeline output  | Battle Package       | Content, post        |

---

## Founder preferences (observed, not confirmed)

### No emojis in code or UI
Emojis in source code or UI copy are not used unless explicitly requested. Use SVG icons instead.

### Summary formatting
The Founder prefers terse, structured responses over prose. Reply headers (`files modified`, `UX changes`, `build result`) are preferred over flowing text.

### Placeholder is acceptable
For future features (Regenerate, Instagram API, real analytics), a clearly labeled placeholder is the correct implementation. Do not build stubs that pretend to function. Do not leave features entirely absent. A disabled button with a tooltip is the right level.

---

## Product heuristics

### The 10-second pipeline test
A founder should understand the entire production pipeline in less than 10 seconds of looking at the Studio dashboard. If the pipeline visualization fails this test, the design is wrong.

### Internal tools need less polish, more clarity
Admin and Studio pages can sacrifice visual polish for information density and operational clarity. The primary user is the Founder, not a potential customer.

### Never link internal tools from public navigation
Internal tools discovered via direct URL access only. This is intentional — it simplifies public UX and reduces the surface area for accidental access.

---

## Motivation layer principles (evidence-based)

Full source: `.ai/RESEARCH.md` (Epic 1). Distilled product principles below.

### Post-vote reveal is non-negotiable
Never show vote results before the user has voted. This is supported by Strong evidence (Asch conformity, spiral of silence). It is also the right product design: the reveal is the primary reward. Showing results early destroys both signal quality and the reward.

### Neutral percentage framing only
Show results as: "64% chose A / 36% chose B." No winning language, no losing language, no "A leads," no "B trails." Competitive framing activates loss aversion in the minority and degrades signal quality.

### Minority framing: distinctiveness, not defeat
When a voter is in the minority, frame it as "You hold a distinctive view — 29% chose B." Not "29% agreed with you" (implies a losing team). Distinctiveness is motivating; loss is demotivating. Evidence: Brewer (1991) optimal distinctiveness theory.

### The CORE motivation sequence
Every public battle experience should follow: Curiosity trigger → Opinion expression → Reveal → (optional) Embed. Do not add mechanics between these steps. See `.ai/RESEARCH.md` Deliverable 2 for the full model.

### Domain restriction is the primary risk management tool
Evidence (Kahan et al., 2017): high-stakes identity topics trigger identity-protective cognition — people reject factual challenges to their identity group's position. Low-stakes topics (pop culture, technology) allow opinion formation without identity threat. The MVP topic restriction (no sport, politics, religion) is not just a business preference — it is evidence-based harm prevention.

### Prohibited motivation mechanics

**Tier 1 — Never implement (strong evidence basis):**
- Pre-vote DIRECTION display (showing which option leads before user votes) — corrupts signal quality + autonomy violation [S]
- Manipulated or inflated vote counts — honesty requirement + legal risk [S]
- Variable ratio reinforcement mechanics (random reward schedules) — compulsive use mechanism [S]
- Demographic result segmentation displayed to voters — polarization risk [M]

**Tier 2 — High risk, do not implement at MVP without explicit Founder decision:**
- Streak mechanics with loss-aversion framing ("you'll lose your streak") — psychological obligation risk, but counterexamples (Duolingo) exist at scale [M]
- Pre-vote PARTICIPATION COUNT display (showing how many voted, not direction) — the evidence basis for prohibiting this is weaker than for direction; may increase engagement; test before prohibiting [W/H]

**Clarification: what is NOT prohibited:**
- Informational feedback (showing a quality score or rank that informs performance) — Deci & Ryan explicitly separate informational from controlling feedback
- Community reputation systems (reputation as social currency, not reward for specific actions)
- Participation count displays post-vote
- Showing AI predictions in a clearly labeled, architecturally separate layer from human results

**Source:** See `.ai/RESEARCH.md` Critical Review section for evidence-graded analysis. Original Deliverable 4 list was overstated.

### Optional features must be genuinely optional
Optional reason-giving, profiles, and public sharing must have: visible skip, no social pressure, no shaming of non-participants. SDT evidence: optional features that appear optional but nudge toward participation undermine the autonomy that makes the signal valuable.

---

## Collective contribution and long-term retention

### Long-term retention: what is confirmed vs. what is hypothesis

**Confirmed:** For high-effort collective intelligence platforms (Wikipedia, citizen science), curiosity alone is insufficient for long-term retention. Mission alignment, community recognition, and contribution persistence are associated with sustained engagement in those contexts. Source: Rotman et al. (2012); Nov (2007); Raddick et al. (2010). Evidence grade: [S] for those platforms.

**Hypothesis, not confirmed:** That Human Signal's one-tap anonymous voting requires mission alignment for long-term retention. Instagram, TikTok, and Spotify sustain low-effort participation at scale for years without mission framing. The effort level of the contribution is the key variable. One-tap voting may be closer to "Instagram like" than "citizen science edit" — and may sustain on curiosity + content freshness alone.

**Design implication:** Build V1 without mission framing as a required scaffold. Measure 90-day retention. If retention is adequate on curiosity/content freshness alone, mission framing is not needed. If retention drops after novelty fades (months 2–3), introduce mission framing as V2 layer. Do not build for the mission requirement before testing the baseline.

### The contribution ladder (design principle — partially validated)

The ladder architecture makes sense for high-effort contribution platforms. Its necessity for Human Signal specifically is a hypothesis, not a confirmed requirement. Instagram sustains at massive scale with essentially one contribution level (like/swipe). TikTok similarly.

Build Level 1 (anonymous vote) at MVP and measure before designing Level 2. If long-term retention is adequate on the core loop alone, the ladder is a nice-to-have, not a requirement. If retention drops, introduce Level 2 (optional reason-giving) as the first test.

Ladder levels:
- Level 1: Anonymous vote (V1 — done)
- Level 2: Optional anonymous reason (test before building)
- Level 3: Optional attributed contribution (topic proposals, quality flags) — validate need first
- Level 4: Community curator identity — far future

Architectural principle still applies: design Level 1 in a way that doesn't architecturally prevent Levels 2–3.

### AI signals must never appear in human signal aggregates
This is both an ethical requirement and a product integrity requirement. If AI agents can vote, the aggregate is no longer a human preference signal. The name "Human Signal" makes a claim that must be architecturally enforced, not only stated in policy. Source: `.ai/RESEARCH.md` Stream 3.

---

## Cross-cultural product principles

### Localization ≠ cultural adaptation
Translating battle content and UI labels is translation. Adapting the motivation layer (minority framing, disclaimer design, binary vs. nuanced format) to cultural context is adaptation. Human Signal requires both for international expansion. Cannot be treated as the same work.

### Epistemic disclaimer design varies by culture
The "not scientific polling" text disclaimer is structurally insufficient in high uncertainty-avoidance markets (Japan, France). These markets require the disclaimer to be embedded in the product architecture — e.g., showing result confidence intervals, showing cultural variation, showing sample size prominently — not only in fine print. Do not assume a text disclaimer scales globally.
