# 12 — Product Roadmap (customer value first)

*v1 · 2026-09-30. Complexity: S (<2 eng-weeks), M (2–6), L (6–12), XL (>12). "Reuse" = what already exists in the repo. Ordering follows the adoption funnel's hardest step (link graph confirmation) and the MVP job in 08_JOBS_TO_BE_DONE.*

## Guiding rules
1. Build what makes **one real pack roll forward correctly** before anything else.
2. Numbers move **deterministically**; the model writes narrative and proposes structure.
3. **Reviewers never need the IDE.**
4. Every feature names the metric it moves (22_METRIC_TREE).
5. Freeze editor-fidelity work (DOCX renderer, ribbons). Office renders the final files.

---

## NOW (weeks 0–4): credible demo on a real pack
| Feature | User problem | Persona | Dependency / reuse | Cx | Strategic value | Monetisation | Defensibility | Metric |
|---|---|---|---|---|---|---|---|---|
| **Demo pack "Atlas Q2→Q3"** (anonymised LP/board pack: model.xlsx + deck.pptx + memo.docx + 3 PDFs) | Investors and prospects need to see the job, not a chat | P1/P2 | Skills (board-deck, investor-update), kernels | S | High | Indirect | — | Demo → pilot conversion |
| **Object-level link extraction v0** (numbers in PPTX/DOCX ↔ XLSX cells; exact + fuzzy value match + label context) | Finding what depends on what | P1/P3 | DocPatch locate/search, XLSX formula graph, PPTX kernel | M | **Very high** | Core | High | % of numbers auto-linked |
| **Roll-forward v0** (apply new cell values → patch dependent PPTX/DOCX runs deterministically) | Re-keying numbers | P1/P3 | preview-patch/apply, artifact kernel | M | Very high | Core | High | Minutes per roll-forward |
| **Tie-out report v0** (every figure → source cell / page; mismatches list) | "Do all numbers tie?" | P2/P3 | kernels | S | Very high | Core | High (deterministic) | Mismatches caught |
| **Honest engineering baseline**: clean-clone build, CI green, test count published internally | Diligence | Investors | HANDOVER.md gap | S | Medium | — | — | Build success |

## 0–3 months: first design partners
| Feature | Problem | Persona | Reuse | Cx | Value | Monetisation | Defensibility | Metric |
|---|---|---|---|---|---|---|---|---|
| **Link-graph confirmation UI** (confidence-ranked suggestions, bulk accept, "unlinked numbers" queue) | The hardest funnel step | P1/P3 | Workspace Center (Impact tab) | M | Very high | Activation | Medium | Time to 80% linked |
| **Semantic diff across files** (object-level before/after, why, source, affects) | Review without re-checking | P2 | Artifact PR review objects, docx diff-map | M | High | Conversion | Medium | Review minutes per pack |
| **Native tracked changes in Word outputs + highlighted cells in Excel** | Reviewers stay in Office | P2 | DocPatch, xlsx proposal contract | M | High | Conversion | Low | % reviews done outside IDE |
| **Pack restore points** (whole pack / one file / one object) | Fear of AI damage | P1/P2 | events log, reject-restore | S | High | Trust | Medium | Restore usage |
| **Narrative delta drafting** (LLM rewrites only sentences whose numbers or direction changed; cites sources) | Commentary rewrite | P1/P5 | skills, verify-loop | M | High | Core | Medium | % narrative edits accepted |
| **PDF source ingestion with page anchors** (management accounts, valuation reports) | Source provenance | P1/P6 | pdf-kernel | M | Medium | Core | Low | Extraction accuracy |
| **Local-first / private mode + BYO model key** | Security gate | P8 | gateway, model-agnostic Hermes | M | High | Unblocks deals | Medium | Security-review pass rate |

## 3–6 months: repeated usage
| Feature | Problem | Persona | Reuse | Cx | Value | Monetisation | Defensibility | Metric |
|---|---|---|---|---|---|---|---|---|
| **Period model** (Q2 → Q3 → Q4 as first-class versions; carry links forward) | Next quarter must be faster | P1 | workspace metadata | M | Very high | Retention | High | Cycle-2 time vs cycle-1 |
| **Scheduled / overnight runs** with diff ready in the morning | Time zones, deadlines | P3/P4 | recursive_DAG runtime | S | High | Expansion (offshore) | Medium | Runs per pack per month |
| **Pack playbook** (reviewer corrections become rules: style, rounding, wording, sign conventions) | Repeated corrections | P1/P3 | skills layer, artifact memory | M | Very high | Retention | **High (compounding)** | Correction rate cycle over cycle |
| **Impact preview before execution** ("this change will touch 23 objects in 3 files") | Confidence before running | P1/P2 | stale-impact (file-level) → object level | S | High | Trust | Medium | Preview→run ratio |
| **Reviewer web surface** (approve/reject per item, comments, sign-off) | Partners won't open an IDE | P2 | — | M | High | Seat-free expansion | Low | Reviewer weekly actives |
| **Excel→PPT chart refresh** (native charts, think-cell-style) | Charts go stale | P1/P5 | pptx kernel | M | Medium | Core | Low | Stale charts |

## 6–12 months: paid teams
| Feature | Problem | Persona | Reuse | Cx | Value | Monetisation | Defensibility | Metric |
|---|---|---|---|---|---|---|---|---|
| **Team workspaces, roles, approval gates** | Multi-person packs | P2/P4 | contracts, locks | M | High | Team tier | Medium | Seats per pack |
| **Audit log export + evidence pack** (for LPs/auditors) | Governance | P2/P8 | events, provenance | S | High | Business tier | Medium | Audit exports |
| **SSO, SOC 2 Type I, data-residency options** | Procurement | P8 | — | M | High | Unblocks Business | — | Security reviews passed |
| **Pack templates library** (LP quarterly, portfolio monitoring, lender covenant, board pack) | Faster setup | P1/P6 | skills | M | Medium | Activation | Medium | Setup time |
| **Usage metering + pack-based billing** | Margins on heavy users | Internal | — | S | High | Margin | — | GM%, zero-LLM share |
| **Delivery-firm console** (many client packs, QC queues, SLAs, per-client model policy) | Channel ICP | P3/P4 | Agent Manager, workspace center | L | High | Channel ACV | Medium | Packs per delivery seat |

## 12–24 months: enterprise capability
| Feature | Problem | Persona | Cx | Value | Monetisation | Defensibility | Metric |
|---|---|---|---|---|---|---|---|
| **Private cloud / on-prem deployment** (VPC, air-gapped option, open-weight models) | Regulated buyers | P8 | L | High | Enterprise tier | Medium | Enterprise deals |
| **Connectors** (SharePoint/OneDrive, Box, data rooms, fund-admin exports) | Files live elsewhere | P1 | M | Medium | Expansion | Low | Connected packs |
| **Cross-pack consistency** (same number used in LP report, IC memo and board deck across packs) | Firm-level truth | P2 | L | High | Expansion | High | Cross-pack mismatches |
| **Document-estate jobs** (apply a change across 100+ documents with review) | Policy/template updates | Compliance/legal ops | M | Medium | New segment | Medium | Docs changed per job |
| **Office add-in for producers** (run packs from inside Excel/PowerPoint) | Stay in Office | P1/P5 | M | Medium | Distribution | Low | Add-in WAU |

## 24–36 months: platform and ecosystem
| Feature | Problem | Cx | Value | Defensibility |
|---|---|---|---|---|
| **Pack & skill marketplace** (fund-admin firms and advisors publish pack templates/playbooks) | Long-tail workflows | L | High | Network effects (moderate) |
| **Agent Studio for firms** (no-code pack workflows, triggers, approvals) | Customisation | L | Medium | Switching cost |
| **Firm execution graph** (how the organisation turns inputs into deliverables; learned across packs) | Institutional memory | XL | Very high | **Highest, if achieved** |
| **Matters / deals / engagements** as the unit of work (legal, consulting, audit) | Vision expansion | XL | Very high | Medium |
| **Control plane over M365/Google files** (policies, lineage, AI-change governance across tools) | CIO-level governance | XL | High | Medium |

## Explicitly deprioritised
- New DOCX/XLSX/PPTX renderer fidelity work, ribbon rebuilding, visual "workspace reactivity" animations (keep the design principles; defer the polish).
- Generic chat, email/calendar agents, web research agent, slide-from-scratch generation, layout-diffusion ML.
- Legal-specific features beyond one demo.
- Visible multi-agent orchestration UI for end users.
