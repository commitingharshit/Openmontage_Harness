# OpenArt visual upgrade — shot and compositing plan

Proposed treatment for review. The voiceover stays exactly as in `../script/FINAL_SCRIPT.md`; V11 timing is the edit reference. No new footage or styleframes are claimed to exist. Use a restrained, consistent material language and the reference's UI-focused depth—not a photographic film.

**Credit gate:** follow `CREDIT_POLICY.md`. First review locally; then quote/approve one short pilot within the user-approved test cap. The prompts below are alternatives, not a batch queue. After the pilot, propose only a few reusable plates, one approved job at a time. No whole-film generation or automatic retries.

## Layer ownership

OpenArt: abstract background motion, blank geometric cards, soft edge-light/transition plates. Editor/compositor: exact copy, file-format marks, product logo, cursors/clicks, lines/paths, labels, UI pixels, cuts, sound. Real recording: product behavior and results. Generated shapes do not become fake product controls.

Keep UI screenshots/recordings on an independent, aspect-correct plane. Avoid baking a blank moving viewport into a generated plate if it would require complex tracking: a clean background plate with foreground cards built in the editor is usually easier to keep precise. Treat the prompts below as creative instructions, not promises about current OpenArt account capabilities.

## Shot map

| ID / baseline time | New motion treatment | Real UI / editorial layer | Audio / readability |
| --- | --- | --- | --- |
| S01 / 0–5.4 | Three rounded work planes arrive on separate arcs. Tiny internal document lines, grid cells, and slide bars animate in the editor. Their paths tighten and converge into a single rounded frame; deep teal spreads from the merge point. Retain identity rather than dissolve into generic particles. | Editor adds Word, Excel, PowerPoint and “Your work. Three apps.” No product UI yet; no PDF. Opening → reveal is one continuous move. | One light accent per name, small breathing gaps. Drum-roll build during convergence; reveal lands at 5.4. |
| S02 / 5.4–10.2 | The same frame grows into the hero workspace; a brief depth tilt settles front-facing. Three file planes slide into the workspace's visual orbit, then park outside the capture. | Authentic memo → spreadsheet → deck, with file-format callouts outside UI. Keep product layout unchanged and show the common workspace. | Brand hit then calmer groove; “One agentic, collaborative workspace” gets a readable hold. |
| S03 / 10.2–18.6 | Light stage; file cards align into a local workspace tray. A short matched glide follows one file into the actual file tree, then returns to the full workspace. Subtle breathing edge light, not a security shield. | Real local-files capture when supplied. “Your files. Your device. Your workspace.” Then “Local file storage. No extra upload step.” Qualifier “Cloud AI may process document content.” remains readable. | Warm, confident VO. Avoid lock/blocked-cloud SFX or graphics suggesting unverified security. |
| S04A / 18.6–24.6 | Push into composer, reveal source memo/forecast context; a thin editorial route joins both source cards into an agent marker outside UI. One deliberate submit beat. | Real typed prompt/action preferred. The exact prompt is visible. Keep prototype label if using existing stills. Do not generate typing, progress percentage, or agent status as fake app UI. | Small submit tick, purposeful rising snare. Hold the prompt long enough to read. |
| S04B / 24.6–29.4 | A proposed presentation card travels into the same main viewport. Camera eases out to show an actual slide/deck on the main screen—not a floating unexplained PPT icon. | Real generated output capture; existing board-deck.png is only prototype/design fallback. “Proposed deck” is editorial text. Preserve actual generation/output timing; compression needs honest editing. | Output accent at actual reveal; no guarantee of instant processing implied. Hold a legible slide. |
| S05 / 29.4–36 | Matched close-up to the tracked paragraph and suggestion popover. One outlined focus frame accents Accept, then Reject. An editorial removed/revised line graphic stays outside the UI. | Use diff-live.png for honest screenshot close-up. Replace with real clicks/results when provided. No invented acceptance outcome. | Short, dry accents, quieter bed. Controls/readable diff are the payoff, not rapid camera movement. |
| S06 / 36–43.8 | Same workspace splits editorially into two teammate planes and joins again; team markers stay associated with the same document. One presence pulse, one contribution, one proposal—sequentially. | Genuine collaboration recording. Existing collaboration-prototype.png stays labeled design/prototype. Names/avatar graphics are editorial and should use approved demo identities. | Alternating light rhythmic accents suggest teamwork. Re-establish full workspace before exit. |
| S07 / 43.8–53.4 | Two distinct person+agent pairs. A document packet follows one clear route to the other agent, returns with a handoff, then becomes one proposal beside the actual shared room. Motion resolves at a human review marker. | Shared context → handoff → proposal labels outside UI. Use authentic agent/room capture; preserve illustration label until proof exists. “You review. You decide.” gets the stillest, clearest hold. | Call-and-response accents; snare build ends at proposal, not an unapproved send. No noisy unrelated streams. |
| S08 / 53.4–58.2 | Kinetic “Less copying.” / “Less rework.” / “More time.” Work cards reconnect on each beat and gather into the same frame used in S01. | Three qualitative benefits; no numerical counter. Keep workspace present so value isn't detached from product. | Three clean synchronized typography hits. Maintain speech intelligibility; deliberate holds, no blank frames. |
| S09 / 58.2–64.8 | Gathered pose from S08 persists into close. Files, team, agents align into one cohesive lockup with soft settling motion. No new visual metaphor. | Agentic Office wordmark; “One workspace. You stay in control.” Official CTA only after supplied/approved. | Final reveal/chord tail and 1–1.5 seconds of clear brand hold. Don't cut the VO or final waveform abruptly. |

## Three styleframes to approve first

1. **Merge / reveal:** three recognizable work cards around a spacious title, frozen just before becoming one viewport. Confirm the workspace proposition is obvious without narration.
2. **Prompt / output:** real composer + selected memo/forecast context, with the proposed deck opening on the same main screen. Confirm no generated UI or fake “instant” result.
3. **Team / agents:** actual shared-room UI, two person+agent pairs, one readable handoff route, and the final human-review anchor. Confirm nontechnical viewers can distinguish people and agents.

## Common prompt prefix

Use this with each shot-specific instruction, adapting only to capabilities actually available in the user's account:

> Premium abstract motion-design plate for a professional workspace product launch, 16:9 composition. Clean off-white paper field (#F5F8F8), deep teal (#132D34), teal accent (#066D82), pale cyan edge light (#75D6E5), soft precise contact shadows. Minimal rounded geometric planes, consistent material and lighting, restrained depth, smooth physically coherent motion with a clear start, readable settle, and controlled ending. Spacious negative space reserved for composited real product interface and editor-owned typography. No text or logos. No photographic environment. The camera is stable except for a subtle authored parallax move.

## Generation prompt variants

Generate short reusable units rather than ask for the entire 64.8-second film in one pass. Suggested durations below are editing intentions; adapt to the model's available lengths. Reject wobbling geometry and unintended symbols. For UI-heavy scenes, a simple clean plate is better than an impressive plate that fights the capture.

### P01 — three-to-one background, about 5 seconds

> Three blank rounded rectangular planes, one blue-tinted, one green-tinted, one warm-orange-tinted, begin widely separated on a clean paper stage. They anticipate gently, follow smooth controlled arcs toward a single centered rounded rectangular outline, then settle into a balanced compact arrangement. Subtle contact shadows give depth. At the end, a deep-teal matte expands behind the shared frame. Preserve each plane's identity and shape; no dissolving, no particle explosion. Keep the center and top-middle clear for precise text added later. No letters, icons, logos, app interface, people, office, laptop, or screen.

Production note: If generation cannot preserve the exact card paths/merge pose, use this only as a background light/transition plate; build the three cards and shared frame deterministically in the editor.

### P02 — deep-teal UI stage, about 5 seconds

> Deep-teal minimal field with a restrained pale-cyan light bloom behind the right two-thirds of the frame. Very subtle slow parallax in two distant translucent geometric planes near the outer edges, never crossing the central UI-safe rectangle. Soft edge light, clean professional finish, no visual clutter. Begin and end in stable poses suitable for a front-facing product UI composite. No text, fake interface, keyboard, device, glowing circuitry, neon tunnel, people, or photographic material.

Use behind reveal/output/coordination UI, with actual viewport/text layered separately.

### P03 — light workspace plate, about 5 seconds

> Off-white minimal stage with a very faint teal horizon/edge bloom and soft layered geometric shadows at the lower left. Calm precise motion: one translucent blank rounded plane glides a small distance and settles at the edge, leaving the right two-thirds entirely clear for a product UI composite. Flat enough for a clean readable screenshot, subtle depth only. No lock, shield, cloud, upload icon, text, logo, people, device, or fake UI.

Use behind local-files/review/team scenes. Do not encode a privacy guarantee visually.

### P04 — context / handoff atmosphere, about 5 seconds

> Minimal deep-teal stage with two soft pale-cyan light pools at the left and right and one restrained light pulse traveling between them before returning to a central settle. Large negative space; no nodes, symbols, paths, lettering, or interface. Stable lighting and smooth motion, not a science-fiction network or particle storm. A professional abstract backdrop for clear diagrams and authentic collaboration UI added in an editor.

Draw the actual route, packet, labels, people, and agents in the editor so their identities and timing remain exact. No generated graph becomes a product screenshot.

### P05 — closing light settle, about 4 seconds

> Clean deep-teal field. A restrained pale-cyan edge bloom gently expands, then resolves to a stable quiet background with strong central negative space for a brand lockup added later. A few distant blank rounded planes at the margins settle and become still; coherent geometry, soft shadows, no dramatic flare. No text, logo, people, app screens, confetti, glitch, camera shake, or abrupt black ending.

## Shared negative prompt / rejection criteria

No text, gibberish lettering, logos, watermarks, generated product controls, cursor, menus, screenshot simulation, people, hands, office, laptop, photographic footage, PDF symbol, locks/shields, blocked cloud, neon/cyberpunk, glitch, random particles, spinning cubes, changing card count, morphing UI, warped rounded edges, flicker, jitter, unwanted abrupt camera movement, or clipped frame edges.

If a chosen model has no negative-prompt field, incorporate exclusions into the main instruction and judge the output against them. If it has no alpha/end-frame controls, use a full-stage background and editor-owned transitions; don't promise unsupported features.

## Acceptance checklist for each generated plate

Inspect beginning/middle/end and actual motion. Check palette, stable geometry, consistent lighting, clean safe area, no accidental text/UI, usable handles, and matching adjacent poses. Record actual settings and license/usage review. Select only approved plates; do not fill the film with every generation.
