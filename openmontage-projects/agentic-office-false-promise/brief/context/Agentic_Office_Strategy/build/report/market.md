# Market sizing

Three independent methods are built in `models/09_MARKET_MODEL.xlsx`, with every assumption editable and a scenario selector. We quote the narrowest, most traceable method (bottom-up seats) and show the others as bounds. We never add the methods together.

| Method | Logic | TAM (base) | SAM (base) |
|---|---|---:|---:|
| A — Top-down | 450M M365 commercial seats × 5% document-intensive professionals × $40/month AI premium | $10.8B | — |
| **B — Bottom-up seats (quoted)** | BLS occupations × document-intensity share × $60/seat/month; ×2 other high-income markets; India at 25% ARPU | **$4.9B** | **$0.79B** |
| C — Enterprise spend | 200k US mid-market × 50% × $15k; 20k enterprises × $120k; 60k professional-services firms × $20k; 12k investment managers × $25k; ×2 rest of world | $10.8B | $2.9B |
| SOM | Year-5 exit ARR from the operating plan (sales capacity × conversion × retention) | — | **$9.6M** |

## Bottom-up inputs (BLS OEWS May 2025, national)

| Occupation (SOC) | US employment | Mean wage | Doc-intensity (assumed) | In wedge |
|---|---:|---:|---:|---|
| Financial & investment analysts (13-2051) | 361,980 | $116,800 | 70% | Yes |
| Financial managers (11-3031) | 841,710 | $186,910 | 40% | Yes |
| Accountants & auditors (13-2011) | 1,449,500 | $94,750 | 50% | 50% (in-industry) |
| Credit analysts (13-2041) | 64,390 | $100,850 | 70% | Yes |
| Financial risk specialists (13-2054) | 63,850 | $124,420 | 40% | 50% |
| Management analysts (13-1111) | 898,280 | $113,790 | 60% | 24.9% (in consulting firms) |
| Lawyers (23-1011) | 754,500 | $185,840 | 60% | No (expansion) |
| Paralegals (23-2011) | 392,880 | $69,700 | 50% | No |
| Market research analysts (13-1161) | 899,580 | $89,490 | 30% | No |
| Compliance officers (13-1041) | 417,070 | $88,400 | 40% | No |
| Securities & financial services sales agents (41-3031) | 489,570 | $109,150 | 30% | No |

Result: 3.16M US document-intensive professionals; 1.14M in the wedge; 0.69M with recurring packs (at 60%).

## Scenario outputs

| Scenario | TAM (B) | SAM (B) | SOM (Y5 ARR) | SOM % of SAM |
|---|---:|---:|---:|---:|
| Conservative | $2.85B | $0.34B | $2.5M | 0.7% |
| Base | $4.9B | $0.79B | $9.6M | 1.2% |
| Aggressive | $8.46B | $1.58B | $33.4M | 2.1% |

*Values computed by the workbook with the scenario selector set to 1 and 3. The organisation-level cross-check ranges from $4.4B to $22.0B TAM across scenarios, which is why it is shown as a bound and not quoted.*

## What we deliberately do not claim
- Microsoft 365 Commercial revenue ($102.9B FY26, derived from the 10-K) is the adjacent budget, not our TAM.
- Gartner's "$2.67T AI spending", the "$50B legal tech by 2027" forecast, and aggregator KPO ranges ($104–143B) are not used.
