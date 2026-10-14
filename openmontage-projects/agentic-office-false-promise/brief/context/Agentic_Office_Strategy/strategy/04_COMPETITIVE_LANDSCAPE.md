# 04 — Competitive Landscape

*v1 · 2026-09-30. Database: `data/03_COMPETITOR_DATABASE.csv` (51 entries). Maps: `research/competitors/maps/*.png`. Positions are analyst judgements from public product pages and press; each placement rule is stated below.*

## 1. The one-paragraph truth

Between April and September 2026, all four owners of the productivity platforms shipped agents that edit native documents: Microsoft Agent Mode (GA 2026-04-22, default in M365 Copilot, >30M paid seats), Anthropic Claude for Word/Excel/PowerPoint (GA 2026-05-07, cross-app context, tracked changes, 10 finance agent templates), OpenAI ChatGPT in Word/Excel/PowerPoint (2026-09-17, including free users) and Google Gemini cross-app agents (2026-09-09). **The generic "agent that edits Office files" is now a free or bundled feature.** Vertical AI companies have raised very large rounds in finance (Rogo ~$2B, Hebbia, Model ML $75M A, Endex) and legal (Harvey ~$16B, Legora $5.6B). FP&A and reporting platforms added AI agents that generate board packs (Datarails Jan 2026; Workiva Tie-Out Agent Jul 2026; Cube). The remaining opening is narrow and specific. It is the **persistent, cross-file, cross-period maintenance of bespoke Office packs, with deterministic tie-out, semantic review and restore, deployable privately.** Every competitor below touches part of that; none we found makes it the product.

## 2. Competitor groups

| Group | Members | What they own | Where they stop (relative to our wedge) |
|---|---|---|---|
| **Platform agents** | Microsoft Copilot, Claude for Office, ChatGPT for Office, Gemini | Distribution, formats (Microsoft), frontier models | One app / one session / open files; no pack graph across periods; cloud terms |
| **Front-office finance AI** | Rogo, Hebbia, Model ML, Endex, Shortcut, Anthropic finance agents | Research, comps, first-draft decks and models | Generation-first; not maintenance of a client's existing pack; enterprise front-office sale |
| **Reporting & FP&A** | Workiva, Datarails, Cube, Pigment, Abacum, Rollstack, DataSnipper | Linked numbers, governance, data models, ERP connectors | Require authoring in their platform or modelling data in it; weak on bespoke memos, IC/LP letters and arbitrary decks |
| **Office add-ins (pre-AI incumbents)** | think-cell, UpSlide, Macabacus, auxi, Templafy | Installed base in banks and consultancies; Excel→PPT links | Manual link setup, not agentic, no cross-period review |
| **Fund admin & investor reporting** | Juniper Square ($1.1B; JunieAI), Carta Fund Admin, Allvue, Chronograph/Cobalt | Fund system of record; standardised LP statements and portals | Standardised outputs from their data model; bespoke decks, letters and IC memos stay in Office (to verify) |
| **Legal AI** | Harvey, Legora, Spellbook | Legal workflows | Not our wedge; they block legal as a first market |
| **Horizontal agent workspaces** | Genspark, Manus, Motion, Notion AI, Coda/Grammarly, Glean, Dust | Prosumer and team agents, knowledge retrieval | Not Office-native maintenance; low audit/review depth |
| **Direct "Cursor for documents" startups** | TamLabs (YC W25, Word), Melder (YC, Excel) | Single-app agent with diff/version view | Single file, single app, two-person teams: closest in spirit, weakest in scope |
| **Infrastructure / OSS** | OfficeCLI (26.9k★), AionUi (31k★), Aspose, Apryse, Nutrient | File manipulation for agents | Toolkits; they commoditise our lowest layer |
| **Offshore production firms with agent platforms** | Acuity (Agent Fleet Pro), Evalueserve (30 agents), TresVista × Model ML | Relationships with 600+ financial institutions; analyst capacity | Services-led; the big three have in-house or exclusive AI. Mid-tier firms are potential customers or channel |

## 3. Maps

The six requested axes are drawn as three 2-D maps.

### Map 1 × Map 5 — Traditional Office ↔ Agentic (x) · AI overlay ↔ AI-native architecture (y)
`research/competitors/maps/map_A_agentic_vs_architecture.png`

*Placement rules:* x = how much of the work the system executes (0 = user does everything; 10 = multi-step autonomous execution). y = whether AI is bolted onto a pre-AI product (low) or the product was designed around agents (high).
*Reading:* the top-right quadrant is crowded (Genspark, Rogo, Hebbia, Model ML, Harvey). **Being "agentic and AI-native" is not a differentiator in 2026.** Platform agents sit bottom-right: agentic, but an overlay on legacy apps. That is their constraint and also their distribution advantage.

### Map 2 × Map 6 — Visual editor ↔ Structured/programmable document system (x) · Human editing tool ↔ Autonomous agent environment (y)
`research/competitors/maps/map_B_structure_vs_autonomy.png`

*Placement rules:* x = does the system represent documents as structured, addressable objects with deterministic operations (Workiva, OfficeCLI high) or as a visual canvas (Gamma, Word low)? y = autonomy of execution.
*Reading:* **this is where the white space is.** Tools are either structured but not autonomous (Workiva, Datarails, Rollstack, OfficeCLI) or autonomous but not structured (Genspark, Gamma, Claude/Copilot operating through UI-level app APIs). Agentic Office's Rust kernels and workspace graph are its claim to the top-right: structured *and* autonomous. **Today it is only a prototype there.**

### Map 3 × Map 4 — Single-document assistant ↔ Multi-file workflow environment (x) · General productivity ↔ Vertical professional workflow (y)
`research/competitors/maps/map_C_scope_vs_vertical.png`

*Placement rules:* x = number of artifacts the product reasons over and changes coherently in one job. y = depth of domain workflow (templates, compliance, domain objects).
*Reading:* vertical multi-file players (Workiva, Hebbia, Datarails, Model ML) are strong but platform-bound or generation-first. Horizontal multi-file players (Claude for Office, Glean) are shallow on domain. **Our target sits right of Workiva/Datarails in scope (arbitrary Office packs, not a platform model) and deliberately below the vertical giants: "semi-vertical" (finance/reporting packs), not a full vertical suite.**

## 4. Who is ahead of us, and exactly where

| Competitor | Where they are ahead today | Implication |
|---|---|---|
| Anthropic (Claude for Office) | Cross-app context shipped to every paid Claude user; best models; finance agent templates with enterprise logos | Do **not** demo "update the model and the deck catches up" as novel. Demo **next period** (roll-forward from a persisted graph), **tie-out report** and **pack restore** |
| Microsoft | Distribution to 450M seats, owns formats, Purview audit, in-tenant data | Position as complementary: works on the same files; BYO Azure OpenAI; exports native tracked changes |
| Workiva | Proven linked-numbers product, governance, 97% GRR, Tie-Out Agent | Avoid SEC/ESG and enterprise controllers early; win where Workiva is too heavy (bespoke packs, mid-market, funds, delivery teams) |
| Datarails / Cube | Mid-market CFO relationships, ERP connectors, AI board decks | Do not sell to CFOs who want an FP&A platform; sell to teams whose packs are bespoke Excel/PPT/Word |
| Model ML / Rogo | Funding, bank logos, finance-specific data | Avoid front-office pitch generation; focus on recurring client/portfolio packs |
| TamLabs | Shipped Word-native diff/versioning UX | Their scope (single Word file) is ours as a feature; watch for expansion to multi-file |

## 5. Threat ranking (probability of taking our wedge within 24 months × impact)

1. **Anthropic / Microsoft adding persistent cross-file links and pack-level versioning** (high × very high). Mitigation: speed, depth on tie-out and roll-forward, private deployment, complementary positioning. See 14_MICROSOFT_RISK.
2. **Datarails / Cube extending from FP&A data to arbitrary Office packs** (medium × high).
3. **Workiva moving down-market with AI** (medium × high).
4. **Juniper Square (JunieAI) / Carta extending automated document generation to bespoke fund decks and letters** (medium × high for the fund ICP).
5. **Model ML / Rogo adding pack maintenance for funds** (medium × medium).
6. **Open-source (OfficeCLI + AionUi) plus a frontier model giving teams "good enough" DIY** (medium × medium; strongest in India's price-sensitive market).
