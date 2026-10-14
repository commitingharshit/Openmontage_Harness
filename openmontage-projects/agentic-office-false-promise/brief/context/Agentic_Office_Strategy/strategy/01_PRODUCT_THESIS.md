# 01 — Product Thesis

*Status: v1, 2026-09-30. Evidence labels: **[F]** verified fact · **[D]** derived · **[A]** assumption · **[H]** hypothesis to test. Repo evidence refers to `~/AgenticTool/Agentic_Office_ultra` (commit `e8af8242`, 2026-09-27).*

---

## 1. What we are building

### 10-second version
Agentic Office keeps recurring multi-file deliverables — the Excel model, the deck, the memo and their source PDFs — correct and current, and it shows a reviewer exactly what changed, why, and from which source before anything is accepted.

### 30-second version
Every month or quarter, finance and investment teams rebuild the same pack: new numbers go into a model, and then people copy them by hand into a deck, a memo and a lender or LP report, check that every figure ties, and chase the inconsistencies. AI add-ins can now edit one open file at a time. What nobody owns is the *pack*: the persistent map of which slide number and which memo sentence depend on which cell and which source page. Agentic Office builds that map, then rolls the whole pack forward. Numbers move deterministically, narrative is drafted by the model, and the reviewer approves change by change with a full restore point. The files stay native `.xlsx`, `.pptx`, `.docx` and PDF.

### 2-minute version
Code became agentic before documents did, for a structural reason. Code is text in a repository, with diffs, commits, tests and rollback. Professional deliverables are binary packages (OOXML ZIPs) spread across applications, with no shared dependency graph and no version control above the file. In 2026 every platform owner shipped an agent *inside* each application: Microsoft Agent Mode (GA 22 Apr 2026), Claude for Word/Excel/PowerPoint (GA 7 May 2026), ChatGPT in Word/Excel/PowerPoint (17 Sep 2026) and Gemini cross-app agents (9 Sep 2026) **[F]**. They are good at the interactive job, "help me edit what I have open".

They are weaker at the recurring, multi-file, auditable job. A pack is 4–8 files that must agree with each other and with their sources, every period, under review. That job needs:
1. A **persistent object-level link graph** (cell `Model!F21` → Slide 8 text box → Memo §3.2 sentence → source `QoE.pdf p.47`) that survives across periods and edits.
2. **Deterministic execution** for the parts that must be exactly right (numbers, tables, formatting), with the model used only where judgement is needed (narrative, new structure).
3. **Verification.** Every number ties to a source, formulas are consistent, rendered slides do not overflow.
4. **Semantic review and restore** across the whole pack: accept or reject per object, and roll the pack back to any prior period.
5. **Custody and model choice.** Run inside the customer's environment where needed, with the customer's own model contracts (BYO model).

The repo already contains most of the hard substrate for this: Rust OOXML kernels (DocPatch, XLSX, PPTX, PDF), a workspace metadata layer with dependency edges and stale-impact computation, a review object model, an orchestration runtime with verification/repair loops, and 17 office skills. What does not yet exist is the object-level link graph, period roll-forward, tie-out reporting and a reviewer-grade UX for packs (see §8).

**Vision** (unchanged from the founders' framing): the operating environment for agentic knowledge work, where the unit of work is a matter, deal or engagement rather than a file.
**Wedge** (new, see `governance/DECISIONS.md` D001–D003): recurring multi-file packs that live as Office files.

---

## 2. User problem

| Problem | Evidence | Label |
|---|---|---|
| Recurring packs are rebuilt by hand every period | Quarterly LP reports reported at 60–180 hours per quarter for mid-market PE firms (vendor case studies) | [F, Tier 3] |
| Numbers must tie across files; errors are costly | Workiva, whose core value is linked numbers across reports, has $885M FY25 revenue, 6,624 customers and 97.2% gross retention | [F, Tier 1] |
| Linking evidence to Office artifacts is a paid behaviour | DataSnipper (Excel add-in linking source documents to cells): >600k audit and finance users, $1B valuation | [F, Tier 2] |
| LLM-only agents are not yet reliable on multi-step spreadsheet work | Microsoft's own claim: Excel Agent Mode scored 57.2% on SpreadsheetBench against 71.3% for humans | [F, Tier 2] |
| The context/copy-paste tax is the pain founders originally observed | Prior deck and handoff ("human as the operating system") | [H] |

## 3. Existing workflow (reconstructed from the founders' Project Atlas example; to be verified in interviews, H2)

```
New period data / new source PDF
  → analyst updates Model.xlsx (manual inputs, paste values, check formulas)
  → copies 20–60 numbers into Deck.pptx (charts re-linked or pasted as pictures)
  → updates Memo.docx narrative and tables
  → reviewer (VP / CFO / partner) marks up PDF or tracked changes
  → analyst reconciles comments, re-checks tie-out by eye, versions by filename (_v7_FINAL2)
  → sends pack; next period repeats
```
Tools today: Excel, PowerPoint, Word, Adobe Acrobat, email or Teams, sometimes think-cell or Macabacus, and increasingly Copilot, Claude or ChatGPT for single-file drafting **[A]**.

## 4. Why existing tools are insufficient

| Tool class | What it does well | Gap for the pack job |
|---|---|---|
| Copilot Agent Mode, Claude for Office, ChatGPT for Office, Gemini | Interactive multi-step edits inside an open app; Claude carries context across open files ("every open file catches up") | Session- and open-file-scoped. No persisted object-level dependency graph across periods, no pack-level restore point, no deterministic tie-out report. Cloud-hosted inference under the vendor's terms **[D from product pages]** |
| FP&A platforms (Datarails, Cube, Pigment, Abacum) | Generate board reporting from their own data model; now with AI agents (Datarails, Jan 2026) | You must model your data in their platform; bespoke Excel models, IC memos and LP letters stay outside **[D]** |
| Connected-reporting platforms (Workiva) | Linked numbers, governance, Tie-Out Agent (Jul 2026) | Enterprise-priced (~$134k/customer average **[D]**), you author in Workiva, and SEC/ESG-centric |
| Slide automation (Rollstack) | BI/Excel → slides on a schedule | Templated data refresh; not memo narrative, not arbitrary existing decks, no semantic review |
| Vertical finance AI (Rogo, Hebbia, Model ML, Endex) | Research, diligence and deck generation for front-office bankers | Generation-first; do not maintain the client's existing pack across periods **[A]** |
| Open-source agent tooling (OfficeCLI, AionUi) | Free Office manipulation for agents | Toolkits, not a governed product **[F]** |

## 5. Proposed workflow

```
OPEN pack workspace (existing files; nothing migrated)
  → Agentic Office proposes the link graph (cell ↔ slide object ↔ memo span ↔ source page); human confirms
ASK "Roll forward to Q3 using Q3_Mgmt_Accounts.xlsx and QoE_v2.pdf"
WATCH the numbers propagate deterministically; narrative drafted where values moved; verification runs (tie-out, formula consistency, render QA)
REVIEW per object: before → after, why, source, impact; accept/reject; Word outputs carry native tracked changes
RESTORE any object, file or the whole pack to a prior restore point
LEARN accepted edits and reviewer corrections become the pack's playbook for next period
```
The five verbs from the founders' design constitution (OPEN → ASK → WATCH → REVIEW → RESTORE) are preserved; the wedge adds **LEARN** per pack.

## 6. Technical architecture (as built + intended)

```
┌───────────────────────── Surfaces ─────────────────────────┐
│ Code-OSS workbench ("Pack Studio", for producers)          │  BUILT (fork, rebranded, DOCX custom editor)
│ Review surface (web / Office add-in, for approvers)        │  ROADMAP
└──────────────┬─────────────────────────────────────────────┘
               │
┌──────────────▼─────── Workspace layer ─────────────────────┐
│ .agentic-office/: registry, identities, events, contracts, │  BUILT (v1, file-level edges)
│ dependency graph, locks, reviews; stale-impact preview      │
│ Object-level link graph (cell↔slide↔span↔page)             │  NOT BUILT — wedge-critical
│ Period roll-forward + restore points across files          │  PARTIAL (XLSX proposal accept/reject/restore)
└──────────────┬─────────────────────────────────────────────┘
┌──────────────▼─────── Orchestration ───────────────────────┐
│ Hermes (Nous Research MIT agent, vendored) + recursive_DAG  │  BUILT (~67k LOC Python; 19 patterns)
│ runtime: admission, fan-out, critic-repair, hedging,        │
│ verification gates, event replay                            │
│ Skills layer (17 office skills incl. board-deck,            │  BUILT
│ investor-update, banking-pitchbook, verify-loop)            │
└──────────────┬─────────────────────────────────────────────┘
┌──────────────▼─────── Deterministic kernels (Rust) ────────┐
│ DocPatch (DOCX index/locate/diff/patch, 15.6k LOC)          │  BUILT
│ XLSX kernel (formula graph, regions, 13.2k LOC)             │  BUILT
│ PPTX kernel (4.9k LOC) · PDF kernel (5.5k) · KG (3.5k)      │  BUILT (maturity varies)
│ Artifact kernel (policy, memory, context packs, 7.4k)       │  BUILT
│ OfficeCLI (.NET, Apache-2.0, vendored) for render/QA        │  VENDORED (commoditised)
└────────────────────────────────────────────────────────────┘
Editors: DOCX (fork of eigenpal/docx-editor, MIT), Sheets (CasualOffice/Univer, Apache-2.0), PDF (pdf.js-based)
Models: model-agnostic gateway; current workers DeepSeek-V4-pro / Kimi-K2.5 via OpenCode Go; Codex fallback
```
LOC counts are from `find … | wc -l` on 2026-09-30 **[F]**.

## 7. Unique capabilities, and which could become a moat

| Capability | Status | Copyable by platforms in 12 months? | Comment |
|---|---|---|---|
| Object-level cross-file link graph that persists across periods | Not built | Technically yes; organisationally less likely (each app team owns one format) | Core of the wedge, see 13_MOAT |
| Deterministic OOXML patching and tie-out (Rust kernels) | Built (DOCX/XLSX strongest) | Yes for Microsoft (owns the formats); harder for Anthropic, OpenAI and Google | Also a **margin** asset: zero-LLM updates cut inference cost (10_PRICING_MODEL PackPricing) |
| Pack-level semantic review + restore | Partial | Yes | Table stakes within 12–24 months |
| Private deployment + BYO model | Architecture supports it | Microsoft offers in-tenant; Anthropic via Bedrock/Vertex/Foundry | Differentiator only for customers barred from vendor clouds |
| Per-pack playbooks learned from reviewer corrections | Not built | Yes in principle, but needs the pack's history | The most plausible compounding asset |

## 8. Built / prototype / roadmap / idea (do not overclaim)

**BUILT (exists in repo, verified by commits and docs):**
- Code-OSS fork rebranded "Agentic Office" that builds and launches; DOCX custom editor with open/edit/save/revert (HANDOVER.md, okf/status.md).
- Rust kernels for DOCX (43 subcommands: inspect, locate, search, diff-map, similar, preview-patch, apply), XLSX (formula graph, retrieval), PPTX, PDF, knowledge graph, artifact kernel.
- MCP servers exposing kernels (docpatch, xlsx-context, pdf-context, artifact-context); 80 MCP tools listed.
- Hermes gateway + recursive_DAG orchestration runtime (19 patterns; hedging, critic-repair, verification gates).
- Artifact Workspace v1: registry, identities, events, contracts, dependency edges (file-level), stale-impact preview, review packages ("Artifact Pull Requests").
- XLSX agentic edits through a proposal contract with apply, staleness-reject, accept and reject-restore (casualsheets POC).
- 17 office skills (board-deck, investor-update, banking-pitchbook, consulting-deck, verify-loop, …).
- Test suite: 928 offline tests passed on 2026-07-25 (HANDOVER.md). **Clean-clone end-to-end build never verified.**

**DEMONSTRATED (internal benchmark, not customers):**
- DOCX inspection/retrieval benchmark (10 read-only cases on 8 purpose-built fixtures, 2026-07-13): baseline 6/10 task success, **100% file preservation** (no unintended mutation). After one fix round, estimated 9/10 (4 of the 10 cases not re-run). Latency 25–312s per case; a realistic near-term target is a 20–60s band (tests/reports/phase1-*.md). Implication: pack roll-forwards are **asynchronous jobs** (watch or scheduled), not instant interactions, and deterministic fast paths matter for latency as well as cost.

**PROTOTYPE / PARTIAL:**
- Cursor-style DOCX accept/reject diff UI (native seams identified, flow not built; okf/status.md).
- Cross-file propagation: file-level impact only; no object-level links.
- PPTX design/QA pipeline (design gates present; fidelity varies).
- Legal "matter" workflow demo (per prior deck; not re-verified in this session).

**ROADMAP (needed for the wedge):**
- Object-level link graph + confirmation UX; period roll-forward; tie-out report; pack restore points; reviewer surface outside the IDE; audit export; SSO/SOC 2; private deployment packaging.

**IDEA ONLY:**
- Firm execution graph / cross-pack learning; Agent Studio marketplace; cross-application control plane over M365/Google; layout-diffusion slide generation.

**Claims that must NOT appear externally without re-verification:** "719 → 865 passing tests", "6.5× speed-up at 8-way fan-out" (handoff flags them [VERIFY]); any benchmark accuracy; any customer, user or hours-saved figure (none exist yet).

## 9. What changes in the product because of this thesis

1. Stop investing in editor fidelity (a DOCX renderer is not the moat). Rely on Office itself for final rendering and use kernels for mutation and verification.
2. Build the object-level link graph, roll-forward and tie-out first. They are the product.
3. Put the reviewer outside the IDE: a lightweight web or add-in review surface; tracked changes in Word output.
4. Keep the IDE workbench for *producers* (people who spend all day on packs), where its density is acceptable.
5. Make deterministic execution the default path and measure the "zero-LLM share" of every roll-forward (a product and margin KPI).
