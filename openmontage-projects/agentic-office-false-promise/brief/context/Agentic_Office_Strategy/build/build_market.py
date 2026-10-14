import sys; sys.path.insert(0, '.')
from xlhelp import *
from openpyxl.chart import BarChart, Reference

OUT = '../models/09_MARKET_MODEL.xlsx'
wb = Workbook()

# ------------------------------------------------------------------ README
ws = wb.active; ws.title = 'README'
widths(ws, {'A': 110})
lines = [
    ('Agentic Office — Market Model (09_MARKET_MODEL.xlsx)', H1),
    ('Built 2026-09-30. Every assumption lives on the Inputs sheet with an ID (A0xx) that matches governance/ASSUMPTIONS.md.', BLACK),
    ('', BLACK),
    ('HOW TO USE', BOLD),
    ('1. Change the scenario selector on Inputs!C3 (1 = Conservative, 2 = Base, 3 = Aggressive). Every calculation re-flows.', BLACK),
    ('2. Blue text = hard-coded input you may edit. Black = formula. Green = link to another sheet. Yellow fill = key assumption.', BLACK),
    ('3. Row-level inputs (BLS employment, wages, document-intensity shares, persona hours) are on the method sheets, also in blue.', BLACK),
    ('', BLACK),
    ('STRUCTURE', BOLD),
    ('Inputs — scenario selector + all scalar assumptions with source, type (Verified / Derived / Assumption) and confidence.', BLACK),
    ('A_TopDown — Model A: Microsoft 365 commercial seat base × share of document-intensive professional seats × AI execution premium.', BLACK),
    ('B_Seats — Model B: BLS May-2025 occupations × document-intensity share × ARPU, with geography multipliers. Also computes SAM.', BLACK),
    ('C_Enterprise — Model C: target organisations × eligible share × ACV.', BLACK),
    ('D_Value — Model D: hours saved × fully-loaded cost × value-capture % → willingness-to-pay per persona.', BLACK),
    ('SOM — operational SOM taken from 15_FINANCIAL_MODEL.xlsx (sales capacity × conversion × retention), expressed as % of SAM.', BLACK),
    ('Segments — weighted scoring of eight candidate wedges. Weights and 1–5 scores are editable inputs with written rationale.', BLACK),
    ('Geo — weighted scoring of initial markets.', BLACK),
    ('Summary — TAM / SAM / SOM by method, reconciliation, and chart.', BLACK),
    ('', BLACK),
    ('DEFINITIONS', BOLD),
    ('TAM = annual spend if every document-intensive professional in covered geographies paid for an agentic execution layer on their Office work (not the Office market itself).', BLACK),
    ('SAM = the part of TAM our product can plausibly serve in 3–5 years: finance & reporting roles that produce recurring multi-file packs, in English-working markets + India.', BLACK),
    ('SOM = Year-5 ARR produced by the operating plan in the financial model (base case), not a % of TAM.', BLACK),
    ('', BLACK),
    ('WHAT THIS MODEL IS NOT', BOLD),
    ('It does not treat Microsoft 365 revenue ($102.9B FY26) as TAM. That figure is shown only as the ceiling of the adjacent budget.', BLACK),
    ('Document-intensity shares (A001) are the single most uncertain input. They are flagged CRITICAL in governance/RESEARCH_GAPS.md.', BLACK),
]
for i, (t, f) in enumerate(lines, 1):
    w(ws, f'A{i}', t, font=f, wrap=True)

# ------------------------------------------------------------------ INPUTS
inp = wb.create_sheet('Inputs')
widths(inp, {'A': 8, 'B': 52, 'C': 12, 'D': 13, 'E': 13, 'F': 13, 'G': 13, 'H': 12, 'I': 11, 'J': 90})
w(inp, 'A1', 'INPUTS — scalar assumptions', font=H1)
w(inp, 'B3', 'Scenario selector (1=Conservative, 2=Base, 3=Aggressive)', font=BOLD)
w(inp, 'C3', 2, font=BLUE, fill=YELLOW)
w(inp, 'D3', '=CHOOSE(C3,"Conservative","Base","Aggressive")')
header(inp, 5, ['ID', 'Assumption', 'Unit', 'Conservative', 'Base', 'Aggressive', 'ACTIVE', 'Type', 'Confidence', 'Source / rationale'])
A = {}  # id -> absolute ref of active value
rows = [
    ('A002', 'Other high-income markets: document-intensive professional population as a multiple of US', 'x US', 0.8, 1.0, 1.2, 'Assumption', 'Low', 'No harmonised cross-country occupation data gathered yet. UK+EU+CA+AU+JP+SG+Gulf professional services workforce judged ≈ US. Validate with OECD/ILO ISCO-08 2x/24x counts (RESEARCH_GAPS G003).'),
    ('A003', 'India: document-intensive professional population as a multiple of US', 'x US', 0.4, 0.6, 0.8, 'Assumption', 'Low', 'India has ~2.36M GCC employees (Zinnov-Nasscom 2026), >450k Big-4 staff, 407k ICAI members. Only a fraction are document-intensive in our sense.'),
    ('A004', 'India ARPU as % of US ARPU', '%', 0.20, 0.25, 0.35, 'Assumption', 'Medium', 'Indian analyst wages are ~15–20% of US (D_Value). Offshore teams billed to global clients support a higher ratio.'),
    ('A005', 'Blended ARPU per seat per month (US list, TAM/SAM)', '$/seat/mo', 40, 60, 90, 'Assumption', 'Medium', 'Benchmarks: M365 Copilot $30; ChatGPT Business $20–25; Claude Team $25 / Premium $100; Hebbia ~$250–830/mo; vertical tools $100–1,000/mo. See 10_PRICING_MODEL.xlsx.'),
    ('A006', 'Share of in-wedge professionals who produce a recurring multi-file pack (monthly/quarterly)', '%', 0.45, 0.60, 0.70, 'Assumption', 'Low', 'Hypothesis H1 in 21_VALIDATION_PLAN. Board packs, lender/LP reports, month-end packs, IC updates are recurring by nature.'),
    ('A007', 'Serviceable non-US English-working markets for SAM (UK, IE, CA, AU, NZ, SG, UAE, others) as multiple of US', 'x US', 0.30, 0.45, 0.55, 'Derived', 'Medium', 'UK alone ≈0.17–0.35× US for in-wedge occupations (2024: finance & investment analysts/advisers 219k vs US 13-2051+13-2052 629k; accountants 246k vs 1.45M; mgmt consultants/business analysts 221k vs 898k — careersmart/Working Futures, LFS-based). CA, AU, SG, UAE, IE, NZ add ≈0.15–0.25 (not verified).'),
    ('A009', 'Fully-loaded cost multiplier on base wage', 'x', 1.25, 1.30, 1.40, 'Assumption', 'Medium', 'Benefits, payroll tax, overhead. BLS ECEC: wages ≈ 70% of total compensation for private industry (→ 1.43x); we use a lower base to stay conservative.'),
    ('A010', 'Working weeks per year', 'weeks', 46, 46, 46, 'Assumption', 'High', 'Standard 52 weeks less leave/holidays.'),
    ('A012', 'Time reduction on document-production hours from the product', '%', 0.15, 0.25, 0.35, 'Hypothesis', 'Low', 'Thomson Reuters Future of Professionals: professionals expect ~5 hrs/week saved by GenAI. Measured value must come from design partners (metric: hours saved per pack).'),
    ('A013', 'Value capture (share of created value charged as price)', '%', 0.05, 0.10, 0.15, 'Assumption', 'Medium', 'SaaS rule of thumb 10–20% of value; lower because platforms bundle AI cheaply.'),
    ('A014', 'US middle-market companies ($10M–$1B revenue)', 'count', 200000, 200000, 200000, 'Verified', 'Medium', 'National Center for the Middle Market: "nearly 200,000" US middle-market businesses (Tier 2). https://www.middlemarketcenter.org'),
    ('A015', 'Mid-market share with a finance/reporting team producing recurring multi-file packs', '%', 0.40, 0.50, 0.60, 'Assumption', 'Low', 'Most $10M+ companies produce monthly management and board packs; share with ≥3-person finance team is the uncertainty.'),
    ('A016', 'Mid-market ACV (team of ~8–12 seats + platform fee)', '$/yr', 8000, 15000, 25000, 'Hypothesis', 'Low', 'Anchors (Tier 3 buyer data): Rollstack median ≈ $7.9k/yr; Cube median ≈ $22.1k/yr (58 purchases); Datarails from ~$20–24k/yr (median $55k). Workiva ≈ $134k avg at enterprise scale.'),
    ('A017', 'US enterprises (500+ employees)', 'count', 20000, 20000, 20000, 'Assumption', 'Medium', 'Census SUSB order of magnitude (~20k firms with 500+ employees). VERIFY exact 2022 SUSB figure (RESEARCH_GAPS G011).'),
    ('A018', 'Enterprise ACV (finance, reporting, strategy teams; private deployment)', '$/yr', 60000, 120000, 200000, 'Hypothesis', 'Low', 'Workiva avg ≈ $134k/customer; Harvey minimums reportedly $240k+; Hebbia $10k/seat.'),
    ('A019', 'US professional-services firms, 20–500 staff (consulting, accounting, legal, IB boutiques)', 'count', 50000, 60000, 70000, 'Assumption', 'Low', 'Derived order of magnitude from BLS industry employment (5416: 1.87M, 5412: 1.09M, 5411: 1.22M, 523: 1.10M). VERIFY with SUSB by NAICS (G011).'),
    ('A020', 'Professional-services firm ACV', '$/yr', 10000, 20000, 35000, 'Hypothesis', 'Low', ''),
    ('A021', 'US investment managers (PE, VC, credit, hedge funds, family offices) producing LP/IC packs', 'count', 9000, 12000, 15000, 'Derived', 'Medium', 'SEC: ~46,000 US private funds on Form ADV (H1 2025; 64,166 globally); 58,891 funds on Form PF (2025Q4); 16,544 SEC-registered advisers (IAA 2026). Managers ≈ funds ÷ 3–5 incl. exempt reporting advisers → ~9–15k.'),
    ('A022', 'Investment-manager ACV', '$/yr', 12000, 25000, 40000, 'Hypothesis', 'Low', ''),
    ('A023', 'Rest-of-world multiplier for Model C (non-US organisations)', 'x US', 0.8, 1.0, 1.2, 'Assumption', 'Low', 'Mirrors A002.'),
    ('A024', 'Microsoft 365 Commercial products & cloud services revenue FY26', '$', 102900000000, 102900000000, 102900000000, 'Derived', 'High', 'MSFT FY26 10-K: +$14.2B (+16%) → FY25 ≈ $88.75B, FY26 ≈ $102.9B. https://www.sec.gov/Archives/edgar/data/0000789019/000119312526323660/msft-20260630.htm'),
    ('A025', 'Microsoft 365 commercial paid seats', 'seats', 450000000, 450000000, 470000000, 'Verified', 'Medium', '>450M reported FY26 Q2 (Jan 2026) per office365itpros summary of MSFT call; +6% YoY.'),
    ('A026', 'Share of M365 commercial seats held by document-intensive professionals', '%', 0.04, 0.05, 0.06, 'Assumption', 'Low', 'US doc-intensive pros (B_Seats) ≈ 3.2M of 155.5M employed = 2.0%; M365 seats skew to office workers, so 4–6% of seats.'),
    ('A027', 'AI execution premium per such seat per month', '$/mo', 30, 40, 60, 'Assumption', 'Medium', 'M365 Copilot list $30; premium agent seats (Claude Team Premium $100, ChatGPT $125 premium seat).'),
    ('A028', 'M365 Copilot paid seats (FY26 Q4)', 'seats', 30000000, 30000000, 30000000, 'Verified', 'High', 'Microsoft FY26 Q4 press release (8-K ex99.1): "over 30 million paid seats".'),
    ('A029', 'M365 Copilot list price', '$/mo', 30, 30, 30, 'Verified', 'High', 'microsoft.com/microsoft-365-copilot/pricing'),
    ('A030', 'USD/INR exchange rate', '₹ per $', 88, 88, 88, 'Assumption', 'Medium', 'Verify spot rate at publication.'),
    ('A031', 'Offshore delivery billing rate (value basis for offshore analysts)', '$/hr', 25, 35, 45, 'Assumption', 'Low', 'Typical KPO/GCC analyst billing to global clients; not verified (G014).'),
]
r = 6
for rid, name, unit, c, b, a, typ, conf, src in rows:
    w(inp, f'A{r}', rid, font=BOLD); w(inp, f'B{r}', name, wrap=True); w(inp, f'C{r}', unit)
    fmt = PCT if unit == '%' else (USD if unit.startswith('$') else NUM1 if unit.startswith('x') else NUM)
    if unit in ('x US', 'x'): fmt = MULT
    for col, v in zip('DEF', (c, b, a)):
        w(inp, f'{col}{r}', v, font=BLUE, fmt=fmt)
    w(inp, f'G{r}', f'=CHOOSE($C$3,D{r},E{r},F{r})', fmt=fmt, fill=YELLOW if conf == 'Low' else None)
    w(inp, f'H{r}', typ); w(inp, f'I{r}', conf); w(inp, f'J{r}', src, font=NOTE, wrap=True)
    A[rid] = f"Inputs!$G${r}"
    r += 1

# ------------------------------------------------------------------ MODEL B — SEATS
b = wb.create_sheet('B_Seats')
widths(b, {'A': 9, 'B': 40, 'C': 13, 'D': 12, 'E': 11, 'F': 14, 'G': 8, 'H': 11, 'I': 14, 'J': 70})
w(b, 'A1', 'MODEL B — Bottom-up seats (US BLS OEWS May 2025, national)', font=H1)
w(b, 'A2', 'Source: BLS Occupational Employment & Wage Statistics, May 2025, via api.bls.gov series OEUN0000000000000{SOC}01/04 (accessed 2026-09-30). Doc-intensity shares = assumption A001 (row inputs, blue).', font=NOTE)
header(b, 4, ['SOC', 'Occupation', 'US employment', 'Mean wage $', 'Doc-intensity share (A001)', 'Doc-intensive US pros', 'In wedge? (1/0)', 'Share in wedge', 'In-wedge US pros', 'Rationale for share'])
occ = [
    ('13-2051', 'Financial & investment analysts', 361980, 116800, 0.70, 1, 1.00, 'Models, memos, decks are the output. In-wedge.'),
    ('11-3031', 'Financial managers (controllers, FP&A, treasurers)', 841710, 186910, 0.40, 1, 1.00, 'Own board/management packs; many are managers who review.'),
    ('13-2011', 'Accountants & auditors', 1449500, 94750, 0.50, 1, 0.50, 'Only in-industry reporting accountants counted in wedge (audit firms later).'),
    ('13-2041', 'Credit analysts', 64390, 100850, 0.70, 1, 1.00, 'Credit memos + covenant packs.'),
    ('13-2054', 'Financial risk specialists', 63850, 124420, 0.40, 1, 0.50, 'Risk reporting packs.'),
    ('13-1111', 'Management analysts (consultants)', 898280, 113790, 0.60, 1, 0.249, 'Only those in NAICS 5416 consulting firms (223,280 / 898,280 = 24.9%, BLS).'),
    ('23-1011', 'Lawyers', 754500, 185840, 0.60, 0, 0.00, 'Document-heavy but crowded (Harvey/Legora/Spellbook) — expansion, not wedge.'),
    ('23-2011', 'Paralegals & legal assistants', 392880, 69700, 0.50, 0, 0.00, 'Expansion segment.'),
    ('13-1161', 'Market research analysts & marketing specialists', 899580, 89490, 0.30, 0, 0.00, 'Mostly marketing specialists; low multi-file intensity.'),
    ('13-1041', 'Compliance officers', 417070, 88400, 0.40, 0, 0.00, 'Policy estates — document-estate expansion segment.'),
    ('41-3031', 'Securities, commodities & financial services sales agents', 489570, 109150, 0.30, 0, 0.00, 'Includes investment bankers; crowded front office (Rogo/Hebbia/Model ML).'),
]
r0 = 5
for i, (soc, name, emp, wage, sh, flag, wsh, why) in enumerate(occ):
    r = r0 + i
    w(b, f'A{r}', soc); w(b, f'B{r}', name)
    w(b, f'C{r}', emp, font=BLUE, fmt=NUM); w(b, f'D{r}', wage, font=BLUE, fmt=USD)
    w(b, f'E{r}', sh, font=BLUE, fmt=PCT, fill=YELLOW)
    w(b, f'F{r}', f'=C{r}*E{r}', fmt=NUM)
    w(b, f'G{r}', flag, font=BLUE); w(b, f'H{r}', wsh, font=BLUE, fmt=PCT)
    w(b, f'I{r}', f'=F{r}*G{r}*H{r}', fmt=NUM)
    w(b, f'J{r}', why, font=NOTE, wrap=True)
rl = r0 + len(occ) - 1
rt = rl + 1
w(b, f'B{rt}', 'TOTAL US', font=BOLD)
for col in 'CFI':
    w(b, f'{col}{rt}', f'=SUM({col}{r0}:{col}{rl})', fmt=NUM, bold=True)
w(b, f'D{rt}', f'=SUMPRODUCT(C{r0}:C{rl},D{r0}:D{rl})/C{rt}', fmt=USD, comment='Employment-weighted mean wage')

s = rt + 2
w(b, f'A{s}', 'TAM — Model B', font=BOLD)
calc = [
    ('US document-intensive professionals', f'=F{rt}', NUM),
    ('× other high-income multiplier (A002)', f'={A["A002"]}', MULT),
    ('Other high-income document-intensive professionals', f'=C{s+1}*C{s+2}', NUM),
    ('India multiplier (A003)', f'={A["A003"]}', MULT),
    ('India document-intensive professionals', f'=C{s+1}*C{s+4}', NUM),
    ('ARPU $/seat/month (A005)', f'={A["A005"]}', USD),
    ('India ARPU ratio (A004)', f'={A["A004"]}', PCT),
    ('TAM — US ($/yr)', f'=C{s+1}*C{s+6}*12', USD),
    ('TAM — other high-income ($/yr)', f'=C{s+3}*C{s+6}*12', USD),
    ('TAM — India ($/yr)', f'=C{s+5}*C{s+6}*C{s+7}*12', USD),
    ('TAM — Model B total ($/yr)', f'=SUM(C{s+8}:C{s+10})', USD),
]
for i, (lab, f, fmt) in enumerate(calc, 1):
    w(b, f'B{s+i}', lab, bold=(i == len(calc))); w(b, f'C{s+i}', f, fmt=fmt, bold=(i == len(calc)), font=GREEN if 'Inputs' in f else BLACK)
TAM_B = f"B_Seats!$C${s+len(calc)}"
ss = s + len(calc) + 2
w(b, f'A{ss}', 'SAM — Model B (wedge: recurring multi-file reporting packs)', font=BOLD)
calc2 = [
    ('US in-wedge professionals', f'=I{rt}', NUM),
    ('× share producing recurring multi-file packs (A006)', f'={A["A006"]}', PCT),
    ('US serviceable professionals', f'=C{ss+1}*C{ss+2}', NUM),
    ('Serviceable English-working markets multiple (A007)', f'={A["A007"]}', MULT),
    ('Non-US English-working serviceable professionals', f'=C{ss+3}*C{ss+4}', NUM),
    ('India serviceable professionals (A003 × US serviceable)', f'=C{ss+3}*{A["A003"]}', NUM),
    ('SAM — US ($/yr)', f'=C{ss+3}*{A["A005"]}*12', USD),
    ('SAM — other English-working ($/yr)', f'=C{ss+5}*{A["A005"]}*12', USD),
    ('SAM — India ($/yr)', f'=C{ss+6}*{A["A005"]}*{A["A004"]}*12', USD),
    ('SAM — Model B total ($/yr)', f'=SUM(C{ss+7}:C{ss+9})', USD),
    ('Total serviceable seats', f'=C{ss+3}+C{ss+5}+C{ss+6}', NUM),
]
for i, (lab, f, fmt) in enumerate(calc2, 1):
    w(b, f'B{ss+i}', lab, bold=(i == 10)); w(b, f'C{ss+i}', f, fmt=fmt, bold=(i == 10), font=GREEN if 'Inputs' in f else BLACK)
SAM_B = f"B_Seats!$C${ss+10}"
SEATS_B = f"B_Seats!$C${ss+11}"

# ------------------------------------------------------------------ MODEL A — TOP DOWN
a = wb.create_sheet('A_TopDown', 1 + 1)
widths(a, {'A': 4, 'B': 70, 'C': 20, 'D': 70})
w(a, 'A1', 'MODEL A — Top-down from the Office seat base', font=H1)
w(a, 'B2', 'Logic: the budget exists (Office seats) and an AI premium on top of it is already being paid (Copilot). TAM = document-intensive professional seats × AI execution premium. Microsoft 365 revenue is shown as a ceiling, NOT used as TAM.', font=NOTE, wrap=True)
arows = [
    ('Microsoft 365 Commercial products & cloud services revenue FY26 (A024) — ceiling of adjacent budget', f'={A["A024"]}', USD, 'Derived from 10-K: +$14.2B = +16%.'),
    ('Microsoft 365 commercial paid seats (A025)', f'={A["A025"]}', NUM, ''),
    ('Implied revenue per commercial seat per year', '=C4/C5', USD, 'Derived.'),
    ('Share of seats that are document-intensive professionals (A026)', f'={A["A026"]}', PCT, 'Key uncertainty.'),
    ('Document-intensive professional seats (global)', '=C5*C7', NUM, 'Cross-check vs Model B total population.'),
    ('AI execution premium $/seat/month (A027)', f'={A["A027"]}', USD, ''),
    ('TAM — Model A ($/yr)', '=C8*C9*12', USD, 'All vendors, incl. Microsoft\'s own capture.'),
    ('TAM as % of M365 commercial revenue', '=C10/C4', PCT, 'Sanity check: should be a small fraction.'),
    ('Cross-check: M365 Copilot paid seats (A028)', f'={A["A028"]}', NUM, 'Evidence the AI premium budget exists.'),
    ('Cross-check: Copilot run-rate at list price ($/yr)', f'=C12*{A["A029"]}*12', USD, 'Upper bound: list × seats; real discounts unknown.'),
    ('Copilot penetration of commercial seats', '=C12/C5', PCT, ''),
]
for i, (lab, f, fmt, note) in enumerate(arows, 4):
    w(a, f'B{i}', lab, wrap=True, bold=('TAM — Model A' in lab)); w(a, f'C{i}', f, fmt=fmt, font=GREEN if 'Inputs' in f else BLACK, bold=('TAM — Model A' in lab)); w(a, f'D{i}', note, font=NOTE, wrap=True)
TAM_A = 'A_TopDown!$C$10'

# ------------------------------------------------------------------ MODEL C — ENTERPRISE
c = wb.create_sheet('C_Enterprise')
widths(c, {'A': 4, 'B': 58, 'C': 14, 'D': 12, 'E': 14, 'F': 16, 'G': 10, 'H': 16, 'I': 60})
w(c, 'A1', 'MODEL C — Enterprise spend (organisations × eligible share × ACV)', font=H1)
header(c, 3, ['', 'Organisation type (US)', 'Count', 'Eligible share', 'ACV $/yr', 'US TAM $/yr', 'In SAM? (1/0)', 'US SAM $/yr', 'Notes'])
crows = [
    ('US middle-market companies (A014, A015, A016)', A['A014'], A['A015'], A['A016'], 1, 'Wedge: finance teams producing monthly/quarterly board, lender and management packs.'),
    ('US enterprises 500+ employees (A017, A018)', A['A017'], None, A['A018'], 0, 'Excluded from SAM until private deployment + security (year 3+). Eligible share = 100% for TAM.'),
    ('US professional-services firms 20–500 staff (A019, A020)', A['A019'], None, A['A020'], 1, 'Consulting/accounting/IB boutiques producing client deliverable packs.'),
    ('US investment managers (A021, A022)', A['A021'], None, A['A022'], 1, 'LP reports, IC packs, portfolio monitoring.'),
]
for i, (lab, cnt, sh, acv, insam, note) in enumerate(crows, 4):
    w(c, f'B{i}', lab); w(c, f'C{i}', f'={cnt}', font=GREEN, fmt=NUM)
    if sh: w(c, f'D{i}', f'={sh}', font=GREEN, fmt=PCT)
    else: w(c, f'D{i}', 1, font=BLUE, fmt=PCT)
    w(c, f'E{i}', f'={acv}', font=GREEN, fmt=USD)
    w(c, f'F{i}', f'=C{i}*D{i}*E{i}', fmt=USD)
    w(c, f'G{i}', insam, font=BLUE)
    w(c, f'H{i}', f'=F{i}*G{i}*{A["A006"]}', fmt=USD, comment='× A006 recurring-pack share (only teams with recurring multi-file packs are serviceable)')
    w(c, f'I{i}', note, font=NOTE, wrap=True)
w(c, 'B8', 'US total', font=BOLD); w(c, 'F8', '=SUM(F4:F7)', fmt=USD, bold=True); w(c, 'H8', '=SUM(H4:H7)', fmt=USD, bold=True)
cc = [
    ('Rest-of-world multiplier (A023)', f'={A["A023"]}', MULT),
    ('TAM — Model C total ($/yr) = US × (1 + A023)', '=F8*(1+C10)', USD),
    ('SAM — Model C: US SAM × (1 + A007 English-working) + India at A003 × A004', f'=H8*(1+{A["A007"]})+H8*{A["A003"]}*{A["A004"]}', USD),
]
for i, (lab, f, fmt) in enumerate(cc, 10):
    w(c, f'B{i}', lab, bold=True); w(c, f'C{i}', f, fmt=fmt, bold=True, font=GREEN if 'Inputs' in f else BLACK)
TAM_C = 'C_Enterprise!$C$11'; SAM_C = 'C_Enterprise!$C$12'

# ------------------------------------------------------------------ MODEL D — VALUE
d = wb.create_sheet('D_Value')
widths(d, {'A': 44, 'B': 12, 'C': 12, 'D': 11, 'E': 11, 'F': 10, 'G': 10, 'H': 13, 'I': 11, 'J': 12, 'K': 11, 'L': 60})
w(d, 'A1', 'MODEL D — Value created and willingness to pay per persona', font=H1)
w(d, 'A2', 'Value/yr = (annual cost basis ÷ 2,080 h) × document-production hours/week × time reduction (A012) × working weeks (A010). WTP = value × capture (A013).', font=NOTE)
header(d, 4, ['Persona', 'Wage basis $/yr', 'Loaded mult', 'Loaded $/hr', 'Doc hrs/week', 'Reduction', 'Weeks', 'Value $/yr', 'Capture', 'WTP $/yr', 'WTP $/mo', 'Source of wage basis'])
pers = [
    ('US financial & investment analyst', 116800, 15, 'BLS OEWS May-2025 mean, 13-2051'),
    ('US financial manager / FP&A lead', 186910, 10, 'BLS 11-3031 mean'),
    ('US accountant (in-industry reporting)', 94750, 12, 'BLS 13-2011 mean'),
    ('US management consultant (NAICS 5416)', 123080, 15, 'BLS 13-1111 in 5416 mean'),
    ('US credit analyst', 100850, 15, 'BLS 13-2041 mean'),
    ('US lawyer (expansion)', 185840, 15, 'BLS 23-1011 mean'),
    ('India IB / PE analyst (₹20 LPA)', '=2000000/{fx}', 25, 'Tier-3 salary surveys ₹12–30 LPA; converted at A030'),
    ('India Big-4 / consulting analyst (₹15 LPA)', '=1500000/{fx}', 20, 'Tier-3 ₹13–16 LPA'),
    ('India KPO research analyst (₹8 LPA)', '=800000/{fx}', 30, 'Tier-3 ₹4.5–11 LPA'),
    ('Offshore analyst valued at billing rate (A031 × 2,080)', '=2080*{bill}', 30, 'Value to the delivery firm = billable capacity, not salary'),
]
for i, (name, wage, hrs, src) in enumerate(pers, 5):
    w(d, f'A{i}', name)
    if isinstance(wage, str):
        w(d, f'B{i}', wage.format(fx=A['A030'], bill=A['A031']), fmt=USD, font=GREEN)
    else:
        w(d, f'B{i}', wage, font=BLUE, fmt=USD)
    offshore_bill = 'billing' in name
    w(d, f'C{i}', 1 if offshore_bill else f'={A["A009"]}', font=BLUE if offshore_bill else GREEN, fmt=MULT)
    w(d, f'D{i}', f'=B{i}*C{i}/2080', fmt='$#,##0.00')
    w(d, f'E{i}', hrs, font=BLUE, fill=YELLOW, fmt=NUM)
    w(d, f'F{i}', f'={A["A012"]}', font=GREEN, fmt=PCT)
    w(d, f'G{i}', f'={A["A010"]}', font=GREEN, fmt=NUM)
    w(d, f'H{i}', f'=D{i}*E{i}*F{i}*G{i}', fmt=USD)
    w(d, f'I{i}', f'={A["A013"]}', font=GREEN, fmt=PCT)
    w(d, f'J{i}', f'=H{i}*I{i}', fmt=USD)
    w(d, f'K{i}', f'=J{i}/12', fmt=USD, bold=True)
    w(d, f'L{i}', src, font=NOTE)
w(d, 'A17', 'Reading: US finance personas support $50–150/seat/month on value alone; Indian seats support $10–30 unless priced against billing rates (last row). Doc hrs/week are hypotheses (A011) to be measured in interviews.', font=NOTE, wrap=True)

# ------------------------------------------------------------------ SOM (from financial model)
som = wb.create_sheet('SOM')
widths(som, {'A': 52, 'B': 16, 'C': 16, 'D': 16, 'E': 70})
w(som, 'A1', 'SOM — operationally derived (from 15_FINANCIAL_MODEL.xlsx)', font=H1)
w(som, 'A2', 'Values below are a static snapshot of the financial model outputs for each scenario (blue = pasted snapshot; regenerate if the financial model changes). SOM is NOT a % of TAM.', font=NOTE, wrap=True)
header(som, 4, ['Metric', 'Conservative', 'Base', 'Aggressive', 'Driver logic'])
SOM_ROWS = ['Year-1 exit ARR', 'Year-2 exit ARR', 'Year-3 exit ARR', 'Year-4 exit ARR', 'Year-5 exit ARR (= SOM)', 'Year-5 paying organisations', 'Year-5 paid seats']
for i, lab in enumerate(SOM_ROWS, 5):
    w(som, f'A{i}', lab)
w(som, 'E5', 'Founder-led design partners → paid pilots; AEs ramp after pre-seed; enterprise after seed. See financial model Inputs.', font=NOTE, wrap=True)
w(som, 'A13', 'Active-scenario SOM ($/yr)', font=BOLD); w(som, 'B13', '=INDEX(B9:D9,1,Inputs!$C$3)', fmt=USD, bold=True)
w(som, 'A14', 'SOM as % of SAM (Model B)', font=BOLD); w(som, 'B14', f'=IF({SAM_B}>0,B13/{SAM_B},0)', fmt=PCT, bold=True)
w(som, 'A15', 'SOM as % of TAM (Model B)', font=BOLD); w(som, 'B15', f'=IF({TAM_B}>0,B13/{TAM_B},0)', fmt=PCT, bold=True)
w(som, 'A16', 'Year-5 seats as % of serviceable seats', font=BOLD); w(som, 'B16', f'=IF({SEATS_B}>0,INDEX(B11:D11,1,Inputs!$C$3)/{SEATS_B},0)', fmt=PCT, bold=True)

# ------------------------------------------------------------------ SEGMENTS
sg = wb.create_sheet('Segments')
crit = ['Pain severity', 'Frequency (recurring)', 'Willingness to pay / ACV', 'Founder reachability', 'Resistance to platform bundling', 'Competitive whitespace', 'Fit with built tech', 'Speed to value / demo', 'Expansion potential', 'Sales-cycle speed']
wts = [0.12, 0.12, 0.12, 0.08, 0.14, 0.12, 0.08, 0.06, 0.08, 0.08]
widths(sg, {'A': 50, **{L(2 + i): 12 for i in range(len(crit))}, L(2 + len(crit)): 11, L(3 + len(crit)): 8, L(4 + len(crit)): 110})
w(sg, 'A1', 'SEGMENT / WEDGE SCORING (1 = poor, 5 = excellent). Weights are inputs; must sum to 100%.', font=H1)
header(sg, 3, ['Candidate wedge'] + crit + ['Weighted score', 'Rank', 'Evidence and reasoning (facts → interpretation)'])
w(sg, 'A4', 'WEIGHTS', font=BOLD)
for i, wt in enumerate(wts):
    w(sg, f'{L(2+i)}4', wt, font=BLUE, fmt=PCT, fill=YELLOW)
w(sg, f'{L(2+len(crit))}4', f'=SUM(B4:{L(1+len(crit))}4)', fmt=PCT)
segs = [
    ('W1 Front-office IB / PE analysts (US/UK)', [5, 4, 5, 2, 1, 1, 4, 4, 4, 2], 'Pain is extreme (95+ hr weeks) but the space is the most crowded in AI: Rogo (~$2B, 35k users), Hebbia (~$50M ARR, Morgan Stanley 5k bankers), Model ML ($75M A), Endex ($14M, OpenAI fund), Shortcut, plus Anthropic finance agents (Citadel, Carlyle...) and Copilot/Claude in Excel. Bulge-bracket procurement is slow and security-heavy.'),
    ('W2 Consulting teams (boutique / mid-size)', [4, 4, 3, 3, 2, 2, 4, 4, 3, 3], 'PowerPoint-centric. Incumbent add-ins (think-cell, auxi used by 8/10 top firms, UpSlide) + Copilot/Claude/ChatGPT/Gemini now generate slides. Boutique ACVs are small; large firms build in-house.'),
    ('W3 Indian litigation & dispute law firms', [4, 3, 1, 4, 3, 3, 3, 3, 2, 2], 'Previous beachhead. Founder access is good but Indian firms spend little on software; scanned/regional-language PDFs; Indian legal AI already crowded at low price (NYAI $1.5M seed, SCC/Manupatra). Venture scale requires leaving India quickly.'),
    ('W4 Offshore document-production teams (KPO / GCC / Big-4 delivery)', [4, 5, 3, 4, 3, 2, 5, 3, 4, 2], 'Document factories (2.36M GCC staff; Big-4 India >450k). IDE-style workbench is acceptable to full-time producers. BUT the largest KPOs already run their own agent platforms (Acuity Agent Fleet Pro; Evalueserve 30 agents; TresVista × Model ML exclusive). Mid-tier and captive teams remain. Procurement slow, client data rules strict.'),
    ('W5 Document-estate bulk change (policies, templates, repapering)', [4, 2, 4, 2, 4, 3, 5, 4, 3, 3], 'Batch jobs over hundreds of files are outside session-scoped add-ins; strong fit with DocPatch kernel. Episodic demand (regulatory events) → retention risk; buyer (legal ops/compliance) harder for founders to reach. Iteration 2: whitespace lowered to 3 (contract AI such as Luminance, Litera/Kira and CLM vendors handle repapering).'),
    ('W6 Recurring bespoke Office packs (fund / lender / IC / board reporting) — mid-market investment & finance teams + the delivery teams that produce them', [4, 5, 4, 3, 4, 2, 5, 5, 4, 3], 'Proven budget: Workiva $885M FY25 revenue, 6,624 customers, 97% GRR; DataSnipper 600k users ($1B). Monthly/quarterly cadence = habit + retention. Numbers must tie → deterministic kernels + provenance beat LLM-only agents (Excel Agent Mode 57% SpreadsheetBench; Claude context compresses beyond a few large files). Contested: Datarails AI agents (Jan 2026), Workiva Tie-Out Agent (Jul 2026), Cube, Rollstack — hence restricted to packs that live as bespoke Office files outside FP&A platforms. Iteration 2: whitespace lowered to 2 after Juniper Square (JunieAI document generation, >40k funds) and Model ML Office add-ins with error review and memory.'),
    ('W7 Developer infrastructure (agent-native Office SDK / API)', [3, 4, 3, 3, 2, 1, 5, 3, 3, 4], 'Team is engineering-strong and the kernels are the most proprietary asset, but OfficeCLI (26.9k★, free) and Anthropic docx/pptx/xlsx skills commoditise the layer; Aspose ($116M rev) / Apryse own paid SDK budgets.'),
    ('W8 Individual prosumers (horizontal PLG)', [3, 3, 1, 2, 1, 1, 3, 4, 2, 5], 'ChatGPT (free), Claude (paid plans), Copilot and Gemini all ship agents inside Office. A separate desktop app for individuals loses on distribution and price.'),
]
for i, (name, sc, why) in enumerate(segs, 5):
    w(sg, f'A{i}', name, wrap=True)
    for j, v in enumerate(sc):
        w(sg, f'{L(2+j)}{i}', v, font=BLUE)
    w(sg, f'{L(2+len(crit))}{i}', f'=SUMPRODUCT($B$4:${L(1+len(crit))}$4,B{i}:{L(1+len(crit))}{i})', fmt='0.00', bold=True)
    w(sg, f'{L(3+len(crit))}{i}', f'=RANK({L(2+len(crit))}{i},${L(2+len(crit))}$5:${L(2+len(crit))}${4+len(segs)})')
    w(sg, f'{L(4+len(crit))}{i}', why, font=NOTE, wrap=True)
    sg.row_dimensions[i].height = 75
w(sg, f'A{6+len(segs)}', 'Sensitivity: set "Resistance to platform bundling" weight to 0 and W1/W2 rise; the ranking of W6 first is robust unless Founder reachability is weighted >25%. Scores are judgments grounded in the evidence column — to be revised after 30 interviews.', font=NOTE, wrap=True)

# ------------------------------------------------------------------ GEO
g = wb.create_sheet('Geo')
gcrit = ['Wedge customer density', 'SaaS willingness to pay', 'Knowledge-worker wages (value)', 'AI adoption', 'Privacy / data friction (5=low)', 'Office (.docx/.xlsx) standardisation', 'Ease of selling from India', 'Sales-cycle speed', 'Founder network', 'Competition (5=low)']
gw = [0.15, 0.15, 0.10, 0.08, 0.07, 0.05, 0.10, 0.10, 0.12, 0.08]
widths(g, {'A': 22, **{L(2 + i): 12 for i in range(len(gcrit))}, L(2 + len(gcrit)): 11, L(3 + len(gcrit)): 8, L(4 + len(gcrit)): 100})
w(g, 'A1', 'GEOGRAPHY SCORING (1–5). Build from India; choose first selling markets.', font=H1)
header(g, 3, ['Market'] + gcrit + ['Weighted', 'Rank', 'Reasoning'])
w(g, 'A4', 'WEIGHTS', font=BOLD)
for i, wt in enumerate(gw):
    w(g, f'{L(2+i)}4', wt, font=BLUE, fmt=PCT, fill=YELLOW)
geos = [
    ('United States', [5, 5, 5, 5, 3, 5, 2, 3, 2, 1], 'Largest budget and wages (BLS). Most competitive; needs US presence/AE; long enterprise cycles but fast mid-market.'),
    ('United Kingdom', [4, 4, 4, 4, 3, 5, 3, 3, 2, 2], 'Dense finance & professional services; GDPR/UK-GDPR; time-zone overlap with India better than US.'),
    ('Continental Europe', [3, 3, 4, 3, 2, 4, 2, 2, 1, 3], 'Language fragmentation, sovereignty concerns, slower procurement.'),
    ('India', [4, 1, 1, 4, 3, 4, 5, 3, 5, 3], 'Founder network (IIT Delhi) and density of production teams, but low software WTP. Best for design partners and offshore-team channel, not revenue.'),
    ('Singapore', [2, 4, 4, 4, 4, 5, 4, 4, 3, 3], 'Regional finance hub, English, fast procurement; small.'),
    ('UAE', [2, 4, 4, 4, 3, 5, 4, 3, 3, 4], 'Growing finance/family-office hub, strong India links; small but fast.'),
]
for i, (name, sc, why) in enumerate(geos, 5):
    w(g, f'A{i}', name)
    for j, v in enumerate(sc):
        w(g, f'{L(2+j)}{i}', v, font=BLUE)
    w(g, f'{L(2+len(gcrit))}{i}', f'=SUMPRODUCT($B$4:${L(1+len(gcrit))}$4,B{i}:{L(1+len(gcrit))}{i})', fmt='0.00', bold=True)
    w(g, f'{L(3+len(gcrit))}{i}', f'=RANK({L(2+len(gcrit))}{i},${L(2+len(gcrit))}$5:${L(2+len(gcrit))}${4+len(geos)})')
    w(g, f'{L(4+len(gcrit))}{i}', why, font=NOTE, wrap=True)

# ------------------------------------------------------------------ SUMMARY
sm = wb.create_sheet('Summary', 1)
widths(sm, {'A': 4, 'B': 46, 'C': 18, 'D': 18, 'E': 18, 'F': 60})
w(sm, 'B1', 'SUMMARY — TAM / SAM / SOM (active scenario)', font=H1)
w(sm, 'B2', '=Inputs!D3&" scenario"', font=BOLD)
header(sm, 4, ['', 'Method', 'TAM $/yr', 'SAM $/yr', 'SOM $/yr (Y5 ARR)', 'Comment'], start=1)
srows = [
    ('A — Top-down (seat base × AI premium)', f'={TAM_A}', None, None, 'Ceiling-style; depends on A026 share.'),
    ('B — Bottom-up seats (BLS occupations)', f'={TAM_B}', f'={SAM_B}', '=SOM!B13', 'PRIMARY method used in deck.'),
    ('C — Enterprise spend (orgs × ACV)', f'={TAM_C}', f'={SAM_C}', None, 'Cross-check; organisation-level ACV.'),
]
for i, (lab, t, s_, so, cm) in enumerate(srows, 5):
    w(sm, f'B{i}', lab); w(sm, f'C{i}', t, fmt=USD, font=GREEN)
    if s_: w(sm, f'D{i}', s_, fmt=USD, font=GREEN)
    if so: w(sm, f'E{i}', so, fmt=USD, font=GREEN)
    w(sm, f'F{i}', cm, font=NOTE)
w(sm, 'B9', 'Range (min–max of methods)', font=BOLD)
w(sm, 'C9', '=MIN(C5:C7)', fmt=USD); w(sm, 'D9', '=MIN(D6:D7)', fmt=USD)
w(sm, 'C10', '=MAX(C5:C7)', fmt=USD); w(sm, 'D10', '=MAX(D6:D7)', fmt=USD)
w(sm, 'B10', '(max)')
w(sm, 'B12', 'Reconciliation notes', font=BOLD)
notes = [
    'Model C > Model B because C prices whole organisations (platform + seats) while B prices only document-intensive individuals.',
    'Model A counts all document-intensive seats on M365 (global) and includes the value Microsoft itself captures; it is the widest lens.',
    'We quote TAM from Model B (the narrowest, most defensible) and show A and C as bounds. We never quote the $102.9B Microsoft figure as TAM.',
    'SAM is restricted to recurring multi-file reporting packs in finance/reporting roles, English-working markets + India (A006, A007).',
    'SOM is the base-case Year-5 ARR from the operating plan (15_FINANCIAL_MODEL.xlsx).',
]
for i, n in enumerate(notes, 13):
    w(sm, f'B{i}', n, wrap=True); sm.merge_cells(f'B{i}:F{i}'); sm.row_dimensions[i].height = 28
ch = BarChart(); ch.type = 'col'; ch.title = 'TAM / SAM by method ($/yr)'; ch.y_axis.title = '$'
data = Reference(sm, min_col=3, max_col=4, min_row=4, max_row=7); cats = Reference(sm, min_col=2, min_row=5, max_row=7)
ch.add_data(data, titles_from_data=True); ch.set_categories(cats); ch.height = 8; ch.width = 18
sm.add_chart(ch, 'B19')

wb.calculation.fullCalcOnLoad = True
wb.save(OUT)
print('saved', OUT)

# ---- SOM snapshot from financial model (generated by build_fin.py runs)
import json, os, openpyxl
if os.path.exists('fin_snapshot.json'):
    snap = json.load(open('fin_snapshot.json'))
    wb = openpyxl.load_workbook(OUT); som = wb['SOM']
    for j, s in enumerate(('1', '2', '3')):
        col = 'BCD'[j]
        arr = snap[s]['5']
        for y in range(5):
            w(som, f'{col}{5+y}', arr[y], font=BLUE, fmt=USD)
        w(som, f'{col}10', snap[s]['15'][4], font=BLUE, fmt=NUM)   # paying orgs Y5
        w(som, f'{col}11', None)
    # seats proxy: mid-market logos × 10 + enterprise × 80 + Pro seats
    for j, s in enumerate(('1', '2', '3')):
        col = 'BCD'[j]
        w(som, f'{col}11', snap[s]['16'][4] * 10 + snap[s]['17'][4] * 80 + snap[s]['18'][4], font=BLUE, fmt=NUM,
          comment='Proxy: mid-market logos × 10 seats + enterprise × 80 + Pro seats')
    wb.calculation.fullCalcOnLoad = True
    wb.save(OUT); print('SOM snapshot written')
