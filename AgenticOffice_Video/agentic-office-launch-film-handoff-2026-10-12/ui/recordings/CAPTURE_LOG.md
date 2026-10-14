# Capture log — real UI recordings

## agentic-office-demo.mp4

| Field | Value |
| --- | --- |
| Received | 10 October 2026, sent by the user via WhatsApp (file dated 9 October 2026), saved here by the user |
| SHA-256 | `9a5080fcb75ef3f4f8848e15472f9a667e2d000b0c66ee0337b14aa1e2e7a888` |
| Format | H.264, 1920×1080, 30 fps, 149.53 s (4,486 frames), ~244 kb/s, no audio track |
| Content | Edited product demo of the actual Agentic Office Mac app (dark theme): three tasks, each with a baked-in title card. Agent work is sped up, with a "7× / 12× / 8× speed" badge baked into the top-right corner |
| Status | Genuine product footage, but an edited demo — not raw capture. Treat sped-up spans as time-compressed and keep the speed disclosure. |

Timestamps were taken from seek-accurate frame extraction. They are ±0.5 s.

| Time (s) | Speed | What is on screen | Usable for |
| --- | --- | --- | --- |
| 0–3 | — | Title card: "AI-NATIVE OFFICE / Agentic Office / Your Word, Excel and PowerPoint — one assistant…" | **Do not use** (says "AI-native"; editor owns typography) |
| 3–7 | — | Black, then card "1/3 Fix it everywhere" + prompt quote | Do not use |
| 7–21 | 1× | Board Memo Q3.docx in workspace; file tree (Board Pack Q3 → Board, Finance, Investors, Legal, Research, Templates); tabs memo / deck / FY26 Model; prompt typed: "The FY26 outlook is €75m now per the model — fix it everywhere, memo and deck." | S02 workspace reveal, S03 file tree, S04A composer |
| 21–41 | 7× | Agent plan: "Reading your files… / Read FY26 model and memo / Locate all FY26 outlook references in deck / Propose minimal memo and deck corrections / Verify…"; switches to Board Deck Q3.pptx | S02/S07 agent working across files (time-compressed) |
| ~33–40 | 7× | **Sanitize:** "Permission needed" card showing `from hermes_tools import read_file`, a local `/var/folders/...` temp path, "You chose: Deny", "Running a calculation didn't work — trying another way" | Avoid or crop out the assistant panel |
| 41–48 | 1× | Changes tab: "Changes ready for review · 0 of 7 accepted", Accept all / Reject all, per-file groups (Board Memo 0 of 2, Board Deck 0 of 5), expanded diff −€71–73m / +€75m | S05 review list and diff |
| 48–52 | — | Card "2/3 Build something new from your documents" | Do not use |
| 52–70 | 1× | Memo; prompt typed: "Turn the board memo into a 5-slide lender deck for Thursday. Where the memo and the model disagree, use the model. New file — leave the board deck alone." | S04A prompt (wording differs from the VO, see notes) |
| 70–90 | 12× | Agent reads files, then **Lender Deck Q3 – Thursday.pptx opens in the main viewport** (~82 s): new file in the Legal folder, slide thumbnails, cover "€17.9m … Q3 lender update", "10 changes" | S04B proposed deck on the main UI (time-compressed) |
| 90–97 | 1× | Lender deck + Evidence panel ("Confidence: high", sources: Board Memo Q3, FY26 Model, Q3 Actuals, Lender Covenant Pack), follow-up actions | S04B hold. Panel lists a PDF source and an "Export PDF" action, so keep it incidental and don't highlight it |
| 97–101 | — | Card "3/3 Change the model. Everything follows." | Do not use |
| 101–120 | 1× | Memo; prompt typed: "Research says 20% DACH growth is too aggressive. Take DACH Q4 down to 8.5 in the model, then make the memo and the deck match the new FY26 number. Show me the diffs." | S04A alt / S08 |
| 120–140 | 8× | ~126 s FY26 Model.xlsx: inline bar "The Assistant changed 1 cell · Revenue!E6 8.9 → 8.5 · Reject / Accept / Accept all / Reject all". ~127 s memo tracked changes by author "Hermes" (€71–73m → €74.6m; "20% growth…" → "DACH Q4 revenue of €8.5m"). Then deck. | S02 Excel view, S05 Accept/Reject controls (time-compressed) |
| 140–142 | 1× | Changes: 0 of 10, then **Accept all** clicked, then "All changes reviewed · 10 of 10 accepted". Per-row ✓/✗ controls are visible on hover (Slide 4 · TextBox 6). | S05 real accepted result |
| 142–147 | 1× | Memo after acceptance: paragraph and table now read €74.6m (140 words) | S05 accepted document state, S08 "less rework" |
| 147–149.5 | — | End card "Every change, reviewable. / Tracked changes in Word, diffs in PowerPoint and Excel — accept or reject each one." | Do not use (useful as product-team wording reference) |

## What this proves vs the capture checklist

| Checklist clip | Covered? | Notes |
| --- | --- | --- |
| 01-workspace-formats | **Yes** | Memo, deck and spreadsheet open in the same window and file tree |
| 02-local-files | Partial | Real workspace file tree and a "Local" indicator. Local-storage/data-flow wording still needs team confirmation; keep "Cloud AI may process document content." |
| 03-prompt-to-deck | **Yes** (time-compressed) | Real prompt, so a new deck opens on the main UI with 10 reviewable changes. The prompt wording differs from the VO line. |
| 04-selective-review | Partial | Real per-change list, diffs, Excel per-cell Accept/Reject and the accepted result. The demo uses **Accept all**: no single accept and no reject is performed. |
| 05-collaboration | **No** | A "Room" tab and a Share button exist but are never opened. No second participant. |
| 06-agent-handoff | **No** | One agent plans and works across three files. There is no handoff between two agents. |

## Sanitization / claim flags

- 33–40 s exposes an internal module name (`hermes_tools`), a temp file path and a failed-step message. Exclude this span.
- The tracked-change author shows as "Hermes". Confirm whether that name may appear publicly; otherwise crop it or avoid that frame.
- The composer's model picker reads "No model" throughout. Product team to confirm that's acceptable on screen.
- "Can make mistakes" and "Default Approvals" are visible. They're honest and should be kept.
- PDF appears incidentally (Lender Covenant Pack.pdf, "Export PDF"). Never feature it.
- The speed badges cover the top-right toolbar (Share/Editing). If cropped, replace them with an editor-owned "sped up" label so time compression stays disclosed. Do not repaint UI.
- The real app is dark-themed. The Figma prototypes are light. Plan grading/staging so real and prototype scenes don't clash.

## collab-demo-raw.mp4

| Field | Value |
| --- | --- |
| Recorded | 10 October 2026 by Claude, from the real Agentic Office app (local build from `~/Projects/Agentic_Office_ultra` at its current checkout, dark theme). The app ran with a separate user profile, a scratch copy of `casualdocx/collab` on 127.0.0.1:3000, and a demo "Board Pack Q3" folder in Claude's scratch space. Nothing in the repo was changed, built or pushed. |
| SHA-256 | `5a279731bd5c5f36b0d9eb3361128eb621cc463bbbb96ed8b57abdcdeca97165` |
| Format | H.264, 1920×1142 (window capture, no OS chrome), 30 fps, ~100 s, no audio. Raw: needs trimming. |
| Real | Share → Start live session, title-bar presence ("Live · N" + avatars), the Room view, live co-editing (the runway paragraph changes 26 → 28 months on screen), the proposal card, Accept, and the memo updating to €74.6m. |
| Simulated | The teammate "Priya Raman" and "Priya's Assistant" are a script calling the same room API the app uses. Their messages and edits are scripted. **The clip must be labelled as a demo session with a simulated teammate.** |
| Not shown | Your own Assistant joining. With the real "Invite my Assistant", the agent took more than 2 minutes to reach `room_join` and the app's 2-minute invite had expired (tried twice, then cancelled). |
| Glitches | Clicking Accept also shows the toast "Could not accept the proposal: Cannot read properties of undefined", although the proposal is accepted (dismissed within ~0.5 s and to be trimmed). The thread's first message shows "Someone who left" because the scripted Assistant was rejoined mid-take. |

## collab-demo-take.mp4 (clean take, used in the film)

Same setup as `collab-demo-raw.mp4`. Recorded in one continuous take with a screenshot-polling recorder (~20 fps, so it records even when the window is in the background). SHA-256 `748be9f08deb50e0a3c217d6ddb1944a794a01bef230c8ebcb377a1f008716c4`. Format: 1920×1142, 30 fps, 36.5 s, no audio. The film uses a 16:9 top crop (`v12-openart/film/public/clips/collab-take.mp4`).

| Time (s) | Event |
| --- | --- |
| 3.4 | Share → Start live session |
| 7.2 | Session live ("Live · 1", AM avatar) |
| 10.5 | Room tab |
| 13.1 | Priya Raman + Priya's Assistant join ("Live · 3", avatars, Room list) |
| 16.2 | Priya's Assistant posts its plan in the room thread |
| 19.8 | Priya's Assistant writes §3: "26 months" becomes "28 months" live on the page |
| 23.4 | Handoff message |
| 25.9 | Proposal sent; the card appears at ~27.3 |
| 31.0 | Alex clicks Accept; §2 becomes €74.6m; card clears |

Simulated: Priya and her Assistant (scripted room-API calls). Real: everything in the app window. The app's Accept error toast is dismissed within ~0.2 s and doesn't show in the film's cut.

## User-supplied screenshots (2026-10-13, from Harshit / product team)
| File | What it shows | Used in V34+ | Sanitize |
| --- | --- | --- | --- |
| `film/public/ui_new/pptx_diff_new_elements.png` | Real PowerPoint diff view: slide 1 with "New element added" ×2 and "Speaker notes updated" badges; thumbnails; Assistant panel with Evidence ("Confidence: high") | "Something new? Every new element is marked." (whole-app shot) | Blur: presenter notes (image credit "vecteezy.com (Unknown, found on the web)"), the model picker "gpt-6.1-sol", and the evidence card text mentioning the credit |
| `film/public/ui_new/create_new_templates.png` | Real "Create new" screen: template gallery (Board Update, Investor Pitch, Quarterly Review, Product Roadmap, Budget Review, Product Launch) and "Start with the Assistant / Generate draft" | "Templates, or a sentence." | Crop the right panel (temp path, "No model"); blur the subtitle "get a draft in seconds" (speed claim) |
| `film/public/ui_new/pptx_generated_cover.png` | Generated cover slide with "Image: USFWS Mountain Prairie / Openverse, CC BY 2.0" credit | not used yet | — |
