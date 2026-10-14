# 14 — Microsoft Risk

*v1 · 2026-09-30. Assume Microsoft sees exactly what we are doing.*

## 1. What Microsoft already does well (facts)
- **Agent Mode in Word, Excel and PowerPoint** GA 2026-04-22 and the default Copilot experience; multi-step native edits; also in consumer Premium plans.
- **Distribution**: >450M commercial M365 seats; >30M paid Copilot seats (FY26 Q4), net adds more than doubling quarter over quarter.
- **Formats and rendering**: owns OOXML and the reference renderers. Anything we patch, Microsoft could patch natively.
- **Trust boundary**: data stays in the M365 tenant; Purview audit; enterprise contracts already signed.
- **Finance focus**: a finance-specific Copilot in Excel with skills and data connectors (June 2026, Tier 3).
- **Copilot Studio / Power Automate** for workflows; Graph grounding across SharePoint and Teams.

## 2. Where Microsoft struggles (evidence + interpretation)
| Weakness | Evidence | Label |
|---|---|---|
| Accuracy on complex spreadsheet work | Excel Agent Mode 57.2% vs humans 71.3% on SpreadsheetBench (Microsoft's own figure) | F |
| Pilot-to-production conversion | Gartner 2025: of finished pilots, 5% moving to larger deployment; half rate it "some value, shows promise" | F (Tier 2 via 3) |
| Per-application architecture | Separate Word, Excel and PowerPoint agents; cross-app via Copilot Chat | F (product docs) / interpretation |
| No persisted object-level dependency graph across files and periods | Not in any product page we found; OLE/paste-link exists but is fragile and manual | Interpretation (verify quarterly) |
| Median-user optimisation | Microsoft ships for 450M users; bespoke finance pack maintenance is a niche | Interpretation |
| Governance of AI changes across files | Purview audits events; not a semantic "what changed in the pack and why" | Interpretation |

## 3. What Microsoft can copy, and how fast
| Our capability | Can copy? | Likely timeline | Would they? |
|---|---|---|---|
| Edit Office files with an agent | Already shipped | — | Yes |
| Cross-file context in one session | Partly shipped (Copilot Chat; Claude already does it) | 0–6 months | Yes |
| Persisted cross-file links + roll-forward per period | Yes | 12–24 months if prioritised | Uncertain: needs Excel, PowerPoint, Word and SharePoint teams to co-own a new object model |
| Deterministic tie-out report | Yes | 6–18 months | Plausible as an Excel/Copilot "check" feature |
| Pack-level semantic review + restore | Partly (versioning) | 12–24 months | Plausible |
| Private deployment outside the M365 tenant, multi-model | No (strategic conflict) | — | No |
| Customer-specific pack playbooks from corrections | Yes in principle | 18–36 months | Would require per-workflow memory; generic memory more likely |

## 4. Structural disadvantages Microsoft has
1. **Backward compatibility and scale**: it cannot ship an opinionated pack object model that changes how 450M users' files behave.
2. **Organisation**: the Word, Excel and PowerPoint product groups and SharePoint must agree on a cross-file object graph. That is slow, though not impossible.
3. **Model neutrality**: Microsoft sells Azure OpenAI and in-house models. It will not route a customer to Claude plus open-weight models inside a private VPC with a neutral audit log (though Copilot now also uses Anthropic models, reported 2025–26).
4. **Channel economics**: Copilot is priced per seat ($30). Pricing per *pack* or per outcome conflicts with its licensing model.

## 5. Opportunities *because* Office is huge and backward-compatible
- Every pack is already in OOXML, so **no migration**. That is our adoption advantage over Workiva and Datarails.
- Microsoft's own agents produce *more* Office documents that need governance and consistency. **A consistency and review layer above Office benefits from Copilot's growth.**
- AppSource / Marketplace distribution and co-sell programmes exist for partners who increase Copilot/M365 value.

## 6. Complement, not replace: positioning
> "Use Copilot or Claude to edit a file. Use Agentic Office to keep the whole pack right, every period, with proof."

- **Interoperate**: output native tracked changes; read and write files in OneDrive/SharePoint; offer BYO Azure OpenAI; later an Office add-in for reviewers.
- **Control plane above Office files**: lineage, tie-out, approvals and restore across files and periods. This is the durable position if we win.
- **Interoperability as advantage**: model-neutral (Claude, OpenAI, open-weight), storage-neutral (SharePoint, Box, local, data rooms), and it works with files produced by any agent.

## 7. Scenarios and our response
| Scenario (24 months) | Probability [A] | Impact | Response |
|---|---:|---|---|
| Microsoft ships persistent cross-file links + roll-forward for Excel→PPT/Word | 25% | High: commoditises the core job for M365-standardised teams | Move up to playbooks, private deployment, delivery-firm console; target non-Copilot shops and multi-model mandates; position as an acquisition target |
| Microsoft ships a "check consistency" feature but not period roll-forward or playbooks | 45% | Medium | Emphasise roll-forward, playbooks and audit; integrate their check as one signal |
| Microsoft focuses on generic agents; the pack job stays niche | 30% | Low | Execute |
| Microsoft partners with or acquires a pack/reporting player (e.g., Workiva-like) | 10–15% (overlaps with the above) | Mixed | Be the partner: AppSource listing early, co-sell readiness |

## 8. Early-warning indicators (review monthly)
- Microsoft 365 Roadmap entries mentioning "linked content", "dependencies", "update across files" or "consistency check" for Excel/PowerPoint/Word.
- Copilot Studio templates for board or LP reporting.
- Anthropic/OpenAI announcements of persistent project or workspace memory for Office add-ins.
- Design partners saying "Copilot now does this".

## 8b. Roadmap scan log
- **2026-09-30**: no Microsoft 365 roadmap or "What's new" item found for persistent cross-file linked updates or pack-level consistency. Closest items: Copilot Notebooks generating Word/Excel/PowerPoint from collected notes (roadmap RM558938 and related); PowerPoint Agent Mode grounded in your files, meetings and email via "Work IQ"; Copilot in Excel on local and more cloud workbooks. Sources: mc.merill.net roadmap mirror; aguidetocloud.com monthly summaries (Tier 3). Re-scan monthly.

## 9. Bottom line
Microsoft risk is **high for the horizontal story** and **medium for the wedge**. The wedge survives if and only if we accumulate customer-specific pack graphs and playbooks faster than Microsoft productises a generic version, and if we stay useful *alongside* Copilot. If those two conditions fail, the company is an acqui-hire or a tuck-in, not a venture outcome. Investors should hear this stated plainly.
