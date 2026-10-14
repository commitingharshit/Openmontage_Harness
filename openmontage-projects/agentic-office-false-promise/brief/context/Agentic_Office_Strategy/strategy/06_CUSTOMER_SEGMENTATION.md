# 06 — Customer Segmentation

*v1 · 2026-09-30. US employment and wages are BLS OEWS May 2025 **[F, Tier 1]**; India figures are Tier 2–3 **[F/A]**; all 1–5 scores are **[A]** judgements grounded in the evidence column, to be re-scored after 30 interviews (21_VALIDATION_PLAN). Weighted wedge scoring lives in `models/09_MARKET_MODEL.xlsx › Segments`.*

## 1. Users are not buyers

| Role in the deal | Who (wedge) | Why it matters |
|---|---|---|
| **User / producer** | Analyst, associate, FP&A analyst, fund-ops associate, offshore analyst | Feels the pain every period; adopts the workbench |
| **Reviewer** | VP, controller, CFO, partner, portfolio manager | Must trust the diff; should *not* need to learn an IDE |
| **Champion** | Head of FP&A, fund CFO/COO, head of portfolio operations, delivery head | Owns the pack deadline and the team's hours |
| **Economic buyer** | CFO / COO (fund or company); delivery head / COO (offshore firm) | Signs $10–100k |
| **Blocker** | IT/security, compliance, client data-use clauses (offshore), partners who distrust AI | Needs private deployment, audit log, SOC 2 |

## 2. Segment table (20 candidate segments)

Scores are 1 (poor) to 5 (excellent). "Lock-in" = Microsoft Office dependence (5 = entirely in Office, good for us because we operate on Office files). "Saturation" = 5 means little competition.

| # | Segment | US users (BLS May-25) | Global / India note | Mean US wage | Doc intensity | Pain | Recurring packs | Need review / audit | Data sensitivity | Buying authority reachable | Sales cycle speed | ACV potential | Office lock-in | Saturation (5=open) | Verdict |
|---|---|---:|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Fund finance & portfolio ops (PE, private credit, VC, family office)** | part of 13-2051 (362k) + 11-3031 (842k) | India fund-admin & GCC teams serve these | $117k–$187k | 5 | 5 | 5 (quarterly LP, monthly portfolio) | 5 | 4 | 3 | 3 | 4 | 5 | 3 | **Primary wedge** |
| 2 | **Corporate FP&A / board packs (mid-market, not on FP&A platform)** | 11-3031 842k; 13-2051 part | — | $117k–$187k | 5 | 4 | 5 (monthly) | 4 | 3 | 3 | 3 | 3 | 5 | 2 (Datarails, Cube, Rollstack) | **Test (secondary)** |
| 3 | **Offshore production teams (KPO mid-tier, fund admin, GCC CoEs, Big-4 delivery)** | n/a (India) | GCCs 2.36M staff; Big-4 India >450k; KPO research analysts ₹4.5–11 LPA | India $9–25k | 5 | 4 | 5 | 5 (client QC) | 5 | 4 (founder network) | 2 | 4 | 5 | 3 (top 3 KPOs locked) | **Channel + power users** |
| 4 | Lender / credit reporting (credit analysts, covenant packs) | 13-2041 64k | — | $101k | 5 | 4 | 5 (quarterly covenants) | 5 | 4 | 3 | 3 | 3 | 5 | 4 | Adjacent (year 1–2) |
| 5 | Boutique advisory (valuation, transaction services, restructuring) | part of 13-2051 / 5416 | Many Indian valuation boutiques | $106–123k | 5 | 4 | 3 | 5 | 4 | 3 | 3 | 3 | 5 | 3 | Adjacent |
| 6 | Management consultants (boutique/mid) | 13-1111 in 5416: 223k | Big-4 India consulting | $123k | 5 | 4 | 2 (project-based) | 3 | 3 | 3 | 3 | 2 | 5 | 2 (think-cell, auxi, platform agents) | Expansion |
| 7 | Investment bankers (sell-side) | part of 41-3031 (490k) | India IB analysts ₹12–30 LPA | $109k+ | 5 | 5 | 3 | 4 | 5 | 2 | 1 | 5 | 5 | 1 (Rogo, Hebbia, Model ML) | Avoid |
| 8 | Equity research / buy-side analysts | part of 13-2051 | KPOs serve heavily | $141k (in NAICS 523) | 5 | 4 | 4 (earnings season) | 3 | 4 | 2 | 2 | 4 | 4 | 2 (Anthropic Earnings Reviewer, Rogo) | Watch |
| 9 | Lawyers — litigation (India) | — | ~2.7M advocates (BCI; Tier 3) | low | 4 | 4 | 2 | 5 | 5 | 4 | 2 | 1 | 4 | 3 | Deprioritise (prior beachhead) |
| 10 | Lawyers — transactional (US/UK) | 23-1011 754k | — | $186k | 5 | 4 | 2 | 5 | 5 | 2 | 1 | 5 | 5 | 1 (Harvey, Legora, Spellbook) | Avoid |
| 11 | Paralegals / legal ops (repapering, estates) | 23-2011 393k | — | $70k | 4 | 3 | 2 (episodic) | 4 | 4 | 2 | 2 | 3 | 5 | 4 | Expansion (doc-estate) |
| 12 | Accountants & auditors (firms) | 13-2011 1.45M (331k in 5412) | ICAI 407k members, 99k firms | $95k | 4 | 4 | 5 (annual/quarterly) | 5 | 4 | 3 | 2 | 3 | 5 | 2 (DataSnipper, CaseWare) | Expansion |
| 13 | Compliance & policy teams | 13-1041 417k | — | $88k | 4 | 3 | 3 | 5 | 4 | 2 | 2 | 3 | 5 | 3 | Expansion (doc-estate) |
| 14 | Corporate strategy teams | part of 13-1111 / 11-1021 | — | $114–135k | 4 | 3 | 3 | 3 | 4 | 3 | 3 | 3 | 5 | 3 | Opportunistic |
| 15 | Researchers / academics | varied | — | varied | 3 | 3 | 1 | 2 | 2 | 3 | 4 | 1 | 3 | 3 | Avoid (low WTP) |
| 16 | Students | — | — | — | 2 | 2 | 1 | 1 | 1 | 5 | 5 | 1 | 3 | 1 | Avoid (except as a hiring channel) |
| 17 | Founders / startup ops (investor updates) | — | — | — | 3 | 3 | 4 (monthly updates) | 2 | 2 | 5 | 5 | 1 | 3 | 2 | PLG test bed only |
| 18 | Government / public policy | — | India PSU & ministries | — | 4 | 3 | 3 | 5 | 5 | 1 | 1 | 4 | 3 (ODF/on-prem) | 4 | Later (sovereign/on-prem) |
| 19 | Procurement / RFP teams | — | — | — | 4 | 3 | 3 | 3 | 3 | 2 | 2 | 3 | 5 | 2 (RFP AI tools) | Later |
| 20 | HR / sales ops | — | — | — | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 2 | 4 | 1 | Avoid |

## 3. Reading the table

1. **Where pain × recurrence × Office lock-in × whitespace are all high**, segments 1 (fund finance & portfolio ops), 3 (offshore production teams) and 4 (lender reporting) stand out. They share the same artifact: a recurring multi-file pack whose numbers must tie and whose changes are reviewed.
2. **Sell-side banking and transactional law** have the highest pain and ACV, but the lowest whitespace. Rogo, Hebbia, Model ML, Harvey and Legora raised more than $2B between them.
3. **India legal (prior beachhead)** scores well on founder access but poorly on ACV and venture scale. Indian litigation spend on software is low and competition at low price points is growing (NYAI $1.5M seed, SCC Online/Manupatra AI). Keep the legal demo as proof of generality, not as the wedge.
4. **Corporate FP&A** is attractive on pain and cadence but is where Datarails, Cube, Workiva and Rollstack compete hardest. It stays a secondary hypothesis to test, not the lead.
5. **Offshore production teams** are the founders' strongest access advantage and the heaviest users (power profile in 10_PRICING_MODEL). The top three firms are locked, and cycles are slow. Treat them as a **channel and power-user base** that also serves segment 1 clients.

## 4. Segment decision (see DECISIONS D001–D003)

- **Primary ICP (sell to):** investment and finance teams whose recurring packs live in Office files. Start with **mid-market fund managers and advisory firms** (PE, private credit, VC, family offices, boutique valuation/transaction advisory) in the US/UK and in Singapore/UAE hubs with India links.
- **Channel ICP (sell through / power users):** India-based production teams producing those packs: mid-tier research/analytics firms, fund administrators, captive GCC reporting teams.
- **Secondary hypothesis (test in parallel, drop if weaker):** mid-market corporate FP&A teams whose board pack is bespoke Excel/PPT/Word and who are *not* buying an FP&A platform.
- **Explicitly not now:** sell-side IB front office, transactional law, individual prosumers, students, government.

## 4b. Iteration-2 refinement
Fund-admin and investor-reporting platforms (Juniper Square: >2,000 GPs and >40,000 funds with JunieAI document automation; Carta Fund Admin; Allvue) already automate *standardised* LP outputs. Our fund ICP is therefore the **bespoke layer downstream of their exports**: portfolio-review decks, IC updates, LP letter narrative, portfolio-company board decks, lender packs. Because every ICP is contested by a platform, the primary ICP is chosen by an explicit three-way interview test (fund finance vs lender/credit reporting vs corporate FP&A) by day 45 (DECISIONS D011).

## 5. What would change this segmentation
- Interviews show fund teams' packs are mostly produced inside portfolio-monitoring platforms (Chronograph, Cobalt, 73 Strings) → move primary to lender/credit reporting or corporate FP&A.
- Offshore firms' client contracts forbid any third-party AI tooling → drop the channel ICP, sell direct only.
- Corporate FP&A interviewees rate pain higher and platform fatigue stronger than fund teams do → swap primary and secondary.
