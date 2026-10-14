# How: long AI scenes with native sound (sBlS_d6PUWc)
"How to Make Long AI Videos With Realistic Sound", Thomas Creates, 2026-09-17, 10:46. Sponsored by Higgsfield. Transcript from whisper (captions returned 429). Prompts read off frames.

## Workflow
1. **Pre-production.** Pick one scene (a man on a raft in a storm). List every entity that recurs: the character, the location and the key props.
2. **Character sheet.** Image tab, Nano Banana Pro [PAID], 16:9, **2K**. 2K is enough for 1080p; 4K wastes credits.
   - Start from a 3-angle sheet (front, side, face).
   - Change only the wardrobe, and say nothing else may change.
   - Sources: generate from a description, photograph a real person, or use web images.
   - Save it as an Element: `@Maincharacter`.
3. **Location.** Use the same settings, generated or from real photos. Save it as `@Environment`.
4. **Prop.** One plain image on flat grey, weathered, "no panel grid, no multiple views". Save it as `@Raft`. A simple shape needs 1 angle; a face or body needs 3.
5. **Generate.** Seedance 2.5 [PAID], preset General, 24 s, 16:9, 1080p, bitrate High, **audio on**. Tag all the elements with `@`.
6. **Continue.** A second prompt starts where clip 1 ended. Same elements; change only the duration (30 s).
7. **Edit.** CapCut (free; any editor works). Put the clips in order. Export at 1080p, the project's frame rate and bitrate Higher. Never upscale on export.
8. **Sound.** No post sound. Rain, thunder, impacts and dialogue all come from the generation.

## Tools
- Higgsfield [PAID]: all models; Elements = saved references.
- Nano Banana Pro [PAID]: reference sheets and outfit edits.
- Seedance 2.5 [PAID]: multi-shot video with native audio, up to 1080p.
- CapCut: joining the clips.
- Free: videoprompt.studio prompt generator.

## Prompt patterns (on screen)
To fix an image, **name the wrong version**:
> "a modern capsized motorboat … — not an old wooden sailboat, not a torn sail, no oil-painting aesthetic"

Also "No lightning anywhere in this image" and "Kodak Vision3 250D character, natural 35mm film".

The video prompt is written as labelled blocks:
```
@Maincharacter is the character reference sheet. @Environment is the storm
environment reference. @Raft is the raft reference photo — EXACT SHAPE LOCK.
FIRST FRAME: extreme close-up on his face, soaked hair, water dripping…
FORMAT MODE: three-segment sequence, hard cuts and one camera move. CONSTANT
REAL-TIME PLAYBACK SPEED FROM FIRST FRAME TO LAST FRAME.
SEGMENT 1 (0:00–0:08) — …   CAMERA MOVE (0:08–0:12) — camera pulls back and arcs sideways…
AUDIO: continuous rain-and-wind bed, … one thunder crack at the wave's peak,
one heavy impact sound, his grunt, one clean splash. No music.
NEGATIVE: ABSOLUTELY NO SLOW MOTION ANYWHERE IN THE CLIP, no camera positioned
directly in front of him, no static raft in Segment 1, no underwater filter…
```
Dialogue goes inline: `screams up toward the sky: "Help! Somebody help me!"`

## Consistency
- A text description alone drifts, even within one shot. Always give the model a reference to copy.
- Anything that appears in more than one clip gets its own Element, tagged in every prompt with "EXACT SHAPE LOCK, must match precisely in every segment".

## Shot planning
- One generation is a mini-sequence of 3–5 timed SEGMENTS, with cuts and camera moves inside it.
- Always state the FIRST FRAME. Shown: ECU, then pull-back.
- The next clip continues from the last clip's end state.

## Camera / transitions
- ECU-to-wide reveal; pull back and arc; explicit off-axis ("camera off to his side, not head-on"); plain cuts between generations.

## Pacing
- Write "no slowing, dragging, or dramatic deceleration" or it drifts to slow-mo.

## Quality checks
- Stills: water too smooth, a "bad CGI" or cartoon look, the palette.
- Video: the face matches the sheet, the physics look right (droplets, wave impact), and the audio follows the AUDIO block.

## Warned mistakes
- Adding realism adjectives to fix a bad image. Name the unwanted thing instead.
- Split-second flashes (lightning) in stills.
- **Underwater shots longer than about 2 s** muffle all the audio after them. Keep them to 2 s or less and write "clean throughout, no underwater sound treatment".
- **Small actions get skipped**: "takes out phone" makes the phone just appear. Write out the whole motion ("hand goes down to pants pocket, digs in, physically pulls the phone out") and its sound ("a faint fabric rustle").
- 4K work in a 1080p pipeline.

Free alternatives: none named for generation.
