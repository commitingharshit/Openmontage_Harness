# 16 — Fundraising Analysis

*v1 · 2026-09-30. Models: `models/15_FINANCIAL_MODEL.xlsx` (Annual, Snapshot, FundingStress) and `models/17_CAP_TABLE_MODEL.xlsx`. This is not legal, tax or investment advice. Indian-incorporated companies typically raise pre-seed via CCPS/iSAFE/convertible notes under FEMA rules; US-investor rounds often require a Delaware parent (a "flip"). Budgeted at $20k in the model (O09).*

## 1. What stage are we actually at?

| Stage | Definition | Us? |
|---|---|---|
| Idea | Thesis only | No: substantial code exists |
| **Prototype** | Working technology demos; no users | **Yes.** ~50k LOC Rust kernels, ~67k LOC orchestration, Code-OSS fork, 928 offline tests (Jul 2026). No users, no revenue, and the wedge's core feature (object-level link graph) is not built |
| MVP | Solves the wedge job for a real user end-to-end | Not yet: ~4–8 weeks of focused work (12_PRODUCT_ROADMAP "NOW") |
| Pre-seed | Raising the first institutional money on team + prototype + early signal | **Appropriate round to raise** |
| Seed | Early repeatable revenue, retention signal | No |

**Honest positioning to investors: "prototype-stage, pre-revenue, technical team; thesis refocused on a specific job; raising pre-seed to reach 20–25 paying organisations and ~$0.5M ARR in 18 months."**

## 2. Comparable rounds and benchmarks

| Reference | Terms | Relevance | Source tier |
|---|---|---|---|
| YC standard deal | $500k: $125k for 7% + $375k uncapped MFN SAFE | Accelerator path; strong signal for US investors | 1 (ycombinator.com/deal) |
| Accel Atoms AI Cohort 2026 (with Google AI Futures Fund) | Up to $2M co-investment (Accel ≤$1M + Google match) + $350k cloud credits | India AI pre-seed path | 2 |
| Peak XV Surge 11 | Up to $3M seed capital | India/SEA pre-seed/seed path | 2 |
| Carta 2025 median post-money SAFE caps | ~$10M for $250k–1M rounds; ~$15M for $1–2.5M rounds; Q2-2026 range $10M (<$250k) to $35M (≥$2.5M) | US benchmark (skews SF/AI) | 2 |
| India pre-seed (2026 guides) | $250k–1M; caps $3–10M; dilution 10–20% | India benchmark | 3 |
| Indian agentic-AI pre-seeds (2026) | Oppex AI ~₹4.2 Cr (~$0.5M, Info Edge); Zenalyst $342k; Edysor.ai ~$144k; NYAI (legal) $1.5M seed | Local comps: smaller rounds | 3 |
| TamLabs / Melder (YC) | YC standard deals | Direct "Cursor for Word/Excel" comps | 2 |
| Model ML | $12M (early 2025), then $75M Series A (Nov 2025) | Shows the finance-document category attracts capital after traction | 2 |
| Endex | $14M led by OpenAI Startup Fund (Aug 2025) | Finance Office agent seed-sized round | 2 |
| Seed medians (Q1-2026) | Pre-money $18.4M (PitchBook-NVCA); post $24M (Carta); median dilution ~20% | Next-round bar | 2 |

## 3. How much should we raise? (derived, not conventional)

**Method:** size the round to (a) fund the 18-month plan to seed milestones in the base case and (b) survive the conservative revenue case long enough to reach default-alive or a seed, plus a buffer.

From the base case (months 1–18):
| Use | $ | Share of gross spend |
|---|---:|---:|
| Engineering & product payroll (founders' CTO + 4 engineers + designer) | 363,360 | 40% |
| GTM payroll (CEO share, FDE, founding AE from month 10, SDR, CS) | 246,080 | 27% |
| G&A payroll (founder's office / ops) | 36,000 | 4% |
| Security & legal one-offs (Delaware flip $20k if needed; SOC 2 Type I $25k) | 45,000 | 5% |
| Legal, accounting, admin | 36,000 | 4% |
| R&D compute, evals, dev infra | 36,000 | 4% |
| Inference, hosting & support for customers (COGS) | 60,290 | 7% |
| Travel (US/UK/SG design partners), marketing, tools, office | 75,050 | 8% |
| **Gross spend, 18 months** | **≈ $898k** | 100% |
| Less revenue (pilots + early customers) | (262,879) | |
| **Net burn to month 18** | **≈ $636k** | |

Runway stress (FundingStress sheet, **no seed and no Series A ever close**):

| Pre-seed raised | Base revenue case | Conservative revenue case |
|---|---|---|
| $0.75M | Never runs out, but min cash ≈ **$5k** at month 28 (too thin) | Cash out **month 19** |
| $1.0M | Never runs out (min ≈ $255k) | Cash out **month 24** |
| **$1.25M** | Never runs out (min ≈ $505k) | Cash out **month 29** |
| $1.5M | Never runs out (min ≈ $755k) | Cash out month 35 |
| $2.0M | Never runs out | Cash out month 48 |

### Three cases
| Case | Raise | What it buys | Risk |
|---|---:|---|---|
| **Lean** | **$0.75M** (e.g., YC $500k + $250k angels, or an India seed fund) | 5–7 people; founder-led sales only; no US AE until revenue; SOC 2 deferred | One bad quarter forces a bridge; too thin to hire a US seller |
| **Base (recommended)** | **$1.25M** (range $1.0–1.5M) | Plan in the model: 12 people by month 12 (mostly India), FDE, founding US/UK AE at month 10, SOC 2 Type I by month 12, 4 paid pilots → ~22–25 paying orgs and ~$0.44–0.49M ARR at month 18–19 | Moderate; survives the conservative case for 29 months |
| **Aggressive** | **$2.0–2.5M** (e.g., Accel Atoms/Surge-sized) | Two AEs earlier, 2 more engineers, a US presence, faster enterprise-security work | More dilution before proof; the capital doesn't fix the key uncertainty (does the wedge pull?) |

**Recommendation: raise $1.25M on a post-money SAFE (or iSAFE/CCPS equivalent) at an $8–12M post-money cap (base $10M → 12.5% dilution),** and add up to ~$0.25M of strategic angels (fund CFOs, delivery-firm operators) inside the same cap. Consider YC or Accel Atoms as alternative routes that bring signal. The terms are comparable (YC: 7% + MFN; Atoms: up to $2M).

## 4. What milestone must the seed round see? (work backward)

A 2027–28 seed of ~$6M at ~$24M pre (model F02 / cap table) needs, by ~month 18:
| Milestone | Base-case model value | Threshold we'd commit to |
|---|---|---|
| Paying organisations | ~22–25 | ≥15 |
| ARR | ~$0.44–0.49M | ≥$0.35M |
| Logo retention (annualised) | ~83% | ≥80% |
| NRR | ~104% | ≥100% |
| Packs per customer | ≥2 (assumption) | ≥1.5 and rising |
| Measured time saved per pack cycle | — | ≥30% (product-measured) |
| Reviewer correction rate, cycle N vs cycle 1 | — | falling ≥25% |
| Zero-LLM share of numeric updates | — | ≥60% |
| Security | SOC 2 Type I by month 12 | Done |
| Channel proof | 1 delivery-firm pilot | ≥1 live across ≥2 client accounts |

If by month 12 we have **<5 paying organisations or no second-cycle retention**, cut burn and pivot per `governance/DECISIONS.md` reversal criteria. Do not raise a seed on the base thesis.

## 5. Dilution: what founders should understand
Base path (cap table model, placeholder founding split):

| After | Founders combined | Notes |
|---|---:|---|
| Founding | 90.0% | 10% placeholder for early contributors |
| Pre-seed ($1.25M @ $10M post) + 10% ESOP | 69.8% | SAFE 12.5%, pool 10% |
| Seed ($6M @ $24M pre; pool to 12%) | 52.2% | Seed 20%; pool top-up borne by founders under a post-money SAFE |
| Series A ($18M @ $72M pre; pool 13%) | 39.7% | |
| Series B ($40M @ $200M pre; pool 12%) | 32.6% | Illustrative |

**Trade-offs:**
- Moving the pre-seed cap from $10M to $7M (same $1.25M) raises dilution from 12.5% to 17.9%. Founders lose ~4 points *now*, compounding to ~2.5–3 points after the Series B.
- A higher cap (e.g., $16M on $2M) looks better but raises the seed bar (the seed must be priced ≥ ~2× the cap to avoid a flat round). With no traction today, **a reasonable cap that the company can clearly grow into is worth more than a headline number.**
- The option-pool shuffle at seed (12% post, pre-money top-up) costs founders ~5 points. Negotiate the pool size based on an actual 18-month hiring plan (the model hires ~13 people post-seed).
- Grid of implied valuations for any raise and % sold: `17_CAP_TABLE_MODEL.xlsx › DilutionGrid` (e.g., $1M at 10% → $10M post; at 20% → $5M post).

## 6. What exactly should we ask investors for?
> **"We're raising $1.25M pre-seed to turn a working Office-execution engine into the system that keeps recurring multi-file packs correct every period. In 18 months: 20+ paying finance and investment teams, ~$0.5M ARR, retention across at least two reporting cycles, and measured time saved per pack."**

Plus non-capital asks: introductions to fund CFOs/COOs and portfolio-ops leaders (US/UK/SG/UAE), to mid-tier research/fund-admin delivery firms in India, and to one design partner per investor.

## 7. Should we raise now or first hit milestones?
**Do both, in sequence, over ~8–10 weeks.**
1. **Weeks 0–6 (before formal pitching):** 30 problem interviews, 5 pack teardowns on real (anonymised) packs, 2–3 signed paid-pilot LOIs, and the "NOW" demo on a real pack. The thesis changed this week. Pitching before any customer evidence would mean raising on the old horizontal story, which is contestable.
2. **In parallel:** apply to YC / Accel Atoms / Surge (application cycles have fixed timelines); warm-up conversations with 10–15 angels and pre-seed funds (18_INVESTOR_DATABASE).
3. **Weeks 6–10:** formal raise with LOIs in hand; target close by ~January 2027 (model month 1).

## 8. Unit economics (base case; see Annual sheet; all figures are projections)
| Metric | Y1 | Y2 | Y3 | Y5 | Benchmark / note |
|---|---:|---:|---:|---:|---|
| Gross margin | 76% | 78% | 80% | 82% | SaaS 75–80%; AI apps often 50–65%. Ours depends on the zero-LLM share (10_PRICING) |
| Blended CAC per new org | $12.9k | $15.1k | $24.9k | $29.5k | Includes all S&M payroll, marketing, travel |
| Avg ACV of new logos | $15.0k | $15.0k | $20.6k | $24.6k | Enterprise mix rises after seed |
| CAC payback (GM-adjusted) | 13.7 mo | 15.5 mo | 18.1 mo | 17.6 mo | <18 months good for mid-market |
| Annual logo churn (mid-market) | 17% | | | | Mid-market SaaS 10–20% |
| NRR (mid-market) | 104% | | | | Must rise to 110–120% for venture scale |
| LTV/CAC (5-yr cap) | 4.4× | 3.9× | 2.4× | 2.1× | >3× target; falls as enterprise AEs ramp |
| Burn multiple | 2.5× | 1.1× | 0.8× | 0.3× | <2 good |

**Conservative case** (for honesty): GM ~61–64%, CAC payback 42–66 months, LTV/CAC ≈ 0.6–1.3×. **That business is not fundable at seed**, which is the point of the 18-month milestones.

**What we do not know (and how we'll learn it):** real ACV (paid pilots), real inference cost per pack (telemetry from pilots), real churn (second-cycle retention), and sales-cycle length (pilot → contract). Each maps to an experiment in 21_VALIDATION_PLAN.
