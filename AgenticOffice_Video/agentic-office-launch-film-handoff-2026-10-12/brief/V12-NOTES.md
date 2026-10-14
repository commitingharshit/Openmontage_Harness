# V12 — OpenArt hero shot + real product UI

**Output:** `film/out/agentic-office-launch-12.mp4`. 64.8 s, 1920×1080, 30 fps, H.264 + AAC. SHA-256 `17b43eb6781958c45a41a0c21ab031f8d3e62de4259963a043fbe6551b18f160`. Built 10 Oct 2026. Not published, nothing committed.

Rebuild: `cd film && npx remotion render src/index.tsx AgenticOfficeLaunch12 out/agentic-office-launch-12-picture.mp4 --muted --concurrency=4 --timeout=120000 --crf=16 && npm run mux`. `node_modules` is a symlink to the installed toolchain in `../../videos/agentic-office-launch-02-remotion` (Remotion 4.0.534).

## Look and camera (dark-only cut, 10 Oct 2026)

- **Dark everywhere:** every stage is dark and every UI shot is the real dark app. Light Figma prototypes are no longer used. The only light frames left are the opening seconds of the S01 OpenArt clip; a dark regeneration is prepared (`pilot-s01/s01-start-dark.png`).
- **Camera:** one camera (`MainCam` in `film/src/Film.tsx`) moves over the real recording from 6.6 s to 36 s.
  - Whole-app views are centred.
  - Detail views lift a single real UI piece out of the app and use the free side for big type: the file tree on the left, the Assistant panel on the right, and the slide, popover or memo page on the left.
- **S04 agent steps:** "Reading your files…" and each reviewed file (recording 70–76 s).
- **S05 (28.6–36 s):** uses one recorded task end to end (recording task 3, 126–145 s: DACH Q4 8.9 → 8.5, memo €71–73m → €74.6m). The Changes list on the right matches exactly the tracked memo, the model cell with its own Reject/Accept bar, and the accepted memo shown on the left. The popover screenshot and the task-1/task-2 frames are no longer mixed into this section.
- **S06 collaboration (36–43.8 s):** real footage of the app's live session (`clips/collab-take.mp4`). It covers presence, the Room view, a live §3 edit, a proposal card, Accept and the €74.6m update. The teammate and her Assistant are scripted; the label is "demo session, simulated teammate". See `incoming/ui-recordings/CAPTURE_LOG.md`. Your own Assistant isn't shown: the app's 2-minute invite expires before the real agent joins.
- **S07:** "You review. You decide." uses the real plan steps with Keep / Undo (recording 29.5 s).
- **S08:** the background shows real dark app frames.

## Sources used

| Source | Where it appears |
| --- | --- |
| Locked V11 script and narration (9 Kokoro stems), V11 jazz-funk bed and SFX | Whole film. The mastered V11 audio track is muxed unchanged, so speech and music sync is identical to V11. |
| OpenArt Veo 3.1 clip `s01-merge-veo-720p.mp4` (start/end frames designed locally in `pilot-s01/frame.html`) | S01 0–4.9 s, landing on the exact local end frame |
| Harshit's product recording `incoming/ui-recordings/agentic-office-demo.mp4` | S02 workspace, S03 file tree, S04 prompt typing, agent working and new lender deck, S05 Changes panel, Accept-all result and accepted memo |
| Team screenshot `diff-live.png` (real UI) | S05 "Accept or reject" popover, cropped below the "Suggested by Hermes" title |
| Figma prototypes: `collaboration-prototype.png`, `agent-activity.png`, `board-memo.png`, `fy26-model.png`, `board-deck.png`, `related-documents.png` | S06 team, S07 "You review. You decide.", S08 background screens. All are labelled as prototype. |

Not used: the Excel inline Accept/Reject frame was dropped in favour of the real popover. Harshit's light-mode screenshots/clips aren't used yet; they aren't on GitHub (newest remote commit is `477aff1d`, 6 Oct, "dark mockup").

## Honesty labels on screen

- "Product UI · real recording": real app. Add "· sped up" where the source was time-compressed (S04).
- "Collaboration design · prototype", "Agent activity · design prototype", "Design prototype screens" and "Illustration" (S07 agent diagram).
- "Cloud AI may process document content." stays readable in S03.

The demo approves with **Accept all**. The film shows the per-change controls and the accepted result; it doesn't claim a single accept or reject was clicked.

## OpenArt spend

204 credits in total (PixVerse test 84, failed text; Veo 3.1 retry 120, used). Balance is 3,796. Full log: `incoming/openart-generations/CREDIT_LOG.md`.

## Open items before public release

1. Harshit's light-mode build or screenshots: push or share them to swap S02–S05 to light UI. Checked 10 Oct: no light mode on any GitHub branch; `ui-revamp` is fully merged into `master` (last push 6 Oct, "dark mockup").
2. Real clips for collaboration (Room tab, second person) and a two-agent handoff, to replace the S06/S07 prototypes.
3. Product name check. The recording composer shows "No model", and the tracked-change author in the recording is "Hermes", which is avoided in the film.
4. Official CTA (the closing now uses the app icon from `Agentic_Office_ultra/vscode/resources/darwin/code.icns`, confirmed by the user as the logo), a final voice recording, and rights for the inherited SFX.
