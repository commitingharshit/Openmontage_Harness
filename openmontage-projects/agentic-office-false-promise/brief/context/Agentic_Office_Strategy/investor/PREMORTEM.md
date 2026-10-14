# PRE-MORTEM — "It is September 2029 and Agentic Office has failed. Why?"

*v1 · 2026-09-30. The ten most plausible causes, most likely first, each with an early-warning indicator and a preventive action.*

| # | Cause of failure | Early-warning indicator (measurable) | Preventive action (now) |
|---:|---|---|---|
| 1 | **Never focused.** The team kept building the IDE, orchestration patterns, slide ML and legal features instead of one pack job end-to-end | >20% of commits outside the NOW/0–3-month roadmap; no real pack rolled forward by week 8 | 24_FIRST_90_DAYS "DO NOT DO YET" list; weekly commit review against the roadmap; single owner for the MVP job |
| 2 | **The platforms shipped the pack job.** Microsoft or Anthropic added persistent cross-file links, roll-forward and pack restore in 2027 | M365 Roadmap / Anthropic release notes; design partners say "Claude does this now" | Side-by-side test now (H10); move up-stack to playbooks, delivery console and private/multi-model deployment; acquisition readiness |
| 3 | **Setup cost killed activation.** Real packs (pasted images, broken links, bespoke layouts) made link-graph confirmation take days | Auto-link <40% on teardown packs; median time-to-first-roll-forward >2 days | PackBench of 50+ real packs; confidence-ranked link UX; FDE onboarding; restrict ICP to packs above an auto-link threshold |
| 4 | **Wrong ICP.** Fund packs actually lived in portfolio-monitoring platforms or fund administrators, and corporate FP&A bought Datarails | <40% qualified interviewees (H1); pilots stall at "we'd need to move this into our platform" | 30 interviews before building; defined pivot options (lender reporting, doc-estate, delivery console) |
| 5 | **Trust failure.** One wrong number reached an LP or board; the reference customer churned and told others | Post-approval corrections >0 per cycle; restore spikes | Deterministic numbers only; tie-out gate before approval; nothing leaves without human sign-off; incident playbook |
| 6 | **Could not sell from India.** Pipeline never exceeded founders' network; the first AE churned | <10 qualified meetings/month by month 3; AE below 50% of quota at month 16 | Founder trips; SG/UAE hubs; an operator-advisor from fund ops; hire an AE only after 3 organic wins to copy |
| 7 | **Economics broke.** Heavy agent use made gross margin <50%; per-pack pricing was rejected, so seat prices were set too low | Inference $/pack-month >$60; GM <60% in pilots | Meter and route early; zero-LLM share as a tracked KPI; BYO-model for enterprise; hybrid pricing fallback |
| 8 | **Retention was seasonal.** Quarterly users forgot the tool between cycles; logos churned after 2 cycles | Second-cycle retention <70% | Lead with monthly packs; late-change use mid-cycle; scheduled runs; reviewer engagement between cycles |
| 9 | **Fundraising gap.** The seed round failed in 2028 because metrics fell between "interesting" and "fundable" | Month-12 metrics below seed gates (≥15 orgs, ≥$0.35M ARR, ≥80% retention) | Raise enough to survive the conservative case (29 months); cut burn at month 12 if gates are missed; revenue-first pilots |
| 10 | **Team and legal fragility.** Unclear IP ownership across contributors, no vesting, key engineers left | Diligence red flags; contributor churn | Founders' agreement, vesting, IP assignment and licence audit before the raise; ESOP for core engineers |

**Two cross-cutting lessons**
- Most failure modes are **evidence failures**: building before confirming (1, 3, 4) or claiming before measuring (5, 7). The 90-day plan is built to surface them early.
- The single biggest external risk (2) cannot be prevented, only out-run. Speed on the specific job matters more than breadth.
