# 22 — Metric Tree

*v1 · 2026-09-30.*

## 1. Choosing the North Star
| Candidate | Captures user value? | Gameable? | Verdict |
|---|---|---|---|
| Documents completed | Partly (a document is not the job) | Easy to inflate | No |
| Agentic tasks completed | No (tasks ≠ value; rewards noise) | Very | No |
| Professional hours saved | Yes, but estimated and self-reported | Medium | Supporting metric (reported to buyers) |
| Accepted patches | Value-aligned but counts tiny edits | Medium | Supporting |
| Weekly active workspaces | Engagement, not value; cadence is monthly/quarterly | Medium | Poor fit for monthly/quarterly packs |
| Multi-document sessions | Activity | Easy | No |
| **Pack cycles completed & approved** | **Yes: a correct, reviewed recurring deliverable shipped** | Hard (needs reviewer approval) | **North Star** |

> **North Star: Approved Pack Cycles per month (APC).** A pack cycle counts when a recurring multi-file pack is rolled forward (or updated after a late change), passes tie-out, and a reviewer approves it.

**Quality guardrail on the North Star:** tie-out pass rate ≥ 99% of linked numbers, and post-approval corrections < 1 per cycle.

## 2. Tree
```
Approved Pack Cycles / month (NORTH STAR)
├── Active packs  ×  cycles per pack per month  ×  approval rate
│
├── ACTIVATION
│   ├── Pack imported (≥3 linked files)                        target 50% of signups/pilots
│   ├── Link graph confirmed (≥80% of numbers linked)          ← hardest step; target 40% → 70%
│   ├── Time-to-first-roll-forward (from import)               target < 2 days (with FDE) → < 2 hours (self-serve)
│   └── Auto-link rate on a new pack                           target ≥ 70%
│
├── ENGAGEMENT (per cycle)
│   ├── Proposed changes per cycle; % accepted                 target ≥ 70% accepted
│   ├── Reviewer minutes per cycle                              target −50% vs baseline
│   ├── Zero-LLM share of numeric updates                      target ≥ 60% (margin + trust)
│   ├── Late-change propagations run                            (signal of trust mid-cycle)
│   └── Restore events                                          (should be rare; spikes = trust problem)
│
├── RETENTION
│   ├── Second-cycle retention (pack)                           target ≥ 80%
│   ├── Logo retention (annual)                                 target ≥ 83% (model base)
│   ├── Correction rate cycle N vs cycle 1                      target −25% by cycle 3 (moat signal)
│   └── Pack playbook rules per pack                            (grows with use)
│
├── MONETISATION
│   ├── Paid packs; ARPA; pilot→paid conversion                 target ≥ 60% pilot conversion (model R05)
│   ├── Gross margin; inference $ per pack cycle                target GM ≥ 75%; ≤ $30 inference per pack-month
│   └── CAC payback                                             target < 18 months
│
└── EXPANSION
    ├── Packs per customer                                      target 2 → 4 in year 1
    ├── Reviewer seats (free) → editor seats (paid)
    ├── New pack families per customer (LP → portfolio → lender)
    └── NRR                                                     target ≥ 110% by year 2
```

## 3. Instrumentation (build in the first 60 days)
Events: `pack_imported`, `link_suggested`, `link_confirmed`, `rollforward_started/completed`, `change_proposed/accepted/rejected`, `tieout_run(pass/fail count)`, `review_approved`, `restore_performed`, `llm_tokens(by step, model)`, `deterministic_patch_count`. The honesty checklist in the repo (`INSTRUMENTATION_HONESTY_CHECKLIST.md`) applies: log **degradation rates**, not enabled flags. A roll-forward that silently fell back to the LLM is a failure of the zero-LLM metric, not a success.

## 4. Reported to investors monthly (from month 3)
APC; active packs; paying organisations; ARR (subscriptions separate from pilots); pilot→paid conversion; second-cycle retention; accepted-change rate; zero-LLM share; hours saved per cycle (measured, with method); GM; burn; runway.
