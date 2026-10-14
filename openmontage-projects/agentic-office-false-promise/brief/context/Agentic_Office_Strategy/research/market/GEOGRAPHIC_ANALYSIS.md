# Geographic Analysis: where to build, where to sell

*v1 · 2026-09-30. Scores (1–5, weighted) live in `models/09_MARKET_MODEL.xlsx › Geo`. Evidence labels: [F] fact, [D] derived, [A] assumption.*

## 1. Comparison

| Market | Wedge customer density | Willingness to pay | Knowledge-worker wages | AI adoption | Privacy / data friction | Microsoft Office standardisation | Ease of selling from India | Sales cycle | Founder network | Competition | Weighted |
|---|---|---|---|---|---|---|---|---|---|---|---:|
| **United States** | Highest: 362k financial analysts, 842k financial managers, ~46k US private funds [F: BLS, SEC] | Highest; buyers already pay $8–22k/yr for reporting tools [F: Tier 3 buyer data] | US financial analyst mean $116,800 [F: BLS] | High | Moderate (state privacy laws; SOC 2 expected) | Very high | Hard: time zone, trust, US entity often expected | Mid-market 45–90 days [A]; enterprise 6–12 months | Weak (to map) | Most intense | **3.68** |
| **Singapore** | Small but dense finance hub | High | High | High | Low–moderate (PDPA) | Very high | Easier: time zone, India ties | Fast | Moderate | Moderate | **3.55** |
| **UAE** | Growing funds and family offices | High | High | High | Moderate (data localisation in some sectors) | Very high | Easy: diaspora, time zone | Fast | Moderate | Lower | **3.46** |
| **United Kingdom** | Dense: ~219k finance & investment analysts/advisers, ~246k chartered accountants (2024) [F: Tier 2/3] | High | High | High | UK GDPR; DPA required | Very high | Moderate: 4.5–5.5h time-zone gap | Moderate | Weak | High | **3.38** |
| **India** | Very dense *production* base: 2,117 GCCs, 2.36M GCC staff [F: Zinnov]; Big-4 >450k; ICAI 407k [F: Tier 3] | Low for domestic buyers (analyst value at salary ≈ $16/month WTP) [D: D_Value] | Low (₹8–30 LPA analysts) [F: Tier 3] | High | DPDP Act 2023; client clauses for offshore work | High | Home market | Slow procurement in large firms | **Strongest** (IIT Delhi) | Growing, price-driven | **3.22** |
| **Continental Europe** | Large but fragmented | Moderate–high | High | Moderate | Highest (GDPR, sovereignty, works councils) | High | Hard: language, entity | Slow | Weak | Moderate | **2.64** |

## 2. Recommendation: build in India, sell to global buyers, use India as the engine room
1. **Revenue** from the US first (largest density and willingness to pay), with Singapore/UAE as fast early markets where India ties shorten trust-building, and the UK as the second English-speaking market with better time-zone overlap.
2. **India** provides engineering, forward-deployed setup, overnight production runs for US deadlines, design partners in Indian funds and delivery firms, and the channel into production teams serving global clients. Price against *billing* value or US value, never Indian salaries.
3. **Avoid continental Europe** until private deployment and data-residency options exist.

## 3. Privacy and procurement implications
- US/UK buyers: SOC 2 (Type I by ~month 12), DPA templates, a clear "no training on customer data" policy, local-first mode for pilots.
- India delivery firms: client contracts decide which AI can touch client data. BYO-model endpoints (the client's Azure OpenAI or Bedrock) and private deployment are the unlock.
- UAE/Singapore: sector-specific localisation (financial regulators) may require regional hosting for regulated entities.

## 4. Entity question (for counsel)
US institutional investors often require a Delaware parent (a "flip"). India-only investors may prefer an Indian entity (CCPS/iSAFE). The choice changes instruments, tax and ESOP design; the financial model budgets $20k for a flip in month 2. Decide before signing term sheets.
