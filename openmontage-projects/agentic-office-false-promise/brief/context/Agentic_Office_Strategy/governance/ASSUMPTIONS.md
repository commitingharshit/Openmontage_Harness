# ASSUMPTIONS — register

*v1 · 2026-09-30. Generated from the model input sheets (`build/build_assumptions.py`), so IDs match the workbooks exactly. Prefixes: **MM-** = 09_MARKET_MODEL Inputs; **PR-** = 10_PRICING_MODEL Costs; **FM-** = 15_FINANCIAL_MODEL Inputs; **H** = hypotheses in 21_VALIDATION_PLAN. Row-level inputs (BLS employment, document-intensity shares A001, persona hours A011) sit on the method sheets. Owner = role responsible for validating. Status: OPEN unless stated.*

| ID | Assumption | Base | Range (cons → aggr) | Why it matters | Type / confidence | Evidence / source | How to validate | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| MM-A001 | Document-intensity share by occupation (row inputs, 30–70%) | per row | ±50% | **Drives TAM Model B directly** | Assumption / Low | Judgement; no time-use data found | Interviews (H2) + O*NET task data (G001) | Founder's office | OPEN — CRITICAL |
| MM-A011 | Document-production hours/week per persona (10–30) | per persona | ±50% | Drives value/WTP (D_Value) | Hypothesis / Low | Forrester (vendor, dated) 16 hrs/wk; LP reporting 60–180 hrs/qtr | Interviews + pilot timesheets (H2) | Founder's office | OPEN |
| MM-A002 | Other high-income markets: document-intensive professional population as a multiple of US | 1 x US | 0.8 → 1.2 | Doubles TAM if wrong by 2x | Assumption / Low | No harmonised cross-country occupation data gathered yet. UK+EU+CA+AU+JP+SG+Gulf professional services workforce judged ≈ US. Validate with OECD/ILO ISCO-08 2x/24x counts (RESEARCH_GAPS G003). | OECD/ILO occupation data (G003) | Founder's office | OPEN |
| MM-A003 | India: document-intensive professional population as a multiple of US | 0.6 x US | 0.4 → 0.8 | India TAM share | Assumption / Low | India has ~2.36M GCC employees (Zinnov-Nasscom 2026), >450k Big-4 staff, 407k ICAI members. Only a fraction are document-intensive in our sense. | Nasscom/ICAI/GCC data (G004) | Founder's office | OPEN |
| MM-A004 | India ARPU as % of US ARPU | 25.0%  | 20.0% → 35.0% | Model input | Assumption / Medium | Indian analyst wages are ~15–20% of US (D_Value). Offshore teams billed to global clients support a higher ratio. | Desk research | Founder's office | OPEN |
| MM-A005 | Blended ARPU per seat per month (US list, TAM/SAM) | 60 $/seat/mo | 40 → 90 | Scales TAM/SAM linearly | Assumption / Medium | Benchmarks: M365 Copilot $30; ChatGPT Business $20–25; Claude Team $25 / Premium $100; Hebbia ~$250–830/mo; vertical tools $100–1,000/mo. See 10_PRICING_MODEL.xlsx. | H5 pricing tests; pilot ACV | Founder's office | OPEN |
| MM-A006 | Share of in-wedge professionals who produce a recurring multi-file pack (monthly/quarterly) | 60.0%  | 45.0% → 70.0% | Defines SAM (wedge filter) | Assumption / Low | Hypothesis H1 in 21_VALIDATION_PLAN. Board packs, lender/LP reports, month-end packs, IC updates are recurring by nature. | H1 interviews | Founder's office | OPEN |
| MM-A007 | Serviceable non-US English-working markets for SAM (UK, IE, CA, AU, NZ, SG, UAE, others) as multiple of US | 0.45 x US | 0.3 → 0.55 | SAM geography | Derived / Medium | UK alone ≈0.17–0.35× US for in-wedge occupations (2024: finance & investment analysts/advisers 219k vs US 13-2051+13-2052 629k; accountants 246k vs 1.45M; mgmt consultants/business analysts 221k vs 898k — careersmart/Working Futures, LFS-based). CA, AU, SG, UAE, IE, NZ add ≈0.15–0.25 (not verified). | Desk research | Founder's office | OPEN |
| MM-A009 | Fully-loaded cost multiplier on base wage | 1.3 x | 1.25 → 1.4 | Model input | Assumption / Medium | Benefits, payroll tax, overhead. BLS ECEC: wages ≈ 70% of total compensation for private industry (→ 1.43x); we use a lower base to stay conservative. | Desk research | Founder's office | OPEN |
| MM-A010 | Working weeks per year | 46 weeks | 46 → 46 | Model input | Assumption / High | Standard 52 weeks less leave/holidays. | Desk research | Founder's office | OPEN |
| MM-A012 | Time reduction on document-production hours from the product | 25.0%  | 15.0% → 35.0% | Drives value & WTP | Hypothesis / Low | Thomson Reuters Future of Professionals: professionals expect ~5 hrs/week saved by GenAI. Measured value must come from design partners (metric: hours saved per pack). | H3 pilot telemetry | Founder's office | OPEN |
| MM-A013 | Value capture (share of created value charged as price) | 10.0%  | 5.0% → 15.0% | Drives price ceiling | Assumption / Medium | SaaS rule of thumb 10–20% of value; lower because platforms bundle AI cheaply. | H5 pricing tests | Founder's office | OPEN |
| MM-A014 | US middle-market companies ($10M–$1B revenue) | 200,000 count | 200,000 → 200,000 | Model input | Verified / Medium | National Center for the Middle Market: "nearly 200,000" US middle-market businesses (Tier 2). https://www.middlemarketcenter.org | Desk research | Founder's office | VERIFIED |
| MM-A015 | Mid-market share with a finance/reporting team producing recurring multi-file packs | 50.0%  | 40.0% → 60.0% | Model input | Assumption / Low | Most $10M+ companies produce monthly management and board packs; share with ≥3-person finance team is the uncertainty. | Desk research | Founder's office | OPEN |
| MM-A016 | Mid-market ACV (team of ~8–12 seats + platform fee) | 15,000 $/yr | 8,000 → 25,000 | Model C SAM | Hypothesis / Low | Anchors (Tier 3 buyer data): Rollstack median ≈ $7.9k/yr; Cube median ≈ $22.1k/yr (58 purchases); Datarails from ~$20–24k/yr (median $55k). Workiva ≈ $134k avg at enterprise scale. | Pilot pricing | Founder's office | OPEN |
| MM-A017 | US enterprises (500+ employees) | 20,000 count | 20,000 → 20,000 | Model input | Assumption / Medium | Census SUSB order of magnitude (~20k firms with 500+ employees). VERIFY exact 2022 SUSB figure (RESEARCH_GAPS G011). | Desk research | Founder's office | OPEN |
| MM-A018 | Enterprise ACV (finance, reporting, strategy teams; private deployment) | 120,000 $/yr | 60,000 → 200,000 | Model input | Hypothesis / Low | Workiva avg ≈ $134k/customer; Harvey minimums reportedly $240k+; Hebbia $10k/seat. | Desk research | Founder's office | OPEN |
| MM-A019 | US professional-services firms, 20–500 staff (consulting, accounting, legal, IB boutiques) | 60,000 count | 50,000 → 70,000 | Model input | Assumption / Low | Derived order of magnitude from BLS industry employment (5416: 1.87M, 5412: 1.09M, 5411: 1.22M, 523: 1.10M). VERIFY with SUSB by NAICS (G011). | Desk research | Founder's office | OPEN |
| MM-A020 | Professional-services firm ACV | 20,000 $/yr | 10,000 → 35,000 | Model input | Hypothesis / Low | None | Desk research | Founder's office | OPEN |
| MM-A021 | US investment managers (PE, VC, credit, hedge funds, family offices) producing LP/IC packs | 12,000 count | 9,000 → 15,000 | Model input | Derived / Medium | SEC: ~46,000 US private funds on Form ADV (H1 2025; 64,166 globally); 58,891 funds on Form PF (2025Q4); 16,544 SEC-registered advisers (IAA 2026). Managers ≈ funds ÷ 3–5 incl. exempt reporting advisers → ~9–15k. | Desk research | Founder's office | OPEN |
| MM-A022 | Investment-manager ACV | 25,000 $/yr | 12,000 → 40,000 | Model input | Hypothesis / Low | None | Desk research | Founder's office | OPEN |
| MM-A023 | Rest-of-world multiplier for Model C (non-US organisations) | 1 x US | 0.8 → 1.2 | Model input | Assumption / Low | Mirrors A002. | Desk research | Founder's office | OPEN |
| MM-A024 | Microsoft 365 Commercial products & cloud services revenue FY26 | 102.9B $ | 102.9B → 102.9B | Model input | Derived / High | MSFT FY26 10-K: +$14.2B (+16%) → FY25 ≈ $88.75B, FY26 ≈ $102.9B. https://www.sec.gov/Archives/edgar/data/0000789019/000119312526323660/msft-20260630.htm | Desk research | Founder's office | OPEN |
| MM-A025 | Microsoft 365 commercial paid seats | 450.00M seats | 450.00M → 470.00M | Model input | Verified / Medium | >450M reported FY26 Q2 (Jan 2026) per office365itpros summary of MSFT call; +6% YoY. | Desk research | Founder's office | VERIFIED |
| MM-A026 | Share of M365 commercial seats held by document-intensive professionals | 5.0%  | 4.0% → 6.0% | Model A TAM | Assumption / Low | US doc-intensive pros (B_Seats) ≈ 3.2M of 155.5M employed = 2.0%; M365 seats skew to office workers, so 4–6% of seats. | Microsoft seat composition (unavailable) — triangulate with Model B | Founder's office | OPEN |
| MM-A027 | AI execution premium per such seat per month | 40 $/mo | 30 → 60 | Model input | Assumption / Medium | M365 Copilot list $30; premium agent seats (Claude Team Premium $100, ChatGPT $125 premium seat). | Desk research | Founder's office | OPEN |
| MM-A028 | M365 Copilot paid seats (FY26 Q4) | 30.00M seats | 30.00M → 30.00M | Model input | Verified / High | Microsoft FY26 Q4 press release (8-K ex99.1): "over 30 million paid seats". | Desk research | Founder's office | VERIFIED |
| MM-A029 | M365 Copilot list price | 30 $/mo | 30 → 30 | Model input | Verified / High | microsoft.com/microsoft-365-copilot/pricing | Desk research | Founder's office | VERIFIED |
| MM-A030 | USD/INR exchange rate | 88 ₹ per $ | 88 → 88 | Model input | Assumption / Medium | Verify spot rate at publication. | Desk research | Founder's office | OPEN |
| MM-A031 | Offshore delivery billing rate (value basis for offshore analysts) | 35 $/hr | 25 → 45 | Model input | Assumption / Low | Typical KPO/GCC analyst billing to global clients; not verified (G014). | Desk research | Founder's office | OPEN |
| PR-P01 | Premium model input price (Claude Opus 5.5) | 4 $/MTok | 4 → 4 | COGS input | Verified | Anthropic API list, cached 2026-09-25 | Vendor price pages | CTO | VERIFIED |
| PR-P02 | Premium model output price (Opus 5.5) | 20 $/MTok | 20 → 20 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P03 | Premium model cache-read price | 0.2 $/MTok | 0.2 → 0.2 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P04 | Workhorse model input (Claude Sonnet 5.5) | 2 $/MTok | 2 → 2 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P05 | Workhorse model output (Sonnet 5.5) | 10 $/MTok | 10 → 10 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P06 | Workhorse cache-read | 0.2 $/MTok | 0.2 → 0.2 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P07 | Fast model input (Claude Haiku 4.5) | 1 $/MTok | 1 → 1 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P08 | Fast model output (Haiku 4.5) | 5 $/MTok | 5 → 5 | COGS input | Verified | Anthropic | Vendor price pages | CTO | VERIFIED |
| PR-P09 | Fast model cache-read (assumed 10% of input) | 0.1 $/MTok | 0.1 → 0.1 | COGS input | Assumption | Assumption based on Anthropic cache pricing ratio | Vendor price pages | CTO | OPEN |
| PR-P10 | Open-weight model input (e.g., DeepSeek V4 via API) | 0.35 $/MTok | 0.6 → 0.25 | COGS input | Assumption | Tier-3 aggregator quote; repo currently routes workers to deepseek-v4-pro / kimi-k2.5 | Vendor price pages | CTO | OPEN |
| PR-P11 | Open-weight model output | 1.4 $/MTok | 2.4 → 1 | COGS input | Assumption | Tier-3 | Vendor price pages | CTO | OPEN |
| PR-R01 | Token share routed to premium model | 20.0%  | 35.0% → 10.0% | Premium-model share drives COGS | Assumption | Planner/conductor + hard reasoning | Paid pilot count (H7) | CTO | OPEN |
| PR-R02 | Token share routed to workhorse model | 55.0%  | 50.0% → 45.0% | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-R03 | Token share routed to fast model | 15.0%  | 15.0% → 20.0% | COGS input | Assumption | Extraction, classification, verification | Telemetry from pilots | CTO | OPEN |
| PR-R04 | Token share routed to open-weight model | 10.0%  | 0.0% → 25.0% | COGS input | Assumption | Remainder must make R01..R04 = 100% | Telemetry from pilots | CTO | OPEN |
| PR-R05 | Prompt-cache hit rate on input tokens (closed models) | 60.0%  | 40.0% → 75.0% | Cache hit halves input cost | Assumption | Workspace context packs are highly reusable | Telemetry | CTO | OPEN |
| PR-T01 | Light edit (single object) — input tokens | 30,000 tokens | 40,000 → 20,000 | COGS input | Assumption | Assumption — replace with telemetry (G005) | Telemetry from pilots | CTO | OPEN |
| PR-T02 | Light edit — output tokens | 3,000 tokens | 4,000 → 2,000 | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-T03 | Multi-file task — input tokens | 250,000 tokens | 400,000 → 150,000 | COGS input | Assumption | Plan + retrieve + patch 2–4 files | Telemetry | CTO | OPEN |
| PR-T04 | Multi-file task — output tokens | 20,000 tokens | 30,000 → 12,000 | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-T05 | Full pack update (4–8 files, verify, repair) — input tokens | 1.20M tokens | 2.00M → 700,000 | Largest COGS driver (pack update tokens) | Assumption | Recurring monthly/quarterly pack | Token telemetry on real packs (G005) | CTO | OPEN |
| PR-T06 | Full pack update — output tokens | 80,000 tokens | 120,000 → 50,000 | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-T07 | Verification / visual-QA pass — input tokens | 150,000 tokens | 200,000 → 80,000 | COGS input | Assumption | Rendered pages/slides as images | Telemetry from pilots | CTO | OPEN |
| PR-T08 | Verification pass — output tokens | 8,000 tokens | 12,000 → 5,000 | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-I01 | Hosting, storage, indexing per active seat per month | 2 $/seat/mo | 3 → 1.2 | COGS input | Assumption | Cloud VM share, object storage, SQLite/Postgres indexes; local-first reduces this | Telemetry from pilots | CTO | OPEN |
| PR-I02 | OCR / PDF parsing per seat per month | 0.8 $/seat/mo | 1.5 → 0.4 | COGS input | Assumption | Scanned PDFs; many sources are digital | Telemetry from pilots | CTO | OPEN |
| PR-I03 | Embeddings per seat per month | 0.3 $/seat/mo | 0.5 → 0.1 | COGS input | Assumption | None | Telemetry from pilots | CTO | OPEN |
| PR-I04 | Support & customer success as % of revenue (in COGS) | 8.0%  | 12.0% → 5.0% | COGS input | Assumption | Onboarding of packs is hands-on early | Telemetry from pilots | CTO | OPEN |
| PR-I05 | Payment processing (self-serve) % of revenue | 3.0%  | 3.5% → 3.0% | COGS input | Assumption | Stripe-like | Telemetry from pilots | CTO | OPEN |
| PR-I06 | Annual inference cost decline (same capability) | 30.0%  | 20.0% → 40.0% | COGS input | Assumption | Used by the financial model for out-years | Telemetry from pilots | CTO | OPEN |
| FM-F01 | Pre-seed raise (recommended ask; same in all scenarios) | 1.25M $ | 1.25M → 1.25M | Runway and dilution | Assumption / Medium | Derived in 16_FUNDRAISING.md from 18–20-month milestone plan | Raise outcome | CEO | OPEN |
| FM-F02 | Seed raise (contingent on milestones) | 6.00M $ | 4.00M → 9.00M | Seed size | Assumption / Medium | Median seed round sizes; see 16_FUNDRAISING | Pilot data / plan review | CEO | OPEN |
| FM-F03 | Seed close month | 19 month | 22 → 16 | Seed timing; runway risk | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-F04 | Series A raise (contingent) | 18.00M $ | 12.00M → 28.00M | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-F05 | Series A close month | 38 month | 44 → 32 | Series A timing | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-F06 | Opening cash (founder capital / grants) | 20,000 $ | 20,000 → 20,000 | Plan input | Assumption / Medium | Assumption | Pilot data / plan review | CEO | OPEN |
| FM-R01 | Paid pilots (design partners converting to paid) | 4 count | 2 → 6 | Paid pilots — first revenue | Assumption / Low | Hypothesis: 10 design partners → 4 paid pilots | Paid pilot count (H7) | CEO | OPEN |
| FM-R02 | Pilot fee | 2,500 $/mo | 1,500 → 4,000 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R03 | Pilot start month | 4 month | 5 → 4 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R04 | Pilot end month (conversion month = end+1) | 9 month | 10 → 8 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R05 | Pilot → customer conversion | 60.0%  | 40.0% → 75.0% | Pilot → customer conversion | Assumption / Low | Validation plan H7 | H7 | CEO | OPEN |
| FM-R06 | Founder-led new mid-market logos per month | 1 logos/mo | 0.5 → 1.5 | Founder-led logo velocity | Assumption / Low | Founders sell until AEs ramp | Pilot data / plan review | CEO | OPEN |
| FM-R07 | Founder-led selling start month | 7 month | 9 → 6 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R08 | Founder-led selling end month | 24 month | 24 → 24 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R09 | Mid-market ACV at signing | 15,000 $/yr | 10,000 → 20,000 | ACV — revenue per logo | Assumption / Low | ≈ 4 packs × $250 × 12 + platform fee (PackPricing); anchors: Rollstack median $7.9k, Cube median $22.1k, Datarails from $20–24k/yr | Pilot contracts | CEO | OPEN |
| FM-R10 | Mid-market deals per ramped AE per month | 1.5 deals | 1 → 2 | AE productivity — main growth lever | Assumption / Low | 12–24 deals/yr; $150–400k new ARR per AE per yr | AE ramp data after month 10 | CEO | OPEN |
| FM-R11 | AE ramp (months to full productivity) | 4 months | 5 → 3 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R12 | Mid-market monthly logo/revenue churn | 1.5%  | 2.0% → 1.0% | Churn — retention and LTV | Assumption / Low | ≈ 22% / 17% / 11% annual | Second-cycle retention (H13) | CEO | OPEN |
| FM-R13 | Mid-market monthly expansion on retained MRR | 1.8%  | 1.0% → 2.5% | Expansion — NRR | Assumption / Low | More packs per customer; seats | Packs per customer | CEO | OPEN |
| FM-R14 | Enterprise deals per ramped enterprise AE per month | 0.33 deals | 0.2 → 0.5 | Plan input | Assumption / Low | 2.4–6 deals/yr | Pilot data / plan review | CEO | OPEN |
| FM-R15 | Enterprise ACV at signing | 120,000 $/yr | 80,000 → 180,000 | Enterprise ACV | Assumption / Low | Workiva avg ≈ $134k | Pilot data / plan review | CEO | OPEN |
| FM-R16 | Enterprise AE ramp | 6 months | 7 → 5 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R17 | Enterprise monthly churn | 0.4%  | 0.6% → 0.3% | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R18 | Enterprise monthly expansion | 2.0%  | 1.2% → 2.5% | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R19 | Self-serve Pro start month | 10 month | 12 → 9 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R20 | Self-serve new paid seats in first month | 10 seats | 5 → 20 | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R21 | Self-serve new-seat monthly growth (to month 36) | 8.0%  | 5.0% → 12.0% | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R22 | Self-serve new-seat monthly growth after month 36 | 2.0%  | 1.0% → 3.0% | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R23 | Self-serve monthly seat churn | 5.0%  | 6.0% → 4.0% | Plan input | Assumption / Low | None | Pilot data / plan review | CEO | OPEN |
| FM-R24 | Pro price | 60 $/seat/mo | 60 → 60 | Plan input | Assumption / Low | 10_PRICING_MODEL Tiers | Pilot data / plan review | CEO | OPEN |
| FM-C01 | Inference cost as % of subscription revenue (year 1) | 15.0%  | 25.0% → 9.0% | Gross margin | Assumption / Medium | PackPricing: $28.8/$250 = 11.5% at base; buffer added | Pilot telemetry (H9) | CEO | OPEN |
| FM-C02 | Annual decline in inference cost ratio | 30.0%  | 20.0% → 40.0% | Margin trajectory | Assumption / Medium | Model price declines + deterministic share rising | Pilot data / plan review | CEO | OPEN |
| FM-C03 | Enterprise inference % of revenue (BYO-model common) | 5.0%  | 8.0% → 3.0% | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-C04 | Hosting per mid-market customer | 40 $/mo | 60 → 30 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-C05 | Hosting per Pro seat | 2 $/mo | 3 → 1.2 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-C06 | Dedicated/private infra per enterprise customer | 1,500 $/mo | 2,500 → 800 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-C07 | Support & customer success as % of revenue (COGS) | 8.0%  | 12.0% → 5.0% | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-C08 | Payment processing on self-serve revenue | 3.0%  | 3.0% → 3.0% | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-O01 | Marketing programs pre-seed phase | 1,500 $/mo | 1,000 → 2,500 | Plan input | Assumption / Medium | Content, events, LinkedIn | Pilot data / plan review | CEO | OPEN |
| FM-O02 | Marketing programs seed phase | 8,000 $/mo | 6,000 → 12,000 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-O03 | Marketing programs Series A phase | 30,000 $/mo | 20,000 → 45,000 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-O04 | Legal, accounting, admin pre-seed / seed / A phases | 2,000 $/mo | 2,000 → 2,000 | Plan input | Assumption / Medium | Phase 1; phases 2 and 3 = ×3 and ×7 | Pilot data / plan review | CEO | OPEN |
| FM-O05 | Tools & software per employee | 150 $/mo | 150 → 150 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-O06 | R&D compute, evals, dev infra — pre-seed phase | 2,000 $/mo | 1,500 → 2,500 | Plan input | Assumption / Medium | Phases 2/3 = ×3 / ×8 | Pilot data / plan review | CEO | OPEN |
| FM-O07 | Travel — pre-seed phase | 1,200 $/mo | 800 → 1,500 | Plan input | Assumption / Medium | US/UK design-partner trips; phases 2/3 = ×4 / ×10 | Pilot data / plan review | CEO | OPEN |
| FM-O08 | Office / co-working — pre-seed phase | 500 $/mo | 300 → 500 | Plan input | Assumption / Medium | Phases 2/3 = ×6 / ×20 | Pilot data / plan review | CEO | OPEN |
| FM-O09 | One-off: incorporation / US flip legal (month 2) | 20,000 $ | 20,000 → 20,000 | Plan input | Assumption / Medium | Only if US investors require a Delaware parent | Pilot data / plan review | CEO | OPEN |
| FM-O10 | One-off: SOC 2 Type I (month 12) | 25,000 $ | 25,000 → 25,000 | Plan input | Assumption / Medium | Vanta/Drata + auditor | Pilot data / plan review | CEO | OPEN |
| FM-O11 | SOC 2 Type II + pen test, annual from seed+9 | 40,000 $/yr | 40,000 → 40,000 | Plan input | Assumption / Medium | None | Pilot data / plan review | CEO | OPEN |
| FM-O12 | Annual salary increase | 8.0%  | 8.0% → 8.0% | Plan input | Assumption / Medium | India tech market | Pilot data / plan review | CEO | OPEN |

## Hypotheses (see 21_VALIDATION_PLAN for tests and kill criteria)

| ID | Hypothesis | Status |
|---|---|---|
| H1 | ICP produces recurring multi-file packs that live in Office files | UNTESTED |
| H2 | Pack ≥20 person-hours/cycle; ≥30% mechanical | UNTESTED |
| H3 | Time reduction ≥30% by cycle 2 | UNTESTED |
| H4 | Buyer can sign $10–30k in ≤60 days | UNTESTED |
| H5 | Pack-based pricing (~$250/pack/month) accepted | UNTESTED |
| H6 | Reviewers accept agent numeric changes with source/why/impact | UNTESTED |
| H7 | Design partners convert to paid pilots (~$2.5k/month) | UNTESTED |
| H8 | Power users prefer workbench form factor | UNTESTED |
| H9 | ≥60% of numeric updates deterministic | UNTESTED |
| H10 | Platform agents not good enough for the pack job | UNTESTED |
| H11 | Local-first + BYO model + SOC 2 Type I suffices early | UNTESTED |
| H12 | Mid-tier delivery firms will pilot on a client account | UNTESTED |
| H13 | Correction rate falls cycle over cycle | UNTESTED |
| H14 | India team can sell to US/UK without US presence until ~month 10 | UNTESTED |
| H15 | Legal matter workflow viable as second vertical | UNTESTED |
