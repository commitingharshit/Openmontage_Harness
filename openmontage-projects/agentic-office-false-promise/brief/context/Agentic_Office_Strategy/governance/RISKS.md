# RISKS — register

*v1 · 2026-09-30. Probability (P) and Impact (I) on 1–5; Score = P × I. Owner = role. Reviewed monthly.*

| # | Category | Risk | P | I | Score | Mitigation | Early indicator | Owner |
|---|---|---|---:|---:|---:|---|---|---|
| R01 | OpenAI/Anthropic risk | Claude/ChatGPT Office add-ins add persistent project links, roll-forward and pack restore | 3 | 5 | **15** | Move fast on tie-out + playbooks + private deployment; build on their models (partner posture); target multi-model and private buyers | Release notes mentioning "projects", "linked files", "update across documents" | CEO |
| R02 | Microsoft risk | Copilot ships cross-file dependency links + consistency checks | 3 | 5 | **15** | Complement positioning; AppSource; focus on non-standardised packs and BYO-model buyers; acquisition readiness | M365 Roadmap entries; design partners say "Copilot does this now" | CEO |
| R03 | Market risk | ICP packs live inside FP&A / fund-admin / portfolio platforms (Datarails, Juniper Square JunieAI, Carta, Chronograph), not Office files (H1 false) | 3 | 5 | **15** | 30 interviews before building beyond NOW; re-segment to lender reporting / FP&A / doc-estate | <40% interviewees qualify | Founder's office |
| R04 | Product risk | Link-graph auto-extraction too weak on real, messy packs (pasted images, stale links) → setup cost kills activation | 4 | 4 | **16** | FDE-assisted setup; confidence-ranked suggestions; teardown benchmark ("PackBench") | Auto-link <40% on teardown packs | CTO |
| R05 | Technical risk | Deterministic patching breaks formatting or corrupts files on real-world OOXML | 3 | 5 | **15** | Render-and-verify loop (OfficeCLI), restore points, golden-file tests on 50+ real packs | Any corrupted file in pilots | CTO |
| R06 | Retention risk | Quarterly cadence means slow habit formation; customers churn after one cycle | 3 | 4 | 12 | Monthly packs first; mid-cycle late-change use; scheduled runs | Second-cycle retention <70% | CEO |
| R07 | Distribution risk | Cannot reach fund CFOs/COOs from India without US presence | 3 | 4 | 12 | Warm alumni intros; US/UK trips; founding AE at month 10; SG/UAE hubs | <10 qualified meetings/month by month 3 | CEO |
| R08 | Competition | Datarails / Cube / Workiva / Rollstack extend to arbitrary Office packs | 3 | 4 | 12 | Stay in bespoke-pack segments; faster roll-forward on existing files; no platform migration | Competitor releases | CEO |
| R09 | Competition | Model ML / Rogo add pack maintenance for funds | 2 | 4 | 8 | Differentiate on existing-pack maintenance + private deployment | Product announcements | CEO |
| R10 | Pricing risk | Per-pack pricing rejected; seat price anchored at $0–30 by platform bundles | 3 | 3 | 9 | A/B pricing in proposals; hybrid platform fee + packs | Proposal push-back | CEO |
| R11 | Unit economics | Inference cost per pack ≫ model ($30/month) | 3 | 3 | 9 | Deterministic share, caching, routing to cheaper models, BYO model | Telemetry in first pilots | CTO |
| R12 | Security risk | A data leak or wrong number reaching LPs damages trust irrecoverably | 2 | 5 | 10 | Local-first mode, least privilege, approval gates, audit logs, insurance; no autonomous sending | Security incidents; near-misses | CTO |
| R13 | Enterprise procurement risk | SOC 2 Type II / on-prem required before first contract | 3 | 3 | 9 | SOC 2 Type I by month 12; local-first; pilots under NDA | Security questionnaires | Founder's office |
| R14 | Delivery-firm channel risk | Client contracts forbid third-party AI; top KPOs build in-house | 4 | 2 | 8 | Treat as channel hypothesis; sell direct in parallel | Pilot blocked by client clause | CEO |
| R15 | Fundraising risk | Investors see "another AI-for-Office" company and pass; or discount for India base | 3 | 4 | 12 | Evidence-led deck; LOIs; accelerator signal; honest Microsoft/Anthropic slide | Pass reasons in first 10 meetings | CEO |
| R16 | Founder/time risk | Team split across many experiments (legal, UX, orchestration, slides ML); students/part-time availability | 4 | 4 | **16** | Written 90-day focus (24_FIRST_90_DAYS); single wedge; weekly metric review | Work outside NOW list > 20% of commits | CEO |
| R17 | Team / legal risk | IP ownership unclear across 5+ contributors; no vesting | 3 | 4 | 12 | IP assignment + founders' agreement + vesting before raise | Diligence questions | CEO |
| R18 | Open-source / licence risk | Dependency on MIT/Apache forks is fine, but any AGPL (e.g., research tools) inside the proprietary core would contaminate it | 2 | 4 | 8 | Licence audit (handoff already warns about AGPL) | Audit findings | CTO |
| R19 | Technical risk | The large, fast-changing monorepo is hard to build cleanly (clean clone never verified end-to-end) | 3 | 3 | 9 | Clean-clone CI; slim product build for pilots | Build failures | CTO |
| R20 | Model-vendor risk | Model price or terms changes; reliance on subscription-based providers (OpenCode Go) unsuitable for production | 3 | 3 | 9 | Move production to API contracts with ZDR options; multi-provider routing | Provider ToS changes | CTO |
| R21 | Market timing | AI budgets consolidate on platform bundles (Copilot, Claude Enterprise), leaving no room for point tools | 3 | 4 | 12 | Sell on measured hours saved per pack plus risk reduction; complement bundles | CFOs cite "we already pay for Copilot" | CEO |
| R22 | Regulatory | Data-protection rules (DPDP Act in India, GDPR) complicate cross-border processing for delivery firms | 2 | 3 | 6 | Regional deployment; DPA templates | Client legal reviews | Founder's office |
| R23 | Product risk | Agent latency (25–312s per DOCX task in the internal benchmark) makes interactive use frustrating; roll-forwards could take many minutes | 4 | 3 | 12 | Treat roll-forwards as async/scheduled jobs; deterministic fast paths; progress UX (WATCH); overnight runs | Median roll-forward time on demo pack | CTO |

**Top five by score**: R04 (link extraction on messy packs), R16 (focus), R01/R02 (platform moves), R03 (market definition), R05 (file integrity).
