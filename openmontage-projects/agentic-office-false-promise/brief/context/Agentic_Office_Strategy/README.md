# Agentic Office: Strategy, Market Model, GTM and Fundraising Case

*Founder's office package · built 2026-09-30 · v1 (iteration 2).*

## Start here
1. `strategy/FINAL_FOUNDER_BRIEF.md`: 30 plain-English answers.
2. `investor/AGENTIC_OFFICE_ONE_PAGER.pdf`: one-page memo.
3. `investor/AGENTIC_OFFICE_INVESTOR_DECK.pptx`: 26 slides (21 + 5 appendix). **Slide 19 (team) needs founder input.**
4. `investor/AGENTIC_OFFICE_STRATEGY_REPORT.pdf`: full report (71 pages incl. appendices).
5. `governance/STATUS.md`: what is done, what changed, what's next.

## Conclusions in five lines
- **The horizontal "Cursor for documents" story is now contested.** Microsoft, Anthropic, OpenAI and Google all shipped agents inside Office files between April and September 2026.
- **Wedge:** keep recurring bespoke multi-file packs (Excel → deck → memo → PDF sources) correct across periods, with a deterministic tie-out, semantic review and restore. The lead ICP is fund finance & portfolio ops, decided by a three-way interview race by day 45 (fund vs lender reporting vs corporate FP&A).
- **Market (base):** TAM $4.9B (bottom-up, BLS) · SAM $0.79B · SOM $9.6M year-5 ARR from the operating plan. Two cross-checks bound TAM at $10.8B.
- **Economics:** price the pack (~$250/pack/month), not the seat. The Rust kernels make ~60% of updates deterministic, which is what keeps gross margin ~74%.
- **Raise:** $1.25M pre-seed (SAFE, $8–12M post-money cap) after ~6 weeks of validation. It survives the conservative case for 29 months. Seed gates at ~month 18: ≥15 paying orgs, ≥$0.35M ARR, ≥80% retention.

## Folder map
| Folder | Contents |
|---|---|
| `strategy/` | 01 Product thesis · 02 Category · 04 Competitive landscape · 05 Deep dives · 06 Segmentation · 07 Personas · 08 JTBD · 10B Business models · 11 GTM · 12 Roadmap · 13 Moat · 14 Microsoft risk · 16 Fundraising · 20 User research · 21 Validation · 22 Metric tree · 23 Expansion graph · 24 First 90 days · FINAL_FOUNDER_BRIEF |
| `models/` | 09 Market model · 10 Pricing model · 15 Financial model · 17 Cap table: editable, scenario-driven, formulas verified (0 errors) |
| `data/` | 03 Competitor database (51) · 18 Investor database (28) · 19 Design-partner targets (15) |
| `investor/` | Deck · Report · One-pager · Bear / Bull / Pre-mortem · Data-room index |
| `governance/` | Assumptions (IDs match the models) · Contradictions · Risks · Decisions · Research gaps · Sources · Status |
| `research/` | Competitive maps · Geographic analysis · BLS extracts · raw research notes |
| `build/` | Scripts that regenerate every model, chart, deck and PDF (see below) |

## Regenerating outputs
```
cd build
python3 build_market.py            # 09 market model (+ SOM snapshot from fin_snapshot.json)
python3 build_pricing.py           # 10 pricing model
python3 build_fin.py ../models/15_FINANCIAL_MODEL.xlsx 2 && python3 finalize_fin.py   # 15 financial model
python3 build_cap.py               # 17 cap table
python3 build_comp.py; python3 build_dbs.py; python3 build_jtbd.py; python3 build_assumptions.py
python3 build_maps.py; python3 report_charts.py; python3 build_report.py            # maps, charts, report + one-pager
cd deck && node build.js base.pptx && python3 add_charts.py base.pptx AGENTIC_OFFICE_INVESTOR_DECK.pptx
```
Note: charts in the deck are added with python-pptx because Keynote does not render pptxgenjs charts.

## Honesty rules used throughout
Every figure is labelled as a fact (with a source tier), a derived figure (with its formula), an assumption (with an ID and range) or a hypothesis (with a test and kill criterion). There is **no customer evidence yet**. The deck and report say so explicitly.
