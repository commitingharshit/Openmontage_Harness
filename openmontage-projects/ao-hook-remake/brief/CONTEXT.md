# ao-hook-remake: context

**Started:** 2026-10-13.

**Goal:** keep the colleague's V27 cut (63 s) and its script, flow and voiceover. Replace only the visuals of the hook (0–~23 s), the part before "Agentic Office." is introduced.

**Sibling project:** `../agentic-office-false-promise`, the "Diffs" launch film (v14). Its asset bank can be reused here:
- Canva Maya clips in `kling/`
- Meta stills in `visuals/meta/`
- critics in `brief/critics/`

## Source
- `visuals/source_cut_v27.mp4` is the WhatsApp copy at 848×480. It matches `~/Downloads/WhatsApp Video 2026-10-11 at 23.29.18*.mp4`.
- The full-quality master is in the handoff folder, `~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12/`:
  - `videos/agentic-office-launch-27.mp4`
  - composition `AgenticOfficeLaunch22` in `film/src/Film22.tsx`
  - VO stems in `audio/vo/v22/` (Kokoro `af_heart` 1.06; the email uses `bm_george`)
  - final mix in `audio/mix-v27.wav`

## Current hook (what we're replacing)
The visuals are flat UI illustrations on a pale mint background, all labelled "ILLUSTRATION". There are no people, no place and no emotion.

| t (s) | VO | Current picture |
|---|---|---|
| 0–6 | o1 "You ask a chatbot to update an agreement." o2 "It writes back: here's your revised agreement." | A generic chat card. The reply reads "Here's your revised agreement ✓". Super: "AI said it was done." |
| 6–9 | o3b "Then you open the file… and the formatting's wrecked." | The Supply_Agreement doc with red tags for "Template gone" and "Numbering wrong" |
| 9–12 | o4 "So you fix it by hand. Then, an email." o5f (George) "Please add the updated financial annexure and the presentation, before the meeting." | Doc stub plus a partner notification card |
| 12–18 | o6 "Five tabs. Copy. Paste. Check. Repeat." | Stack of five window cards. Super: "The work had just begun." / "Copy. Paste. Check." |
| 18–20 | (beat) | Files fanned out, "Meeting in 15 min", a red 8:52 |
| 20–23 | o7 "What if AI could finish the work?" | Kinetic type |
| 23+ | v05 "Meet Agentic Office…" | Logo, then the real UI. **Keep from here on.** |

## Constraints (carried over)
- Budget is $0. Picture sources:
  - Canva AI, Qwen (about 1 clip per account per day), Meta AI stills and Gemini, driven through the logged-in browser
  - stock from Pexels and Mixkit
  - Remotion/HyperFrames for graphics
- Never show the tracked-change author "Hermes".
- Claims must pass the handoff's `brief/CLAIMS_AND_DECISIONS.md`. The user overrode its ban on AI-generated people for this campaign.
- Keep every version as a new file. Never overwrite.
