# 07 — Personas

*v1 · 2026-09-30. These are **hypothesis personas** built from public evidence (BLS wages, vendor case studies, job descriptions) and the founders' Project Atlas workflow. **None is based on an interview yet.** Every "PAINS", "PRODUCT MOMENT" and hours figure is [H] until validated (20_USER_RESEARCH). Economic value uses `models/09_MARKET_MODEL.xlsx › D_Value` (base: 25–35% time reduction, 1.3× loading, 46 weeks).*

---

## P1 — "Maya", Associate, Portfolio Operations & Fund Finance (primary user)
**WHO**: 3–6 years' experience (ex-Big-4 or banking); mid-market PE or private-credit manager, $1–5B AUM, 30–150 staff; US/UK.
**WORK**: Owns the quarterly LP report pack, monthly portfolio-monitoring deck and IC update memos. Touches Excel (fund model, portfolio KPIs, waterfall), PowerPoint (LP deck, IC deck), Word (LP letter, IC memo) and PDFs (portfolio-company management accounts, valuation reports, fund-admin statements). Heavy weeks around quarter-end (+45–60 days per ILPA guidance).
**PAINS [H]**: copying 100+ numbers from model to deck and letter; re-cutting after the CFO changes one assumption; version sprawl (`LP_Q3_v11_final_MK.pptx`); tie-out errors found by LPs; chasing portfolio companies for data; rework when a valuation changes late.
**CURRENT WORKAROUND**: Excel + PowerPoint + Word; think-cell/Macabacus links (fragile); portfolio-monitoring platform for KPI collection; ChatGPT/Claude for letter drafting; juniors or an offshore team for formatting.
**ECONOMIC VALUE**: US financial analyst mean wage $116,800 (BLS) → loaded ≈ $73/hr. Vendor case studies report 60–180 hrs/quarter for LP reporting [F, Tier 3]. At 30 hrs/month per pack and 35% reduction, ≈ **$770/pack/month** of time value (PackPricing base); faster turnaround to LPs; fewer tie-out errors.
**AI CONCERNS**: a wrong number reaching LPs; confidentiality of portfolio data; being unable to see what the AI changed; formatting breaking.
**PRODUCT MOMENT [H]**: *"The CFO just changed the Q3 valuation of one portfolio company, and I have to update the model, 9 slides and 4 paragraphs of the letter tonight."* The product shows every dependent object, updates it, and she reviews a 23-item diff instead of re-checking 140 numbers.
**BUYER**: Fund CFO/COO. **USER**: Maya + 1–3 analysts. **CHAMPION**: Maya or Head of Portfolio Ops. **BLOCKER**: CCO (data policy), IT (vendor security review), a partner who distrusts AI.

## P2 — "David", CFO / COO of a mid-market fund (economic buyer)
**WHO**: 15+ years; signs vendor contracts up to ~$100k without the investment committee.
**WORK**: Reviews packs, owns LP relationships and the audit trail for valuations.
**PAINS [H]**: team capacity crunch at quarter-end; errors that reach LPs; key-person risk (only Maya knows the pack); rising LP reporting demands (ILPA templates).
**BUYING LOGIC**: an ROI story in hours plus risk reduction (tie-out, audit log); security posture (SOC 2, data residency, no training on data); does not want another platform to implement.
**PRODUCT MOMENT [H]**: seeing a **tie-out report** ("147 numbers in the LP deck, 147 traced to the fund model; 2 mismatches flagged") and a **restore point** for the Q2 pack.
**OBJECTIONS**: "Copilot is already included in our licence"; "our fund admin does this"; "what if you go out of business?" (answer: files stay native; no lock-in).

## P3 — "Rahul", Senior Analyst, India-based production team (power user)
**WHO**: 2–5 years; CA/MBA/CFA-track; Gurugram, Bengaluru or Mumbai; works in a 100–2,000-person research/analytics or fund-administration firm, or a captive GCC reporting team; serves 3–8 client packs per cycle.
**WORK**: 10–12 hour days in Excel/PowerPoint/Word; follows client-specific templates and style guides; a QC reviewer checks every number.
**PAINS [H]**: repetitive roll-forwards; client-specific formatting rules; QC rework; night shifts to match US deadlines; knowledge lost when analysts churn.
**CURRENT WORKAROUND**: templates, macros, checklists, a second analyst doing QC, some internal Python/VBA; client-approved AI tools only (often none).
**ECONOMIC VALUE**: wage ~₹8–20 LPA ($9–23k), but the firm bills ~$25–45/hr **[A]**. Value to the firm is **billable capacity**: 30 hrs/week of doc work at 35% reduction ≈ $12k/yr per analyst at $35/hr billing (D_Value last row).
**AI CONCERNS**: client data leaving approved environments; being blamed for AI errors; job security.
**PRODUCT MOMENT [H]**: *"Client sent revised numbers at 11pm IST; the pack is due at 9am New York."* A roll-forward with an automatic tie-out report replaces 3 hours of re-keying and QC.
**BUYER**: Delivery head / COO. **CHAMPION**: Team lead / QC manager. **BLOCKER**: client contracts (AI usage clauses), InfoSec.

## P4 — "Anita", Delivery Head / VP Operations, mid-tier production firm (channel buyer)
**WHO**: 12–20 years; P&L owner for a practice of 50–300 analysts.
**PAINS [H]**: clients demanding AI-driven price cuts; margin pressure; attrition; competing with Acuity and Evalueserve, which now market agent platforms.
**BUYING LOGIC**: margin per FTE, turnaround-time SLAs, "AI-enabled delivery" as a sales story, and client-approvable deployment (private, BYO model, audit).
**PRODUCT MOMENT [H]**: a client RFP that asks "what AI do you use, and how do you control it?"
**DEAL SHAPE**: pilot on one client account (5–15 seats) → practice-wide; potential white-label.

## P5 — "Sam", FP&A Manager, mid-market company (secondary hypothesis)
**WHO**: 6–10 years; company with $50M–$1B revenue; FP&A team of 3–10; not on Datarails, Cube or Pigment.
**WORK**: monthly management pack and quarterly board pack (Excel model → PowerPoint → Word commentary); lender compliance certificate.
**PAINS [H]**: 2–3 days per cycle writing commentary (IBM FP&A trends cited 70–80% reduction with AI-first workflows [Tier 3]); last-minute changes after the CEO review; link breakage between Excel and PPT.
**ECONOMIC VALUE**: US financial manager mean wage $186,910 → loaded ≈ $117/hr; 10 hrs/week of pack work at 35% reduction ≈ $19k/yr.
**BUYER**: CFO. **BLOCKER**: "we're evaluating an FP&A platform instead".

## P6 — "Leo", Credit Analyst, private-credit fund (adjacent)
**WHO**: 2–6 years; mean US credit-analyst wage $100,850 (BLS).
**WORK**: quarterly covenant-compliance packs and credit memo updates per borrower (20–60 borrowers).
**PRODUCT MOMENT [H]**: borrower sends quarterly financials as a PDF, and 30 covenant tests, the memo and the portfolio deck must update.

## P7 — "Neha", Engagement Manager, boutique strategy / transaction advisory (expansion)
**WHO**: 5–8 years; firm of 20–200.
**WORK**: client deliverable decks with backing models; iterative re-cuts during a project.
**WHY LATER**: project-based rather than recurring (weaker retention); PowerPoint incumbents (think-cell, auxi) and platform agents are strong.

## P8 — "IT/Security & Compliance" (blocker persona)
**NEEDS**: SSO, SOC 2 Type I→II, data residency, no model training on customer data, BYO model endpoints (Azure OpenAI, Bedrock), audit log export, least-privilege file access, a vendor that can run inside their tenant or VPC.
**IMPLICATION**: private deployment is not a year-3 feature for fund and delivery-firm buyers. A credible security story is needed by the first paid pilot (SOC 2 Type I by month ~12 in the plan).

---

## Persona-level economics (base case, from D_Value)
| Persona | Cost basis | Doc hrs/week [H] | Value/yr at 25% reduction | WTP/mo at 10% capture |
|---|---|---:|---:|---:|
| US financial analyst (P1) | $116,800 wage | 15 | $12.6k | $105 |
| US financial manager (P5) | $186,910 | 10 | $13.4k | $112 |
| US credit analyst (P6) | $100,850 | 15 | $10.9k | $91 |
| US management consultant (P7) | $123,080 | 15 | $13.3k | $111 |
| India IB/PE analyst | ₹20 LPA | 25 | $4.1k | $34 |
| India KPO research analyst | ₹8 LPA | 30 | $2.0k | $16 |
| Offshore analyst valued at billing rate (P3) | $35/hr × 2,080 | 30 | $12.1k | $101 |

**Takeaway**: price against US value or offshore *billing* value, never Indian salaries. That is why the channel ICP is framed as "production teams serving global clients", not "Indian professionals".
