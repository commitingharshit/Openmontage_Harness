# OpenArt credit policy — local first, one approved job at a time

Added at the user's request on 10 October 2026. The user reports a $13 subscription. Actual plan, remaining balance, chosen model/settings and job cost are not yet checked in their account. **Current mode is planning/local previews; authorized OpenArt spending is 0 credits.** Updating these documents is not approval to generate.

## Pricing context, not an account balance

OpenArt's published Starter allowance was 4,000 credits/month when checked on 10 October 2026. Its “up to ~50 videos” estimate excludes Director; it is not a guarantee of 50 complete launch films. Confirm the user's actual plan and live remaining balance. Check the displayed cost for the exact operation/settings before spending; do not hard-code today's prices or assume an unused allowance. [Official pricing](https://openart.ai/pricing)

Use hypothetical arithmetic for planning: ten attempts quoted at 200 credits each would total 2,000 credits. That is half of a 4,000-credit allowance, but not a price quote for our shots. Don't budget on promised refunds for disappointing creative results.

## Stage gates

1. **Local preflight:** lock script and claims; map the supplied UI; approve styleframes; preview layout, typography, card paths, transitions, readable holds and audio timing locally. Use existing footage/stills and placeholder plates. Local work consumes no OpenArt credits; Claude and other services have separate usage/costs. Don't call paid generation services to create “local” previews.
2. **One paid pilot, only after approval:** choose one representative short background/transition plate, one output, and settings whose quoted cost fits the approved pilot cap. A local preview cannot predict generative quality, so do not skip the pilot or treat it as free.
3. **Review pilot:** inspect actual motion and first/middle/last frames for stability, color, safe UI area and matching poses. Log usage. Decide whether OpenArt adds enough value before spending more.
4. **Selective production:** propose initially 2–4 reusable plates, not 64.8 seconds of fully generated film. The five prompt variants in the shot plan are options, not jobs to auto-run. Submit one explicitly approved job at a time. Reuse approved assets across shots; keep UI/text and precise choreography editor-owned.
5. **Local assembly/export:** composite authentic UI and exact text, synchronize to final audio, review and export locally. Fix local motion in the editor. If a generated asset needs replacing, quote/approve that specific shot again; never rerun the whole film automatically.

## Pilot budget and approval

Let **B** be the confirmed available credit balance immediately before the first pilot. Propose a cumulative pilot cap **C = floor(0.10 × B)** credits. At B = 4,000, C would be 400; if B is lower, the cap is lower. Record that starting balance and fixed cap. Do not reset the 10% calculation to authorize more trials, and do not automatically raise the cap after a credit refill.

The user must approve both the cap and the exact job. If the proposed model costs more than C, offer a shorter/lower-cost configuration, stay local, or ask the user to explicitly approve a revised cap—do not silently switch settings or exceed it. The pilot cap is not permission for later production. Quote and obtain approval for production spending separately.

Before **every** credit-consuming operation (image, video, audio, variation, upscale, extension, additional output, rerender, etc.), present:

| Required field | What to show |
| --- | --- |
| Purpose | Shot ID, why this generation is needed, and why an existing/local asset isn't sufficient |
| Request | Prompt, any input asset, model, duration, resolution/aspect, number of outputs, and all chargeable settings |
| Credit quote | Displayed estimated cost for this exact job; separate line items for any additional operations |
| Budget | Current balance, pilot/production cap, spend-to-date, and remaining approved budget |
| Approval | Ask for explicit approval of this job/cost; visual approval or general “continue” isn't spending approval |

If cost/balance is unavailable, settings change after approval, or the quote exceeds the remaining cap, stop before submission. Never promise that a displayed estimate is a guaranteed final charge. Do not use an uncertain estimate to justify a large batch.

## Execution safeguards

- No full-film Director/One-Click job, batches, parallel paid submissions, automatic retries, automatic top-ups, plan upgrades, or purchases under this initial workflow.
- Do not allow an agent/tool loop to regenerate until it likes the result. One job means one approved submission, not an open-ended quality target.
- Check job ID/status and credit usage before considering another submission. Polling an existing job is not a new generation; do not mistake a slow/unclear result for authorization to resubmit.
- Stop and ask the user if cost exceeds the quote, actual deductions can't be reconciled, a job is stuck, or the approved cap is exhausted. Preserve the result/status/log for diagnosis.
- Treat completed-but-unusable outputs as spent for budgeting. Verify the provider's actual failure/refund policy rather than relying on restoration.
- Save approved results locally; no regeneration just to redownload or change an editor-owned label. Keep real UI, exact text, private documents and credentials out of generated plates.

## Credit log

Create `incoming/openart-generations/CREDIT_LOG.md` when the user approves the first paid job. Until then, no spent-credit entries should be invented. Record:

| Job ID / shot | Model and settings | Quoted credits | Explicit approval / cap | Balance before → after | Actual charged credits / evidence | Status / saved asset |
| --- | --- | --- | --- | --- | --- | --- |

Record quote vs actual separately. Account balance changes can include concurrent usage or pending/refunded charges; don't call the difference a confirmed per-job cost without evidence. Keep failed/unusable attempts in the cumulative pilot spend unless a credit restoration is actually confirmed.

No OpenArt credits were consumed preparing this handoff or adding this policy. This is a behavioral guardrail for Claude, not a technical guarantee that provider billing cannot overspend; explicit quotes, sequential jobs and user review remain necessary.
