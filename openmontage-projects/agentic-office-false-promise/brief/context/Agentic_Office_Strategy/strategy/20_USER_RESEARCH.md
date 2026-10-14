# 20 — User Research Plan

*v1 · 2026-09-30. Goal: replace the hypotheses in 06–08 with evidence within 6 weeks. Method: The Mom Test (past behaviour, not opinions about the future), plus artifact teardowns (we look at a real, anonymised pack).*

## 1. Research questions (mapped to hypotheses in 21_VALIDATION_PLAN)
| RQ | Question | Hypotheses |
|---|---|---|
| RQ1 | How often, and on what cadence, do they produce a recurring multi-file pack? How many files and linked numbers? | H1, H2 |
| RQ2 | Where does the time go (collect, update, check, re-cut, review)? Who does which part? | H2, H3 |
| RQ3 | What went wrong last time (errors, late changes, rework)? What did it cost? | H2, H6 |
| RQ4 | What do they use today (Excel links, think-cell/Macabacus, FP&A platform, portfolio-monitoring platform, Copilot/Claude, offshore team)? | H8, H10 |
| RQ5 | Who approves spending? What did they last buy for this team, and at what price? | H4, H5 |
| RQ6 | What are the security, data and AI-usage rules (client clauses, IT policies, model vendors allowed)? | H11 |
| RQ7 | How much autonomy is acceptable? What must a human always see or approve? | H6 |
| RQ8 | How do they version and review today (filenames, tracked changes, PDF mark-up, email)? | H6 |
| RQ9 | Offshore/delivery: how are packs produced, QC'd and billed? What are clients asking about AI? | H12 |

## 2. Recruiting (30 interviews in 4 weeks)
| Segment | Target n | Source |
|---|---:|---|
| Fund finance / portfolio ops (US/UK/SG/UAE/India), incl. what fund-admin platforms (Juniper Square, Carta, Allvue) already produce | 8 | IIT Delhi/BITS alumni in PE/credit; LinkedIn; angel investors' portfolios |
| Offshore production analysts + delivery heads | 5 | Founder network (Gurugram/Bengaluru/Mumbai) |
| Corporate FP&A (co-candidate ICP, D011) | 7 | VC portfolio CFOs; LinkedIn |
| Lender / credit reporting (co-candidate ICP, D011) | 7 | Venture-debt / private-credit funds |
| Reviewers / buyers (CFO/COO) | 3 (+ within above) |
*ICP race (D011): score fund vs lender vs FP&A on H1/H2/H4 after 21 interviews; commit by day 45.* Warm intros |
Screen: "In the last 90 days, did you personally produce or review a deliverable made of ≥3 linked files (e.g., model + deck + memo) that is produced again every month or quarter?" Only "yes" qualifies.

## 3. Interview guide (45 min, non-leading)
**Warm-up (5 min)**
- Walk me through your role and the deliverables you're responsible for.
**Last instance (20 min)** — anchor on the most recent real pack
- Tell me about the last time you produced [pack]. When did it start and end?
- What files were involved? Roughly how many numbers appear in more than one file?
- Walk me through the steps from the moment new data arrived. Who did what?
- What happened when something changed late? How did you find everything it affected?
- How did you check that numbers were consistent? How long did that take? Did anything slip through?
- How did review happen? How many rounds? What did reviewers look at?
- How do you keep versions? Have you ever needed to go back? What happened?
**Tools & spend (8 min)**
- What tools did you use for each step? What have you tried that you stopped using, and why?
- Have you used Copilot, Claude, ChatGPT or other AI on this pack? For which step? What happened?
- Who paid for the last tool your team adopted? How was that decided? Roughly what did it cost?
**Constraints (7 min)**
- What rules govern where this data can go (client contracts, IT, compliance)? Which AI vendors are allowed?
- What would have to be true for an AI system to change numbers in this pack?
**Close (5 min)**
- If you could wave a wand over one part of this process, which part?
- Can you share an anonymised or dummy version of the pack for a teardown? Who else should I talk to?

**Do not ask**: "Would you use a tool that…?", "Would you pay $X?" (ask about past purchases instead), or any question that describes our product before the last-instance section.

## 4. Artifact teardown protocol (5+ packs)
For each anonymised pack: count files, linked numbers, broken/stale links, pasted-picture charts, formula errors, cross-file inconsistencies; time a manual roll-forward if possible; run our link extraction and record the auto-link %. Output: `research/customers/teardowns/<pack_id>.md` plus metrics into the evidence table below.

## 5. Turning interviews into evidence
- **Notes template** (per interview): segment, role, pack type, cadence, #files, #linked numbers (est.), hours per cycle (by step), errors last 2 cycles, tools, AI use, buyer, last purchase & price, data rules, autonomy tolerance, pull signals (asked for pilot? shared files? introduced colleague?), direct quotes (≤15 words each).
- **Evidence table** `research/customers/interview_evidence.csv` with one row per interview and one column per hypothesis: `supports / contradicts / neutral` + quote.
- **Scoring rule**: a hypothesis is *supported* when ≥60% of qualified interviews in the target segment support it with past-behaviour evidence; *rejected* when ≥50% contradict it.
- **Pull signals ladder** (stronger → weaker): pays for a pilot > signs an LOI > shares a real pack > schedules a second session > introduces a colleague > says "interesting".
- **Synthesis cadence**: every 10 interviews, update 06/07/08, `governance/ASSUMPTIONS.md` and `governance/DECISIONS.md`.

## 6. Ethics & confidentiality
Consent to take notes; no recording without explicit consent; NDAs offered for pack teardowns; files handled locally; anonymise names in all written evidence; no client data in any third-party AI tool without written permission.
