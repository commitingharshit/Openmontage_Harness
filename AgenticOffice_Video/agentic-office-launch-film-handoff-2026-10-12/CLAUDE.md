# Agentic Office launch film: workflow handoff

This folder holds the working setup for the Agentic Office launch ad, so a teammate can keep editing it with Claude Code. Open this folder in Claude Code and it will read this file first.

## First-time setup

Run this once from this folder (macOS):

```bash
sh setup/setup.sh
```

It does four things:
1. Installs the Claude Code skills we use (`setup/claude-skills/`) into `~/.claude/skills`. These are the HyperFrames video skills: `hyperframes`, `-core`, `-animation`, `-audio`, `-creative`, `-keyframes`, `-cli`, `-registry`, `-studio`, `media-use`, `motion-graphics`, `product-launch-video`, `general-video` and `faceless-explainer`, plus `apple-design` for motion and polish. Skills you already have are left alone.
2. Installs Node, ffmpeg and Python (through Homebrew) if they're missing, plus `kokoro-onnx`.
3. Downloads the Kokoro voice model (about 350 MB) into `~/.cache/hyperframes/tts`.
4. Runs `npm install` in `film/` and type-checks the project.

Restart Claude Code afterwards so it picks up the skills. To get newer versions of the HyperFrames skills later, run `npx skills add heygen-com/hyperframes`.

We also use two optional Claude Code plugins that keep Claude's replies short and its code minimal. Install them inside Claude Code with:
```
/plugin marketplace add JuliusBrussee/caveman
/plugin install caveman@caveman
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

## What we're making

A 60–63 s 1920×1080 30 fps launch ad for **Agentic Office**, an agentic, collaborative workspace where Word, Excel and PowerPoint files live together and an assistant drafts the edits for a person to review. The audience is consultants, finance teams and lawyers.

There are three cuts in `videos/`:

| File | Composition | Story |
| --- | --- | --- |
| `agentic-office-launch-27.mp4` (63 s) | `AgenticOfficeLaunch22` in `film/src/Film22.tsx` | Team's 23 s opening (chatbot false promise, broken formatting, client email, "What if AI could finish the work?"), then the real app flow, closing with "Agents that work with your work… not against it." |
| `agentic-office-launch-21e.mp4` (61 s) | `AgenticOfficeLaunch21` in `film/src/Film21.tsx` | Open loop + Before/After/Bridge (`brief/SCRIPT-v21-draft.md`), closing with "Change it once. Every file follows." |
| `agentic-office-launch-20.mp4` (77 s) | `AgenticOfficeLaunch19` in `film/src/Film.tsx` (64.8 s body) | The team's opening (`film/public/clips/before.mp4`, ~12.4 s) joined in front of the light V19 body, which runs on the V18 script (`brief/SCRIPT-v18.md`). |

`Film.tsx` (V19/V20) holds the shared building blocks (camera, stage, chips, colors `C`, easing `k`) that all three cuts import.

## The workflow

All of it runs locally and costs nothing except the optional OpenArt step.

1. **Script.** Write or edit the voiceover lines (see `brief/`). Every claim has to pass `brief/CLAIMS_AND_DECISIONS.md`.
2. **Voice (Kokoro TTS, local).** Put the lines in a JSON file and run:
   ```bash
   pip install kokoro-onnx soundfile
   python3 audio/tts.py audio/lines-v27.json audio/vo/v22
   ```
   This prints each stem's duration. Use voice `af_heart` (narrator, speed 1.06) and `bm_george` (the client email). The model files location is explained at the top of `tts.py`. The V21 lines and timings are in `audio/vo/v21/vo.json`.
3. **Picture (Remotion 4.0.534, React).** Scenes are timed in **absolute seconds** taken from the stem durations. Each scene in `Film21.tsx`/`Film22.tsx` has a comment with its time range and the voiceover line it carries. Edit those, then preview and render:
   ```bash
   cd film && npm install          # Node 18+; also needs ffmpeg (brew install ffmpeg)
   npx remotion studio src/index.tsx
   npx remotion render src/index.tsx AgenticOfficeLaunch22 out/v28-picture.mp4 --muted --concurrency=4 --crf=16
   ```
   Assets are loaded with `staticFile()` from `film/public/` (`ui/` screenshots, `clips/` real recordings, `fonts/`).
4. **Mix + mux (ffmpeg).** Lay the stems over the jazz-funk bed, master to −16 LUFS, and attach the result to the silent render:
   ```bash
   sh audio/mix.sh film/out/v28-picture.mp4 videos/agentic-office-launch-28.mp4 o1@0.4 o2@3.1 v05@24.9
   ```
   The script reproduces the method; the volumes are tuned by ear. If the picture timing hasn't changed, mux the existing `audio/mix-v27.wav` / `mix-v21e.wav` instead.
   To rebuild V20, render `AgenticOfficeLaunch19` (silent, 64.8 s), put the silent team opening `film/public/clips/before.mp4` in front of it, and lay `audio/mix-v20.wav` (the full 77 s soundtrack) over the result:
   `ffmpeg -i film/public/clips/before.mp4 -i film/out/body-picture.mp4 -i audio/mix-v20.wav -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=0.4[o];[o][1:v]concat=n=2:v=1[v]" -map "[v]" -map 2:a -c:a aac -b:a 320k -shortest videos/agentic-office-launch-20b.mp4`
5. **QA.** Pull frames at key times (`ffmpeg -ss 12.5 -i video.mp4 -frames:v 1 f.png`) and check text, labels and audio sync. Keep every version as a new file (v28, v29…). Never overwrite an older cut.

## Folder map

| Path | Contents |
| --- | --- |
| `film/` | Remotion project: `src/` compositions, `public/ui` (real app screenshots and Figma frames), `public/clips` (real recording cuts and the OpenArt Veo clip) |
| `audio/` | `tts.py`, `lines-v27.json`, `mix.sh`, VO stems with `vo.json` line/duration lists (`vo/v18` for V20, `vo/v19-hook`, `vo/v21`, `vo/v22` for V27), music bed and SFX (`music/`), and the final mixes for each cut (`mix-v20.wav`, `mix-v21e.wav`, `mix-v27.wav`) |
| `ui/recordings/` | Raw real product recordings (`agentic-office-demo.mp4`, collab demo) and `CAPTURE_LOG.md`, which maps the actions to timestamps |
| `ui/references/` | Reference films: the team's ad (`Agentic_Office_Ad_16x9-divya.mp4`, source of the opening in `clips/before.mp4`) and the earlier V4/V5 cuts |
| `ui/screenshots-figma/` | Figma prototype captures, with their source link in `README.md` |
| `ui/openart/` | OpenArt generations and `CREDIT_LOG.md` |
| `brief/` | Original brief, creative direction, claims, credit policy, scripts (V18, V21 draft, hook VO, final V11 script) |
| `setup/` | `setup.sh` and the bundled Claude skills |
| `tools/master-audio.mjs` | Older loudness-mastering script (V11). Same −16 LUFS target as `mix.sh`. |
| `videos/` | The three cuts (27, 21e, 20) |

## How we work

- **Claude Code does the editing.** We give it feedback in plain words ("hook is slow", "make the close punchier"). Claude edits the `.tsx` scene, renders, grabs frames at the changed moments, looks at them, and fixes things before showing us the result. Ask it to show frames whenever you want a quick check.
- **Every change is a new version number.** Render to `film/out/vNN-picture.mp4`, mix, and save as `videos/agentic-office-launch-NN.mp4`. Small fixes get a letter (21b, 21c…). Never overwrite an older cut, because the team compares them side by side.
- **To make a new cut, copy a composition.** Duplicate `Film22.tsx` to `Film23.tsx`, register it in `src/index.tsx`, and keep reusing the shared pieces from `Film.tsx` and `Film21.tsx`.
- **The voice comes first, then the picture.** Generate the VO, read the durations, and set the scene start times from them. When a line changes, regenerate only that stem (give it a new id like `o3b` or `o5f`) and shift the scenes after it.
- **Keep it cheap and local.** Remotion, Kokoro and ffmpeg are free. Use OpenArt only for an approved single abstract shot.
- **Only real UI.** If a scene needs product footage we don't have, ask the product team (Harshit) for a recording. Don't fake it. To add a new recording, put it in `ui/recordings/`, log its actions and timestamps in `CAPTURE_LOG.md`, cut the part you need into `film/public/clips/` with ffmpeg, and crop stills into `film/public/ui/`.
- **Show scripts as tables before building.** Put options (hooks, slogans) side by side with a recommended pick, and check each claim against the real demo.
- **No commits, uploads or publishing** unless someone asks.

## Rules (don't break these)

- **Never generate or repaint product UI.** Only composite real screenshots and recordings. AI images and video are allowed only for abstract plates and transitions.
- Label honestly on screen: "Product UI · real recording" (add "· sped up" when sped up), "design prototype" for Figma frames, "illustration" for the generic chat and documents. The collaboration footage is a demo session with a simulated teammate.
- The assistant **drafts** and a **person accepts**. Never imply unattended approval or sending.
- "Stored on your device" always appears with "Cloud AI may process document content."
- Say "agentic", not "AI-powered" (except in the team's hook line). Formats are Word, Excel and PowerPoint only; no PDF editing claims. Don't invent numbers. The figures come from the real task-3 recording: 10 changes across 3 files, €71–73m → €74.6m.
- The app's tracked-change author name "Hermes" and the "No model" picker are covered in the film (see the comments in `Film21.tsx`).
- **OpenArt costs credits.** Read `brief/CREDIT_POLICY.md`. Quote the cost and get approval for each single job. No batch or whole-film generation.
- The Kokoro voice is a draft voice. Replace it with a final voice recording before public release, and confirm the rights for the inherited music and SFX.

## Open items

- A real light-mode app recording (S02–S05 now use the dark recording or the light Figma frames).
- Real clips of collaboration and a two-agent handoff, to replace the prototype frames.
- The official CTA and link, the final voice, and music/SFX rights.
