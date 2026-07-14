# Business Memory

> Distilled business and strategic knowledge.
> Positioning, model evolution, competitive hypotheses, strategic decisions.

---

## Positioning

### Opinion infrastructure, not a polling tool
Human Signal is not a polling website. It is the infrastructure layer for capturing, structuring, and amplifying human opinion at scale. The MVP looks like a voting site because voting is the simplest expression of the broader capability. The positioning for investors, partners, and eventually the market is: "infrastructure for human signals."

### The signal, not the question
Competitors ask questions. Human Signal captures signals. The distinction: a question implies the asker controls the frame; a signal implies humans are expressing something authentic. This distinction matters in positioning and copy.

### Topic restriction is brand protection
MVP comparisons are restricted to technology, products, and pop culture — no sport, politics, or religion. This is a deliberate business decision to avoid controversy while validating the core product. It is not a technical or operational constraint. It can be revisited with a Founder decision once the platform is established.

---

## Business model

### Current stage: zero revenue, validating core loop
As of 2026-07, the platform has no revenue, no database, and no live users. The priority is validating the core loop: AI generates battle → Founder approves → platform publishes → TikTok drives voters → votes are captured → signals are visible.

### Revenue hypotheses (not yet validated)
These are hypotheses in `future.md`, not confirmed strategies. See `memory/future.md` for the current hypothesis set.

### Infrastructure cost is near zero at MVP scale
Local LLM via Ollama: $0. Hosting via Vercel free tier: $0. Database via Neon free tier: $0. Domain: ~$12/year. The project can reach first 10,000 monthly voters with < $50/month infrastructure spend.

---

## Competitive landscape

### No direct competitor yet
As of 2026-07, there is no product that: (a) uses AI to generate opinion battles, (b) publishes them to social media, (c) captures the resulting human signals as structured data. This is a novel combination. Competitors exist in adjacent spaces (polling tools, prediction markets, social Q&A) but not in this specific intersection.

### Moat hypothesis
The moat is not the technology — it is the dataset. A platform with millions of authentic, structured human signals on pop culture, technology, and products becomes increasingly valuable as input for AI training, market research, and social analytics. The technology is the delivery mechanism; the data is the asset.

---

## Strategic principles

### Validate the loop before building the infrastructure
The core loop (battle → social → vote → signal) must be validated with real human engagement before building database models, APIs, authentication, or monetization. Building infrastructure before loop validation is premature optimization at the business level.

### TikTok is the acquisition thesis
The hypothesis is that short-form battle content on TikTok drives link-in-bio clicks to the battle page, which converts to votes. If this thesis fails, the acquisition strategy requires a fundamental rethink before any other investment. Validate TikTok first.

### Founder-curated content is a quality gate, not a bottleneck
At MVP, only the Founder creates and approves content. This is a quality gate that ensures early signals are high-quality and the platform's tone is controlled. It becomes a bottleneck at scale — but at scale, user submission with moderation workflows replaces it. Do not solve the scale problem before it exists.
