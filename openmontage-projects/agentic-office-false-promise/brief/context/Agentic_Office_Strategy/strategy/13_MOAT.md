# 13 — Moat Analysis (skeptical)

*v1 · 2026-09-30. Test applied to every claimed moat: **"Could Microsoft, Google, OpenAI or Anthropic build this within 12 months?"** If yes, it is not a moat by itself. Status labels as in 01_PRODUCT_THESIS.*

| # | Claimed moat | Exists today? | Could a platform build it in 12 months? | Verdict | What would make it real |
|---|---|---|---|---|---|
| 1 | Document patch engine (DocPatch, Rust) | Built | **Yes.** Microsoft owns OOXML; Anthropic ships docx/pptx/xlsx skills; OfficeCLI (26.9k★) is free | **Not a moat.** It is a capability and a *margin* asset (deterministic = cheap) | Pair with the link graph; measure the zero-LLM share of updates |
| 2 | Structured representation / semantic IR | Partial | Yes | Not a moat alone | Only matters as the substrate for #7 and #9 |
| 3 | OOXML expertise | Yes (team) | Microsoft: trivially | Talent advantage, not a moat | Hire-in speed |
| 4 | Multi-file workspace | Built (file-level) | Yes (Claude already carries context across open files) | **Feature** | — |
| 5 | Version graph / restore points | Partial | Yes (OneDrive versioning + agent checkpoints) | Feature, table stakes by 2027 | Pack-level semantics (period model) makes it stickier |
| 6 | Agent orchestration (Hermes + recursive_DAG, 19 patterns) | Built | Yes; every lab has better orchestration internally | **Not a moat.** Also partly built on an MIT-licensed third-party agent | Keep as an internal efficiency asset |
| 7 | **Persistent object-level link graph per pack** (cell ↔ slide object ↔ memo span ↔ source page, across periods) | Not built | Technically yes; product-wise unlikely soon (cuts across Word/Excel/PPT teams and storage; niche for the median user) | **Potential switching cost** once a customer has 10+ packs linked and confirmed | Confirmed links are customer-specific data; rebuilding them elsewhere costs time |
| 8 | Workflow data (runs, diffs, accept/reject decisions) | Not collected yet | Platforms have far more generic data | Weak alone | Only valuable as #9 |
| 9 | **Pack playbooks learned from reviewer corrections** (rounding, sign conventions, phrasing, which numbers must never move, reviewer preferences) | Idea (skills layer exists) | Could be built; needs each pack's history, which lives with us if we own the review loop. Note: Model ML already ships "memory" of user conventions (Jun 2026), so generic memory is not differentiating; only *pack-level, correction-derived, cross-period* rules might be | **Most plausible compounding asset, but contested** | Measurable: correction rate falls cycle over cycle; playbook survives staff turnover |
| 10 | User/workspace context memory | Partial (artifact memory, Postgres mirror) | Yes: Claude/ChatGPT/Copilot memory exist | Not a moat | — |
| 11 | Enterprise integrations | Not built | Platforms have more | Not a moat | — |
| 12 | Proprietary evaluation datasets (packs, tie-out cases, roll-forward ground truth) | Not built | Labs don't prioritise this niche | Moderate. Improves reliability faster than competitors can | Build a "PackBench": 50–200 anonymised packs with ground-truth roll-forwards |
| 13 | Workflow templates / marketplace | Idea | Yes | Weak until there is scale | Needs thousands of packs |
| 14 | Collaboration | Partial | Platforms are far ahead | Not a moat | — |
| 15 | Switching cost (native files) | By design **low** | — | **Deliberately low.** Files stay native, which reduces adoption risk but also lock-in | Lock-in comes from #7 + #9 + #16, not from files |
| 16 | Institutional memory / firm execution graph | Idea | Hard for any single-app agent | Long-term vision moat | Needs cross-pack data inside a firm (years 2–4) |
| 17 | Domain-specific agents (fund reporting, lender packs) | Skills exist (generic) | Anthropic ships finance agents already | Weak | Depth in *maintenance* (not generation) plus customer playbooks |
| 18 | Private deployment + multi-model neutrality | Architecture supports it | Microsoft offers in-tenant; Anthropic via clouds; not model-neutral | **Real differentiator for a subset** (delivery firms, regulated funds) | Customers with BYO-model mandates |
| 19 | Distribution via delivery firms | Not yet | Platforms sell to them too | Possible *channel* moat | Embedded in their client SLAs and QC process |

## Honest conclusion
- **Today, Agentic Office has no moat.** It has a technically strong team, a capability lead in deterministic OOXML manipulation, and an architecture that can accumulate customer-specific assets.
- The moat thesis investors should hear is a **compounding loop**, not a technology:
  ```
  more packs linked & confirmed (switching cost)
    → more roll-forward cycles (data: accepted/rejected diffs)
    → pack playbooks improve (correction rate ↓, zero-LLM share ↑)
    → faster, cheaper, more trusted cycles (retention ↑, GM ↑)
    → more packs per customer (NRR ↑)
  ```
- **Metrics that would prove the moat is forming** (report them from the first design partner): correction rate per cycle; share of numbers auto-linked on a new pack; zero-LLM share of updates; packs per customer; time for cycle N vs cycle 1.
- **What would falsify it**: correction rates do not fall cycle over cycle; customers happily rebuild links in Claude/Copilot; the platforms ship persistent cross-file links.
