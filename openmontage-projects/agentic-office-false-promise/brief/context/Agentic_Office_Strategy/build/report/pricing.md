# Pricing and unit costs

`models/10_PRICING_MODEL.xlsx` combines benchmark prices, Anthropic list prices (Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 4.5 $1/$5 per million tokens; cache reads $0.20/$0.10), a routing mix (20% premium, 55% workhorse, 15% fast, 10% open-weight at base), a 60% cache-hit rate, and token profiles per run type (assumptions to be replaced by telemetry).

## Cost per agent run (base)

| Run type | Input tokens | Output tokens | Blended $/run |
|---|---:|---:|---:|
| Light edit | 30,000 | 3,000 | $0.06 |
| Multi-file task | 250,000 | 20,000 | $0.45 |
| Full pack update | 1,200,000 | 80,000 | $1.98 |
| Verification / visual QA | 150,000 | 8,000 | $0.23 |

## Direct COGS per user per month (base)

| Profile | Runs/month (light / multi / pack / verify) | Direct COGS |
|---|---|---:|
| Light | 30 / 5 / 0 / 2 | $7.6 |
| Typical | 60 / 25 / 4 / 10 | $28.0 |
| Heavy | 150 / 60 / 12 / 30 | $69.4 |
| Power / offshore producer | 300 / 150 / 40 / 80 | $185.1 |

At a $60 seat, gross margin is 76% (light), 42% (typical), −27% (heavy). The conservative cost scenario (35% premium routing, 40% cache hits, heavier token profiles) makes typical users unprofitable below ~$100.

## Pack pricing (value metric = the pack)

| | Conservative | Base | Aggressive |
|---|---:|---:|---:|
| Pack price $/month | $150 | $250 | $400 |
| Deterministic share of updates | 30% | 60% | 80% |
| Inference COGS per pack-month | $48.8 | $28.8 | $16.5 |
| Gross margin | 50% | 74% | 83% |
| Value created per pack-month | $292 | $767 | $1,800 |
| Price as % of value | 51% | 33% | 22% |

## Comparable prices

| Vendor | Price | Note |
|---|---:|---|
| M365 Copilot | $30/user/month | Agent Mode included |
| ChatGPT Business | $20–25/user/month | Word/Excel/PPT add-in incl. Free tier |
| Claude Team / Premium | $25 / $100 per seat | Office add-ins on all paid plans |
| Shortcut | $20/month Pro | Excel agent |
| Hebbia | ~$3–10k/seat/year | Sales-quoted (Tier 3) |
| Rollstack | ~$7.9k/org/year (median; range $6.75–20.2k) | Buyer data (Tier 3) |
| Cube | ~$22.1k/org/year (median of 58; range $15–80k) | Buyer data (Tier 3) |
| Datarails | from ~$20–24k/year (median contract ~$55k) | Buyer data (Tier 3) |
| Workiva | ~$134k/customer/year | Derived: $885M / 6,624 |

**Read-across for our ACV:** a $15k base mid-market ACV sits between the Rollstack and Cube medians, below Datarails. That fits a product that adds to existing Office work rather than replacing a platform.

## Proposed tiers (hypotheses)
Pilot $2.5k/month for two cycles (credited on conversion) · Team $250/pack/month (reviewers free) · Business $30k+/year (SSO, SOC 2 report, admin, onboarding) · Enterprise/private $120k+/year (private deployment, BYO model) · Pro $60/user/month (10 pack runs) · Overage ~$3 per pack run.
