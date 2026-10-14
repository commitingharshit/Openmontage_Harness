# DECISIONS — log

*v1 · 2026-09-30. Each decision records evidence, alternatives, reasoning and the evidence that would reverse it. Decisions are recommendations from the Founder's Office analysis. The founders must ratify them.*

---

## D001 — Initial wedge: recurring bespoke Office packs, not "Cursor for documents" (horizontal)
- **Decision**: Lead with *keeping recurring multi-file packs (Excel → PowerPoint/Word/PDF) correct across periods, with tie-out, semantic review and restore*.
- **Evidence**: all four platforms shipped Office agents Apr–Sep 2026 (Microsoft GA 04-22; Claude GA 05-07 with "every open file catches up"; ChatGPT for Word 09-17 incl. free tier; Gemini 09-09). Workiva ($885M revenue, 97% GRR) and DataSnipper ($1B) prove a budget for consistency and provenance. Wedge scoring: W6 3.86 vs next best 3.48 (09_MARKET_MODEL › Segments; iteration-2 rescoring lowered W6 whitespace after Juniper Square / Model ML evidence).
- **Alternatives considered**: horizontal PLG (W8, 2.30); IB/PE front office (W1, 3.14); consulting (W2, 3.12); India litigation (W3, 2.80); offshore production teams as primary (W4, 3.48); document-estate operations (W5, 3.40); developer infrastructure (W7, 2.98).
- **Reasoning**: the only job where our specific assets (deterministic OOXML kernels, workspace graph, review/restore, private deployment) create a *measurable* advantage over session-scoped platform agents, with an existing budget and a recurring cadence.
- **Reverse if**: H1 fails (<40% of ICP interviewees have such packs); H10 shows platform agents at parity on a real roll-forward; Microsoft or Anthropic ship persistent cross-file links + roll-forward before we have 10 customers.

## D002 — Primary ICP: mid-market fund finance & portfolio operations (US/UK/SG/UAE + India funds); channel ICP: India-based production teams
- **Evidence**: highest combined pain × recurrence × Office lock-in in 06_CUSTOMER_SEGMENTATION; LP reporting 60–180 hrs/quarter (Tier 3); FP&A platforms (Datarails, Cube) target corporate CFOs, not bespoke fund packs; founder network reaches Indian funds and delivery firms.
- **Alternatives**: corporate FP&A as primary (kept as secondary hypothesis); lender reporting (adjacent); top KPOs (locked: Acuity, Evalueserve, TresVista × Model ML).
- **Reverse if**: interviews show fund packs are mostly produced inside Chronograph/Cobalt/73 Strings or by fund administrators; corporate FP&A shows stronger pull.

## D003 — Vision retained; category claim changed
- **Decision**: Claim "agentic pack operations: the execution-and-review layer for recurring multi-file professional deliverables". Keep "Cursor for professional documents" as the interaction analogy only. Vision unchanged: the operating layer for agentic knowledge work.
- **Reverse if**: investors consistently misread the claim as "reporting software" and discount the vision; test in 10 investor conversations.

## D004 — Price the pack, not the seat
- **Evidence**: 10_PRICING_MODEL: typical agentic user ≈ $28/month inference, heavy ≈ $69, power ≈ $185 at base token assumptions. Seats < $60 lose money on heavy users. Pack at ~$250/month → ~74% GM and ~33% value capture, provided ~60% of updates are deterministic. ChatGPT gives single-document agents away free.
- **Alternatives**: per seat ($40–100); usage/credits only; outcome-based.
- **Reverse if**: buyers reject per-pack pricing in ≥50% of proposals (H5); telemetry shows real inference per pack ≫ $30/month.

## D005 — Recommended raise: $1.25M pre-seed at an $8–12M post-money cap (base $10M)
- **Evidence**: 18-month base net burn ≈ $0.64M; conservative case survives 29 months without a seed at $1.25M (19 months at $0.75M); benchmarks: Carta ~$10–15M median caps for $0.25–2.5M rounds; India $3–10M; YC 7% + MFN; Atoms up to $2M.
- **Alternatives**: $0.75M lean (too thin for a US seller or conservative revenue); $2–2.5M aggressive (dilution before the key uncertainty is resolved).
- **Reverse if**: 3+ paid pilot LOIs before the raise (raise more / higher cap); fewer than 1 LOI by week 10 (raise lean from angels/accelerator, or delay).

## D006 — Sequence: validate for ~6 weeks before formal fundraising; apply to accelerators in parallel
- **Reverse if**: an accelerator deadline or a strategic investor forces earlier timing.

## D007 — Product focus: freeze editor-fidelity work; build link graph, roll-forward, tie-out, review, restore
- **Evidence**: the funnel's hardest step is link-graph confirmation (11_GTM §5); editors are forks of MIT/Apache OSS (eigenpal docx-editor, CasualOffice/Univer) and not a moat.
- **Reverse if**: design partners refuse to use any surface that isn't a full editor (then invest in an Office add-in, not our own renderer).

## D008 — Build from India, sell to global buyers; India production teams as channel, not primary revenue
- **Evidence**: Geo scoring (US 3.68, SG 3.55, UAE 3.46, UK 3.38, India 3.22); persona WTP (India analyst ~$16/month at salary vs ~$100/month at US or billing-rate value).
- **Reverse if**: Indian funds/delivery firms show strong paid pull at ≥$10k ACV.

## D009 — Deprioritise legal (Legal IDE) to a demo of generality
- **Evidence**: Harvey (~$16B), Legora ($5.6B), Spellbook ($350M) dominate; Indian litigation WTP is low.
- **Reverse if**: a legal design partner pays ≥$20k ACV for a matter-pack use case.

## D010 — Positioning vs Microsoft: complement, interoperate, never "replace Office"
- See 14_MICROSOFT_RISK. **Reverse**: never; revisit the tactics quarterly.

## D011 — Run the ICP choice as an explicit three-way test (added in iteration 2)
- **Decision**: In the first 30 interviews, test three ICPs in parallel with equal effort: (a) fund finance & portfolio ops (bespoke decks, IC updates, LP letters *downstream* of fund-admin exports); (b) lender/credit reporting (covenant packs from borrower PDFs); (c) mid-market corporate FP&A with bespoke board packs (not on an FP&A platform). Pick the primary by day 45 on H1/H2/H4 evidence.
- **Evidence that forced this**: Juniper Square (>2,000 GPs, >40,000 funds, JunieAI automated document generation), Carta Fund Admin and Allvue already automate standardised LP reporting. Datarails/Cube cover corporate board packs from their data models. No ICP is uncontested; the tie-breaker must be customer evidence, not desk research.
- **Reverse if**: one ICP shows overwhelming pull in the first 10 interviews (≥3 paid-pilot LOIs).
