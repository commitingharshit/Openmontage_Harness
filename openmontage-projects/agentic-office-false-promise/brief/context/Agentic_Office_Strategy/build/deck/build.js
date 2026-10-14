// Agentic Office — investor deck v2 (evidence-led). Visual system: warm off-white, Helvetica Neue, Menlo for system state,
// cobalt 3157F6 as the only accent, thin rules, no cards except the Change object, miniature artifacts instead of file icons.
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.title = 'Agentic Office — Investor Deck (pre-seed, Oct 2026)';
const BG = 'F8F7F3', INK = '1B1B1A', MUTED = '7A776F', RULE = 'D9D6CE', COBALT = '3157F6', WHITE = 'FFFFFF', LIGHT = 'EFEDE7', RED = 'B3261E', GREEN = '2E7D32';
const H = 'Helvetica Neue', M = 'Menlo';
const W = 13.333;
let n = 0;
const CHARTS = [];
function CH(type, data, opts) { CHARTS.push({ slide: n, type, data, opts }); }


function slideBase(eyebrow) {
  const s = pres.addSlide();
  n += 1;
  s.background = { color: BG };
  s.addText('AGENTIC OFFICE', { x: 0.5, y: 0.28, w: 2.2, h: 0.3, fontFace: H, fontSize: 9, bold: true, color: INK, charSpacing: 4, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.LINE, { x: 2.55, y: 0.43, w: 9.75, h: 0, line: { color: RULE, width: 0.75 } });
  s.addText(String(n).padStart(2, '0'), { x: 12.4, y: 0.28, w: 0.45, h: 0.3, fontFace: H, fontSize: 9, color: MUTED, align: 'right', margin: 0, isTextBox: true });
  if (eyebrow) s.addText(eyebrow.toUpperCase(), { x: 0.5, y: 0.85, w: 6, h: 0.3, fontFace: H, fontSize: 10, color: MUTED, charSpacing: 3, margin: 0, isTextBox: true });
  return s;
}
function title(s, runs, o = {}) {
  const arr = (Array.isArray(runs) ? runs : [{ text: runs }]).map((r, i, a) => ({ text: r.text, options: { color: r.accent ? COBALT : INK, breakLine: r.br || false } }));
  s.addText(arr, { x: o.x ?? 0.5, y: o.y ?? 1.2, w: o.w ?? 12.3, h: o.h ?? 1.2, fontFace: H, fontSize: o.size ?? 34, bold: true, valign: 'top', margin: 0, isTextBox: true, lineSpacingMultiple: 0.95 });
}
function body(s, text, x, y, w, h, size = 14, color = INK, extra = {}) {
  s.addText(text, { x, y, w, h, fontFace: H, fontSize: size, color, valign: 'top', margin: 0, isTextBox: true, ...extra });
}
function mono(s, text, x, y, w, h, size = 9, color = INK, extra = {}) {
  s.addText(text, { x, y, w, h, fontFace: M, fontSize: size, color, valign: 'top', margin: 0, isTextBox: true, ...extra });
}
function src(s, text) {
  s.addText(text, { x: 0.5, y: 7.02, w: 12.3, h: 0.3, fontFace: H, fontSize: 7.5, color: MUTED, margin: 0, isTextBox: true, valign: 'bottom' });
}
function rule(s, x, y, w, color = RULE, width = 0.75) { s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width } }); }
function vrule(s, x, y, h, color = RULE) { s.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color, width: 0.75 } }); }
function arrow(s, x1, y1, x2, y2, color = COBALT, dash) {
  const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0, line: { color, width: 1.25, endArrowType: 'triangle', dashType: dash || 'solid' } };
  if (x2 < x1) o.flipH = true; if (y2 < y1) o.flipV = true;
  s.addShape(pres.shapes.LINE, o);
}
// Miniature artifact (not a file icon): thin-bordered sheet with a header label and content lines/cells
function artifact(s, kind, label, x, y, w, h, highlight) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: WHITE }, line: { color: RULE, width: 0.75 } });
  mono(s, label, x + 0.1, y + 0.07, w - 0.2, 0.2, 7.5, MUTED);
  rule(s, x, y + 0.3, w);
  const cx = x + 0.12, cw = w - 0.24; let cy = y + 0.42;
  if (kind === 'xlsx') {
    const rows = Math.max(3, Math.floor((h - 0.5) / 0.19)); const cols = 4;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const hl = highlight && r === highlight.r && c === highlight.c;
      s.addShape(pres.shapes.RECTANGLE, { x: cx + c * cw / cols, y: cy + r * 0.19, w: cw / cols, h: 0.19, fill: { color: hl ? 'DCE4FE' : WHITE }, line: { color: 'E6E3DC', width: 0.5 } });
      if (hl) mono(s, highlight.t, cx + c * cw / cols + 0.02, cy + r * 0.19 + 0.02, cw / cols, 0.16, 6.5, COBALT);
    }
  } else if (kind === 'pptx') {
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cw, h: h - 0.55, fill: { color: 'F4F3EF' }, line: { color: 'E6E3DC', width: 0.5 } });
    if (highlight) mono(s, highlight, cx + 0.08, cy + 0.08, cw - 0.16, 0.2, 7, COBALT, { bold: true });
    for (let i = 0; i < 3; i++) s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.1 + i * (cw - 0.2) / 3, y: cy + h - 0.55 - 0.1 - (0.25 + i * 0.12), w: (cw - 0.2) / 3 - 0.08, h: 0.25 + i * 0.12, fill: { color: i === 2 ? COBALT : 'C9C6BE' }, line: { color: BG, width: 0 } });
  } else { // docx / pdf: text lines
    const lines = Math.max(3, Math.floor((h - 0.5) / 0.14));
    for (let i = 0; i < lines; i++) {
      const ww = cw * (i % 4 === 3 ? 0.6 : 0.95);
      const hl = highlight !== undefined && i === highlight;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy + i * 0.14, w: ww, h: 0.05, fill: { color: hl ? COBALT : (kind === 'pdf' ? 'CFCBC2' : 'BDB9B0') }, line: { color: BG, width: 0 } });
    }
  }
}
// The Change object: the only card in the system
function changeCard(s, x, y, w, rows, buttons = true) {
  const h = 0.45 + rows.length * 0.33 + (buttons ? 0.5 : 0.1);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: WHITE }, line: { color: RULE, width: 0.75 }, shadow: { type: 'outer', color: '000000', opacity: 0.12, blur: 8, offset: 2, angle: 90 } });
  let cy = y + 0.18;
  rows.forEach(([k, v, accent]) => {
    mono(s, k, x + 0.2, cy, 1.0, 0.25, 7.5, MUTED);
    body(s, v, x + 1.2, cy - 0.02, w - 1.4, 0.3, 10, accent ? COBALT : INK, { bold: !!accent });
    cy += 0.33;
  });
  if (buttons) {
    const by = y + h - 0.45;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + w - 2.3, y: by, w: 0.95, h: 0.3, rectRadius: 0.05, fill: { color: WHITE }, line: { color: RULE, width: 0.75 } });
    body(s, 'Reject', x + w - 2.3, by + 0.06, 0.95, 0.2, 9, INK, { align: 'center' });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + w - 1.25, y: by, w: 1.05, h: 0.3, rectRadius: 0.05, fill: { color: COBALT }, line: { color: COBALT, width: 0.75 } });
    body(s, 'Accept', x + w - 1.25, by + 0.06, 1.05, 0.2, 9, WHITE, { align: 'center', bold: true });
  }
  return h;
}
function stat(s, big, label, x, y, w, color = INK) {
  s.addText(big, { x, y, w, h: 0.75, fontFace: H, fontSize: 40, bold: true, color, margin: 0, isTextBox: true });
  body(s, label, x, y + 0.8, w, 0.8, 11.5, MUTED);
}

// =============================================================== 1 TITLE
{
  const s = slideBase(null);
  title(s, [{ text: 'Keep every recurring', br: true }, { text: 'pack right.', br: true }, { text: 'With proof.', accent: true }], { y: 1.35, w: 6.4, h: 2.9, size: 42 });
  body(s, 'Agentic Office is the execution and review layer for recurring multi-file professional work. Excel models, decks, memos and their sources are rolled forward every period, tied out to the last number, and every change is reviewable and reversible.', 0.5, 4.6, 5.9, 1.4, 15, INK);
  body(s, 'Pre-seed  ·  October 2026  ·  Confidential', 0.5, 6.55, 6, 0.3, 10, MUTED);
  // miniature pack
  artifact(s, 'pdf', 'QoE.pdf · p.47', 7.0, 1.3, 1.6, 1.5, 4);
  artifact(s, 'xlsx', 'Model.xlsx · Revenue!F21', 8.9, 1.3, 2.1, 1.5, { r: 2, c: 2, t: '74–76' });
  artifact(s, 'pptx', 'Deck.pptx · Slide 8', 11.3, 1.3, 1.55, 1.5, '€74–76m');
  artifact(s, 'docx', 'Memo.docx · §3.2', 11.3, 3.3, 1.55, 1.5, 2);
  arrow(s, 8.6, 2.05, 8.9, 2.05); arrow(s, 11.0, 2.05, 11.3, 2.05); arrow(s, 12.07, 2.8, 12.07, 3.3);
  changeCard(s, 7.0, 3.3, 4.05, [['PACK', 'Atlas LP pack · Q2 → Q3'], ['CHANGES', '68 across 3 files · 61 numeric, 7 narrative'], ['TIE-OUT', '147 / 147 numbers traced to source', true], ['RESTORE', 'Q2 approved pack saved']], true);
  mono(s, 'Illustrative product state (demo pack). Not customer data.', 7.0, 5.95, 5.8, 0.25, 7.5, MUTED);
  s.addNotes('Open with the job, not the technology. Every finance and investment team ships the same multi-file pack every month or quarter. We keep it right across files and periods, with proof. The panel is the target product state on our demo pack; no customer data exists yet.');
}
// =============================================================== 2 PROBLEM (user's image)
{
  const s = pres.addSlide(); n += 1; s.background = { color: BG };
  s.addImage({ path: 'img_problem.png', x: 0, y: 0, w: W, h: 7.5 });
  s.addNotes("Founders' framing: the professional is the operating system. They gather context, move information across files, execute changes and check everything themselves. The following slides narrow this to the recurring version of the problem, which is where it hurts most and where we can win.");
}
// =============================================================== 3 PROBLEM QUANTIFIED
{
  const s = slideBase('The problem, where it is sharpest');
  title(s, [{ text: 'Every period, the same pack', br: true }, { text: 'is rebuilt by hand.' }], { h: 1.3, w: 6.2, size: 30 });
  body(s, 'New numbers land in the model. Then people copy them into the deck, the memo and the LP or lender report, check that every figure ties, chase what a late change broke, and version by filename.', 0.5, 2.7, 5.2, 1.4, 14);
  // flow of miniature artifacts
  const fx = 0.5, fy = 4.45;
  artifact(s, 'pdf', 'Mgmt accounts.pdf', fx, fy, 1.25, 1.2, 2);
  artifact(s, 'xlsx', 'Model.xlsx', fx + 1.5, fy, 1.25, 1.2, { r: 1, c: 1, t: '18.6' });
  artifact(s, 'pptx', 'Deck.pptx', fx + 3.0, fy, 1.25, 1.2, '18.6m');
  artifact(s, 'docx', 'Letter.docx', fx + 4.5, fy, 1.25, 1.2, 1);
  for (let i = 0; i < 3; i++) arrow(s, fx + 1.25 + i * 1.5, fy + 0.6, fx + 1.5 + i * 1.5, fy + 0.6, MUTED);
  mono(s, 'LP_Q3_v11_FINAL2.pptx   ·   "can you re-check slide 8?"', fx, fy + 1.35, 5.8, 0.25, 8, MUTED);
  stat(s, '60–180 h', 'per quarter on LP reporting at mid-market PE firms (vendor case studies)', 7.0, 1.3, 2.7);
  stat(s, '57%', "Microsoft's Excel Agent Mode on SpreadsheetBench, vs 71% for humans. Agents still need proof.", 10.1, 1.3, 2.7);
  stat(s, '$885M', 'Workiva FY2025 revenue, a business built on numbers that tie across documents (97% gross retention)', 7.0, 3.85, 2.7, COBALT);
  stat(s, '600k', 'audit and finance users of DataSnipper, which links source documents to Excel cells ($1B valuation)', 10.1, 3.85, 2.7);
  src(s, 'Sources: LP reporting hours: vendor case studies (Tier 3, directional). SpreadsheetBench: Microsoft via The Decoder (Sep 2025). Workiva 8-K Q4 2025 (FY25 revenue $885M; 6,624 customers; GRR 97.2%). DataSnipper: Sacra (Oct 2025).');
  s.addNotes('The value of keeping numbers consistent across documents is proven: Workiva built an $885M business on it before agents existed. Our target is the long tail of bespoke packs that live in Office files, not in Workiva.');
}
// =============================================================== 4 WHY NOW
{
  const s = slideBase('Why now');
  title(s, [{ text: 'In 2026, every platform put an agent', br: true }, { text: 'inside the file. ' }, { text: 'Nobody owns the pack.', accent: true }], { h: 1.35 });
  const events = [['22 Apr', 'Microsoft', 'Agent Mode GA in Word, Excel and PowerPoint; default Copilot experience'], ['7 May', 'Anthropic', 'Claude for Word, Excel and PowerPoint GA on all paid plans; cross-app context'], ['9 Sep', 'Google', 'Gemini cross-app agents across Docs, Sheets and Slides'], ['17 Sep', 'OpenAI', 'ChatGPT inside Word, including the free tier']];
  const ty = 3.35; rule(s, 0.5, ty, 12.3, INK, 1);
  events.forEach(([d, who, what], i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.OVAL, { x: x, y: ty - 0.07, w: 0.14, h: 0.14, fill: { color: COBALT }, line: { color: COBALT } });
    mono(s, d + ' 2026', x, ty + 0.2, 2.8, 0.25, 9, COBALT);
    body(s, who, x, ty + 0.5, 2.8, 0.3, 14, INK, { bold: true });
    body(s, what, x, ty + 0.85, 2.8, 0.9, 11.5, MUTED);
  });
  body(s, 'What changed: editing a file with AI is now free or bundled.  What did not: agents work one file and one session at a time, re-inferring context every run. As agents produce more document changes, the bottleneck moves from writing to keeping every file consistent, traced and reviewed across periods.', 0.5, 5.35, 8.3, 1.3, 13.5, INK);
  stat(s, '30M+', 'paid Microsoft 365 Copilot seats (FY26 Q4), less than 7% of ~450M commercial seats', 9.6, 5.1, 3.2, COBALT);
  src(s, 'Sources: Microsoft Copilot blog (2026-04-22); claude.com/claude-for-microsoft-365 (GA 2026-05-07); Google Workspace blog (2026-09-09); OpenAI Word add-in (2026-09-17, via runtimewire); Microsoft 8-K FY26 Q4.');
  s.addNotes('This slide deliberately concedes the horizontal story. Anthropic even markets "change one thing, and every open file catches up". Our wedge is the recurring, cross-period, audited job they do not own.');
}
// =============================================================== 5 PRODUCT CONCEPT (user image)
{
  const s = pres.addSlide(); n += 1; s.background = { color: BG };
  s.addImage({ path: 'img_product.png', x: 0, y: 0, w: W, h: 7.5 });
  s.addText('Design concept of the target interface. For what is built today, see slide 14.', { x: 0.5, y: 7.22, w: 8, h: 0.2, fontFace: H, fontSize: 7.5, color: MUTED, margin: 0, isTextBox: true });
  s.addNotes('Target interface (design concept). Office when you enter, Cursor when the agent works, a review system when it finishes. Built components are on slide 14; do not present this as the shipping product.');
}
// =============================================================== 6 HOW IT WORKS
{
  const s = slideBase('How it works');
  title(s, [{ text: 'One graph links every number to its source,', br: true }, { text: 'across files and across periods.' }], { h: 1.3 });
  const y0 = 2.75;
  artifact(s, 'pdf', 'QoE.pdf · p.47', 0.5, y0, 1.7, 1.45, 3);
  artifact(s, 'xlsx', 'Model.xlsx · D17', 2.6, y0, 1.9, 1.45, { r: 1, c: 3, t: '16%' });
  artifact(s, 'pptx', 'Deck.pptx · Slide 8', 4.9, y0, 1.7, 1.45, '~16% to FY29');
  artifact(s, 'docx', 'Memo.docx · §3.2', 7.0, y0, 1.7, 1.45, 2);
  arrow(s, 2.2, y0 + 0.72, 2.6, y0 + 0.72); arrow(s, 4.5, y0 + 0.72, 4.9, y0 + 0.72); arrow(s, 6.6, y0 + 0.72, 7.0, y0 + 0.72);
  const verbs = [['LINK', 'Map every figure to a cell or source page. Humans confirm.'], ['ROLL FORWARD', 'New period in: numbers move deterministically; the model drafts only the narrative.'], ['TIE OUT', 'Every number traced; mismatches listed before review.'], ['REVIEW', 'One semantic diff across files: before, after, why, source.'], ['RESTORE', 'Any object, file or whole pack back to a prior period.']];
  verbs.forEach(([k, v], i) => {
    const x = 0.5 + i * 1.66;
    mono(s, String(i + 1).padStart(2, '0') + ' ' + k, x, 4.65, 1.6, 0.25, 8.5, COBALT, { bold: true });
    body(s, v, x, 4.95, 1.5, 1.4, 10.5, INK);
  });
  changeCard(s, 9.1, 2.6, 3.75, [['FILE', 'Memo.docx › §3.2 Market'], ['BEFORE', '~12% growth through FY29'], ['AFTER', '~16% growth through FY29', true], ['WHY', "Management's revised forecast"], ['SOURCE', 'QoE.pdf · page 47'], ['AFFECTS', 'Slide 8 · Model!D17']]);
  src(s, 'Built on deterministic Rust OOXML kernels (DOCX/XLSX/PPTX/PDF) plus a model-agnostic agent runtime. Object-level linking is the next build milestone (see slide 14).');
  s.addNotes('The core idea: numbers never pass through the LLM when they do not have to. Deterministic kernels make updates exact, auditable and cheap; the model is used for narrative and structure.');
}
// =============================================================== 7 DEMO
{
  const s = slideBase('Demo workflow');
  title(s, [{ text: 'Q2 → Q3 in one run, reviewed in minutes.' }], { h: 0.7 });
  const steps = [['OPEN', 'Atlas LP pack', '4 files · 3 sources'], ['LINK', '147 numbers linked', '139 auto · 8 confirmed'], ['ASK', '"Roll forward to Q3"', 'using Q3_Mgmt_Accounts.xlsx'], ['WATCH', 'Model 41 cells', 'Deck 18 objects · Memo 9 spans'], ['TIE OUT', '147 / 147 traced', '2 mismatches flagged'], ['REVIEW', '68 changes', '61 numeric · 7 narrative'], ['RESTORE', 'Q2 pack saved', 'one click back']];
  steps.forEach(([k, a, b], i) => {
    const x = 0.5 + i * 1.77, y = 2.4;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.42, h: 0.42, fill: { color: i === 4 ? COBALT : WHITE }, line: { color: i === 4 ? COBALT : INK, width: 0.75 } });
    body(s, String(i + 1), x, y + 0.09, 0.42, 0.25, 11, i === 4 ? WHITE : INK, { align: 'center', bold: true });
    if (i < steps.length - 1) rule(s, x + 0.5, y + 0.21, 1.2, RULE);
    mono(s, k, x, y + 0.6, 1.65, 0.25, 9, COBALT, { bold: true });
    body(s, a, x, y + 0.9, 1.65, 0.5, 12, INK, { bold: true });
    mono(s, b, x, y + 1.4, 1.6, 0.6, 8, MUTED);
  });
  rule(s, 0.5, 4.45, 12.3);
  body(s, 'What the reviewer sees', 0.5, 4.65, 4, 0.3, 12, MUTED);
  mono(s, '✓ Model.xlsx     41 cells   deterministic   source: Q3_Mgmt_Accounts.xlsx\n✓ Deck.pptx      18 objects deterministic   charts refreshed, layout verified\n● Memo.docx       9 spans   narrative       tracked changes, 2 need a decision\n! Tie-out         2 mismatches: Slide 12 uses FY25 EBITDA before adjustment', 0.5, 5.05, 8.2, 1.3, 9.5, INK);
  body(s, 'Numbers never pass through the language model when a deterministic path exists. The model drafts only the sentences whose meaning changed.', 9.1, 4.95, 3.7, 1.4, 12.5, INK);
  src(s, 'Illustrative demo script on an anonymised pack. Figures are demo targets, not customer results. Build status: slide 14.');
  s.addNotes('This is the demo we will run for investors and prospects. It is scripted on an anonymised pack; the counts are targets for the demo build, not measured results.');
}
// =============================================================== 8 VS PLATFORM AGENTS
{
  const s = slideBase('Why this is different');
  title(s, [{ text: 'Copilot and Claude edit files.', br: true }, { text: 'We keep the pack right.', accent: true }], { h: 1.3 });
  const rows = [['', 'Agents inside Office (Copilot, Claude, ChatGPT, Gemini)', 'Agentic Office'], ['Scope', 'Open files, one session', 'The whole pack, every period'], ['Links', 'Re-inferred from context each run', 'Persisted, human-confirmed object graph'], ['Numbers', 'Edited by the language model', 'Moved by deterministic kernels; model writes narrative'], ['Review', 'Tracked changes, file by file', 'One semantic diff across files + tie-out report'], ['Undo', 'Per-file history', 'Restore any object, file or whole pack to a prior period'], ['Deployment', "Vendor cloud, the vendor's models", 'Local-first or private; bring your own model']];
  const tx = 0.5, ty = 2.75, cw = [1.6, 5.1, 5.6], rh = 0.52;
  rows.forEach((r, i) => {
    let x = tx;
    r.forEach((c, j) => {
      body(s, c, x, ty + i * rh + 0.1, cw[j] - 0.2, rh - 0.1, i === 0 ? 10 : 12.5, i === 0 ? MUTED : (j === 2 ? INK : (j === 0 ? MUTED : INK)), { bold: j === 2 && i > 0 });
      x += cw[j];
    });
    rule(s, tx, ty + (i + 1) * rh, 12.3, i === 0 ? INK : RULE, i === 0 ? 1 : 0.75);
  });
  s.addShape(pres.shapes.RECTANGLE, { x: tx + cw[0] + cw[1] - 0.1, y: ty, w: 0.0, h: rows.length * rh, line: { color: COBALT, width: 1.5 } });
  body(s, 'We build on these models rather than against them: Claude, OpenAI or open-weight, per customer policy.', 0.5, 6.5, 12.3, 0.35, 11, MUTED);
  src(s, 'Product capabilities per vendor pages (Sep 2026): claude.com/claude-for-microsoft-365; microsoft.com Copilot blog; OpenAI Word add-in. Agentic Office column = target capabilities (object graph not yet built).');
  s.addNotes('Be precise: Claude already carries context across open files. What no one persists is the confirmed object graph across periods, with deterministic numbers, a pack-level tie-out and pack restore.');
}
// =============================================================== 9 WEDGE / WHO
{
  const s = slideBase('Initial wedge · lead hypothesis');
  title(s, [{ text: 'First customer: the fund finance team', br: true }, { text: 'that ships a pack every quarter.' }], { h: 1.3 });
  body(s, 'Who uses it', 0.5, 2.75, 3, 0.3, 11, MUTED);
  body(s, 'Portfolio-operations and fund-finance associates at mid-market PE, private-credit and VC firms (the bespoke decks, IC updates and letters downstream of fund-admin platforms), and the India-based production teams that build them.', 0.5, 3.05, 5.0, 1.2, 13.5);
  body(s, 'Who pays', 0.5, 4.3, 3, 0.3, 11, MUTED);
  body(s, 'Fund CFO / COO, or the delivery head of a production firm. Contracts of $15–30k to start; about $120k for private deployments.', 0.5, 4.6, 5.4, 0.9, 13.5);
  body(s, 'The moment they need us (hypothesis)', 0.5, 5.55, 5, 0.3, 11, MUTED);
  body(s, '"The CFO changed one valuation tonight. Now the model, nine slides and four paragraphs of the LP letter must move, and every number must still tie."', 0.5, 5.85, 5.4, 0.9, 13, COBALT, { italic: true });
  // native bar chart: wedge scores
  const labels = ['Recurring Office packs', 'Offshore production teams', 'Document-estate changes', 'IB / PE front office', 'Consulting teams', 'Developer infrastructure', 'India litigation', 'Individual prosumers'];
  const vals = [3.86, 3.48, 3.40, 3.14, 3.12, 2.98, 2.80, 2.30];
  CH('bar', [{ name: 'Weighted score', labels, values: vals }], { x: 7.1, y: 2.6, w: 5.7, h: 4.2, barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [COBALT, 'B9B6AE', 'B9B6AE', 'B9B6AE', 'B9B6AE', 'B9B6AE', 'B9B6AE', 'B9B6AE'], varyColors: false, showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 9, dataLabelFontFace: H, dataLabelColor: INK, catAxisLabelFontSize: 9.5, catAxisLabelFontFace: H, catAxisLabelColor: INK, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, valAxisMinVal: 0, valAxisMaxVal: 5, showLegend: false, showTitle: true, title: 'Wedge scoring, 10 weighted criteria (1–5)', titleFontSize: 10, titleColor: MUTED, titleFontFace: H, barGapWidthPct: 45 });
  src(s, 'Scores: 09_MARKET_MODEL.xlsx › Segments (weights incl. resistance to platform bundling 14%, whitespace 12%). Judgements grounded in the competitor evidence; to be re-scored after 30 interviews.');
  s.addNotes('Why not bankers or lawyers? Rogo, Hebbia, Model ML, Harvey and Legora have raised over $2B for those users. Fund-admin platforms (Juniper Square, Carta, Allvue) already automate standardised LP statements, so we target the bespoke decks, IC updates and letters downstream of their exports. Datarails and Cube generate corporate board packs from their data models. The final ICP is decided by a three-way interview race (fund vs lender reporting vs corporate FP&A) by day 45.');
}
// =============================================================== 10 MARKET
{
  const s = slideBase('Market');
  title(s, [{ text: 'A $4.9B bottom-up market,', br: true }, { text: 'and our plan needs about 1% of the first slice.' }], { h: 1.3 });
  const cols = [['TAM', '$4.9B', 'Document-intensive professionals × $60/seat/month', '3.16M in the US (BLS May-2025, 11 occupations × intensity share), ×2 other high-income markets, +1.9M India at 25% ARPU'], ['SAM', '$0.79B', 'In-wedge finance & reporting roles with recurring multi-file packs', '1.14M US in-wedge × 60% with recurring packs, + English-working markets (×0.45) + India'], ['SOM', '$9.6M', 'Year-5 exit ARR from the operating plan (base)', '≈275 paying organisations; sales capacity × conversion × retention; conservative $2.5M, aggressive $33M']];
  cols.forEach(([k, big, d1, d2], i) => {
    const x = 0.5 + i * 4.15;
    mono(s, k, x, 2.75, 3.8, 0.3, 10, i === 2 ? COBALT : MUTED, { bold: true });
    s.addText(big, { x, y: 3.05, w: 3.8, h: 0.9, fontFace: H, fontSize: 48, bold: true, color: i === 2 ? COBALT : INK, margin: 0, isTextBox: true });
    body(s, d1, x, 4.05, 3.7, 0.6, 13, INK, { bold: true });
    body(s, d2, x, 4.7, 3.7, 1.1, 11, MUTED);
    if (i < 2) vrule(s, x + 3.95, 2.75, 3.0);
  });
  rule(s, 0.5, 6.05, 12.3);
  body(s, 'Cross-checks (shown as bounds, never added): organisations × ACV = $10.8B TAM / $2.9B SAM; Microsoft 365 seats × 5% × $40 AI premium = $10.8B. Microsoft 365 Commercial ($102.9B, FY26) is the adjacent budget, not our TAM.', 0.5, 6.15, 12.3, 0.6, 10.5, INK);
  src(s, 'Model: 09_MARKET_MODEL.xlsx (three methods; every assumption editable). BLS OEWS May 2025 via api.bls.gov. Microsoft 10-K FY26 (derived). Key uncertainties: document-intensity shares and the recurring-pack share (tested in the first 30 interviews).');
  s.addNotes('Say the definitions out loud. The TAM is AI-execution spend by document-intensive professionals, not the Office market. The biggest uncertainty is how many in-wedge professionals really have recurring multi-file packs (60% assumed); halving the two key shares would cut SAM to about $200M.');
}
// =============================================================== 11 BUSINESS MODEL
{
  const s = slideBase('Business model');
  title(s, [{ text: 'Price the pack, not the seat.' }], { h: 0.7 });
  body(s, 'Single-file AI editing is now free inside Word. Agent-heavy users cost real inference: in our model, about $28 a month for a typical user and $69 for a heavy one. So we charge for the unit of value, the recurring pack, and make most updates deterministic.', 0.5, 1.95, 5.6, 1.6, 13.5);
  const tiers = [['Pilot', '$2.5k / month', 'Two reporting cycles on a real pack; credited on conversion'], ['Team', '$250 / pack / month', 'Reviewers free; ≈4 packs ≈ $12k a year'], ['Business', '$30k+ / year', 'SSO, SOC 2 report, admin, onboarding engineer'], ['Enterprise', '$120k+ / year', 'Private deployment, bring your own model']];
  tiers.forEach(([a, b, c], i) => {
    const y = 3.75 + i * 0.68; rule(s, 0.5, y - 0.08, 5.6);
    body(s, a, 0.5, y, 1.3, 0.3, 12.5, INK, { bold: true }); mono(s, b, 1.8, y + 0.02, 1.9, 0.3, 9.5, COBALT, { bold: true }); body(s, c, 3.7, y, 2.45, 0.6, 10.5, MUTED);
  });
  CH('bar', [{ name: 'Gross margin', labels: ['$60 seat · light user', '$60 seat · typical user', '$60 seat · heavy user', '$250 pack · base usage'], values: [0.76, 0.42, -0.27, 0.74] }], { x: 6.7, y: 1.9, w: 6.1, h: 4.6, barDir: 'col', chartColors: ['B9B6AE', 'B9B6AE', RED, COBALT], varyColors: true, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0%', dataLabelFontSize: 11, dataLabelFontFace: H, valAxisHidden: true, valAxisMinVal: -0.4, valAxisMaxVal: 1, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, catAxisLabelFontSize: 10, catAxisLabelFontFace: H, catAxisLabelColor: INK, showLegend: false, showTitle: true, title: 'Gross margin by pricing unit (base cost scenario)', titleFontSize: 10, titleColor: MUTED, titleFontFace: H, barGapWidthPct: 60 });
  src(s, '10_PRICING_MODEL.xlsx: Anthropic list prices (Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 4.5 $1/$5 per MTok), routing mix, 60% cache hits, token profiles per run (assumed; to be replaced by telemetry). Pack margin assumes 60% of updates run deterministically. Prices are hypotheses to test.');
  s.addNotes('The deterministic kernel is a margin asset as well as a quality asset. If the zero-LLM share falls to 30%, pack margin drops to about 50% in the conservative case, which is why it is a tracked KPI.');
}
// =============================================================== 12 COMPETITION
{
  const s = slideBase('Competition');
  title(s, [{ text: 'Crowded around us. Open at the pack.' }], { h: 0.7 });
  s.addImage({ path: 'map_c.png', x: 0.5, y: 1.75, w: 7.5, h: 4.95 });
  const items = [['Microsoft, Anthropic, OpenAI, Google', 'Own the file-level agent and distribution. Session-scoped; no persisted pack graph.'], ['Workiva ($885M revenue)', 'Linked numbers and governance, but you must author inside Workiva; enterprise-priced.'], ['Datarails, Cube, Rollstack', 'Board packs generated from their own data models or templates.'], ['Rogo, Hebbia, Model ML, Endex', 'Front-office generation for bankers and investors; $2B+ raised in total.'], ['Juniper Square, Carta, Allvue', 'Standardised LP statements from their fund system of record; Juniper Square ($1.1B) adds AI document generation.']];
  items.forEach(([a, b], i) => {
    const y = 1.85 + i * 0.93;
    body(s, a, 8.35, y, 4.45, 0.3, 12, INK, { bold: true });
    body(s, b, 8.35, y + 0.32, 4.45, 0.6, 10.5, MUTED);
  });
  src(s, '51 companies profiled in 03_COMPETITOR_DATABASE.csv; positions are analyst judgements (04_COMPETITIVE_LANDSCAPE.md). Funding: Rogo $160M D (~$2B), Model ML $75M A, Endex $14M, Datarails $70M C (~$550M).');
  s.addNotes('Threat ranking: 1) Anthropic/Microsoft adding persistent cross-file links; 2) Datarails/Cube extending to arbitrary Office packs; 3) Workiva moving down-market. Our answer is speed on this one job, customer-specific pack graphs and playbooks, and private, multi-model deployment.');
}
// =============================================================== 13 MOAT
{
  const s = slideBase('Defensibility');
  title(s, [{ text: 'The moat is not the code.', br: true }, { text: "It is each customer's pack history.", accent: true }], { h: 1.3 });
  const nodes = [['Packs linked', 'confirmed object graphs'], ['Cycles run', 'accepted and rejected diffs'], ['Playbooks learn', 'rounding, wording, rules'], ['More delegated', 'packs per customer grow']];
  const cx = 3.5, cy = 4.55, r = 1.45;
  const pos = [[cx, cy - r], [cx + r * 1.4, cy], [cx, cy + r], [cx - r * 1.4, cy]];
  pos.forEach(([x, y], i) => {
    body(s, nodes[i][0], x - 1.05, y - 0.28, 2.1, 0.3, 13, i === 2 ? COBALT : INK, { bold: true, align: 'center' });
    mono(s, nodes[i][1], x - 1.1, y + 0.05, 2.2, 0.25, 8, MUTED, { align: 'center' });
  });
  arrow(s, cx + 0.7, cy - r + 0.2, cx + r * 1.4 - 0.3, cy - 0.35); arrow(s, cx + r * 1.4 - 0.3, cy + 0.35, cx + 0.7, cy + r - 0.35);
  arrow(s, cx - 0.7, cy + r - 0.35, cx - r * 1.4 + 0.3, cy + 0.35); arrow(s, cx - r * 1.4 + 0.3, cy - 0.35, cx - 0.7, cy - r + 0.2);
  body(s, 'Honest status', 7.2, 2.75, 5.5, 0.3, 11, MUTED);
  body(s, 'Today we have a capability lead (deterministic OOXML kernels) and an architecture that can compound. Kernels, orchestration and multi-file context can all be copied within a year.', 7.2, 3.05, 5.6, 1.2, 13);
  body(s, 'Metrics that will prove the moat is forming', 7.2, 4.35, 5.6, 0.3, 11, MUTED);
  mono(s, 'correction rate, cycle N vs cycle 1   target −25% by cycle 3\nnumbers auto-linked on a new pack       target ≥70%\nzero-LLM share of numeric updates       target ≥60%\npacks per customer                      target 2 → 4 in year 1', 7.2, 4.7, 5.6, 1.3, 9, INK);
  src(s, 'Full analysis: 13_MOAT.md (19 candidate moats tested against "could Microsoft, Google, OpenAI or Anthropic build this in 12 months?").');
  s.addNotes('Switching cost comes from confirmed pack graphs and learned playbooks, not from file lock-in: files stay native by design.');
}
// =============================================================== 14 WHAT IS BUILT
{
  const s = slideBase('Technology and build status');
  title(s, [{ text: 'The hard substrate exists.', br: true }, { text: 'The wedge feature is next.' }], { h: 1.3 });
  const colsB = [['BUILT', 'verified in repo, Sep 2026', ['Rust OOXML kernels ≈50k lines (DOCX 15.6k, XLSX 13.2k, PDF 5.5k, PPTX 4.9k, graph, artifact)', 'Agent runtime ≈67k lines Python: 19 execution patterns, verification and repair gates', 'Code-OSS workbench with DOCX editor; 80 MCP tools; 17 office skills', 'Workspace dependency graph and stale-impact preview (file level)', '928 offline tests passing (Jul 2026)'], INK], ['PROTOTYPE', 'working in parts', ['Excel proposals with accept, reject and restore', 'Semantic diff for DOCX (review UI partial)', 'Cross-file propagation at file level only', 'Legal matter demo (shows the engine is general)'], MUTED], ['NEXT 8 WEEKS', 'the MVP job', ['Object-level link graph (cell ↔ slide ↔ sentence ↔ page)', 'Deterministic roll-forward', 'Tie-out report', 'Pack restore points and reviewer view', 'Local-first mode with bring-your-own model'], COBALT]];
  colsB.forEach(([k, sub, items, col], i) => {
    const x = 0.5 + i * 4.15;
    mono(s, k, x, 2.75, 3.8, 0.3, 10, col, { bold: true }); body(s, sub, x, 3.05, 3.8, 0.3, 10.5, MUTED);
    rule(s, x, 3.42, 3.85, col === COBALT ? COBALT : RULE, col === COBALT ? 1.5 : 0.75);
    items.forEach((t, j) => body(s, t, x, 3.55 + j * 0.62, 3.8, 0.6, 11.5, INK));
  });
  src(s, 'Line counts via find | wc -l on the repository (2026-09-30). Built on open-source foundations: Code-OSS (MIT), eigenpal docx-editor (MIT), CasualOffice/Univer (Apache-2.0), OfficeCLI (Apache-2.0), Nous Hermes agent (MIT). A clean-clone end-to-end build is still to be verified.');
  s.addNotes('Be explicit about what is open source and what is ours. The proprietary value is the kernels, the runtime and the workspace layer; the editors are forks. Earlier claims about test counts and speed-ups will not be used until CI re-verifies them.');
}
// =============================================================== 15 ROADMAP
{
  const s = slideBase('Roadmap');
  title(s, [{ text: 'Built around the customer’s next cycle,', br: true }, { text: 'not around engineering interest.' }], { h: 1.3 });
  const ph = [['NOW', 'Credible demo', ['Demo pack Q2 → Q3', 'Link extraction v0', 'Roll-forward + tie-out v0'], '% numbers auto-linked'], ['0–3 MO', 'Design partners', ['Link-confirmation UI', 'Cross-file diff, Word tracked changes', 'Restore points; local-first'], 'Time to 80% linked'], ['3–6 MO', 'Repeat usage', ['Period model', 'Overnight scheduled runs', 'Pack playbooks from corrections'], 'Second-cycle retention'], ['6–12 MO', 'Paid teams', ['Roles and approvals, audit export', 'SSO, SOC 2 Type I', 'Pack billing; delivery console'], 'Packs per customer'], ['12–24 MO', 'Enterprise', ['Private cloud / on-prem', 'Connectors (SharePoint, Box, data rooms)', 'Cross-pack consistency'], 'NRR']];
  ph.forEach(([k, t, items, m], i) => {
    const x = 0.5 + i * 2.48;
    mono(s, k, x, 2.75, 2.3, 0.3, 10, i === 0 ? COBALT : MUTED, { bold: true });
    body(s, t, x, 3.05, 2.3, 0.35, 14, INK, { bold: true });
    rule(s, x, 3.5, 2.3, i === 0 ? COBALT : RULE, i === 0 ? 1.5 : 0.75);
    items.forEach((it, j) => body(s, it, x, 3.65 + j * 0.5, 2.3, 0.5, 11.5));
    mono(s, 'metric: ' + m, x, 5.3, 2.3, 0.4, 8, MUTED);
  });
  body(s, 'Explicitly not now: new editor or renderer work, legal features, email or calendar agents, slide generation from scratch, broad self-serve launch.', 0.5, 6.1, 12.3, 0.5, 11.5, MUTED);
  src(s, '12_PRODUCT_ROADMAP.md (feature-level problem, persona, dependency, complexity, defensibility and metric).');
  s.addNotes('Ordering follows the hardest step in our adoption funnel: getting a messy real pack linked. That is why link confirmation comes before any new format or feature.');
}
// =============================================================== 16 GTM
{
  const s = slideBase('Go-to-market');
  title(s, [{ text: 'Founder-led into funds.', br: true }, { text: 'India as the engine room.' }], { h: 1.3 });
  const st = [['First 10 users', 'months 0–3', '30 interviews → pack teardowns → paid 2-cycle pilots'], ['First $100k ARR', '≈ month 10 (subscriptions)', '4 paid pilots convert; founder-led logos'], ['First $1M ARR', 'month 27 (base)', '~46 organisations; first AE from month 10'], ['First $10M ARR', 'year 5+ (base) · month 41 (aggressive)', 'Enterprise AEs, delivery-firm channel, NRR ≥ 110%']];
  st.forEach(([a, b, c], i) => {
    const y = 2.75 + i * 0.95; rule(s, 0.5, y - 0.1, 6.4);
    body(s, a, 0.5, y, 2.4, 0.3, 13, i === 0 ? COBALT : INK, { bold: true }); mono(s, b, 0.5, y + 0.35, 2.4, 0.4, 8, MUTED);
    body(s, c, 3.0, y, 3.9, 0.8, 11.5);
  });
  body(s, 'Where we sell', 7.5, 2.65, 5, 0.3, 11, MUTED);
  mono(s, 'United States    3.68   revenue: fund CFOs/COOs\nSingapore        3.55   fast procurement, India links\nUAE              3.46   funds and family offices\nUnited Kingdom   3.38   PE/credit; India time-zone overlap\nIndia            3.22   build base, design partners, channel', 7.5, 3.0, 5.3, 1.5, 9, INK);
  body(s, 'Why India matters', 7.5, 4.75, 5, 0.3, 11, MUTED);
  body(s, 'Engineering and onboarding cost, overnight runs for US deadlines, and access to the production teams that build these packs. We price against US value or offshore billing rates, never Indian salaries.', 7.5, 5.05, 5.3, 1.2, 12);
  src(s, 'Timing from 15_FINANCIAL_MODEL.xlsx (base unless noted). Geography scores: 09_MARKET_MODEL.xlsx › Geo (10 weighted criteria).');
  s.addNotes('The hardest funnel transition is "pack imported → link graph confirmed". A forward-deployed engineer sets up the first two cycles with each design partner.');
}
// =============================================================== 17 EVIDENCE
{
  const s = slideBase('Evidence to date');
  title(s, [{ text: 'Built. Demonstrated.', br: true }, { text: 'Not yet validated, and here is the plan.', accent: true }], { h: 1.3 });
  const cols3 = [['BUILT', '357 commits by 5 contributors (Jul–Sep 2026) · kernels · runtime · workbench · skills'], ['DEMONSTRATED', 'Internal DOCX benchmark: 6/10 → ~9/10 tasks after one fix round, 100% file preservation; Excel proposals with restore; legal matter demo'], ['VALIDATED', 'Nothing yet: no users, no revenue, no pilots. We will not claim otherwise.']];
  cols3.forEach(([k, v], i) => {
    const x = 0.5 + i * 4.15;
    mono(s, k, x, 2.75, 3.8, 0.3, 10, i === 2 ? RED : INK, { bold: true }); body(s, v, x, 3.1, 3.8, 1.0, 12.5);
  });
  rule(s, 0.5, 4.3, 12.3);
  body(s, 'Next 90 days: what we will prove', 0.5, 4.45, 6, 0.3, 11, MUTED);
  const plan = [['30', 'problem interviews'], ['5', 'real pack teardowns'], ['2', 'side-by-side runs against Claude and Copilot'], ['3+', 'paid pilots signed']];
  plan.forEach(([a, b], i) => {
    const x = 0.5 + i * 3.1;
    s.addText(a, { x, y: 4.8, w: 2.8, h: 0.8, fontFace: H, fontSize: 40, bold: true, color: COBALT, margin: 0, isTextBox: true });
    body(s, b, x, 5.65, 2.8, 0.6, 12.5, INK);
  });
  src(s, 'Git history of the Agentic Office repository (2026-07-25 to 2026-09-27). Validation plan: 21_VALIDATION_PLAN.md (15 hypotheses ranked by impact × uncertainty, each with kill criteria).');
  s.addNotes('Investors fund honesty about stage. The day-90 gate decides go, adjust or pivot on four hypotheses: the pack job exists in Office files, reviewers accept agent numeric changes, paid pilots convert, and we beat platform agents on a real roll-forward.');
}
// =============================================================== 18 FINANCIALS
{
  const s = slideBase('Financial plan');
  title(s, [{ text: 'A lean path to seed metrics,', br: true }, { text: 'with the downside funded.' }], { h: 1.3 });
  const yrs = ['2027', '2028', '2029', '2030', '2031'];
  CH('line', [{ name: 'Conservative', labels: yrs, values: [0.04, 0.24, 0.63, 1.20, 2.47] }, { name: 'Base', labels: yrs, values: [0.17, 0.78, 2.21, 4.82, 9.58] }, { name: 'Aggressive', labels: yrs, values: [0.42, 2.14, 6.98, 17.96, 33.39] }], { x: 0.5, y: 2.6, w: 7.2, h: 4.2, chartColors: ['B9B6AE', COBALT, INK], lineSize: 2, lineDataSymbol: 'circle', lineDataSymbolSize: 5, showLegend: true, legendPos: 'b', legendFontSize: 10, legendFontFace: H, catAxisLabelFontFace: H, catAxisLabelFontSize: 10, valAxisLabelFontFace: H, valAxisLabelFontSize: 9, valAxisLabelFormatCode: '$0"M"', valGridLine: { color: 'E6E3DC', size: 0.5 }, catGridLine: { style: 'none' }, showTitle: true, title: 'Exit ARR by year, $M', titleFontSize: 10, titleColor: MUTED, titleFontFace: H });
  const kv = [['Seed-ready (month 19, base)', '~25 paying orgs · ~$0.49M ARR'], ['Gross margin (base)', '76% → 82%'], ['CAC payback (base)', '14–18 months'], ['NRR / logo churn (base)', '104% / 17% a year'], ['Burn multiple, year 2 (base)', '1.1×'], ['Conservative case', 'Fundable only if seed gates are met']];
  kv.forEach(([a, b], i) => {
    const y = 2.75 + i * 0.66; rule(s, 8.1, y - 0.08, 4.7);
    body(s, a, 8.1, y, 2.5, 0.5, 10.5, MUTED); body(s, b, 10.6, y, 2.2, 0.55, 11.5, i === 5 ? RED : INK, { bold: true });
  });
  src(s, '15_FINANCIAL_MODEL.xlsx: monthly, 60 months, three scenarios; all revenue is forecast from hypotheses (no customers today). Base drivers: $15k ACV, 1.5 deals per ramped AE per month, 1.5% monthly churn, 1.8% monthly expansion.');
  s.addNotes('The base case reaches $9.6M ARR in year 5 with about 50 people. The difference between base and aggressive is retention and expansion, not headcount, so NRR is the lever to engineer.');
}
// =============================================================== 19 TEAM
{
  const s = slideBase('Team');
  title(s, [{ text: 'An engineering team that has already', br: true }, { text: 'built the hardest layer.' }], { h: 1.3 });
  body(s, 'Harshit Verma', 0.5, 2.8, 4, 0.35, 16, INK, { bold: true });
  body(s, 'Founder · IIT Delhi · AI systems for professional workflows; lead author of the kernel and orchestration work (~234 of 357 commits, incl. GitHub alias).', 0.5, 3.2, 5.5, 0.9, 12.5, MUTED);
  body(s, 'Core engineering', 0.5, 4.3, 4, 0.3, 11, MUTED);
  body(s, '4 further engineers have committed code since July 2026 (Ayush Kumar, Prashant Raj, Tanmay Kumar, Piyush Kumar Pandey).', 0.5, 4.6, 5.5, 0.9, 12.5);
  s.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: 2.75, w: 5.8, h: 3.3, fill: { color: LIGHT }, line: { color: RULE, width: 0.75, dashType: 'dash' } });
  mono(s, 'FOUNDERS TO COMPLETE BEFORE SENDING', 7.25, 2.95, 5.3, 0.3, 9, RED, { bold: true });
  body(s, 'Founding roles and titles; full-time status; relevant operating experience (finance, fund operations, consulting); prior companies; equity and vesting; the fund-operations advisor we will add before the raise.', 7.25, 3.35, 5.3, 1.8, 12.5, INK);
  body(s, 'Founder-market fit is the question investors will ask first. Answer it with named people.', 7.25, 5.2, 5.3, 0.7, 11, MUTED);
  src(s, 'Contributor counts from git log (Sep 2026). Founder background from the prior deck; roles to be confirmed by the founders.');
  s.addNotes('Placeholder slide: fill it in with verified facts. Do not claim domain experience that cannot be backed up in a reference call.');
}
// =============================================================== 20 THE ASK
{
  const s = slideBase('The ask');
  title(s, [{ text: 'Raising $1.25M pre-seed', br: true }, { text: 'to reach 20+ paying teams in 18 months.', accent: true }], { h: 1.3 });
  CH('bar', [{ name: '$k', labels: ['Engineering & product', 'Go-to-market team', 'Customer COGS', 'Security & legal', 'Travel, marketing, tools', 'R&D compute & evals', 'G&A'], values: [363, 246, 60, 81, 75, 36, 36] }], { x: 0.5, y: 2.6, w: 6.6, h: 3.9, barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [COBALT], showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0"k"', dataLabelFontSize: 9.5, dataLabelFontFace: H, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, catAxisLabelFontSize: 10, catAxisLabelFontFace: H, catAxisLabelColor: INK, showLegend: false, showTitle: true, title: '18-month gross spend ≈ $0.90M (≈$0.26M funded by revenue)', titleFontSize: 10, titleColor: MUTED, titleFontFace: H, barGapWidthPct: 45 });
  body(s, 'By month 18 we will show', 7.5, 2.65, 5, 0.3, 11, MUTED);
  const ms = ['≥ 15 paying organisations (plan ~22–25)', '≥ $0.35M ARR (plan ~$0.44–0.49M)', '≥ 80% logo retention across two cycles', '≥ 30% measured time saved per pack cycle', '≥ 60% of numeric updates deterministic', 'SOC 2 Type I; one delivery-firm pilot live'];
  ms.forEach((t, i) => body(s, t, 7.5, 3.0 + i * 0.45, 5.3, 0.4, 12.5));
  body(s, 'Instrument: SAFE or equivalent at an $8–12M post-money cap. Size check: $1.25M survives our conservative revenue case for 29 months with no further money.', 7.5, 5.85, 5.3, 0.9, 11, MUTED);
  src(s, '16_FUNDRAISING.md; 15_FINANCIAL_MODEL.xlsx (FundingStress sheet); 17_CAP_TABLE_MODEL.xlsx. Benchmarks: Carta 2025 median post-money SAFE caps ~$10–15M for $0.25–2.5M rounds; YC $500k (7% + MFN).');
  s.addNotes('Also ask for introductions: fund CFOs and COOs, portfolio-ops leaders, and mid-tier delivery firms. One design partner per investor.');
}
// =============================================================== 21 VISION
{
  const s = slideBase('Vision');
  title(s, [{ text: 'From the pack to the operating layer', br: true }, { text: 'for agentic knowledge work.' }], { h: 1.3 });
  const steps = [['Recurring packs', 'fund & finance teams'], ['Adjacent packs', 'lender, valuation, IC'], ['Adjacent buyers', 'FP&A, fund admins'], ['Delivery console', 'production firms'], ['Document estates', 'policies, contracts'], ['Firm memory', 'cross-pack playbooks'], ['Control plane', 'lineage for every AI change']];
  steps.forEach(([a, b], i) => {
    const x = 0.5 + i * 1.77, y = 5.2 - i * 0.38;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.62, h: 0.06, fill: { color: i === 0 ? COBALT : INK }, line: { color: i === 0 ? COBALT : INK, width: 0 } });
    body(s, a, x, y - 0.72, 1.65, 0.35, 12, i === 0 ? COBALT : INK, { bold: true });
    mono(s, b, x, y - 0.35, 1.65, 0.3, 7.5, MUTED);
  });
  body(s, 'Agents will soon make most changes to professional documents. Someone has to keep that work consistent, traced and reviewable across tools and models. We start with the pack a fund ships every quarter.', 0.5, 5.7, 9.5, 1.0, 14);
  src(s, '23_EXPANSION_GRAPH.md: each step lists the unlocking capability, the customers it adds, the revenue opportunity and the moat it strengthens.');
  s.addNotes('Close on the wedge-to-vision logic. Every step reuses the same engine: link graph, deterministic execution, semantic review and restore.');
}
// =============================================================== APPENDIX
function appendixTitle(s, t) { title(s, [{ text: t }], { h: 0.7, size: 26 }); }
{ // A1 platform risk
  const s = slideBase('Appendix A1 · Platform risk');
  appendixTitle(s, 'Microsoft and Anthropic risk, stated plainly');
  const rows = [['Scenario (24 months)', 'Prob.', 'Impact', 'Our response'], ['Platforms ship persisted cross-file links + roll-forward', '25%', 'High', 'Move up to playbooks, delivery console, private and multi-model deployment; acquisition-ready'], ['Platforms ship a consistency check, not periods or playbooks', '45%', 'Medium', 'Use their check as one signal; win on roll-forward, playbooks and audit'], ['The pack job stays niche for platforms', '30%', 'Low', 'Execute'], ['A platform buys a reporting player', '10–15%', 'Mixed', 'Be the partner: Marketplace listing, co-sell readiness']];
  rows.forEach((r, i) => {
    const y = 1.9 + i * 0.75; const xs = [0.5, 6.0, 7.1, 8.2]; const ws = [5.3, 1.0, 1.0, 4.6];
    r.forEach((c, j) => body(s, c, xs[j], y, ws[j], 0.7, i === 0 ? 10 : 12, i === 0 ? MUTED : INK, { bold: j === 0 && i > 0 }));
    rule(s, 0.5, y + 0.66, 12.3, i === 0 ? INK : RULE);
  });
  body(s, 'Structural limits on Microsoft: per-app agents across separate product groups; backward compatibility for about 450M seats; seat-based licensing; no model neutrality. Excel Agent Mode scores 57.2% on SpreadsheetBench against 71.3% for humans (Microsoft).', 0.5, 5.8, 12.3, 0.8, 12, MUTED);
  src(s, '14_MICROSOFT_RISK.md. Probabilities are judgements. Early-warning indicators are reviewed monthly (Microsoft 365 Roadmap, Anthropic/OpenAI release notes, design-partner feedback).');
}
{ // A2 unit economics
  const s = slideBase('Appendix A2 · Unit economics');
  appendixTitle(s, 'Unit economics: base vs conservative (projections)');
  const rows = [['Metric', 'Base Y1', 'Base Y3', 'Base Y5', 'Conservative Y3', 'Benchmark'], ['Gross margin', '76%', '80%', '82%', '64%', 'SaaS 75–80%'], ['Blended CAC / new org', '$12.9k', '$24.9k', '$29.5k', '$38.8k', '—'], ['Avg ACV of new logos', '$15.0k', '$20.6k', '$24.6k', '$12.4k', '—'], ['CAC payback (GM-adj.)', '13.7 mo', '18.1 mo', '17.6 mo', '58.7 mo', '< 18 mo'], ['LTV / CAC', '4.4×', '2.4×', '2.1×', '0.8×', '> 3×'], ['Burn multiple', '2.5×', '0.8×', '0.3×', '4.8×', '< 2×']];
  rows.forEach((r, i) => {
    const y = 1.9 + i * 0.62; r.forEach((c, j) => body(s, c, 0.5 + j * 2.05, y, 2.0, 0.55, i === 0 ? 10 : 12.5, i === 0 ? MUTED : (j === 4 ? RED : INK), { bold: j === 0 && i > 0 }));
    rule(s, 0.5, y + 0.55, 12.3, i === 0 ? INK : RULE);
  });
  body(s, 'The conservative case is not fundable at seed. That is why the seed gates (≥15 organisations, ≥80% retention, measured time saved) exist, and why missing them means cutting burn, not raising.', 0.5, 6.35, 12.3, 0.6, 12, MUTED);
  src(s, '15_FINANCIAL_MODEL.xlsx › Annual and Snapshot sheets.');
}
{ // A3 dilution
  const s = slideBase('Appendix A3 · Dilution');
  appendixTitle(s, 'Founder ownership through the rounds (base path)');
  CH('bar', [{ name: 'Founders combined', labels: ['Founding', 'Pre-seed + pool', 'Seed', 'Series A', 'Series B'], values: [0.90, 0.6975, 0.522, 0.3974, 0.3259] }], { x: 0.5, y: 1.8, w: 6.8, h: 4.6, barDir: 'col', chartColors: [COBALT], valAxisHidden: true, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0%', dataLabelFontSize: 11, dataLabelFontFace: H, valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 1, valGridLine: { style: 'none' }, catGridLine: { style: 'none' }, catAxisLabelFontSize: 10, catAxisLabelFontFace: H, showLegend: false, barGapWidthPct: 50 });
  const rows = [['Round', 'Terms (illustrative)', 'Sold'], ['Pre-seed', '$1.25M SAFE at $10M post cap', '12.5%'], ['ESOP', '10% pool at pre-seed', '10%'], ['Seed', '$6M at $24M pre; pool to 12%', '20%'], ['Series A', '$18M at $72M pre; pool 13%', '20%'], ['Series B', '$40M at $200M pre; pool 12%', '16.7%']];
  rows.forEach((r, i) => {
    const y = 1.95 + i * 0.55; const xs = [7.7, 9.0, 12.0]; const ws = [1.3, 3.0, 0.8];
    r.forEach((c, j) => body(s, c, xs[j], y, ws[j], 0.5, i === 0 ? 10 : 11.5, i === 0 ? MUTED : INK));
    rule(s, 7.7, y + 0.5, 5.1, i === 0 ? INK : RULE);
  });
  body(s, 'Trade-off: a $7M cap on the same $1.25M means 17.9% dilution instead of 12.5% today, roughly 2.5–3 points less after the Series B. A cap the company can clearly grow into beats a headline number.', 7.7, 5.4, 5.1, 1.2, 11, MUTED);
  src(s, '17_CAP_TABLE_MODEL.xlsx (post-money SAFE mechanics; option pool in the pre-money at priced rounds). Founding split is a placeholder (90% founders / 10% early team). Not legal advice.');
}
{ // A4 market detail
  const s = slideBase('Appendix A4 · Market model detail');
  appendixTitle(s, 'Where the bottom-up numbers come from');
  const rows = [['Occupation (BLS SOC)', 'US employment', 'Mean wage', 'Doc-intensity (assumed)', 'In wedge'], ['Financial & investment analysts (13-2051)', '361,980', '$116,800', '70%', 'Yes'], ['Financial managers (11-3031)', '841,710', '$186,910', '40%', 'Yes'], ['Accountants & auditors (13-2011)', '1,449,500', '$94,750', '50%', '50% (in-industry)'], ['Management analysts (13-1111)', '898,280', '$113,790', '60%', '24.9% (consulting firms)'], ['Credit analysts (13-2041)', '64,390', '$100,850', '70%', 'Yes'], ['Lawyers (23-1011)', '754,500', '$185,840', '60%', 'No (expansion)']];
  rows.forEach((r, i) => {
    const y = 1.85 + i * 0.52; const xs = [0.5, 5.0, 6.8, 8.4, 10.5]; const ws = [4.4, 1.7, 1.5, 2.0, 2.3];
    r.forEach((c, j) => body(s, c, xs[j], y, ws[j], 0.5, i === 0 ? 10 : 11.5, i === 0 ? MUTED : INK));
    rule(s, 0.5, y + 0.47, 12.3, i === 0 ? INK : RULE);
  });
  body(s, 'SAM sensitivity: halving both the document-intensity shares and the recurring-pack share (60% → 30%) cuts SAM from $0.79B to about $0.20B. These two assumptions are the first things our interviews will test.', 0.5, 5.65, 12.3, 0.8, 12, INK);
  src(s, 'BLS OEWS May 2025 (national), via api.bls.gov (accessed 2026-09-30). Full table (11 occupations), geography multipliers and scenarios: 09_MARKET_MODEL.xlsx.');
}
{ // A5 sources
  const s = slideBase('Appendix A5 · Sources');
  appendixTitle(s, 'Key sources');
  const srcs = ['Microsoft 8-K FY26 Q4 and 10-K FY26 (sec.gov); Microsoft Copilot blog, 22 Apr 2026', 'Anthropic: claude.com/claude-for-microsoft-365; anthropic.com/news/finance-agents (5 May 2026); Claude API pricing', 'Google Workspace blog (9 Sep 2026); OpenAI Word add-in (17 Sep 2026, via runtimewire)', 'Workiva 8-K Q4 2025; Workiva AI agents (Business Wire, 29 Jul 2026)', 'BLS OEWS May 2025; National Center for the Middle Market', 'Sacra (Harvey, Rogo, DataSnipper, Gamma); tech.eu (Model ML); BetaKit (Spellbook); Datarails press', 'Carta / PitchBook-NVCA benchmarks; Y Combinator deal terms; Accel Atoms AI cohort 2026', 'Repository evidence: Agentic_Office_ultra @ e8af8242 (git log, line counts, HANDOVER.md, okf/status.md)'];
  srcs.forEach((t, i) => body(s, t, 0.5, 1.9 + i * 0.55, 12.3, 0.5, 12));
  body(s, 'Full source book with tiers and dates: governance/SOURCES.md. Contradictions between sources and the figure chosen: governance/CONTRADICTIONS.md.', 0.5, 6.4, 12.3, 0.4, 11, MUTED);
}
require('fs').writeFileSync('charts.json', JSON.stringify(CHARTS, null, 1));
pres.writeFile({ fileName: process.argv[2] || 'AGENTIC_OFFICE_INVESTOR_DECK.pptx' }).then(f => console.log('wrote', f, CHARTS.length, 'charts deferred'));
