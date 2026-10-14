# OpenArt credit log

Starting balance (checked 10 Oct 2026 via OpenArt MCP): **4,000 credits**, Starter plan.

Approvals:
- 10 Oct 2026: user approved a 400-credit pilot cap and the S01 keyframes.
- 10 Oct 2026: user instructed "Complete all the stuff in one shot. Try to make it as cheap as possible." This was treated as production approval. The cheapest plan is 3 generated hero shots on PixVerse V6 720p (~280 credits), with a hard ceiling of 450 credits including at most one retry. Submissions run sequentially, never in parallel.

| Job ID / shot | Model and settings | Quoted credits | Approval / cap | Balance before → after | Actual charged / evidence | Status / saved asset |
| --- | --- | --- | --- | --- | --- | --- |
| 6b8DOVMMlea3gDgVaRrW / S01 merge | PixVerse V6 image2video, start+end frame (s01-start.png → s01-end.png), 6 s, 720p, audio off, 1 output | 84 | Pilot cap 400 + production ceiling 450 | 4,000 → 3,916 | 84 (balance delta, no other jobs running) | COMPLETED → `s01-merge-pixverse-720p.mp4` (1280×720, 24 fps, 6.04 s). **Fails text check:** labels garble mid-clip ("Pofcrsproint", "Xanrcaat"), cards swap identity, and only two cards are visible mid-move. Usable: 0–1.5 s and the final frame only. |
| tCSbAWFENlgrSb4i9TGn / S01 merge (retry) | Veo 3.1 image2video, lite tier, start+end frame (same two frames), 6 s, 720p, 16:9, audio off, 1 output. Prompt adds "cards never overlap or swap labels" | 120 | Production ceiling 450 (the one allowed retry) | 3,916 → 3,796 | 120 (balance delta) | COMPLETED → `s01-merge-veo-720p.mp4` (1280×720, 24 fps, 6.0 s). **Passes:** real 3D card flips, the merge into the workspace, and labels legible when cards face camera. Minor duplicate-tab ghost at ~4.5–5.2 s; the edit crossfades to the exact end frame at 4.4 s. **Selected for S01.** |

Running total: 204 credits spent of the 450 ceiling. S07 and S09 were built in the editor instead (no spend) because their uploads need the picker widget; Veo upgrades for them are optional (~240).
