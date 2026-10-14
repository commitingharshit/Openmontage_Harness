# Research: real, public pain (for SCRIPT_v5)

*Collected 2026-10-12. Quotes are 15 words or fewer; everything else is paraphrased. Reddit and Wall Street Oasis block automated reads, so Reddit-specific threads are not cited; the sources below are the ones that could be opened and checked. "Vendor" = the page sells a fix, so treat its framing with care.*

## A. The AI only talks; the file never changes (execution gap)
1. **Hacker News, ecshafer, 2026-05-15**, https://news.ycombinator.com/item?id=48151528
   Asked an AI assistant for a slide. It made "an empty powerpoint slide with the default template", told them to download it, then gave separate text "to copy and paste it in".
   → Film: the chat's answer arrives as a download plus text to paste. The human does the assembly.
2. **Hacker News, deckar01, 2026-02-05**, https://news.ycombinator.com/item?id=46901034
   "It's just a chatbot app… it still doesn't do anything but chat." Asked for a Word document, they got a download link to a template.
   → Film: the chat says "Here's what to change", and the folder shows 0 of 4 files changed.

## B. AI-made decks break the template, the chart and the content
3. **Hacker News, irishcoffee, 2026-04-02**, https://news.ycombinator.com/item?id=47608376
   Gave an LLM a Word doc and the company PowerPoint template. The deck came back with no text from the source, and six content slides "were identical, and empty."
   → Film: the downloaded deck has the right slide count but the wrong content.
4. **Microsoft Tech Community, "PowerPoint company branding", 2024-02-29**, https://techcommunity.microsoft.com/discussions/microsoft365copilot/powerpoint-company-branding/4072079
   "the templates show in PowerPoint correct… copilot won't seem to utilize them." The poster had "spent tons of time" trying.
   → Film: "template lost" is the most common and most believable failure.
5. **Deckary blog, AI PowerPoint makers tested on a strategy deck, 2026-04-03**, https://deckary.com/blog/ai-powerpoint-presentation-maker *(vendor)*
   The AI "defaulted to generic bar charts and bulleted lists"; the waterfall chart was not met; **35 minutes of reformatting** to fix it.
   → Film: slide 4's chart becomes bullets; a red label reads "chart gone".
6. **MindStudio blog, AI PowerPoint add-in limits, 2026-05-09**, https://www.mindstudio.ai/blog/claude-powerpoint-add-in-limitations-cant-see-slides-hallucination *(vendor)*
   The AI reads a text version of the deck, not the picture, so when asked to update a chart it can "hallucinate those values".
   → Film: the chat's deck shows a number nobody gave it. This motivates the cross-check by hand.
7. **eesel blog, review of AI deck building, 2026-09-21**, https://www.eesel.ai/blog/claude-slides-review *(vendor)*
   The add-in "crashes and fails mid generation, so you need to redo the whole thing"; output is a first draft that needs finishing by hand.
   → Film: "Regenerate" leads to `_updated (1)`, then `_updated (2)`.

## C. Pasting AI text into Word (stray markdown, wrong formatting)
8. **Mac Power Users forum, cwc, 2025-04-13**, https://talk.macpowerusers.com/t/chatgpt-markdown-formatting-issue/40431
   AI text "pastes as plain text with broken formatting" in many apps, and adds stray tabs.
9. **Unmarkdown blog, "Why do asterisks appear when I paste from ChatGPT", 2025–26**, https://unmarkdown.com/blog/why-do-asterisks-appear-when-i-paste-from-chatgpt *(vendor)*
   Paraphrase: the copy button puts raw markdown on the clipboard, and Word has no markdown detection, so `**bold**`, `##` and table pipes `|` arrive as literal characters.
   → Film: the memo paragraph arrives as `**€74.6m**` in the wrong font, and the memo's Table 1 still says €71–73m.

## D. Re-uploading context in every chat (context tax)
10. **OpenAI Developer Community, GPT-4o memory regression thread, July 2025**, https://community.openai.com/t/bug-gpt-4o-memory-regression-context-loss-across-chats-and-inside-threads/1310926
    "Asks to upload the same document every few minutes and forgets what we are doing." (2025-07-09)
    "Every new chat starts from zero" (2025-07-29)
    → Film: a new chat asks her to "upload the files again"; the upload chips crawl a second time.

## E. Version sprawl (final_v7)
11. **Hacker News, many authors, 2025–2026** (Algolia search for "final_final", e.g. https://news.ycombinator.com/item?id=46318564, https://news.ycombinator.com/item?id=47993179, https://news.ycombinator.com/item?id=48409590)
    Real filenames people typed: `v1_final_FINAL_approved_v2.xlsx`, `Dissertation_final_final_v8.docx`, `assessment_framework_draft_v3_final_FINAL.docx`.
    → Film: the Downloads list reads `Board_Deck_Q3_updated.pptx`, `…updated (1).pptx`, `…updated (2).pptx`, `Board Memo Q3 FINAL_v3.docx`. Our own persona file uses `LP_Q3_v11_final_MK.pptx`.

## F. Late-night pack rework in finance
12. **Hacker News, michaelochurch, 2011-11-22**, https://news.ycombinator.com/item?id=3263866, and **hncommenter13, 2013-09-13**, https://news.ycombinator.com/item?id=6379145 *(older than 2024; kept as background)*
    "proof-reading pitch books at 3:00 am on a Sunday"; memos "largely written between 2 and 5 AM".
13. **IBTimes, 2025**, https://www.ibtimes.com/junior-bankers-spend-hours-building-models-pitchbooks-openai-wants-chatgpt-do-that-work-3807391, and **Financial News via iTiger, 2025**, https://www.itiger.com/hans/news/2495549477
    Paraphrase: banks are hiring ex-bankers to train AI on models and pitchbooks, and planning AI to remove "junior drudge work" such as correcting seniors' mark-ups, after renewed scrutiny of brutal hours.
    → Film: the hour stamps (11:47 PM → 3:12 AM) and David's texts are the believable part, not an exaggeration.
14. **Vault / Street of Walls, IB analyst day-in-the-life** (background), https://streetofwalls.com/articles/investment-banking/learn-the-basics/a-day-in-the-life-of-an-investment-banker/
    Paraphrase: senior comments land after the client meetings end, so revisions run to 1–3 AM; a deck may change every night for two weeks.

## Not found as a public quote (so the film keeps it generic)
- A specific post where a board deck said one number and the memo another. Numbers that don't tie across files are well known in finance (and are in our persona file: "tie-out errors found by LPs"), but I could not open a citable thread. The film uses only our own numbers: €71–73m vs €74.6m.

## The three most usable details
1. **The AI hands you a download and "copy and paste this in"** (HN, 2026). It's the whole "you drive, it suggests" insight in one line.
2. **Template ignored; chart turned into bullets; 35 minutes to fix** (MS forum 2024; Deckary 2026).
3. **"Upload the same document every few minutes"** (OpenAI forum, 2025). It makes the context tax visible.
