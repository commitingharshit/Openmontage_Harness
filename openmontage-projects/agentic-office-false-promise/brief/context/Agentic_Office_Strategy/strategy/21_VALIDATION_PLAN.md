# 21 — Validation Plan

*v1 · 2026-09-30. Ranked by **impact × uncertainty** (each 1–5). Each test is designed to be cheap and completed within 90 days unless noted.*

| Rank | ID | Hypothesis | Impact | Uncertainty | I×U | Cheapest test | Success criterion | Kill / pivot criterion |
|---:|---|---|---:|---:|---:|---|---|---|
| 1 | H1 | Our ICP produces **recurring multi-file packs that live in Office files** (not inside FP&A/portfolio platforms) | 5 | 5 | 25 | 30 interviews (20_USER_RESEARCH) | ≥60% of fund/finance interviewees produce ≥1 such pack monthly/quarterly | <40% → re-segment (lender reporting / FP&A / doc-estate) |
| 2 | H6 | Reviewers will **accept agent-made numeric changes** when they see source, why and impact per change (deterministic numbers, LLM narrative) | 5 | 5 | 25 | 5 pack teardowns + live roll-forward session with a reviewer | ≥70% of proposed changes accepted; reviewer says they would not re-check every number | <40% accepted or "I'd re-check everything anyway" |
| 3 | H7 | Design partners **convert to paid** pilots at ~$2.5k/month | 5 | 5 | 25 | Offer paid 2-cycle pilots to 10 design partners | ≥3 paid pilots signed by day 90 | 0 paid after 10 offers → pricing/ICP problem |
| 4 | H2 | A pack costs **≥20 person-hours per cycle** and ≥30% of it is mechanical update/check | 5 | 4 | 20 | Interviews + timed teardowns | Median ≥20 hrs/cycle; ≥30% mechanical | Median <8 hrs → value too small |
| 5 | H9 | **≥60% of numeric updates can run deterministically** (zero-LLM) once the link graph is confirmed | 4 | 5 | 20 | Run link extraction + roll-forward on 5 real packs | Auto-link ≥70% of numbers; deterministic share ≥60% | Auto-link <40% → setup cost kills adoption |
| 6 | H10 | Platform agents (Copilot/Claude/ChatGPT) are **not "good enough"** for the pack job | 5 | 4 | 20 | Side-by-side: same roll-forward done with Claude for Office / Copilot by the design partner | We win on accuracy (tie-out errors), time or review effort by ≥2× | Parity → wedge is gone; pivot to infra/delivery console |
| 7 | H5 | Buyers accept **pack-based pricing** (~$250/pack/month) over seats | 4 | 4 | 16 | Price-framing in pilot proposals (A/B: per pack vs per seat) | ≥50% prefer per pack; no "too expensive" at $250 for ≥20-hr packs | Consistent push-back → seat + usage hybrid |
| 8 | H11 | Security requirements can be met with **local-first + BYO model** before SOC 2 Type II | 4 | 4 | 16 | Security questionnaires from 5 prospects | ≥3 of 5 would proceed with local-first + SOC 2 Type I roadmap | Most require Type II + on-prem day 1 → longer runway needed |
| 9 | H12 | **Mid-tier delivery firms** will pilot on a client account | 4 | 4 | 16 | 8 delivery-head conversations → 2 pilot proposals | ≥1 pilot on a live client account by day 90 | Client clauses block all AI tools → drop channel ICP |
| 10 | H3 | Time reduction on pack cycles is **≥30%** | 4 | 4 | 16 | Measure cycle time in pilots (product telemetry + timesheets) | ≥30% by cycle 2 | <15% → value story fails |
| 11 | H4 | The **economic buyer** (CFO/COO/delivery head) can sign $10–30k without a long procurement | 4 | 3 | 12 | Ask in interviews about last purchase process | Median cycle ≤60 days for ≤$30k | >120 days → adjust runway/GTM |
| 12 | H13 | Correction rate **falls cycle over cycle** (playbook learning) | 4 | 5 | 20 | Track reviewer corrections in cycles 1→2→3 | ≥25% fewer corrections by cycle 3 | Flat → moat thesis weak |
| 13 | H8 | Offshore analysts (power users) prefer the **workbench/IDE form factor** | 3 | 4 | 12 | Usability test with 5 analysts | SUS ≥70; they choose it over add-in | Prefer add-in → invest in Office add-in earlier |
| 14 | H14 | **India-based team can sell to US/UK buyers** without US presence until ~month 10 | 3 | 3 | 9 | Track time-zone/cycle friction in pilots | No deal lost to presence | Deals lost → earlier US hire |
| 15 | H15 | Legal matter workflow is a **viable second vertical** | 2 | 4 | 8 | Keep one legal reference user | Qualitative | — |

## Test bundles (sequenced)
1. **Weeks 1–4, problem validation**: H1, H2, H4, H11, H12 (interviews + questionnaires).
2. **Weeks 3–8, solution validation**: H9, H6, H10 (teardowns, live roll-forwards, side-by-side vs platform agents).
3. **Weeks 6–12, business validation**: H7, H5, H3, H13 (paid pilots, pricing framing, telemetry).

## Landing-page / demand test (optional, cheap)
- Page: "Your Q3 pack, rolled forward and tied out, with proof." CTA: "Send us a dummy pack — we'll return the tie-out report free."
- Channels: LinkedIn posts to fund-ops and FP&A communities; alumni groups.
- Success: ≥5% of qualified visitors submit a pack; ≥20 submissions in 30 days. This tests pull, not product.

## Decision gate at day 90 (feeds `governance/DECISIONS.md`)
- **GO** (raise on this wedge): H1, H6, H7, H9 supported; H10 not contradicted.
- **ADJUST**: H1 supported but H10 parity → move up-stack (playbooks, delivery console, private deployment).
- **PIVOT**: H1 or H6 rejected → evaluate the delivery-firm console (W4), doc-estate (W5) or infrastructure (W7) per the Segments sheet.
