# BEAR CASE — written as a skeptical seed investor trying to reject the company

*v1 · 2026-09-30. Deliberately one-sided. The founder-mode responses at the end state which criticisms are valid and what changed.*

## The memo I would write to my partners: "Pass"

**1. Market: "the TAM is borrowed."** The deck's big numbers belong to someone else. The $102.9B is Microsoft's, the $885M is Workiva's, and Copilot's $10.8B is a list-price fantasy. Their own bottom-up TAM ($4.9B) rests on a "document-intensity share" they admit is a guess (MM-A001), and their SAM ($0.79B) rests on another guess (A006: 60% of in-wedge professionals produce recurring multi-file packs). Halve both guesses and SAM is ~$200M. That is a feature market, not a venture market.

**2. Timing: "they are 6 months late."** Between April and September 2026, Microsoft, Anthropic, OpenAI and Google all shipped agents that edit Office files. Anthropic's product page literally says "Change one thing, and every open file catches up", which is their demo. The window for "Cursor for documents" closed this year.

**3. Microsoft risk: "the feature is a checkbox away."** A persistent link between an Excel cell and a PowerPoint text box is OLE with an LLM on top. Microsoft owns the format, the renderer, the tenant and 450M seats. The day this matters, Microsoft ships it in Excel and PowerPoint, bundled at $0 marginal cost.

**4. Competition: "every wedge is taken."** Front office: Rogo ($2B), Hebbia, Model ML ($75M A), Endex. Reporting: Workiva ($885M revenue), Datarails ($550M; AI board-pack agents since Jan 2026), Cube, Rollstack. Legal: Harvey ($16B), Legora. Offshore production: Acuity, Evalueserve and TresVista already have agent platforms, and TresVista is locked exclusively to Model ML. Where exactly is the empty chair?

**5. Distribution: "India-based students selling to US fund CFOs."** Fund CFOs buy from people they trust, after SOC 2, references and a US entity. The team has no GTM hire, no customers, no references and no US presence. The plan's founding AE arrives in month 10. Until then the CEO is also the CTO's product manager.

**6. Founder-market fit: "not demonstrated."** The only named founder bio claims exposure to banking and consulting deliverables. There is no evidence anyone on the team has owned an LP pack, sat in fund operations or sold to a CFO. The engineering is impressive, but the team built an IDE fork, orchestration patterns, a DOCX renderer, slide design gates, a legal demo and a memory layer, which suggests a team that builds what is interesting rather than what one customer needs.

**7. Pricing: "the seat is free, and the pack is unproven."** ChatGPT's Word agent is free. Per-pack pricing is novel, and procurement teams do not have a budget line for "packs". The model assumes a $15k ACV and 1.5 deals per AE per month without a single price test.

**8. Retention: "quarterly cadence kills habit."** LP reporting is quarterly. A product used four times a year has four chances a year to be forgotten, and the churn assumption (17% a year) is optimistic for a tool touched that rarely.

**9. Technical moat: "it's glue on open source."** The editors are forks of MIT/Apache projects. The Office CLI is a vendored open-source tool with 26.9k stars. The orchestration runs on a vendored MIT agent from Nous Research, and the workers run on DeepSeek/Kimi through a flat subscription. What is proprietary is ~50k lines of Rust kernels plus orchestration glue, which is respectable engineering but reproducible by a well-funded team in a year.

**10. AI commoditisation: "determinism is temporary."** The claim that "LLM-only agents are unreliable, so deterministic kernels win" is a bet against model progress. Excel agents went from nothing to 57% on SpreadsheetBench in a year. At 85%+ with verification loops, the platform agents close the gap for free.

**11. Workflow switching: "nobody moves a live pack to a new tool mid-quarter."** The switching cost of adopting is the same one that is supposed to protect them later. Confirming the link graph on a messy real pack is the hardest step in their own funnel.

**12. Enterprise security: "a fund will not upload LP data to a pre-seed startup."** Local-first mode helps, but the first question will be SOC 2 Type II, a pen test and insurance. The plan has SOC 2 Type I at month 12.

**13. Unit economics: "the conservative case is a zombie."** In their own conservative scenario gross margin is ~61–64%, CAC payback 42–66 months and LTV/CAC below 1.3×. Only the base case works, and its key inputs are untested.

**14. The fundraising logic is circular.** They "derive" $1.25M from a plan whose revenue is assumed. The raise is really sized by what an India-based pre-seed can get.

**Verdict:** interesting team and genuine engineering, but no customer evidence, a category the platforms just entered, and a wedge that is a feature of Workiva, Datarails, Copilot or Claude. Check back after 10 paying customers.

---

## Founder-mode response: what is valid, and what changed

| # | Criticism | Valid? | Response / change made |
|---|---|---|---|
| 1 | Borrowed TAM | **Partly** | We quote Model B ($4.9B) and SAM ($0.79B) only, and show the guesses. SAM sensitivity: halving A001 and A006 gives ~$200M, a real risk. We add a SAM sensitivity table to the deck appendix and make A006 (H1) the first validation test. The expansion graph (packs → estates → firm memory) is where venture scale must come from, and we say so. |
| 2 | Late | **Valid for the horizontal story** | We dropped "Cursor for documents" as the category (D001/D003). The pack job (cross-period, deterministic, reviewed) is not what the platforms shipped. We will prove that with a side-by-side test (H10) before the raise. |
| 3 | Microsoft checkbox | **Partly** | OLE-style links exist and are fragile and manual. The risk is real (R02, score 15). The response is complement positioning, playbooks and private/multi-model deployment, and stating the acquisition outcome honestly (14_MICROSOFT_RISK). |
| 4 | Every wedge taken | **Partly** | True for generation. The job "maintain the existing bespoke pack across periods" sits between Workiva (you must author in Workiva) and Datarails (you must model your data in their platform). We narrowed the ICP to packs outside those platforms and made H1 a kill criterion. |
| 5 | Distribution from India | **Valid** | The plan now uses founder-led trips plus SG/UAE hubs, warm alumni intros, and a US/UK AE at month 10. It also ranks the US first in revenue and India first in cost and channel. An AE earlier if pilots show pull. |
| 6 | Founder-market fit | **Valid until proven** | Add a fund-ops or FP&A operator as an advisor or angel before the raise. 30 interviews give the team domain fluency. Record the founders' actual background in the deck (G016). |
| 7 | Pricing | **Valid** | Pack pricing is a hypothesis (H5) with an A/B test in pilot proposals; a hybrid fallback is defined (platform fee + packs). |
| 8 | Quarterly cadence | **Valid** | Lead with monthly packs (portfolio monitoring, management packs) and mid-cycle late changes. Track second-cycle retention as a seed gate. |
| 9 | Glue on open source | **Partly** | The OSS dependence is disclosed (01_PRODUCT_THESIS). The moat thesis is not the code; it is confirmed pack graphs, playbooks and the review loop (13_MOAT). |
| 10 | Determinism is temporary | **Partly** | Better models help us too: the orchestration is model-agnostic. Determinism matters for **cost** as much as accuracy (a 60% zero-LLM share cuts inference cost 30–50%) and for audit. We will not claim a permanent accuracy gap. |
| 11 | Switching mid-quarter | **Valid** | Onboard between cycles; FDE-assisted setup; the files stay native, so there is no migration. Link-graph auto-extraction is the top engineering priority (R04). |
| 12 | Security | **Valid** | Local-first mode for pilots, NDAs, SOC 2 readiness started in the first 90 days, and a security one-pager. The risk is accepted for the first 3–5 pilots. |
| 13 | Conservative case is a zombie | **Valid, and intended** | That is why the seed gates exist (≥15 paying orgs, ≥80% retention, measured time savings). If they fail, we do not raise a seed on this thesis. |
| 14 | Circular raise logic | **Partly** | The raise is sized to survive the *conservative* revenue case for 29 months, which does not depend on the optimistic inputs. Benchmarks corroborate the size. |

**Net result**: the bear case kills the horizontal story, which we have abandoned. It does not kill the wedge, but it makes clear that the company is fundable only with customer evidence. Hence D006: validate for ~6 weeks, then raise with LOIs.
