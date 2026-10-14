# FINAL FOUNDER BRIEF — Agentic Office

*Plain-English answers, 2026-09-30. Everything here traces to the models and documents in this folder. Labels: [F] fact, [D] derived, [A] assumption, [H] hypothesis.*

**1. What company are we actually building?**
The execution-and-review layer for recurring multi-file professional work. When a period closes or a number changes, it keeps an Excel model, its decks, memos and source PDFs consistent, and shows a reviewer every change with its source, reason and impact, with one-click restore. Long-term: the operating layer for agentic knowledge work, where a matter, deal or engagement is the unit of work.

**2. What is the initial wedge?**
Recurring **bespoke Office packs** that must tie out every period: quarterly LP reports, monthly portfolio-monitoring decks, IC updates, lender and covenant packs. These are packs that live as Office files, not inside an FP&A or reporting platform. It is *not* "Cursor for documents" in general. Microsoft, Anthropic, OpenAI and Google all shipped in-app document agents between April and September 2026 [F].

**3. Who exactly should use it?**
To be decided by a three-way interview test by day 45 (DECISIONS D011): (a) fund finance & portfolio ops, working on bespoke decks, IC updates and LP letters downstream of fund-admin platforms such as Juniper Square and Carta; (b) lender/credit reporting teams; (c) mid-market corporate FP&A with bespoke board packs. Current lead hypothesis (a): portfolio-operations and fund-finance associates at mid-market PE, private-credit and VC firms (US/UK/Singapore/UAE, plus Indian funds), and the India-based production teams (mid-tier research/analytics firms, fund-administration centres, captive GCC reporting teams) that build these packs for global clients [H].

**4. Who exactly pays us?**
The fund CFO/COO or head of portfolio operations; for production firms, the delivery head/COO. Starting contracts are $15–30k a year; private deployments are about $120k [H].

**5. What painful workflow are we solving first?**
Rolling a pack forward to the next period, and propagating late changes, so that every number in the deck, memo and letter still ties to the model and its sources, reviewed in minutes instead of re-checked by hand. Vendor case studies report 60–180 hours per quarter on LP reporting [F, Tier 3].

**6. What do those users use today?**
Excel, PowerPoint and Word plus fragile links (think-cell, Macabacus, paste-link), portfolio-monitoring platforms for data collection, Copilot/Claude/ChatGPT for drafting, juniors or offshore teams for re-keying and QC, and versioning by filename [A/H].

**7. Why are existing tools insufficient?**
Platform agents are scoped to open files and one session. They re-infer context each run, let the language model edit numbers (Excel Agent Mode scores 57% on SpreadsheetBench vs 71% for humans [F]), and offer file-level review, not a pack-level tie-out and restore. Workiva requires authoring inside Workiva at enterprise prices (~$134k average per customer [D]). Datarails and Cube generate packs from their own data models. None maintains the customer's *existing* bespoke pack across periods.

**8. What should the MVP include?**
Object-level link graph (cell ↔ slide object ↔ memo sentence ↔ source page) with a confirmation UI; deterministic roll-forward; tie-out report; one semantic diff across files; Word tracked-changes output; pack restore points; local-first mode with bring-your-own model; event instrumentation. See 12_PRODUCT_ROADMAP (NOW and 0–3 months).

**9. What should we explicitly NOT build yet?**
Editor or renderer fidelity work, ribbons, legal features, email or calendar agents, web research agents, slide generation from scratch, user-visible multi-agent orchestration, a marketplace, on-prem packaging beyond local-first, and a broad self-serve launch.

**10. What should we charge?**
Price the pack, not the seat: pilot $2.5k/month for two cycles; Team $250/pack/month (reviewers free); Business $30k+/year; Enterprise/private $120k+/year; overage about $3 per pack run. The reason: in our model a typical agent-heavy user costs ~$28/month in inference and a heavy user ~$69, so $60 seats lose money on heavy users. A $250 pack yields ~74% gross margin, *if* ~60% of updates run deterministically [D from 10_PRICING_MODEL; token counts are A].

**11. How big is TAM?**
**$4.9B** (base, bottom-up: 3.16M US document-intensive professionals from BLS May-2025 occupations × intensity share, ×2 for other high-income markets, + India at 25% ARPU, × $60/seat/month). Bounds from two independent methods: $10.8B (organisations × ACV; M365 seats × 5% × $40). Microsoft 365 Commercial ($102.9B) is the adjacent budget, not TAM.

**12. How big is SAM?**
**$0.79B** (in-wedge finance and reporting roles × 60% with recurring packs × US + English-working markets + India). The organisation-level cross-check gives up to $2.9B.

**13. What is a defensible SOM?**
**$9.6M ARR in year 5 (base)**. It comes from the operating plan (sales capacity × conversion × retention), not a percentage of TAM: about 1.2% of SAM and ~275 paying organisations. Conservative $2.5M; aggressive $33.4M.

**14. What assumptions drive those numbers?**
Market: document-intensity shares (MM-A001), recurring-pack share (MM-A006), ARPU (MM-A005), geography multipliers (A002/A007). Plan: ACV ($15k, FM-R09), AE productivity (1.5 deals/month, FM-R10), churn (1.5%/month, FM-R12), expansion (1.8%/month, FM-R13), inference ratio (FM-C01). All are listed in `governance/ASSUMPTIONS.md` with ranges and validation methods.

**15. What is our business model?**
B2B SaaS with a pack-based value metric plus platform tiers; private deployment for enterprise; later a delivery-firm console (multi-client, white-label) and a pack/skill marketplace.

**16. What is our GTM?**
Founder-led into funds via warm alumni networks, 30 interviews → pack teardowns → paid two-cycle pilots with a forward-deployed engineer; first US/UK AE at month ~10; India as the engineering base, design-partner pool and delivery-firm channel. Revenue is sold to US/UK/SG/UAE buyers. Planned timeline: $1M ARR ~month 27 (base).

**17. Who are our most dangerous competitors?**
(1) Anthropic's Claude for Office and (2) Microsoft Copilot, if they add persistent cross-file links and pack-level restore. (3) Datarails/Cube, if they extend to arbitrary Office packs. (4) Juniper Square (JunieAI) and Carta, if their LP-document automation extends to bespoke decks and letters. (5) Workiva, if it moves down-market with AI. (6) Model ML/Rogo, if they add pack maintenance for funds.

**18. What is Microsoft risk?**
High for the horizontal story; medium for the wedge. Microsoft can copy anything technically, but its per-app architecture, backward-compatibility burden and seat licensing make a persistent cross-period pack graph unlikely soon. We complement Office (native files, tracked changes, BYO Azure OpenAI, Marketplace listing). If Microsoft ships the pack job before we have ~50 customers, the likely outcome is an acquisition, not a venture outcome (14_MICROSOFT_RISK).

**19. What might our moat become?**
Not the code. The moat would be customer-specific confirmed pack graphs and playbooks learned from reviewer corrections, compounding into a firm execution graph. It is provable only by metrics: correction rate falling cycle over cycle, auto-link rate, zero-LLM share, packs per customer. Today we have **no moat**, only a capability lead.

**20. What evidence do we currently have?**
Engineering: a large, working codebase (≈50k lines of Rust kernels, ≈67k lines of orchestration, a Code-OSS workbench, 17 skills, 928 offline tests in July 2026). Market: strong public evidence that the budget exists (Workiva, DataSnipper, Rollstack, Datarails) and that platforms have commoditised generic editing. **Customer evidence: none.**

**21. What evidence are we missing?**
Whether our ICP's packs live in Office files (H1); whether reviewers accept agent numeric changes (H6); whether we beat Claude/Copilot on a real roll-forward (H10); willingness to pay and the pack price (H5, H7); real inference cost per pack (G005); founder-market fit (G016).

**22. What should we prove in the next 90 days?**
30 interviews, 5 pack teardowns, 2 side-by-side runs against Claude and Copilot, ≥70% auto-link on real packs, ≥70% accepted changes in live roll-forwards, and ≥3 paid pilots signed. Day-90 gate: go, adjust or pivot (21_VALIDATION_PLAN).

**23. Should we raise capital now or first hit milestones?**
Validate first for ~6 weeks (interviews, teardowns, LOIs, the NOW demo) while applying to YC / Accel Atoms / Surge in parallel. Then raise formally with LOIs in hand. Raising now would mean pitching the horizontal story, which the market has just contested.

**24. If raising, how much capital is justified by the plan?**
**$1.25M** (range $1.0–1.5M). The base 18-month net burn is ≈$0.64M (gross spend ≈$0.90M, ≈$0.26M funded by revenue). The conservative revenue case survives 29 months with no further money; $0.75M would run out at month 19 in that case.

**25. What dilution scenarios should the founders understand?**
$1.25M at a $10M post-money cap = 12.5%. Plus a 10% pool, founders go from 90% (placeholder split) to ~70%. After a $6M seed at $24M pre, ~52%; after an A, ~40%; after a B, ~33%. A $7M cap on the same amount = 17.9% dilution, costing ~2.5–3 points after the B. Pool top-ups at priced rounds cost founders ~5 points each: size them to real hiring plans (17_CAP_TABLE_MODEL).

**26. What should the money accomplish before the next round?**
By ~month 18: ≥15 paying organisations (plan 22–25), ≥$0.35M ARR (plan ~$0.44–0.49M), ≥80% logo retention across two cycles, ≥30% measured time saved per pack cycle, ≥60% deterministic numeric updates, SOC 2 Type I, and one delivery-firm pilot live.

**27. What does a credible 3-year product progression look like?**
Year 1: link graph, roll-forward, tie-out, review, restore; reviewer surface; SOC 2 Type I. Year 2: period model, playbooks, scheduled runs, team roles, delivery console, pack billing, adjacent packs (lender, valuation). Year 3: private cloud/on-prem, connectors, cross-pack consistency, document-estate jobs, first firm-memory features.

**28. What would make this startup fail?**
Losing focus (building the IDE, not the job); platforms shipping the pack job first; link setup too costly on messy real packs; the wrong ICP (packs live inside platforms); one wrong number reaching an LP; inability to sell from India; inference economics; quarterly-cadence churn; missing seed gates; unresolved IP and vesting (PREMORTEM).

**29. What evidence would cause us to pivot?**
<40% of qualified interviewees have Office-file packs (H1 fails); <40% of agent numeric changes accepted (H6 fails); parity with Claude/Copilot on a real roll-forward (H10 fails); zero paid pilots after 10 offers (H7 fails). Pivot options in order (per rescored matrix): delivery-firm console for offshore production teams (W4), document-estate operations (W5), or infrastructure (W7).

**30. What is the strongest investor narrative supported by the evidence?**
*"Agents can now edit any Office file, and that became free this year. What nobody does is keep a recurring multi-file pack right across periods, with proof. Workiva proved that job is worth $885M a year when you author inside its platform. We do it on the Office files teams already use, with deterministic kernels that make numbers exact and cheap, a semantic review and restore layer, and private, multi-model deployment. We start with fund-finance packs, where the pain is quarterly and the buyer is reachable, and expand to every recurring professional deliverable, toward the layer that governs AI-made changes to professional work. We are prototype-stage with a strong engineering base and no customers yet. We are raising $1.25M to prove the job with 20+ paying teams in 18 months."*
