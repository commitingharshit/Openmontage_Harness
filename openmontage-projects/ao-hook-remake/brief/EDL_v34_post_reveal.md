# V34: post-reveal expansion. EDL and storyboard (plan only, no render yet)

**Inputs:**
- the V3.3 brief (pasted 2026-10-13)
- three new real screenshots in `assets/ui_new/`:
  - `pptx_diff_new_elements.webp`: PowerPoint element diffs, "New element added", "Speaker notes updated", an Evidence panel with "Confidence: high"
  - `pptx_generated_cover.webp`: a generated cover with an image credit line
  - `create_new_templates.webp`: "Create new", template gallery, "Start with the Assistant", "Generate draft"

**What stays:**
- V33 from 0 to 46.0 s is kept untouched: the frustration build, ending on "See exactly what changed. Decide what stays."
- **Target length:** about 153 s. The user OK'd a longer cut.

**The motif:** €74.6m travels the whole film. It's wrong in the deck at the cold open, validated in the model, then reused in the memo and deck. It's ringed as "Slide 4. Caught.", and ends equal everywhere: the opening ≠ becomes =.

**Status column:**
- **✓ REAL**: we hold genuine footage or a screenshot.
- **◐ PARTIAL**: real footage shows part of it. The caption is limited to what's shown.
- **✗ RECORD**: needs a new product recording. Until then the beat uses the interim shown, or is cut.

## EDL
| # | Time (s) | Beat · capability | Picture (source) | VO (draft) | On-screen | Transition in | Pain it reverses | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | 46.0–52.0 | **Reveal: a workspace, not a chatbot** | Logo + promise (existing Bridge 46–49.6), then a push *through the logo* into the real app (`ui/ws-word.png`), panning across the memo, deck and model tabs | "Not another chatbot. Your workspace: Word, Excel and PowerPoint, together." | Not another chatbot. **Your workspace.** | Hold on black, then the logo dissolves into the app window | Detached chatbot output | ✓ REAL |
| 2 | 52.0–56.5 | **Start anything here** (new) | `create_new_templates.webp`: the camera glides over the template cards, then lands on "Start with the Assistant · Generate draft". The crop **excludes** the right panel, which shows a `/private/tmp/...` path and "No model" | "Start from your templates, or just describe it." | Templates or a sentence. Same workspace. | Whip from the deck tab | "Generating presentation… in the chat" | ✓ REAL (sanitize crop) |
| 3 | 56.5–66.0 | **The context is already here** | Real prompt typed (`task3full` 4 s→, tight on the text, no model picker), then the real Evidence/sources panel (demo 90–97 s, or the Evidence card from the new pptx screenshot) listing the model, memo and deck | "Tell it what changed, once. It already knows where that number lives: the model, the memo, the deck." | **The context is already here.** | Match cut: the hook's "Prompt again." composer → this composer | Re-explaining and re-uploading every time | ◐ (sources panel is real; "previous findings reused" is **not** shown, so the caption must not claim memory across tasks) |
| 4 | 66.0–80.0 | **One request. A team of agents.** First climax | **Interim:** real plan steps, sped up ("Read model, memo and deck → Propose targeted edits → Verify and show diffs"), then the real Room handoff: *"Priya's Assistant [handoff]… Handing §2 back to Alex: the FY26 model now forecasts €74.6m."* (`collab-take` ~25 s). €74.6m is lifted out as a glowing chip and travels to the next shot. **Wanted:** a finance agent validates €74.6m and a drafting agent consumes it | "One request. Assistants plan it, check it, and hand off the work." | One request. **A team of agents.** | The €74.6m chip flies from the handoff into the next file | You coordinating five tools by hand | ◐ (plan + one assistant→person handoff is real; **a specialist agent→agent DAG is ✗ RECORD, essential**) |
| 5 | 80.0–93.0 | **Change what matters. Keep everything else.** | Split screen: left, a callback to the hook's "Regenerating all 12 slides…" bar (illustration, labelled). Right, the real targeted edits in turn: Excel `Revenue!E6 8.9 → 8.5`, memo tracked change €71–73m → €74.6m, **new pptx element diffs** ("New element added", "Speaker notes updated" badges) | "No regenerating. It edits the cell, the sentence, the slide element, and leaves the rest alone." | Change what matters. **Keep everything else.** | The €74.6m chip lands in E6 | Whole-file regeneration | ✓ REAL (crop the pptx shot: hide "gpt-6.1-sol" and the presenter-notes credit "vecteezy.com (Unknown, found on the web)", see Flags) |
| 6 | 93.0–110.0 | **No black box. You decide.** Second climax, the slowest beat | Real Changes panel 0 of 10 → Accept all → 10 of 10 (`accept.mp4`), then the reviewed list with "Slide 4 title €71–73m → €74.6m" ringed ("The slide that slipped. Caught."), held 4 s. **Wanted:** accept one change, **reject one**, and show the original preserved | "Every change is marked, in every file. Keep this one. Not that one. Even slide four." | See every change. **Choose what stays.** | Slow push; music thins | Black-box "Done." | ◐ (Accept-all and per-row ✓ are real; **single accept + reject is ✗ RECORD, essential**) |
| 7 | 110.0–121.0 | **Your team. Their agents. One workspace.** | Real Room (`collab-take` 21–25 s): Alex (you), Priya Raman, Priya's Assistant, then "Priya's Assistant proposes 1 edit · Replace €71–73m with €74.6m · Accept / Reject" (27–30 s). The €74.6m motif again | "Bring in your team: people and their assistants, on the same files. Every proposal still waits for a person." | Your team. **Their agents.** One workspace. | The Room tab slides in from the Changes tab | The partner's angry messages in the hook | ◐ (real app, demo session with a **simulated teammate**, labelled) |
| 8 | 121.0–129.0 | **Checked, with evidence** | Real Evidence panel: "Confidence: high", per-file evidence lines (new pptx screenshot right panel; demo 90–97 s). "Verify and show diffs" step ticking ✓ (task 3 plan) | "And every change comes with its evidence, so you can check it before you trust it." | Evidence for every change. | Rack focus from the Room to the Evidence card | "You don't even know what's wrong anymore." | ◐ (the panel is real; never caption it "verified correct") |
| 9 | 129.0–136.0 | **Your files. Your control.** | Real file tree (`filetree.png`) + real status bar "Local · Default Approvals · Can make mistakes". **Wanted:** a Finder folder → file opens in Agentic Office | "Your workspace. Your files, stored on your device." | Built around your local workspace. *Cloud AI may process document content.* | Pull back from the panel to the whole app | "Where did my files go?" | ◐ (local storage is a claim the product team must confirm; the cloud qualifier is always shown) |
| 10 | 136.0–145.0 | **Payoff: the motif closes** | The same email as the cold open. The two cards now read **FY26_Model €74.6m = Board_Presentation Slide 4 €74.6m** (green =, callback to the opening ≠). Real hand clicks; "Sent · memo · model · deck · every change reviewed"; sunrise | "Done. And this time, you've seen every change." | (the = sign does the talking) | Hard cut from the evidence to the email, with the room tone back | The 8:57 near-miss | ✓ (cards are illustration, labelled) |
| 11 | 145.0–153.0 | **End card** | ~~"AI said it was done."~~ → "This time, you checked." → logo lockup | "Agentic Office." | **Your workspace. Your team and their agents. Your control.** · Real documents. Shared context. Reviewable work. · Request early access | Light swell, then silence before the logo | — | ✓ |

## Recordings to capture next (in priority order)
| Recording | Length | Fills beat | Priority |
|---|---|---|---|
| Accept one diff **and reject another**, then the original text is visibly kept | 8–12 s | 6 | **Essential** (the critics' #1 claims blocker) |
| Specialist agent finishes research or a numeric check, and a second agent consumes that finding | 7–10 s | 4 | **Essential** (otherwise beat 4 says "assistants hand off", not "a team of agents") |
| A tiny edit done directly (one cell or text box) with no long agent run | 4–5 s | 5 | High |
| Source/check output for €74.6m (Evidence panel open on the model) | 5–7 s | 8 | High |
| Finder folder → double-click → opens inside Agentic Office | 4–6 s | 9 | High |
| The same app filmed **on a laptop in a room** (phone camera, 3 shots: wide, over-the-shoulder, screen close-up) | 10 s | 1, 6, 10 | High (the real-film critic's biggest penalty is "screenshots on black") |
| A second teammate actually signed in (not simulated) | 6–8 s | 7 | Nice to have |

## Flags on the new screenshots
- **pptx_diff_new_elements:**
  - The model picker reads **"gpt-6.1-sol"**. Crop it out.
  - The presenter notes credit **"vecteezy.com (Unknown, found on the web)"**, with an "ai-generated" URL. The inserted image's licence is unknown, which is a bad look in an ad about trust. Crop it out, or better, re-record with a licensed image like the CC BY 2.0 one on the cover.
- **create_new_templates:** the right panel shows `/private/tmp/claude-501/…` and "No model". Crop to the centre panel.
- **pptx_generated_cover:** the "Image: USFWS Mountain Prairie / Openverse, CC BY 2.0" credit is good honest provenance. It could support beat 8.

## Claims guardrails for V34
- **Time:** no speed numbers. Say "no regenerating" and "edits in place", which is behaviour we can show.
- **Agents:** "a team of agents" only once an agent→agent recording exists. Until then: "assistants plan, check and hand off".
- **Evidence:** "evidence for every change" is fine. "Verified" or "correct" is not.
- **Local:** "stored on your device" plus "Cloud AI may process document content". Never "everything stays on your laptop".
