# 02 — Category Map

*v1 · 2026-09-30. Market sizes are quoted with definition, year and source; "n/a" means we found no credible sizing and did not invent one. Sources in `governance/SOURCES.md`.*

## 1. Candidate categories

| Category | Why we fit | Why we don't fully fit | Market size (definition, year, source) | Growth | Representative companies | Investor relevance |
|---|---|---|---:|---:|---|---|
| **Office productivity suites** | We operate on the same files and budget line | We do not replace the suite, and positioning as a suite invites a head-on fight with Microsoft | Microsoft 365 Commercial products & cloud services ≈ **$102.9B FY26** (derived from 10-K: +$14.2B = +16%) [F/D] | +16% (MSFT) | Microsoft, Google Workspace, Zoho, ONLYOFFICE | Shows the budget exists. Misleading as TAM |
| **AI productivity / copilots** | We sell an AI layer on Office work | Platforms bundle this at $0–30/seat; generic positioning loses | Copilot run-rate upper bound **$10.8B/yr** (30M paid seats × $30 × 12, list price; discounts unknown) [D] | Copilot seats +50% QoQ (20M→30M, Apr→Jul 2026) [F] | Microsoft Copilot, Claude, ChatGPT, Gemini | High attention, low defensibility for a startup |
| **Agentic software / AI agents** | Agents execute multi-step work across files | "Agents" is a technique, not a buyer budget | Gartner: GenAI **model** spend $28.3B in 2026 (models only) [F, Tier 2 via Tier 3] | +117% | Genspark ($250M ARR), Manus, Motion, Dust | Hot, but category is crowded and undefined |
| **Connected reporting / financial reporting software** | Our wedge (numbers tie across Excel → deck → memo; review & audit) is the core job | Incumbents are SEC/ESG/FP&A-platform centric; we start with bespoke Office packs | Workiva alone **$885M FY25 revenue**, 6,624 customers, 97.2% GRR [F, Tier 1]; no credible category-wide figure found | Workiva +20% | Workiva, Datarails ($550M val), Cube, Rollstack, DataSnipper (adjacent) | **High**: proven budget, sticky (97% GRR), recurring cadence |
| **Document automation / generation** | We produce and update documents | Template-first incumbents; our value is maintenance and review, not first-draft generation | n/a (vendor reports inconsistent) | — | Templafy, Rollstack, Gamma, Presentations.AI | Medium |
| **Enterprise content / document management** | Workspace, versions, audit trail | We are not a system of record for storage | n/a in this pass (Box ~$1.1B revenue as reference; verify) | — | Box, Dropbox, SharePoint, iManage | Low: we sit above storage |
| **Knowledge management / enterprise search** | Context retrieval across files | Retrieval is a feature for us, not the product | Glean >$300M ARR (May 2026) [F, Tier 2] | Glean tripled in ~15 months | Glean, Notion, Dust | Low for us |
| **Vertical finance AI** | First ICP is finance/investment teams | Front-office research/generation is crowded and not our job | Rogo ~$2B val / >$50M ARR; Hebbia ~$50M ARR; Model ML $75M A [F, Tier 2–3] | Very high | Rogo, Hebbia, Model ML, Endex, Anthropic finance agents | High interest, but it raises the "why not Rogo/Model ML?" question |
| **Legal document technology** | Architecture suits redlines, matters and provenance | Legal is dominated by Harvey ($16B) / Legora ($5.6B) / Spellbook | Gartner forecast legal tech **$50B by 2027** (2024 forecast; broad definition incl. e-billing, CLM) [F, Tier 2] | — | Harvey, Legora, Spellbook, Ironclad | Expansion, not wedge |
| **Developer-style tools for knowledge workers ("Cursor for X")** | Our interaction model (diff, checkpoint, restore, agent) | Analogy, not a budget; Cursor's market is developers | Cursor >$3B ARR (Tier 3) proves the pattern for code only | — | Cursor, TamLabs ("Cursor for Word"), GitHub Copilot | Good **story**, poor **category** to be sized in |
| **Document SDKs / infrastructure** | Our Rust kernels are infrastructure-grade | Free OSS (OfficeCLI 26.9k★) and incumbent SDKs; developer GTM | Aspose ~$116M (2024); Apryse targeting >$300M ARR 2026 [Tier 3] | — | Aspose, Apryse, Nutrient, OfficeCLI | Option value only |

## 2. What category should we **claim**?

> **"Agentic pack operations": the execution-and-review layer for recurring multi-file professional deliverables.**

In an investor sentence: *"Workiva proved that keeping numbers consistent across documents is worth $885M a year. We do it agentically, on the Office files teams already use, for the long tail of packs Workiva never reached."*

Why this claim:
1. It names a **job and a budget** (connected reporting), not a technique (agents) or an analogy (Cursor).
2. It explains why a platform add-in is not enough (the pack spans files and periods; the add-in lives in one app and one session).
3. It lets the vision grow naturally. Packs lead to matters, deals and engagements, then to the operating layer for agentic knowledge work.

We keep "Cursor for professional documents" as the **analogy** for the interaction model: diff, checkpoint, restore, agent. It is not the category.

## 3. What markets should we **use for sizing**?

| Use | Market | Why |
|---|---|---|
| **Primary (bottom-up)** | Document-intensive professionals by occupation (BLS OEWS May 2025) × ARPU → TAM $4.9B (base); in-wedge finance/reporting roles with recurring packs → SAM $0.79B | Traceable to Tier-1 employment data; narrow and defensible |
| **Cross-check (organisations)** | US mid-market (NCMM ~200k), professional-services firms, investment managers × ACV → TAM $10.8B / SAM $2.9B | Buyer-level view; wide because it prices whole organisations |
| **Bound (top-down)** | M365 commercial seats (450M) × document-intensive share (5%) × AI premium ($40/mo) → $10.8B | Shows the ceiling of the AI premium; includes Microsoft's own capture |
| **Evidence of budget, not TAM** | M365 Commercial $102.9B; Copilot $10.8B run-rate upper bound; Workiva $885M | Never quoted as our TAM |

Full calculations: `models/09_MARKET_MODEL.xlsx`.

## 4. Traps avoided
- **Gartner "AI spending $2.67T"**: meaningless for us (includes hardware and infrastructure).
- **"Legal tech $50B by 2027"**: broad definition (CLM, e-billing, spend management); we are not selling legal first.
- **"KPO market $104–143B"**: Tier-3 aggregator range with an unexplained ±40% spread; not used.
- **Double counting**: Model A and Model C are shown as bounds and never added to Model B.
