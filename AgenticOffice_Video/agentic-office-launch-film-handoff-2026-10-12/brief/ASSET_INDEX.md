# Assets, provenance, and limitations

All paths are relative to this handoff root. `manifest.json` holds file sizes, hashes, original workspace-relative locations, and categories. No credentials, dependencies/cache folders, private feedback screenshots, or redundant historical renders are included.

## Picture

| File | Origin / use | Limitation |
| --- | --- | --- |
| baseline-remotion/public/ui/board-memo.png | Supplied Figma prototype, 1378×895; document workspace | Prototype still, not live behavior |
| baseline-remotion/public/ui/fy26-model.png | Supplied Figma prototype, 1378×895; spreadsheet workspace | Prototype still |
| baseline-remotion/public/ui/board-deck.png | Supplied Figma prototype, 1378×895; presentation workspace | Not proof of a deck being generated |
| baseline-remotion/public/ui/collaboration-prototype.png | Supplied collaboration design, 1600×1000 | Prototype/design, not live collaboration recording |
| baseline-remotion/public/ui/diff-live.png | Team-supplied actual edit UI screenshot, 1362×684 | Proves visible selective-review controls, not action/result |
| supplemental-ui/agent-activity.png | Earlier Figma capture, node 3-2 | Optional prototype still |
| supplemental-ui/related-documents.png | Earlier Figma capture, node 9-2 | Optional prototype still |

The Figma captures removed only viewer/margins/notice, not product content. Their source README is included under `supplemental-ui/`. Preserve all five primary PNGs byte-for-byte; overlays stay outside or clearly editorial. Incidental PDF filenames in a source capture are not promoted PDF editing.

## Audio / fonts

- `baseline-remotion/public/audio/voice/v11/01.wav` through `09.wav`: current local Kokoro `af_heart` voice stems. Use as reference/edit timing; a polished final VO may replace them after review/rights confirmation.
- `review/v11-narration-timed.wav`: current narration arranged on the film timeline.
- `baseline-remotion/public/audio/v11-jazz-rolls.wav`: original sample-free synthesized jazz-funk/drum-roll bed. `v11-jazz-rolls-carved.wav` is its speech-carved version. No YouTube recording was used. Composition origin is documented; don't describe unresolved third-party/model rights as legally cleared.
- `baseline-remotion/public/audio/sfx/`: four inherited effects (`001` impact, `003` click, `004` chime, `005` whoosh). License/provenance remains unresolved; replace or clear before public use.
- `baseline-remotion/public/fonts/`: Inter Regular/Bold as used by V11. Font license notice is not found in this bundle; verify/supply it before public redistribution of font files.

## Review and source

- `review/agentic-office-launch-11.mp4`: latest existing mastered cut, 64.8s, 1080p, 30 fps. Baseline SHA-256 `cc63d9760c0a040218ffd66b611c228cab37db11258c3f1d0f1e4a1afa13216c`.
- `review/qa/`: original V11 report, native/encoded contact sheets, samples/export metrics and audio measurements. These are prior validation evidence, not new feature verification.
- `baseline-remotion/src/`: current V11 CardStoryLaunch and geometry, with a new minimal root registering only AgenticOfficeLaunch11. This root/package script simplification is handoff-only; original project is unchanged.
- `baseline-remotion/SCRIPT-v11.md`, `STORYBOARD-v11.md`, `ASSET-NOTES-v11.md`, voice/timing JSON and lockfile preserve original production context. Dependency versions are pinned. No node_modules is included or installed.
- `baseline-remotion/scripts/master-audio.mjs`: original optional mastering utility. Requires FFmpeg and an unmastered render. New renders stay inside this snapshot's out directory.
- `baseline-remotion/scripts/reference-generation/`: original V11 narration/carve and score-generation sources, retained as reference only. They assume local Python/audio dependencies and may refer to historical caches/assets not copied; they are not one-click regeneration commands for a fresh machine.

## Missing / incoming

`incoming/ui-recordings/`: capture checklist only; no new genuine UI footage was provided in the scoped workspace. `incoming/openart-generations/`: log instructions only; no generated assets yet. Official standalone logo, approved CTA, polished final VO, and release sign-off still needed.
