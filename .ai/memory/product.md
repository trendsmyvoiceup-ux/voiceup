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
