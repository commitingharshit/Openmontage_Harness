# 10B — Business Models: options, revenue models and sequencing

*v1 · 2026-09-30 (iteration 2). Revenue figures are illustrative arithmetic [A] unless marked as a model output. Unit costs from `models/10_PRICING_MODEL.xlsx`; plan outputs from `models/15_FINANCIAL_MODEL.xlsx` (base).*

## 1. The options, each with a simple revenue model

| Model | Unit & price | Illustrative year-3 revenue | Gross margin | Fit now? | Why / why not |
|---|---|---:|---:|---|---|
| **Individual SaaS (Pro)** | $60/user/month, 10 pack runs | 600 seats × $720 = **$0.43M** | 40–75% (usage-dependent) | Secondary | Single-file editing is free inside Office (ChatGPT, Claude, Copilot). Only pack owners pay; PLG is a weak motion vs platform distribution |
| **Team SaaS, per pack** *(chosen wedge model)* | $250/pack/month + platform fee; reviewers free | 70 teams × 4 packs × $3,000 = **$0.84M** (+ platform fees) | ~74% base (60% deterministic) | **Yes** | The value metric matches the job; margin survives heavy use; the buyer understands "packs" as deliverables |
| **Enterprise SaaS** | $30k–120k+/year platform + packs | 8 × $120k = **$0.96M** | 65–85% | From year 2 | Needs SSO, SOC 2, admin and a longer cycle; the base model starts enterprise AEs after the seed |
| **Seat + usage (hybrid)** | $60–90 seat + $3 per pack run over quota | Protects margin on power users | 70%+ | **Yes, as the overage mechanism** | Keeps heavy/offshore users profitable (power profile ≈ $185/month COGS) |
| **Platform / API** | $0.01–0.05 per deterministic operation, or a kernel licence | Uncertain (developer adoption) | 85–95% | No (option later) | OfficeCLI (26.9k★, free) and Anthropic skills commoditise the layer; developer GTM is a different company |
| **Vertical SaaS (fund-ops packs)** | Pack templates + domain playbooks at a premium ($350–500/pack) | +30–50% ARPA on team SaaS | 75%+ | Yes, as packaging of the team model | Depth (LP, portfolio monitoring, lender packs) raises willingness to pay; do not build a full vertical suite |
| **Enterprise deployment / private cloud** | $50–100k deployment fee + $120k+/year; customer pays inference (BYO model) | 4 × $170k = **$0.68M** | 85–90% (no inference COGS) | Year 2–3 | Required by regulated funds and delivery firms with client data clauses |
| **On-prem / air-gapped** | $150k+/year + services | Few, large | 60–80% (services-heavy) | Year 3+ | Sovereign/government demand is real but slow; avoid early |
| **Delivery-firm console (white-label)** | $50–250k/year per firm + per-client-pack fees | 3 × $120k = **$0.36M** | 75–85% | Pilot in year 1, scale in year 2 | Channel into power users; risk of exclusivity demands (see TresVista × Model ML) |
| **Marketplace (packs, skills, playbooks)** | 20–30% take rate on third-party templates and playbooks | Immaterial before ~1,000 customers | 90%+ | Year 3+ | Needs scale; supports the vision |
| **Agent / plugin ecosystem** | Revenue share with advisors and fund admins who build on the engine | Immaterial early | — | Year 3+ | Ecosystem effects only after distribution |

## 2. What the base plan actually assumes (model output)

| Month | ARR | Mid-market (team/pack) | Enterprise | Self-serve Pro |
|---:|---:|---:|---:|---:|
| 12 | $0.17M | 87% | 0% | 13% |
| 24 | $0.78M | 81% | 0% | 19% |
| 36 | $2.21M | 64% | 16% | 19% |
| 48 | $4.82M | 58% | 26% | 17% |
| 60 | $9.58M | 53% | 35% | 12% |

At month 60 (base): ~253 mid-market logos, ~22 enterprise logos, ~1,600 Pro seats. The self-serve line is deliberately small. If platform bundling kills it, the base case loses ≤19% of ARR at any point.

## 3. Sequencing (wedge → expansion → platform)

```
Months 0–12   Paid pilots → Team SaaS per pack (+ usage overage)         ← prove the job and the value metric
Months 12–24  Vertical packaging (fund/lender pack templates) + delivery-firm console pilot
Months 18–36  Enterprise SaaS + private deployment (BYO model)           ← after SOC 2 Type II and the seed
Months 36+    Marketplace for packs/playbooks; API for partners          ← only with distribution
```

**Rules:**
1. Never let a model that needs scale (marketplace, API) consume engineering before the per-pack model shows ≥100% NRR.
2. Keep files native and pricing on the value metric (packs). Do not re-introduce pure seat pricing for agent-heavy users.
3. Private deployment is priced so the customer pays for inference, which removes our largest COGS line.
