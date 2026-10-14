# How: long-form AI video, free tools (RI4LwxmpEys)
"STOP Paying: Make LONG AI Videos FREE & UNLIMITED", Malva AI, 2026-07-02, 11:46. Includes a Higgsfield ad. Transcript from whisper (captions returned 429). Prompts read off frames.

## Workflow
1. **Research.** Paste master prompt #1 into any free text AI (topic optional). It returns topics that get **views but have little competition**: title, hook, why it works, competition gap. Copy the whole entry for one topic.
2. **Structure.** Fill in master prompt #2 and choose 1 of the 6 ideas. The full build has these sections:
   - TONE
   - VOICE DESCRIPTION FOR QWEN3-TTS
   - SONG DESCRIPTION FOR SONAUTO
   - VISUAL STYLE RULES
   - FULL BLOCK-BY-BLOCK STRUCTURE
3. **Images.** Meta AI (free) → Create Image. Paste each block's image prompt, get 4 variations, and do every block in turn.
4. **Animation.** Pick the best variation → **Custom Animate** with that block's video prompt. Each clip is 5 s and silent. Regenerate failures freely and keep the clips in block order.
5. **Narration.** Pinokio → Qwen3-TTS (local, offline).
   - Download the VoiceDesign, Base and CustomVoice models.
   - In Voice Design, paste the voice description and the narration lines.
   - Voice design can't do long audio in one pass, so generate in parts.
   - Voice Clone only with the speaker's permission.
6. **Music.** Sonauto → Create → Simple. Paste the song description.
7. **Edit.** CapCut (free).
   - Put each clip with its block's narration.
   - **Speed-adjust each clip to fit its line.**
   - Lay the music under everything.
   - Use only transitions and effects without the diamond (paid) icon.

## Tools
| Tool | Use | Cost |
|---|---|---|
| ChatGPT / any text AI | research and script | free |
| Meta AI | images (4 per prompt) and image-to-video | free, unlimited, watermarked |
| Pinokio + Qwen3-TTS | narration, voice design or clone | free |
| Sonauto | instrumental bed | free |
| CapCut | assembly | free tier |
| Grok, Google Flow | rejected: paywall / tight limits | — |
| Higgsfield: GPT Image 2 → Seedance 2.0 | 4K stills; 15 s clips with camera/scene changes and sound | [PAID]. Free alternative: the Meta AI route |

## Prompt patterns (on screen)
```
VIDEO LENGTH I WANT: [WRITE THE APPROXIMATE LENGTH HERE, FOR EXAMPLE: 10 minutes]
FINAL VIDEO LANGUAGE: [WRITE THE LANGUAGE FOR THE NARRATION HERE, FOR EXAMPLE: English]
VIDEO FORMAT: [WRITE HORIZONTAL 16:9 OR VERTICAL 9:16. DEFAULT: HORIZONTAL 16:9]
SELECTED TOPIC FROM THE FIRST PROMPT: [PASTE THE FULL SELECTED TOPIC HERE]
First response instructions: Give me 6 different video ideas based on the selected topic.
```
Each block holds one narration line, one image prompt and one motion prompt:
```
BLOCK 001
Narration: A signal leaves a living world.
Image prompt: A cinematic view of an Earth-like planet at night from orbit, … realistic
CGI, dramatic contrast, horizontal 16:9, no text, no logos, no UI.
Video prompt: Slow push away from the glowing planet as translucent radio waves ripple
outward into space, … quiet ominous movement…
```
The voice description reads like a casting brief: "A cinematic male narrator voice, age range 35 to 50, deep but clear, calm and controlled…"

## Consistency
- Consistency comes from text, not references. One VISUAL STYLE RULES block fixes:
  - the aspect ratio;
  - the "realistic CGI documentary" look;
  - the palette (cold blue, black, violet, dim amber);
  - the lighting and the slow camera.
  Every image prompt repeats these.
- Topics without characters (space, landscapes) avoid identity drift.

## Shot planning
- One block is about 5 s of narration, one image and one 5 s clip. Numbering keeps the order mechanical.
- Each narration line is short and carries one idea.
- The hook is chosen at the topic stage.

## Camera / transitions
- One slow move per clip: push away, track alongside, or push toward.
- Free CapCut transitions in the edit.

## Pacing
- Narration drives the timing; speed-ramp clips to fit it.
- The music builds "from quiet dread to massive cosmic tension".

## Quality checks
- Choose the best of 4 images before animating.
- Regenerate bad clips.
- Iterate on the voice description.
- Value test: YouTube penalises low-value uploads, so the video must be "useful, entertaining, or teach something".

## Warned mistakes
- Direct Meta AI downloads carry a moving watermark. His workaround pulls the raw video URL out of the browser's inspect panel, which may violate the terms of service. Flag it before using it.
- Long single-pass Voice Design narration fails.
- Grok and Flow are too limited for long projects.
- Clips saved out of order break the block mapping.
