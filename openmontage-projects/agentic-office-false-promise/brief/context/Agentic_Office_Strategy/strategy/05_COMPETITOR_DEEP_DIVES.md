# 05 — Competitor Deep Dives

*v1 · 2026-09-30. Each entry separates **FACTS** (sourced, see `governance/SOURCES.md`) from **OUR INTERPRETATION**. Tier-3 sources (blogs, aggregators, Reddit/G2 summaries) are used only for qualitative signals.*

---

## 1. Microsoft — M365 Copilot + Agent Mode
**FACTS**
- FY26 revenue $331.8B (+18%); Productivity & Business Processes $140.0B; M365 Commercial products & cloud services ≈ $102.9B (derived: +$14.2B, +16%). >30M M365 Copilot paid seats at FY26 Q4 (from >20M in April). M365 commercial paid seats >450M (Jan 2026). *(SEC 8-K/10-K FY26)*
- Agent Mode in Word, Excel and PowerPoint GA 2026-04-22 and the default Copilot experience; also included in consumer Premium plans. *(microsoft.com Copilot blog)*
- Excel Agent Mode: 57.2% on SpreadsheetBench (912 tasks) vs 71.3% for humans (Microsoft's own figure, Sept 2025). *(the-decoder)*
- A finance-specific Copilot in Excel with skills and data connectors was announced June 2026. *(Tier 3)*
- Gartner (2025 survey, 187 IT leaders): of organisations that finished Copilot pilots, only 5% were moving to larger deployment; about half rated it "some value, shows promise". *(Tier 2 via Tier 3)*
- Qualitative: WSJ-cited reviews called early Copilot in Excel and PowerPoint underwhelming. *(Tier 3)*

**OUR INTERPRETATION**
- Distribution is unbeatable. Microsoft will own "edit this file with AI" for most of the 450M seats.
- Its architecture is per-application (separate Word, Excel and PowerPoint agents), grounded by Graph. A *persisted, object-level dependency graph across files and periods* would cut across three product groups plus SharePoint. That is feasible but organisationally slow.
- Microsoft optimises for the median user. Deterministic tie-out and period roll-forward for bespoke finance packs is a niche Microsoft is unlikely to productise deeply in 12–18 months, though it could partner with or acquire someone who does.
- **Stance: complement, don't compete.** Same files, native tracked changes, BYO Azure OpenAI. Consider Microsoft Marketplace (AppSource) listing later.

## 2. Anthropic — Claude for Microsoft 365 + finance agents + Managed Agents
**FACTS**
- Claude for Excel, PowerPoint and Word GA on all paid plans (2026-05-07); Outlook beta. Product page: "Context carries from Outlook to Word to Excel to PowerPoint. Change one thing, and every open file catches up." Word edits as tracked changes; Excel edits highlighted; available via Bedrock, Vertex and Foundry. *(claude.com)*
- 2026-05-05: 10 finance agent templates (Pitch Builder, Earnings Reviewer, Model Builder, Valuation Reviewer, GL Reconciler, Month-end Closer, Statement Auditor, KYC Screener, …). Managed Agents include per-tool permissions, credential vaults and full audit logs. Named customers include Citadel, BNY, Carlyle, Mizuho, FactSet and Morningstar. *(anthropic.com)*
- Reported limitation: comfortable with 2–3 substantial files; with 20–50 files the context compresses and formula detail is summarised. *(Tier 3 practitioner post)*

**OUR INTERPRETATION**
- **The most dangerous competitor for the original "Cursor for documents" story.** They already ship the Project Atlas demo, with better models and bank logos.
- Their scope is *session + open files*. Their audit log records *agent tool calls*, not a *document-object lineage* (which cell became which sentence, across periods).
- Anthropic is a model company. Its incentive is to make Claude the agent everywhere, and it historically partners with application companies. The realistic path is to **build on Claude (and others)**: offer Claude as a first-class model, and differentiate on the pack graph, deterministic kernels, private deployment and multi-model routing.

## 3. OpenAI — ChatGPT for Word/Excel/PowerPoint
**FACTS**
- ChatGPT inside Word launched 2026-09-17 via a unified add-in (Excel and PowerPoint earlier); available to Free, Go, Plus, Pro, Business, Enterprise and Edu. Word is enabled by default for Enterprise from 2026-10-01. *(runtimewire; Microsoft Marketplace)*
- ChatGPT Business $20–25/user/mo; a $125 premium seat reported (Aug 2026). *(Tier 3)*

**OUR INTERPRETATION**
- A free agent inside Word sets the price anchor for single-document help at **$0**. Any per-seat pricing for generic editing is dead; our pricing must attach to the pack (value metric), not the seat.

## 4. Google — Gemini in Workspace
**FACTS**: 2026-09-09 "5 new agentic capabilities" with cross-app orchestration generating Docs, Sheets and Slides; Gemini bundled in Workspace plans (~$7–22 Business tiers) since March 2025. *(Google Workspace blog; Tier 3 pricing)*
**OUR INTERPRETATION**: Weak in our wedge because finance and professional services packs live in OOXML. Low threat initially.

## 5. Workiva
**FACTS**
- FY25 revenue $885M (+20%); subscription $812.6M (+22%); 6,624 customers; subscription gross retention 97.2%; guiding past $1B in 2026. *(Workiva 8-K, Tier 1)*
- July 2026: Tie-Out Agent, Benchmarking Agent, Sustainability Disclosure Agent and "Workiva Knowledge" intelligence layer, for advanced tiers. *(businesswire / IT Brief)*
- G2 themes: steep learning curve, high price for smaller companies, slow loading. *(Tier 3)*

**OUR INTERPRETATION**
- Workiva **validates the job** (linked numbers across reports, tie-out, governance) and its **economics** (~$134k average revenue per customer, 97% retention).
- Its constraints are our opening: you must author inside Workiva; it is enterprise-priced and SEC/ESG-centric. It does not reach bespoke IC memos, LP letters, lender packs or the offshore teams that assemble them.
- Risk: Workiva AI moving down-market. Watch pricing announcements.

## 6. Datarails
**FACTS**: $70M Series C (Jan 2026, One Peak) at ~$550M; $175M total; 70% YoY revenue growth in 2025; >400 employees; "Strategy, Planning and Reporting AI Finance Agents" generating board-ready PowerPoint, PDF and Excel from unified ERP/CRM/HRIS/Excel data. G2: setup time-consuming, steep learning curve, implementation issues, strong support. *(datarails.com; Tier 3 reviews)*
**OUR INTERPRETATION**: The closest mid-market threat for *corporate FP&A board packs*. Their product assumes the data is modelled in FinanceOS; our product assumes the pack already exists as files. We should **avoid corporate FP&A teams shopping for an FP&A platform** and target packs outside that data model (fund reporting, lender packs, advisory deliverables, delivery-team production).

## 7. Cube / Pigment / Abacum (FP&A with AI)
**FACTS**: Cube markets "Business Partner Agents" for executive and investor reporting with AI commentary; Abacum launched "Abacum Intelligence" (Apr 2026). *(vendor pages)*
**OUR INTERPRETATION**: Same logic as Datarails. They are platform-bound, and narrative quality plus arbitrary deck editing are secondary for them.

## 8. Rollstack
**FACTS**: $11M Series A (Oct 2024, Insight Partners, YC); embeds BI/Excel data into PowerPoint, Google Slides and Docs with scheduled refresh; customers include SoFi and Monday.com. *(Insight Partners)*
**OUR INTERPRETATION**: Proof that "refresh the deck every period" is a paid job. Rollstack is **template refresh**; we are **agentic maintenance with review** (narrative, new structure, memos, PDF sources, tie-out). The most likely *acquirer-competitor* to add agentic features. Price reference for mid-market.

## 9. Model ML
**FACTS**: $75M Series A (Nov 2025, FT Partners; YC, QED, LocalGlobe) after a $12M raise earlier in 2025; automates pitch decks, diligence reports and investment memos; exclusive multi-year partnership with TresVista (offshore PE/IB analyst firm). *(tech.eu; PR Newswire)*
**UPDATE (iteration 2)**: Model ML now offers Office add-ins for Word, Excel, PowerPoint and Teams to "run workflows and review files for errors", author live and insert native comments, plus Skills, Templates and Memory that remember a user's role, preferences and conventions. It is also an OpenAI customer case study (modelml.com product update, June 2026; openai.com/index/model-ml).
**OUR INTERPRETATION**: The best-funded startup doing finance document production. Its memory of conventions overlaps our "playbook" claim; its error review overlaps tie-out. Our remaining differences are the persistent object-level cross-file graph with deterministic period roll-forward, pack-level restore, and private/multi-model deployment. These are narrower than we would like; verify in a demo (G017). Their exclusivity with TresVista shows the **offshore-production channel is strategically valuable** and already being locked up. We need a different set of delivery partners (mid-tier KPOs, fund administrators, captives) or direct fund teams.

## 10. Rogo
**FACTS**: $160M Series D (2026-04-29, Kleiner Perkins), ~$2B valuation, >$300M raised; agent "Felix" used by >35,000 professionals at >250 institutions (Rothschild, Jefferies, Lazard, Moelis, Nomura); ARR reported >$50M. *(Tier 3 summaries of company PR; Sacra)*
**OUR INTERPRETATION**: Owns front-office banking AI. Do not target sell-side bankers.

## 11. Hebbia
**FACTS**: ~$50M ARR; $130M at $700M (2024); Morgan Stanley deployment to ~5,000 bankers after a six-month bake-off vs Rogo; acquired FlashDocs (deck generation) in 2025; seat pricing reportedly ~$3–3.5k/yr (Lite) and ~$10k/yr (full). *(arr.club, Sacra; Tier 3 pricing)*
**OUR INTERPRETATION**: Multi-document reasoning at scale is their core. Their pricing shows finance buyers pay **$3–10k per seat per year** for AI that saves analyst time. That is useful price evidence for our Business tier.

## 12. DataSnipper
**FACTS**: $100M Series B (Index, 2024) at $1B; >600,000 audit and finance users in 175 countries (Oct 2025); ~289 employees. *(Sacra)*
**OUR INTERPRETATION**: The strongest proof that **provenance from source document to cell** is a paid, sticky behaviour distributed as an Excel add-in. It is also a GTM lesson: add-in distribution inside a tool people already use beats a separate app.

## 13. TamLabs (YC W25)
**FACTS**: "Cursor for Word": natural-language edits applied with formatting, git-style diff view before accepting, version control; two founders (ex-Blackstone data science). *(YC launch page)*
**OUR INTERPRETATION**: Closest articulation of our original pitch, confined to one Word file. Its existence shows that "Cursor for Word" alone is a small, contestable feature. Watch it as an indicator.

## 14. OfficeCLI / AionUi (iOfficeAI, open source)
**FACTS**: OfficeCLI 26.9k GitHub stars; AionUi 31k stars (Jul 2026). Both are Apache-2.0 licensed. OfficeCLI is vendored inside the Agentic Office repo. *(star-history, ossinsight)*
**OUR INTERPRETATION**: The agent-operates-Office layer is **commoditised**. Our proprietary value must sit above it (graph, tie-out, review, playbooks). In India, "OSS + frontier model + an intern" is a real substitute; price accordingly.

## 15. Acuity Analytics, Evalueserve, TresVista (offshore production firms with AI)
**FACTS**: Acuity "Agent Fleet Pro" (May 2026), trialled with 30 clients, available to 600+ financial institutions; Evalueserve built 30 domain agents and scored 5/5 on AI agent criteria in Forrester's Q3 2026 M&CI report; TresVista × Model ML exclusive partnership. *(BusinessWire, PRWeb, PR Newswire)*
**OUR INTERPRETATION**: The top three are **not** early customers; they build or partner exclusively. Mid-tier firms (hundreds of 100–2,000-person research and analytics firms, fund administrators, captive GCC teams) are candidate customers or channel. This hypothesis is unverified.

## 16. Fund-administration & investor-reporting platforms: Juniper Square, Carta Fund Admin, Allvue *(added in iteration 2)*
**FACTS**: Juniper Square raised $130M Series D at $1.1B (Jun 2025, Ribbit Capital); >2,000 GPs, >40,000 funds, >$1T LP equity; JunieAI (2025) automates document processing, data extraction and reporting, including "automated document generation" for LP reporting. Carta Fund Administration offers draft financials the day after quarter close, with agentic flow-through accounting. Allvue automates tailored investor reports and investor-portal notices. *(Juniper Square news; fintech.global; carta.com; allvuesystems.com)*
Practitioner sources (Tier 3) still describe quarterly investor reports built in Excel with linked data and formatted letter-style outputs, and diligence spread across Excel/Word/PowerPoint.
**OUR INTERPRETATION**: These platforms own the **standardised** layer (capital-account statements, fund financials, notices) from their system of record. They are the likely source of the numbers, not the owner of the **bespoke** layer (portfolio-review decks, IC updates, LP letter narrative, lender packs, board decks for portfolio companies). This **narrows** the fund ICP: we should (a) integrate with their exports as sources, (b) target the bespoke packs they don't generate, and (c) treat JunieAI moving into bespoke decks as a top-3 threat for this ICP. The ICP choice becomes an explicit test (DECISIONS D011).

---

## Summary: what the deep dives change

1. **Stop leading with cross-app editing.** Anthropic owns that demo.
2. **Lead with the pack across periods:** roll-forward, tie-out, pack restore, reviewer workflow, private deployment.
3. **Price the pack, not the seat.** OpenAI has made the seat for generic editing free.
4. **Choose segments that FP&A platforms, fund-admin platforms and Workiva don't serve:** bespoke Office packs in investment and advisory work (downstream of their exports), and the teams that produce them.
5. **Partner rather than fight**: models (Claude, OpenAI, open-weight), Microsoft Marketplace, mid-tier delivery firms.
