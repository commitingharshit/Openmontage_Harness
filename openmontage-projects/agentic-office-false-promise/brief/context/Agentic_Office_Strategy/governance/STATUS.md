# STATUS — Agentic Office investment case

Last updated: 2026-09-30 ~04:30 IST (session start ~01:55 IST). Owner: Founder's Office (Claude session).

## COMPLETE (first full pass)
- **Models** (all formulas verified with a Python formula engine; 0 errors):
  - `models/09_MARKET_MODEL.xlsx` (1,060 formulas): TAM B $4.89B (cons $2.85B / aggr $8.46B); bounds A/C $10.8B; SAM B $0.79B (cons $0.34B / aggr $1.58B), SAM C $2.9B; SOM = Y5 ARR $9.6M (1.2% of SAM).
  - `models/10_PRICING_MODEL.xlsx` (676): typical agentic user ≈ $28/mo inference; heavy $69; power $185; pack at $250/mo → 74% GM with 60% deterministic share.
  - `models/15_FINANCIAL_MODEL.xlsx` (7,860): Y5 exit ARR $2.5M / $9.6M / $33.4M; seed-ready at month 19 with ~25 orgs, ~$0.49M ARR (base); FundingStress sheet.
  - `models/17_CAP_TABLE_MODEL.xlsx` (387): founders 90% → 69.8% → 52.2% → 39.7% → 32.6% (base path; placeholder founding split).
- **Strategy docs**: 01, 02, 04, 05, 06, 07, 08, 11, 12, 13, 14, 16, 20, 21, 22, 23, 24, FINAL_FOUNDER_BRIEF.
- **Data**: 03_COMPETITOR_DATABASE.csv (51), 18_INVESTOR_DATABASE.csv (28), 19_DESIGN_PARTNERS.csv (15).
- **Investor**: AGENTIC_OFFICE_INVESTOR_DECK.pptx (26 slides; validated; Keynote-rendered QA; native charts via python-pptx), AGENTIC_OFFICE_STRATEGY_REPORT.pdf (68 pages incl. appendices), AGENTIC_OFFICE_ONE_PAGER.pdf (1 page), BEAR_CASE, BULL_CASE, PREMORTEM, DATA_ROOM_INDEX.
- **Governance**: ASSUMPTIONS (108 model inputs + 15 hypotheses, generated from workbooks), CONTRADICTIONS (18), RISKS (22), DECISIONS (D001–D010), RESEARCH_GAPS (21), SOURCES (tiered).
- **Build scripts** (reproducible): `build/` (build_market.py, build_pricing.py, build_fin.py, build_cap.py, build_comp.py, build_dbs.py, build_jtbd.py, build_assumptions.py, build_maps.py, report_charts.py, build_report.py, deck/build.js + add_charts.py).

## ITERATION 2 (completed)
- **A007 revised 0.35 → 0.45** using UK occupation counts (careersmart/Working Futures 2024): SAM B $0.74B → **$0.79B**; SAM C → $2.9B; SOM = 1.2% of SAM. Propagated to all docs, deck, report and one-pager (C019).
- **A021 now derived** from SEC data (~46k US private funds, 58,891 on Form PF, 16,544 SEC-registered advisers): 9–15k managers (C020).
- **M365 >450M seats** corroborated (Directions on Microsoft + office365itpros); Copilot 15M (Jan 2026) → >30M (Jul 2026).
- **Zinnov GCC** headline verified on the publisher page (2,117 GCCs, 3,728 units, 2.36M talent, $98.4B).
- **New competitors**: Juniper Square ($1.1B; >2,000 GPs, >40,000 funds; JunieAI document generation), Carta Fund Admin, Allvue → DB now 51; deep dive #16; D011 (three-way ICP race: fund vs lender vs corporate FP&A, decide by day 45); G022 critical gap.
- **Model ML** now ships Office add-ins with error review and memory of conventions → playbook moat marked "contested".
- **Wedge re-scored** (whitespace W6 3→2, W5 4→3): W6 3.86 (still 1st), W4 3.48, W5 3.40.
- **ACV anchors**: Rollstack median ≈ $7.9k/yr, Cube median ≈ $22.1k/yr (58 purchases), Datarails from ~$20–24k/yr → $15k base ACV is defensible.
- **Internal benchmark evidence**: DOCX inspection 6/10 → ~9/10 after one fix round, 100% preservation, 25–312s latency → roll-forwards are async jobs (R23).
- **Microsoft roadmap scan**: no persistent cross-file linking item found (14_MICROSOFT_RISK §8b).
- **New docs**: strategy/10B_BUSINESS_MODELS.md; research/market/GEOGRAPHIC_ANALYSIS.md. Report is now 71 pages.

## IN PROGRESS
- None (awaiting founder inputs and customer research).

## NEEDS VERIFICATION
- Harvey pricing (Tier 3, wide range); Hebbia seat pricing; Rogo ARR; Genspark valuation.
- Zinnov–Nasscom GCC headcount (read the PDF).
- Engineering claims: clean-clone build; current test count.
- M365 450M commercial seats (secondary source; confirm in the earnings transcript).

## BLOCKED (needs founders)
- G016: founders' roles, backgrounds, full-time status, equity split (deck slide 19 and cap table use placeholders).
- Any customer evidence (interviews not yet run).

## IMPORTANT NEW DISCOVERIES
1. All four platform owners shipped in-app document agents Apr–Sep 2026 (Microsoft 04-22, Anthropic 05-07, Google 09-09, OpenAI 09-17). Anthropic markets "change one thing, and every open file catches up".
2. Finance, legal and even reporting wedges are contested (Rogo, Hebbia, Model ML, Harvey, Legora; Datarails AI agents Jan 2026; Workiva Tie-Out Agent Jul 2026).
3. Budget proof for connected reporting: Workiva $885M FY25 revenue, 97.2% GRR; DataSnipper 600k users, $1B.
4. Unit economics: seat pricing fails for heavy agent users; pack pricing + deterministic execution is required. The Rust kernel is a margin asset.
5. Top KPOs already have agent platforms or exclusive partners (Acuity, Evalueserve, TresVista × Model ML).
6. OSS commoditises the agent-Office tooling layer (OfficeCLI 26.9k★, AionUi 31k★).

## THESIS CHANGES
- FROM: "Cursor for professional documents" (horizontal) with a legal-India or finance/consulting-analyst beachhead.
- TO: **wedge = recurring bespoke Office packs (fund/finance/lender/IC reporting) that must tie out every period; ICP = mid-market fund finance & portfolio-ops teams + India-based production teams as channel; price per pack; raise $1.25M after ~6 weeks of validation.** Vision unchanged. See DECISIONS D001–D010.

## SELF-CRITIQUE AUDIT (first pass)
| Area | Question | Honest answer | Action |
|---|---|---|---|
| Market | Is our TAM fake or inflated? | Not inflated in method (BLS-based, bounds shown), but it hinges on two unverified shares (A001, A006). SAM could be ~$0.2B | Interviews; SAM sensitivity in deck appendix |
| Customer | Do we know who has the pain? | We know who *should* (public evidence), not who *does* | 30 interviews before building beyond NOW |
| Product | Building tech before demand? | Historically yes (IDE, orchestration, slide ML). The plan now freezes non-wedge work | 24_FIRST_90_DAYS "do not do yet" |
| Competition | Missed an obvious competitor? | Possibly in fund-ops document tooling (e.g., fund-admin in-house tools) and new YC startups | Keep a monthly scan; add Chronograph/Cobalt reporting depth (G018) |
| Microsoft | Could Microsoft destroy this feature? | Yes, technically. Organisationally less likely within 12–18 months | 14_MICROSOFT_RISK early-warning indicators |
| GTM | Do we know how users discover this? | No. Plan is founder-led warm intros; unproven from India | Track qualified meetings/month from week 2 |
| Economics | Can revenue support inference cost? | Only with pack pricing + deterministic share ≥60%; token profiles are assumptions | Telemetry on demo pack (G005) |
| Fundraising | Is the valuation defensible? | $8–12M cap is within benchmarks for a prototype-stage AI team; lower end without LOIs | Get LOIs first |
| Moat | Is our moat actually a feature? | Today, yes. The compounding playbook loop is a hypothesis | Measure correction-rate decline |
| Story | Understood in 60 seconds? | Yes: "Keep every recurring pack right, with proof" + Workiva analogy + platform concession | Test with 10 investors |

## NEXT HIGHEST-VALUE TASKS (founders)
1. Run the 30-interview, three-way ICP race (D011) and 5 pack teardowns. This is the only way to move the CRITICAL gaps (G001, G002, G022, A001, A006).
2. Build the NOW demo and measure tokens per roll-forward (G005) and auto-link % (H9).
3. Side-by-side vs Claude for Office / Copilot (H10).
4. Fill in team facts (G016), founders' agreement, IP assignment, licence audit.
5. Approve (or not) downloading the Census SUSB 2022 table to close G011.
