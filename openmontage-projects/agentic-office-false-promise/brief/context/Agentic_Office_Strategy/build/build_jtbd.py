W={'freq':.20,'pain':.20,'wtp':.15,'feas':.15,'def':.15,'wow':.05,'exp':.10}
jobs=[
# (job, persona, evidence label, freq, pain, wtp, feas, def, wow, exp, note)
("Roll the quarterly LP report pack forward to the new quarter (model → LP deck → LP letter), with every number tied out","P1/P3","[H] LP reporting 60–180 hrs/qtr (Tier 3)",4,5,5,4,5,5,5,"Core wedge job; deterministic propagation + narrative drafting"),
("Propagate a late change (one valuation / one assumption) through all dependent slides, tables and paragraphs, then show what moved","P1/P5","[H] founders' Project Atlas example",5,5,4,4,5,5,4,"Impact graph signature moment"),
("Produce a tie-out report: every number in deck/memo traced to a source cell or PDF page; list mismatches","P2/P3","[F] Workiva built a Tie-Out Agent (Jul 2026) → job is real",5,4,5,5,5,4,4,"Mostly deterministic → high margin"),
("Monthly portfolio-monitoring deck: ingest portfolio-company management accounts (PDF/XLSX) into the monitoring model and deck","P1/P3","[H]",5,4,4,3,4,4,5,"PDF extraction reliability is the risk"),
("Quarterly covenant-compliance pack per borrower from borrower financial PDFs","P6","[H]",4,4,4,3,4,3,4,"Adjacent segment"),
("Monthly board / management pack roll-forward with variance commentary","P5","[F] IBM FP&A trends: commentary 2–3 days/cycle (Tier 3)",5,4,3,4,3,4,4,"Contested by Datarails/Cube"),
("Apply a client's style guide / template to a pack and verify compliance before delivery","P3/P4","[H]",5,3,3,5,3,3,3,"Offshore QC pain"),
("Review what changed between two versions of a pack (semantic diff across files) and approve per item","P2","[H]",5,4,4,4,4,4,4,"Reviewer UX; sells to buyer"),
("Restore the whole pack (or one object) to last quarter's approved state","P1/P2","[H]",2,4,3,5,3,4,3,"Trust feature; rare but decisive"),
("Update an IC memo when new diligence data arrives (QoE, management call notes)","P1","[H] founders' example",3,4,4,3,4,5,4,"Contested by Model ML / Hebbia"),
("Turn 30 source documents into a first-draft board or IC memo with citations","P1/P7","[H]",2,4,4,3,2,5,3,"Generation — platforms strong"),
("Build a new comps/valuation model from filings","IB","[F] Anthropic Model Builder / Rogo / Endex exist",3,4,4,3,1,4,2,"Avoid — crowded"),
("Create a pitchbook from a target list","IB","[F] Anthropic Pitch Builder / Model ML",3,4,4,3,1,5,2,"Avoid"),
("Rewrite 60 slides after an assumption or storyline change","P7","[H]",3,4,3,3,3,5,3,"Good demo; project-based"),
("Apply the same policy/clause update across 120 documents and show every edit","Compliance/legal ops","[H]",2,4,4,4,4,4,4,"Document-estate expansion"),
("Repaper contracts after a regulatory change (clause replace + evidence log)","Legal ops","[H] (e.g., historic LIBOR transition)",1,5,5,3,4,3,3,"Episodic; high ACV"),
("Compare revisions of a contract and explain material changes","Lawyers","[F] common; many tools",4,3,3,4,1,3,2,"Commodity"),
("Detect contradictions across a matter file (dates, amounts, parties)","Lawyers","[H] Legal IDE prototype",3,4,3,3,3,4,3,"Keep as generality proof"),
("Draft a response to a legal notice using all evidence in the matter","India litigators","[H] Legal IDE prototype",3,4,1,3,2,4,2,"Low WTP in India"),
("Extract tables from scanned PDFs into Excel with page citations","P3","[F] DataSnipper proves demand",5,3,3,3,2,3,3,"Commodity-ish; needed as input"),
("Keep Excel→PowerPoint chart links alive across versions","P1/P5","[F] think-cell/UpSlide sell this",5,3,3,5,2,2,3,"Table stakes feature"),
("Answer 'where did this number come from?' for any figure in a deck","P2","[H]",4,3,3,5,4,4,4,"Provenance query; drives trust"),
("Generate an audit log / evidence pack for auditors or LP due diligence","P2","[H]",2,3,4,5,4,2,3,"Compliance buyer value"),
("Prepare the quarterly investor update for a startup","Founders","[H]",4,2,1,5,2,3,2,"PLG test bed only"),
("Update a research report when earnings arrive (model → note → charts)","Equity research","[F] Anthropic Earnings Reviewer",4,4,3,3,2,4,3,"Contested"),
("Consolidate 20 portfolio-company KPI files into one fund dashboard","P1/P3","[F] Chronograph/Cobalt own KPI collection",5,3,3,4,2,3,3,"Partner, don't build"),
("Translate / localise a deck while preserving layout","Global teams","[H]",2,3,2,4,2,3,2,"Nice-to-have"),
("Batch-reformat 200 legacy documents to a new brand template","Corp comms","[H]",1,3,3,5,3,3,2,"Episodic"),
("Build a new deck from a brief (from scratch)","Everyone","[F] Gamma/Copilot/Claude",3,3,1,4,1,5,2,"Avoid — commoditised"),
("Draft email/Outlook replies","Everyone","[F] Copilot/Claude Outlook",5,2,1,5,1,2,1,"Avoid"),
("Hand over a pack to a new analyst (who owns what, how it's built)","P2/P4","[H] key-person risk",2,4,3,4,4,3,4,"Pack playbook = memory moat"),
("Run a pack update overnight on a schedule and have the diff ready at 9am","P3/P4","[H]",4,4,4,4,4,4,4,"Offshore timezone advantage"),
("Enforce 'ask before': no external sharing, no deletion, redact client names","P8","[H]",5,3,3,5,3,2,3,"Security gate"),
("Estimate the impact of a change before running it (preview which objects will move)","P1/P2","[H] repo has stale-impact preview (file-level)",4,3,3,4,4,5,4,"Signature interaction"),
]
import math
rows=[]
for j in jobs:
    sc=j[3]*W['freq']+j[4]*W['pain']+j[5]*W['wtp']+j[6]*W['feas']+j[7]*W['def']+j[8]*W['wow']+j[9]*W['exp']
    rows.append((round(sc,2),)+j)
rows.sort(reverse=True)
out=["# 08 — Jobs To Be Done","","*v1 · 2026-09-30. 34 jobs. Scores 1–5 are judgements [A]; evidence column states what is verified. Weighted score = 0.20·frequency + 0.20·pain + 0.15·willingness-to-pay + 0.15·feasibility (with today's stack) + 0.15·defensibility vs platforms + 0.05·demo wow + 0.10·expansion potential. Re-score after interviews.*","",
"| Rank | Score | Job (\"When…, I want…, so that…\" compressed) | Persona | Evidence | Freq | Pain | WTP | Feas | Def | Wow | Exp | Note |","|---:|---:|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|"]
for i,r in enumerate(rows,1):
    out.append(f"| {i} | {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} | {r[5]} | {r[6]} | {r[7]} | {r[8]} | {r[9]} | {r[10]} | {r[11]} |")
out+=["","## What the ranking says","",
"1. The top cluster is **one job family**: *keep a recurring multi-file pack correct across periods*. It covers roll-forward, late-change propagation, tie-out, semantic review, scheduled overnight runs and impact preview. These jobs score high on defensibility because they need a persisted object graph plus deterministic execution, which session-scoped platform agents do not provide.",
"2. **Generation jobs** (new deck from a brief, pitchbook from a target list, comps model from filings) score low on defensibility. Platforms and funded verticals already do them. Do not lead with them in demos.",
"3. **Legal jobs** remain feasible (the prototype exists) but score low on willingness to pay in India and on defensibility in US/UK legal. Keep one legal demo to show the engine is general.",
"4. **Document-estate jobs** (policy update across 120 documents, repapering) are the best *expansion* jobs. They reuse the same kernel and diff/review machinery on a different trigger.",
"","## The MVP job (single sentence)",
"> *When the new quarter's numbers (or a late change) arrive, I want my existing model, deck, memo and letter to update consistently, with every number traced and every change reviewable, so that I can send a correct pack in hours instead of days, without re-checking everything by hand.*",
"","## Workflow evidence still missing (critical)",
"- Direct observation of 5+ real packs (file count, number of linked figures, cycle time, number of review rounds). Gap G001.",
"- Whether packs live in Office files or inside portfolio-monitoring / FP&A platforms for our ICP. Gap G002.",
]
open('../strategy/08_JOBS_TO_BE_DONE.md','w').write('\n'.join(out)+'\n')
print(rows[:5])
