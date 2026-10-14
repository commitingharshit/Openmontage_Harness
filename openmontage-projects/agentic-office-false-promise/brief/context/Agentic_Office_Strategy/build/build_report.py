import re, os, sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, Preformatted, KeepTogether, CondPageBreak)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping

HN = '/System/Library/Fonts/HelveticaNeue.ttc'
pdfmetrics.registerFont(TTFont('HN', HN, subfontIndex=0))
pdfmetrics.registerFont(TTFont('HN-B', HN, subfontIndex=1))
pdfmetrics.registerFont(TTFont('HN-I', HN, subfontIndex=2))
pdfmetrics.registerFont(TTFont('HN-BI', HN, subfontIndex=3))
addMapping('HN', 0, 0, 'HN'); addMapping('HN', 1, 0, 'HN-B'); addMapping('HN', 0, 1, 'HN-I'); addMapping('HN', 1, 1, 'HN-BI')
pdfmetrics.registerFont(TTFont('MENLO', '/System/Library/Fonts/Menlo.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('MENLO-B', '/System/Library/Fonts/Menlo.ttc', subfontIndex=1))
addMapping('MENLO', 0, 0, 'MENLO'); addMapping('MENLO', 1, 0, 'MENLO-B'); addMapping('MENLO', 0, 1, 'MENLO'); addMapping('MENLO', 1, 1, 'MENLO-B')

INK = colors.HexColor('#1B1B1A'); MUTED = colors.HexColor('#7A776F'); RULE = colors.HexColor('#D9D6CE'); COBALT = colors.HexColor('#3157F6'); BG = colors.HexColor('#F8F7F3'); LIGHT = colors.HexColor('#EFEDE7')
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FALLBACK = '→↔✓★⟶↳←↑↓✗'

S = {
    'h1': ParagraphStyle('h1', fontName='HN-B', fontSize=20, leading=24, textColor=INK, spaceBefore=4, spaceAfter=10),
    'h2': ParagraphStyle('h2', fontName='HN-B', fontSize=13.5, leading=17, textColor=INK, spaceBefore=10, spaceAfter=5),
    'h3': ParagraphStyle('h3', fontName='HN-B', fontSize=11, leading=14, textColor=INK, spaceBefore=8, spaceAfter=3),
    'p': ParagraphStyle('p', fontName='HN', fontSize=9.4, leading=13.2, textColor=INK, spaceAfter=5),
    'note': ParagraphStyle('note', fontName='HN-I', fontSize=8.4, leading=11.5, textColor=MUTED, spaceAfter=5),
    'quote': ParagraphStyle('quote', fontName='HN-I', fontSize=9.6, leading=13.5, textColor=COBALT, leftIndent=10, spaceAfter=6),
    'li': ParagraphStyle('li', fontName='HN', fontSize=9.4, leading=13, textColor=INK, leftIndent=12, bulletIndent=2, spaceAfter=2),
    'code': ParagraphStyle('code', fontName='MENLO', fontSize=7.2, leading=9.2, textColor=INK, leftIndent=6, spaceAfter=6, backColor=LIGHT),
    'cell': ParagraphStyle('cell', fontName='HN', fontSize=7.6, leading=9.6, textColor=INK),
    'cellh': ParagraphStyle('cellh', fontName='HN-B', fontSize=7.4, leading=9.4, textColor=MUTED),
    'eyebrow': ParagraphStyle('eb', fontName='HN-B', fontSize=8, leading=10, textColor=MUTED, spaceAfter=2),
}

def inline(t):
    t = t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', t)
    codes = []
    def keep(m):
        codes.append(m.group(1)); return f'\x00{len(codes)-1}\x00'
    t = re.sub(r'`([^`]+)`', keep, t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![*\w])\*([^*\n]+)\*(?!\w)', r'<i>\1</i>', t)
    t = ''.join(f'<font name="MENLO">{c}</font>' if c in FALLBACK else c for c in t)
    t = re.sub(r'\x00(\d+)\x00', lambda m: '<font name="MENLO" size="8">' + codes[int(m.group(1))] + '</font>', t)
    return t

_P = Paragraph
def Paragraph(text, style, **kw):
    try:
        return _P(text, style, **kw)
    except Exception:
        plain = re.sub(r'<[^>]+>', '', text)
        return _P(plain, style, **kw)

def table_flow(rows, width):
    ncol = max(len(r) for r in rows)
    rows = [r + [''] * (ncol - len(r)) for r in rows]
    fs = 7.6 if ncol <= 6 else (6.6 if ncol <= 9 else 5.6)
    cs = ParagraphStyle('c', parent=S['cell'], fontSize=fs, leading=fs * 1.28)
    hs = ParagraphStyle('h', parent=S['cellh'], fontSize=fs - 0.2, leading=fs * 1.25)
    data = [[Paragraph(inline(c.strip()), hs if i == 0 else cs) for c in r] for i, r in enumerate(rows)]
    # column widths proportional to max content length (capped)
    lens = [max(max(min(len(r[j]), 60) for r in rows) + 4, max((len(w) for w in rows[0][j].split()), default=3) * 1.6 + 4, 8) for j in range(ncol)]
    tot = sum(lens); cw = [width * l / tot for l in lens]
    t = Table(data, colWidths=cw, repeatRows=1)
    t.setStyle(TableStyle([
        ('LINEBELOW', (0, 0), (-1, 0), 0.8, INK), ('LINEBELOW', (0, 1), (-1, -1), 0.3, RULE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 3), ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5)]))
    return t

def md_to_flow(md, width, demote=0, first_h1_eyebrow=None):
    out = []; lines = md.split('\n'); i = 0
    para = []
    def flush():
        nonlocal para
        if para:
            txt = ' '.join(para).strip()
            if txt:
                st = S['note'] if (txt.startswith('*') and txt.endswith('*') and not txt.startswith('**')) else S['p']
                out.append(Paragraph(inline(txt), st))
            para = []
    while i < len(lines):
        ln = lines[i]
        if ln.strip().startswith('```'):
            flush(); j = i + 1; buf = []
            while j < len(lines) and not lines[j].strip().startswith('```'):
                buf.append(lines[j]); j += 1
            out.append(Preformatted('\n'.join(buf), S['code'])); i = j + 1; continue
        if re.match(r'^\s*\|', ln):
            flush(); rows = []
            while i < len(lines) and re.match(r'^\s*\|', lines[i]):
                cells = [c for c in lines[i].strip().strip('|').split('|')]
                if not all(re.match(r'^\s*:?-{2,}:?\s*$', c) for c in cells if c.strip()):
                    rows.append(cells)
                i += 1
            if rows: out.append(table_flow(rows, width)); out.append(Spacer(1, 6))
            continue
        m = re.match(r'^(#{1,4})\s+(.*)', ln)
        if m:
            flush(); lvl = len(m.group(1)) + demote; txt = m.group(2)
            key = 'h1' if lvl <= 1 else ('h2' if lvl == 2 else 'h3')
            out.append(CondPageBreak(60)); out.append(Paragraph(inline(txt), S[key])); i += 1; continue
        if re.match(r'^\s*[-*]\s+', ln):
            flush(); txt = re.sub(r'^\s*[-*]\s+', '', ln); j = i + 1
            while j < len(lines) and lines[j].startswith('  ') and not re.match(r'^\s*[-*]\s+', lines[j]) and lines[j].strip():
                txt += ' ' + lines[j].strip(); j += 1
            out.append(Paragraph(inline(txt), S['li'], bulletText='•')); i = j; continue
        m2 = re.match(r'^\s*(\d+)\.\s+(.*)', ln)
        if m2:
            flush(); out.append(Paragraph(inline(m2.group(2)), S['li'], bulletText=m2.group(1) + '.')); i += 1; continue
        if ln.startswith('>'):
            flush(); out.append(Paragraph(inline(ln.lstrip('> ').strip()), S['quote'])); i += 1; continue
        if ln.strip() in ('---', '***'):
            flush(); i += 1; continue
        if not ln.strip():
            flush(); i += 1; continue
        para.append(ln.strip()); i += 1
    flush()
    return out

def read(p):
    return open(os.path.join(ROOT, p), encoding='utf-8').read()

def strip_title(md):
    # drop the document's own first H1 line (we add our own chapter title)
    return re.sub(r'^# .*\n', '', md, count=1)

def img(path, width, maxh=None):
    from PIL import Image as PI
    w, h = PI.open(path).size
    ih = width * h / w
    if maxh and ih > maxh:
        ih = maxh; width = ih * w / h
    return Image(path, width=width, height=ih)

def build_report(out):
    doc = BaseDocTemplate(out, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=20 * mm, bottomMargin=18 * mm,
                          title='Agentic Office — Strategy Report', author="Agentic Office founders' office")
    W = A4[0] - 36 * mm
    def bg(c, d):
        c.saveState(); c.setFillColor(BG); c.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        if d.page > 1:
            c.setFont('HN-B', 7); c.setFillColor(INK); c.drawString(18 * mm, A4[1] - 12 * mm, 'AGENTIC OFFICE')
            c.setStrokeColor(RULE); c.setLineWidth(0.5); c.line(45 * mm, A4[1] - 11.6 * mm, A4[0] - 28 * mm, A4[1] - 11.6 * mm)
            c.setFont('HN', 7); c.setFillColor(MUTED); c.drawRightString(A4[0] - 18 * mm, A4[1] - 12 * mm, f'{d.page}')
            c.drawString(18 * mm, 10 * mm, 'Strategy report · v1 · 30 September 2026 · Confidential · Figures labelled fact / derived / assumption / hypothesis')
        c.restoreState()
    doc.addPageTemplates([PageTemplate(id='p', frames=[Frame(18 * mm, 18 * mm, W, A4[1] - 38 * mm, id='f')], onPage=bg)])
    st = []
    # Cover
    st.append(Spacer(1, 45 * mm))
    st.append(Paragraph('AGENTIC OFFICE', ParagraphStyle('c0', fontName='HN-B', fontSize=10, textColor=INK, leading=12)))
    st.append(Spacer(1, 10 * mm))
    st.append(Paragraph('Strategy, market and<br/>fundraising case', ParagraphStyle('c1', fontName='HN-B', fontSize=34, leading=38, textColor=INK)))
    st.append(Spacer(1, 6 * mm))
    st.append(Paragraph('Keep every recurring pack right. <font color="#3157F6">With proof.</font>', ParagraphStyle('c2', fontName='HN-B', fontSize=16, leading=20, textColor=INK)))
    st.append(Spacer(1, 12 * mm))
    st.append(Paragraph("Founder's office report · v1 · 30 September 2026<br/>Prepared for the founders and prospective investors. Confidential.<br/><br/>Every material figure is labelled as a verified fact, a derived figure (with its formula), an assumption, or a hypothesis. Source book, assumption register and contradiction log are in the governance folder of the data room.", S['p']))
    st.append(Spacer(1, 30 * mm))
    toc = ['Executive summary', 'Product thesis', 'Category', 'Market sizing', 'Customer segmentation', 'Personas', 'Jobs to be done', 'Competitive landscape', 'Competitor deep dives', 'Pricing and unit costs', 'Business models', 'Geography', 'Go-to-market', 'Product roadmap', 'Expansion graph', 'Moat', 'Microsoft risk', 'Risk register', 'Financial model', 'Fundraising', 'Bear case', 'Bull case', 'Pre-mortem', 'Open questions (research gaps)', 'Validation plan', 'Metric tree', 'First 90 days', 'Appendix: decisions, contradictions, sources']
    st.append(Paragraph('Contents', S['h3']))
    st.append(Paragraph(' · '.join(f'{i+1}. {t}' for i, t in enumerate(toc)), S['note']))
    st.append(PageBreak())
    def chapter(num, title, md=None, pre=None, post=None, strip=True, eyebrow=None):
        st.append(Paragraph(f'{num:02d}  ·  {eyebrow or ""}'.rstrip(' ·'), S['eyebrow']))
        st.append(Paragraph(title, S['h1']))
        for f in (pre or []): st.append(f)
        if md is not None:
            st.extend(md_to_flow(strip_title(md) if strip else md, W, demote=0))
        for f in (post or []): st.append(f)
        st.append(PageBreak())
    R = lambda p: read(p)
    ch = os.path.join(ROOT, 'build', 'report')
    chapter(1, 'Executive summary', R('build/report/exec.md'))
    chapter(2, 'Product thesis', R('strategy/01_PRODUCT_THESIS.md'))
    chapter(3, 'Category', R('strategy/02_CATEGORY_MAP.md'))
    chapter(4, 'Market sizing', R('build/report/market.md'), pre=[img(os.path.join(ch, 'c1_market.png'), W * 0.9)])
    chapter(5, 'Customer segmentation', R('strategy/06_CUSTOMER_SEGMENTATION.md'), pre=[img(os.path.join(ch, 'c3_wedge.png'), W * 0.85)])
    chapter(6, 'Personas', R('strategy/07_PERSONAS.md'))
    chapter(7, 'Jobs to be done', R('strategy/08_JOBS_TO_BE_DONE.md'))
    maps = [img(os.path.join(ROOT, 'research/competitors/maps', f), W * 0.92, maxh=110 * mm) for f in ('map_A_agentic_vs_architecture.png', 'map_B_structure_vs_autonomy.png', 'map_C_scope_vs_vertical.png')]
    chapter(8, 'Competitive landscape', R('strategy/04_COMPETITIVE_LANDSCAPE.md'), post=[CondPageBreak(120 * mm)] + [x for m in maps for x in (m, Spacer(1, 6))])
    chapter(9, 'Competitor deep dives', R('strategy/05_COMPETITOR_DEEP_DIVES.md'))
    chapter(10, 'Pricing and unit costs', R('build/report/pricing.md'), pre=[img(os.path.join(ch, 'c4_margin.png'), W * 0.9)])
    chapter(11, 'Business models and sequencing', R('strategy/10B_BUSINESS_MODELS.md'))
    chapter(12, 'Geography', R('research/market/GEOGRAPHIC_ANALYSIS.md'))
    chapter(13, 'Go-to-market', R('strategy/11_GTM_STRATEGY.md'))
    chapter(14, 'Product roadmap', R('strategy/12_PRODUCT_ROADMAP.md'))
    chapter(15, 'Expansion graph', R('strategy/23_EXPANSION_GRAPH.md'))
    chapter(16, 'Moat', R('strategy/13_MOAT.md'))
    chapter(17, 'Microsoft risk', R('strategy/14_MICROSOFT_RISK.md'))
    chapter(18, 'Risk register', R('governance/RISKS.md'))
    chapter(19, 'Financial model', R('build/report/fin.md'), pre=[img(os.path.join(ch, 'c2_arr.png'), W * 0.9)])
    chapter(20, 'Fundraising', R('strategy/16_FUNDRAISING.md'), post=[img(os.path.join(ch, 'c6_spend.png'), W * 0.85), img(os.path.join(ch, 'c5_owner.png'), W * 0.85)])
    chapter(21, 'Bear case', R('investor/BEAR_CASE.md'))
    chapter(22, 'Bull case', R('investor/BULL_CASE.md'))
    chapter(23, 'Pre-mortem', R('investor/PREMORTEM.md'))
    chapter(24, 'Open questions (research gaps)', R('governance/RESEARCH_GAPS.md'))
    chapter(25, 'Validation plan', R('strategy/21_VALIDATION_PLAN.md'))
    chapter(26, 'Metric tree', R('strategy/22_METRIC_TREE.md'))
    chapter(27, 'First 90 days', R('strategy/24_FIRST_90_DAYS.md'))
    st.append(Paragraph('28  ·  Appendix', S['eyebrow'])); st.append(Paragraph('Decision log', S['h1']))
    st.extend(md_to_flow(strip_title(R('governance/DECISIONS.md')), W)); st.append(PageBreak())
    st.append(Paragraph('Contradiction log', S['h1'])); st.extend(md_to_flow(strip_title(R('governance/CONTRADICTIONS.md')), W)); st.append(PageBreak())
    st.append(Paragraph('Source book', S['h1'])); st.extend(md_to_flow(strip_title(R('governance/SOURCES.md')), W))
    doc.build(st)

def build_onepager(out):
    from reportlab.platypus import SimpleDocTemplate
    doc = BaseDocTemplate(out, pagesize=A4, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=13 * mm, bottomMargin=11 * mm, title='Agentic Office — One-pager')
    W = A4[0] - 28 * mm; colw = (W - 8 * mm) / 2
    def bg(c, d):
        c.saveState(); c.setFillColor(BG); c.rect(0, 0, A4[0], A4[1], stroke=0, fill=1); c.restoreState()
    fr1 = Frame(14 * mm, 11 * mm, colw, A4[1] - 57 * mm, id='l', leftPadding=0, rightPadding=0)
    fr2 = Frame(14 * mm + colw + 8 * mm, 11 * mm, colw, A4[1] - 57 * mm, id='r', leftPadding=0, rightPadding=0)
    frt = Frame(14 * mm, A4[1] - 45 * mm, W, 32 * mm, id='t', leftPadding=0, rightPadding=0)
    doc.addPageTemplates([PageTemplate(id='p', frames=[frt, fr1, fr2], onPage=bg)])
    h = ParagraphStyle('oh', fontName='HN-B', fontSize=9, leading=11, textColor=COBALT, spaceBefore=7, spaceAfter=2)
    p = ParagraphStyle('op', fontName='HN', fontSize=9.0, leading=12.2, textColor=INK, spaceAfter=2)
    st = [Paragraph('AGENTIC OFFICE  ·  ONE-PAGE MEMO  ·  PRE-SEED  ·  OCTOBER 2026', ParagraphStyle('e', fontName='HN-B', fontSize=7.5, textColor=MUTED, leading=10)),
          Spacer(1, 3),
          Paragraph('Keep every recurring pack right. <font color="#3157F6">With proof.</font>', ParagraphStyle('t', fontName='HN-B', fontSize=20, leading=24, textColor=INK)),
          Paragraph('The execution and review layer for recurring multi-file professional work: Excel models, decks, memos and their sources, rolled forward every period, tied out and reversible.', ParagraphStyle('s', fontName='HN', fontSize=9.5, leading=12.5, textColor=INK))]
    from reportlab.platypus import FrameBreak
    st.append(FrameBreak())
    blocks = [
        ('Problem', 'Every month or quarter, finance and investment teams rebuild the same pack by hand: new numbers into the model, then copied into the deck, memo and LP or lender report, checked for tie-out, re-cut after late changes, versioned by filename. Vendor case studies report 60–180 hours per quarter for LP reporting (Tier 3). A wrong number that reaches an LP or board is costly.'),
        ('Solution', 'A persistent object graph links every figure (cell ↔ slide ↔ sentence ↔ source page). Roll-forwards move numbers deterministically with Rust OOXML kernels; the model drafts only the narrative that changed. A tie-out report, one semantic diff across files, native tracked changes and pack-level restore follow. Files stay native. Local-first, bring your own model.'),
        ('Why now', 'Between April and September 2026, Microsoft, Anthropic, Google and OpenAI all put agents inside Office files, so single-file AI editing became free or bundled. Agents now create more document changes than people can check, and nobody owns cross-file, cross-period consistency and review.'),
        ('Market', 'Bottom-up TAM $4.9B (BLS May-2025 occupations × document intensity × $60/seat/month; other high-income markets; India). SAM $0.79B (finance and reporting roles with recurring packs). SOM: $9.6M year-5 ARR from the operating plan (base). Bounds: $10.8B TAM (two independent cross-checks). Budget proof: Workiva $885M FY25 revenue, 97% gross retention.'),
        ('Wedge', 'Fund-finance and portfolio-operations teams at mid-market PE, private-credit and VC firms (quarterly LP, portfolio, IC and lender packs), plus the India-based production teams that build these packs for global clients.'),
        ('Product status', 'Prototype-stage. Built: ~50k lines of Rust kernels (DOCX/XLSX/PPTX/PDF), ~67k lines of agent runtime, Code-OSS workbench, 17 office skills, file-level dependency graph, 928 offline tests (Jul 2026). Next 8 weeks: object-level linking, roll-forward, tie-out, restore. No customers yet.'),
        ('Competition', 'Platform agents (Copilot, Claude, ChatGPT, Gemini) edit open files in one session. Workiva needs authoring in its platform. Datarails and Cube build packs from their own data models. Rogo, Hebbia and Model ML generate front-office content. None maintains a customer\'s existing bespoke pack across periods with proof. Main risk: Microsoft or Anthropic add persistent cross-file links.'),
        ('Business model', 'Price the pack, not the seat: Team $250/pack/month (reviewers free), Business $30k+/year, Enterprise/private $120k+/year, paid pilots $2.5k/month. Base-case pack gross margin ~74% with ~60% deterministic updates; per-seat pricing loses money on heavy agent users.'),
        ('Team', 'Harshit Verma (founder, IIT Delhi), lead author of the kernel and orchestration work, plus 4 engineers with commits since July 2026. [Founders to complete: roles, full-time status, domain operators and advisors.]'),
        ('Fundraise', 'Raising $1.25M pre-seed (SAFE, $8–12M post-money cap). The 18-month plan has net burn of ≈$0.64M and survives the conservative revenue case for 29 months. By month 18: ≥15 paying organisations (plan ~25), ≥$0.35M ARR (plan ~$0.49M), ≥80% retention across two cycles, ≥30% measured time saved per pack, SOC 2 Type I.'),
        ('Next 90 days', '30 interviews, 5 real pack teardowns, 2 side-by-side runs against Claude and Copilot, ≥3 paid pilots, and a go/adjust/pivot gate on four explicit hypotheses.'),
    ]
    for k, (t, b) in enumerate(blocks):
        if k == 6: st.append(FrameBreak())
        st.append(KeepTogether([Paragraph(t.upper(), h), Paragraph(inline(b), p)]))
    kv = [['Key numbers', ''], ['TAM (bottom-up, base)', '$4.9B'], ['SAM (base)', '$0.79B'], ['SOM = Y5 exit ARR (base / cons. / aggr.)', '$9.6M / $2.5M / $33M'], ['Pack gross margin (base)', '~74%'], ['18-month net burn (base)', '≈$0.64M'], ['Seed-ready (month ~19, base)', '~25 orgs · ~$0.49M ARR'], ['Customers / revenue today', 'None / $0']]
    kt = Table([[Paragraph(inline(a), ParagraphStyle('k', fontName='HN-B' if i == 0 else 'HN', fontSize=7.8, leading=10, textColor=COBALT if i == 0 else INK)), Paragraph(inline(b), ParagraphStyle('k2', fontName='HN-B', fontSize=7.8, leading=10, textColor=INK))] for i, (a, b) in enumerate(kv)], colWidths=[colw * 0.58, colw * 0.42])
    kt.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.3, RULE), ('LINEBELOW', (0, 0), (-1, 0), 0.8, INK), ('LEFTPADDING', (0, 0), (-1, -1), 0), ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5)]))
    st.append(Spacer(1, 8)); st.append(kt)
    st.append(Spacer(1, 6)); st.append(Paragraph('All figures are projections or public-source estimates; see the strategy report and data room for sources, assumptions and scenarios.', ParagraphStyle('fn', fontName='HN-I', fontSize=6.8, leading=8.6, textColor=MUTED)))
    doc.build(st)

if __name__ == '__main__':
    build_report(os.path.join(ROOT, 'investor', 'AGENTIC_OFFICE_STRATEGY_REPORT.pdf'))
    build_onepager(os.path.join(ROOT, 'investor', 'AGENTIC_OFFICE_ONE_PAGER.pdf'))
    print('ok')
