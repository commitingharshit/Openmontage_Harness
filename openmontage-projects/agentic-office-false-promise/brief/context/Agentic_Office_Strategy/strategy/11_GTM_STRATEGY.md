# 11 — Go-To-Market Strategy

*v1 · 2026-09-30. Numbers tie to `models/15_FINANCIAL_MODEL.xlsx` (base unless noted). Channel CAC and conversion figures are **assumptions** with the benchmark or logic shown. Nothing here is traction.*

## 1. GTM thesis in one paragraph
Sell a **pack**, not a seat. The first 10 customers come from founder-led, high-touch design partnerships where a forward-deployed engineer sets up one real recurring pack and runs it for two cycles. The buyer is whoever owns the deadline and the team's hours (fund CFO/COO, head of portfolio ops, delivery head). The India base is a cost and access advantage: engineering, forward-deployed setup, overnight runs for US/UK deadlines, and a channel into production teams that serve global clients. Revenue comes mainly from US/UK/Singapore/UAE buyers.

## 2. Geography (see `models/09_MARKET_MODEL.xlsx › Geo`)

| Market | Weighted score | Role |
|---|---:|---|
| United States | 3.68 (1st) | Primary revenue market for fund/finance teams; needs a US-based AE from ~month 10 and founder trips |
| Singapore | 3.55 (2nd) | Fast-procurement finance hub, English, strong India links; early design partners |
| UAE | 3.46 (3rd) | Family offices, funds, India diaspora; fast decisions |
| United Kingdom | 3.38 (4th) | Dense PE/credit market; better time-zone overlap with India than the US |
| India | 3.22 (5th) | Build base, design partners, delivery-team channel, founder network (IIT Delhi); low software WTP |
| Continental Europe | 2.64 (6th) | Later: language and sovereignty friction |

**Recommendation: build from India, sell to global buyers from day one.** Run India production teams as a channel and as design partners, not as the primary revenue market. The data behind this: an Indian KPO analyst's value at salary is ~$16/month of WTP, versus ~$100/month for a US analyst or for the same offshore analyst valued at billing rate (07_PERSONAS).

Privacy and procurement: US/UK funds require SOC 2 and vendor security reviews. Indian production teams are bound by their clients' data clauses (often stricter). Private deployment and BYO-model endpoints are therefore a GTM requirement, not a nice-to-have.

## 3. Channels

| Channel | How it works | Est. CAC per paying org [A] | Conversion / cycle [A] | ACV | Scalability | When |
|---|---|---:|---|---:|---|---|
| **Founder-led design partners** | Warm intros (IIT Delhi / BITS alumni in PE, credit, KPOs), 30-min discovery → 2-cycle pilot on a real pack | $8–15k (founder time + FDE + travel) | 10 targets → 4 paid pilots → ~2–3 customers; 2–4 months | $15–30k | Low | Months 0–12 |
| **Forward-deployed engineer (FDE) pilots** | Engineer sits with the team for the first roll-forward | Included above | Converts pilots; builds pack playbooks | — | Low-medium | Months 3–24 |
| **Mid-market AE (US/UK)** | Outbound to fund CFOs/COOs; demo on anonymised pack; 30-day pilot | $15–30k (model: $13–25k base) | 1.5 deals/ramped AE/month [A]; 45–90 days | $15–25k | Medium | From month 10 |
| **Delivery-firm partnerships (India)** | Pilot on one client account; expand across the practice; white-label option | $10–20k | 3–9 months; procurement-heavy | $30–120k | Medium-high | From month 6 (pilot), month 18 (scale) |
| **Fund-admin / accounting-firm referrals** | Firms that already prepare packs refer clients or resell | Rev share 15–20% | Slow to start | $15–30k | Medium | Year 2 |
| **Content & community** | Teardown posts ("How a $2B fund's LP pack is built"), templates, ILPA-template helpers, LinkedIn | Low cash, high time | Top-of-funnel only | — | Medium | From month 3 |
| **Microsoft Marketplace / AppSource** | List the review add-in; co-sell later | Low | Discovery channel | — | Medium | Year 2 |
| **PLG self-serve Pro** | Individual pack owners start free, invite reviewer | $300–800 (paid ads + content) | 2–4% visitor→trial; 10–20% trial→paid [A] | $720 | High, but weak vs free platform agents | From month 10; secondary |
| **Enterprise AE** | Larger funds, banks' in-house reporting, top delivery firms | $60–120k | 6–12 months | $80–180k | Medium | After seed |
| IIT/alumni network | Intro source for all of the above | — | Highest reply rates | — | Low | Always |
| Universities / students | Hiring and brand only | — | — | — | — | Not a revenue channel |

## 4. Stage-by-stage plan

### First 10 users (months 0–3)
- **Who**: 10 people who own a real recurring pack. Target mix: 4 fund finance/portfolio ops, 3 India production-team analysts, 2 corporate FP&A, 1 lender/credit analyst.
- **How**: warm intros only; 30 problem interviews first (20_USER_RESEARCH), then offer a "pack teardown" in which we map their pack's links and time for free.
- **Product needed**: link-graph extraction on their real pack + one roll-forward + diff (can be partially manual behind the scenes).
- **Success**: ≥6 of 10 run a second cycle; ≥3 say they would be "very disappointed" if it went away (Sean Ellis test).

### First 100 users (months 3–12)
- ~8–12 organisations (4 paid pilots → ~6–10 customers with ~10 seats each), plus ~20–60 self-serve Pro seats from month 10.
- **Motion**: founder-led + FDE; first AE at month 10; publish 3 anonymised case studies with measured hours saved.
- **Product**: reviewer surface outside the IDE, restore points, audit log, SOC 2 Type I (month 12).

### First $100k ARR (base: ~month 4–5 run-rate including paid pilots; ~month 10 from subscriptions only)
- 4 paid pilots at $2.5k/month = $120k run-rate (R01–R02). Pilots are not ARR until converted, so report both.
- 6–7 subscription customers at a $15k ACV ≈ $100k subscription ARR.

### First $1M ARR (base: month 27, ~46 paying organisations; conservative month 45; aggressive month 18)
- 2–3 AEs (US + UK), 1 delivery-firm partnership live across a practice, net revenue retention ≥100%.
- **Proof points**: logo retention ≥85%; hours saved per pack measured by the product; tie-out error catch rate.

### First $10M ARR (base: not reached within 5 years, $9.6M exit Y5; aggressive: month 41)
- Requires: an enterprise motion (4 enterprise AEs, $120k+ ACV); a second pack family (lender/covenant, audit/assurance, legal document estates); NRR ≥115%; and a partner channel (fund administrators, delivery firms, Microsoft co-sell).
- **What distinguishes base from aggressive** is NRR (104% vs 120%) and AE productivity (1.5 vs 2.0 deals/month), not headcount. Expansion revenue is the lever to engineer (more packs per customer).

## 5. Adoption funnel (product-led signals inside sales-led deals)

| Step | Definition | Plausible conversion [A] | Why it may break | Design response |
|---|---|---:|---|---|
| Visitor → signup / discovery call | Web or intro | 2–5% (web) / 30–50% (warm intro) | Generic AI fatigue | Lead with the pack, not "AI" |
| Signup → pack imported | ≥3 linked files uploaded or opened locally | 40–60% | Security fear, effort | Local-first mode; demo pack; sandbox |
| Pack imported → link graph confirmed | ≥80% of numbers in deck/memo linked to sources | 30–50% | **Hardest step: messy real packs, pasted pictures, stale links** | FDE-assisted setup; confidence-ranked link suggestions; "fix later" queue |
| Graph confirmed → first roll-forward accepted | ≥1 run with ≥70% of proposed changes accepted | 50–70% | Wrong numbers destroy trust | Deterministic numbers; LLM only for narrative; tie-out report first |
| First run → second period | Returns next cycle | 60–80% | Cadence is monthly/quarterly → long feedback loop | Scheduled runs; mid-period "late change" use |
| Second period → paid | Pilot converts | 50–70% | Budget owner not involved early | Buyer in the kickoff; ROI report generated by the product |
| Paid → team expansion | Reviewer seats, more packs | 1.5–2.5%/month MRR expansion | Pack owner leaves | Pack playbooks survive staff turnover |

**The hardest transition is "pack imported → link graph confirmed".** It determines the product roadmap: link inference quality, picture-pasted charts, stale OLE links and a fast confirmation UI come before any new format or feature.

## 6. Pricing in the GTM (from 10_PRICING_MODEL)
- **Pilot**: $2.5k/month for two cycles, credited to year 1 on conversion.
- **Team**: $250/pack/month (4 packs ≈ $12k/yr) + platform fee; reviewers free; editors included.
- **Business**: $30k+/yr (SSO, SOC 2 report, admin, unlimited packs up to fair use, FDE onboarding).
- **Enterprise/private**: $120k+/yr (private deployment, BYO model, ethical walls).
- **Pro self-serve**: $60/user/month with 10 pack runs.

## 7. What we will NOT do in GTM (next 12 months)
- No broad PLG launch or Product Hunt campaign as the main motion (platform agents are free; we would lose on distribution).
- No selling to sell-side bankers or law firms.
- No Indian domestic mid-market SaaS pricing (₹) as a primary revenue line.
- No partnerships requiring exclusivity.
