# 24 — First 90 Days (1 Oct – 29 Dec 2026)

*v1 · 2026-09-30. Assumes the current team (founders + ~4 active engineering contributors per git history) and no new capital until the raise closes (~Jan 2027). Owners are roles, not names; the founders must assign them in week 1.*

## MUST DO
1. **Decide and commit the wedge for 90 days** (D001–D003) and stop horizontal-story work.
2. **30 problem interviews + 5 pack teardowns** (20_USER_RESEARCH) before building anything beyond the NOW demo, run as a three-way ICP race (fund finance vs lender reporting vs corporate FP&A; D011) with a commitment by day 45.
3. **Build the NOW demo on a real (anonymised) pack**: link extraction v0, roll-forward v0, tie-out v0, pack diff and restore (12_PRODUCT_ROADMAP).
4. **Side-by-side test vs Claude for Office and Copilot** on the same roll-forward (H10). If we don't win clearly, we learn it now.
5. **Offer paid 2-cycle pilots to 10 design partners**; target 3+ signed by day 90 (H7).
6. **Engineering honesty baseline**: clean-clone build, CI green, published internal test count; remove unverifiable claims from all materials.
7. **Instrument the metric tree** (events in 22_METRIC_TREE) before the first pilot runs.
8. **Fundraise preparation**: data room (DATA_ROOM_INDEX), deck v2 with interview evidence, YC/Atoms/Surge applications, 15 warm investor conversations.
9. **Corporate & legal hygiene**: founders' agreement with vesting, IP assignment from all contributors (5 people have committed code), open-source licence audit (MIT/Apache components; AGPL exclusion), incorporation decision (India vs Delaware flip).

## SHOULD DO
- Security one-pager (local-first mode, BYO model, data handling), and start SOC 2 readiness (Vanta/Drata trial).
- Two content pieces: "Anatomy of an LP pack" and "Why numbers break between Excel and PowerPoint".
- Pricing A/B in pilot proposals (per pack vs per seat).
- Build the pack playbook data model (store reviewer corrections from day one even before learning from them).
- Map warm-intro graph (IIT Delhi / BITS alumni in PE, credit, fund admin, KPOs).

## DO NOT DO YET
- New editor/renderer fidelity work, ribbon rebuilds, UI animation polish.
- Legal-vertical features, email/calendar agents, web-research agent, slide-from-scratch generation.
- Multi-agent orchestration features that users see; new orchestration patterns.
- Broad PLG launch, Product Hunt, paid ads.
- Hiring a US AE or any non-engineering hire before pilots show pull.
- Enterprise on-prem packaging (beyond a local-first mode for pilots).
- Raising on the old horizontal "Cursor for documents" story.

## Week-by-week
| Period | Product | Customer research | Design partners | GTM | Metrics | Hiring | Fundraising | Technical |
|---|---|---|---|---|---|---|---|---|
| **Weeks 1–2** | Freeze roadmap to NOW items; spec link-graph v0 on 2 sample packs | Recruit 30 interviewees; run first 8 | List of 40 targets from 19_DESIGN_PARTNERS; 10 warm intros requested | Positioning v1 ("keep the pack right, with proof") | Define events; set up telemetry | Assign roles; no new hires | Founders align on raise size ($1.25M), instrument (SAFE/iSAFE/CCPS) and entity | Clean-clone build; CI; licence audit |
| **Weeks 3–4** | Link extraction v0 + roll-forward v0 on demo pack | Interviews 9–20; 2 teardowns | 5 discovery calls → 3 pack teardowns | Landing page + teardown CTA | First funnel numbers (interviews→teardowns) | — | YC / Atoms / Surge applications drafted; angel list | Kernels: PPTX/DOCX number-run patching; XLSX dependency extraction |
| **Month 2** | Tie-out v0; pack diff + restore; Word tracked-changes output; local-first mode | Interviews 21–30; synthesis; update 06–08 | Side-by-side vs Claude/Copilot on 2 packs; 10 pilot offers | 2 content pieces; LinkedIn cadence | Auto-link %, accepted %, zero-LLM share on real packs | Identify 1 FDE candidate (hire on raise) | 15 investor warm-ups; deck v2 with evidence | Scheduled runs; token telemetry per step |
| **Month 3** | Link-confirmation UI; reviewer view (web, minimal) | Pilot interviews (cycle 1 debrief) | ≥3 paid pilots signed; first cycle run | Case study #1 draft | Day-90 gate report (21_VALIDATION_PLAN) | Offer letters contingent on close | Formal raise with LOIs; target close ~Jan 2027 | SOC 2 readiness started |

## Day-90 gate (go / adjust / pivot)
Report against H1, H6, H7, H9, H10 (21_VALIDATION_PLAN). Update DECISIONS.md, then re-run the financial model with pilot-derived ACV, cycle time and inference cost per pack.
