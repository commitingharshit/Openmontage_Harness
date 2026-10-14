import sys; sys.path.insert(0, '.')
from xlhelp import *
from openpyxl.chart import BarChart, Reference
OUT = '../models/17_CAP_TABLE_MODEL.xlsx'
wb = Workbook()
ws = wb.active; ws.title = 'README'
widths(ws, {'A': 118})
for i, (t, f) in enumerate([
    ('Agentic Office — Cap Table & Dilution Model (17_CAP_TABLE_MODEL.xlsx)', H1),
    ('Founding split on Inputs is a PLACEHOLDER (yellow). Replace with the actual agreed split before sharing externally.', BOLD),
    ('Mechanics: pre-seed = YC-style post-money SAFE (SAFE % = amount ÷ post-money cap; not diluted by the seed pool top-up, per the post-money SAFE definition of Company Capitalization). Seed, A, B = priced rounds with the option-pool top-up in the pre-money (dilutes all existing holders).', BLACK),
    ('Sheets: Inputs (round sizes, valuations, pool targets, pre-seed option selector) · DilutionGrid (raise × % sold → implied valuation) · CapTable (ownership after each round) · Outcomes (founder proceeds at exit values) · Options (pre-seed structures compared).', BLACK),
    ('This is not legal or tax advice. Indian-incorporated companies raising on SAFEs typically use iSAFE / CCPS / convertible notes under FEMA; a Delaware flip changes mechanics. See 16_FUNDRAISING.md.', NOTE),
], 1):
    w(ws, f'A{i}', t, font=f, wrap=True)

inp = wb.create_sheet('Inputs')
widths(inp, {'A': 46, 'B': 16, 'C': 70})
w(inp, 'A1', 'INPUTS', font=H1)
rows = [
    ('FOUNDING SPLIT (placeholder — must sum to 100%)', None, None, None),
    ('Founder 1 (CEO)', 0.45, PCT, 'Placeholder'),
    ('Founder 2 (CTO)', 0.30, PCT, 'Placeholder'),
    ('Founder 3 (Founder\'s office / GTM)', 0.15, PCT, 'Placeholder'),
    ('Early team (existing contributors, vesting)', 0.10, PCT, 'Placeholder: git shows 5 active contributors besides founders'),
    ('Check (must be 100%)', '=SUM(B3:B6)', PCT, ''),
    ('PRE-SEED (post-money SAFE)', None, None, None),
    ('Selected pre-seed option (1–4, see Options sheet)', 2, NUM, '1 India-lean, 2 Base, 3 US-AI, 4 High-dilution'),
    ('Pre-seed amount $', '=INDEX(Options!B4:E4,1,B9)', USD, 'Pulled from Options'),
    ('Post-money valuation cap $', '=INDEX(Options!B5:E5,1,B9)', USD, 'Pulled from Options'),
    ('ESOP pool created at pre-seed (% of post-SAFE capitalization)', 0.10, PCT, 'Typical 8–12%'),
    ('SEED (priced)', None, None, None),
    ('Seed amount $', 6000000, USD, '15_FINANCIAL_MODEL base F02'),
    ('Seed pre-money $', 24000000, USD, 'PitchBook-NVCA Q1-2026 median seed pre $18.4M; AI premium; contingent on ~$0.5M ARR'),
    ('ESOP target post-seed %', 0.12, PCT, ''),
    ('SERIES A (priced)', None, None, None),
    ('Series A amount $', 18000000, USD, '15_FINANCIAL_MODEL base F04'),
    ('Series A pre-money $', 72000000, USD, 'Median Series A pre ≈ $62M (PitchBook-NVCA Q1-2026); requires ~$2.5M ARR'),
    ('ESOP target post-A %', 0.13, PCT, ''),
    ('SERIES B (priced, illustrative)', None, None, None),
    ('Series B amount $', 40000000, USD, 'Illustrative'),
    ('Series B pre-money $', 200000000, USD, 'Illustrative (~15–20x forward ARR)'),
    ('ESOP target post-B %', 0.12, PCT, ''),
]
for i, (lab, v, fmt, note) in enumerate(rows, 2):
    if v is None:
        w(inp, f'A{i}', lab, bold=True); continue
    w(inp, f'A{i}', lab)
    fill = YELLOW if i in (3, 4, 5, 6, 9) else None
    w(inp, f'B{i}', v, font=BLUE if not (isinstance(v, str) and v.startswith('=')) else BLACK, fmt=fmt, fill=fill)
    w(inp, f'C{i}', note, font=NOTE)
# refs
F = ['Inputs!$B$3', 'Inputs!$B$4', 'Inputs!$B$5', 'Inputs!$B$6']
PRE_AMT, PRE_CAP, POOL0 = 'Inputs!$B$10', 'Inputs!$B$11', 'Inputs!$B$12'
S_AMT, S_PRE, S_POOL = 'Inputs!$B$14', 'Inputs!$B$15', 'Inputs!$B$16'
A_AMT, A_PRE, A_POOL = 'Inputs!$B$18', 'Inputs!$B$19', 'Inputs!$B$20'
B_AMT, B_PRE, B_POOL = 'Inputs!$B$22', 'Inputs!$B$23', 'Inputs!$B$24'

# ---------------- Options
op = wb.create_sheet('Options')
widths(op, {'A': 44, 'B': 16, 'C': 16, 'D': 16, 'E': 16, 'F': 60})
w(op, 'A1', 'PRE-SEED STRUCTURE OPTIONS', font=H1)
header(op, 3, ['', '1 India-lean', '2 Base', '3 US-AI', '4 High-dilution', 'Comment'])
opts = [('Amount $', [750000, 1250000, 2000000, 1250000], USD), ('Post-money cap $', [6000000, 10000000, 16000000, 7000000], USD)]
for i, (lab, vals, fmt) in enumerate(opts, 4):
    w(op, f'A{i}', lab)
    for j, v in enumerate(vals):
        w(op, f'{L(2+j)}{i}', v, font=BLUE, fmt=fmt)
w(op, 'A6', 'Implied pre-money $'); w(op, 'A7', 'Dilution to SAFE holders'); w(op, 'A8', 'Founders+team after SAFE and pool (before seed)')
w(op, 'A9', 'Base-case runway without seed (months)')
w(op, 'A10', 'Conservative-case runway without seed (months)')
for j in range(4):
    c = L(2 + j)
    w(op, f'{c}6', f'={c}5-{c}4', fmt=USD)
    w(op, f'{c}7', f'={c}4/{c}5', fmt=PCT)
    w(op, f'{c}8', f'=1-{c}7-{POOL0}', fmt=PCT)
w(op, 'F4', 'Benchmarks: India pre-seed $250k–1M at $3–10M caps (Tier 3); Carta 2025 median post-money SAFE cap ≈ $10M for $250k–1M rounds, ≈ $15M for $1–2.5M rounds.', font=NOTE, wrap=True)
w(op, 'F9', 'Runway rows are a static snapshot from 15_FINANCIAL_MODEL (no seed, no Series A). ">60" = never runs out in 60 months.', font=NOTE, wrap=True)

# ---------------- DilutionGrid
dg = wb.create_sheet('DilutionGrid')
raises = [500000, 750000, 1000000, 1250000, 1500000, 2000000, 2500000]
dils = [0.05, 0.075, 0.10, 0.125, 0.15, 0.175, 0.20]
widths(dg, {'A': 22, **{L(2 + i): 15 for i in range(len(raises))}})
w(dg, 'A1', 'POST-MONEY VALUATION = RAISE ÷ % SOLD   (pre-money = post − raise)', font=H1)
w(dg, 'A3', '% sold \\ raise $', bold=True)
for j, rz in enumerate(raises):
    w(dg, f'{L(2+j)}3', rz, font=BLUE, fmt=USD)
for i, dl in enumerate(dils, 4):
    w(dg, f'A{i}', dl, font=BLUE, fmt=PCT)
    for j in range(len(raises)):
        c = L(2 + j)
        w(dg, f'{c}{i}', f'={c}$3/$A{i}', fmt=USD)
w(dg, 'A12', 'PRE-MONEY', bold=True)
for j, rz in enumerate(raises):
    w(dg, f'{L(2+j)}12', f'={L(2+j)}$3', fmt=USD, font=BLACK)
for i, dl in enumerate(dils, 13):
    w(dg, f'A{i}', f'=A{i-9}', fmt=PCT)
    for j in range(len(raises)):
        c = L(2 + j)
        w(dg, f'{c}{i}', f'={c}{i-9}-{c}$3', fmt=USD)
w(dg, 'A21', 'Example check: $1M at 10% → post $10M, pre $9M; $1M at 20% → post $5M.', font=NOTE)

# ---------------- CapTable
ct = wb.create_sheet('CapTable', 1)
holders = ['Founder 1 (CEO)', 'Founder 2 (CTO)', 'Founder 3', 'Early team', 'Pre-seed SAFE investors', 'Seed investors', 'Series A investors', 'Series B investors', 'ESOP (granted + unissued)']
widths(ct, {'A': 30, 'B': 14, 'C': 14, 'D': 14, 'E': 14, 'F': 14, 'G': 60})
w(ct, 'A1', 'OWNERSHIP BY ROUND (fully diluted)', font=H1)
header(ct, 3, ['Holder', 'Founding', 'After pre-seed (SAFE converted, pool)', 'After seed', 'After Series A', 'After Series B', 'Mechanic'])
r0 = 4
for i, h in enumerate(holders):
    w(ct, f'A{r0+i}', h)
# Founding
for i in range(4):
    w(ct, f'B{r0+i}', f'={F[i]}', fmt=PCT, font=GREEN)
for i in range(4, 9):
    w(ct, f'B{r0+i}', 0, fmt=PCT)
SAFE_R, SEED_R, A_R, B_R, POOL_R = r0 + 4, r0 + 5, r0 + 6, r0 + 7, r0 + 8
# Pre-seed: SAFE s = amt/cap; pool0; founders scaled to (1-s-pool0)
w(ct, f'C{SAFE_R}', f'={PRE_AMT}/{PRE_CAP}', fmt=PCT)
w(ct, f'C{POOL_R}', f'={POOL0}', fmt=PCT)
for i in range(4):
    w(ct, f'C{r0+i}', f'=B{r0+i}*(1-C{SAFE_R}-C{POOL_R})', fmt=PCT)
for rr in (SEED_R, A_R, B_R):
    w(ct, f'C{rr}', 0, fmt=PCT)
# Seed: n = amt/(pre+amt); SAFE diluted by new money only; pool post = max(target, pool_pre*(1-n)); founders absorb remainder pro-rata
w(ct, 'H3', 'Seed new %', bold=True); w(ct, 'H4', f'={S_AMT}/({S_PRE}+{S_AMT})', fmt=PCT)
w(ct, f'D{SEED_R}', '=$H$4', fmt=PCT)
w(ct, f'D{SAFE_R}', f'=C{SAFE_R}*(1-$H$4)', fmt=PCT)
w(ct, f'D{POOL_R}', f'=MAX({S_POOL},C{POOL_R}*(1-$H$4))', fmt=PCT)
fsum_c = f'SUM(C{r0}:C{r0+3})'
for i in range(4):
    w(ct, f'D{r0+i}', f'=C{r0+i}/{fsum_c}*(1-D{SEED_R}-D{SAFE_R}-D{POOL_R})', fmt=PCT)
for rr in (A_R, B_R):
    w(ct, f'D{rr}', 0, fmt=PCT)
# Series A & B: pool shuffle dilutes all non-pool holders pro-rata
def priced(prev, cur, amt, pre, pooltarget, newrow, hcell):
    w(ct, f'H{hcell}', f'={amt}/({pre}+{amt})', fmt=PCT)
    w(ct, f'{cur}{newrow}', f'=$H${hcell}', fmt=PCT)
    w(ct, f'{cur}{POOL_R}', f'=MAX({pooltarget},{prev}{POOL_R}*(1-$H${hcell}))', fmt=PCT)
    for rr in range(r0, r0 + 8):
        if rr == newrow: continue
        w(ct, f'{cur}{rr}', f'=IF(1-{prev}{POOL_R}>0,{prev}{rr}/(1-{prev}{POOL_R}),0)*(1-{cur}{newrow}-{cur}{POOL_R})', fmt=PCT)
w(ct, 'H5', 'Series A new %', bold=True)
priced('D', 'E', A_AMT, A_PRE, A_POOL, A_R, 6)
w(ct, 'H7', 'Series B new %', bold=True)
priced('E', 'F', B_AMT, B_PRE, B_POOL, B_R, 8)
# fix: zero for B_R in E
w(ct, f'E{B_R}', 0, fmt=PCT)
tot = r0 + 9
w(ct, f'A{tot}', 'TOTAL (must be 100%)', bold=True)
for c in 'BCDEF':
    w(ct, f'{c}{tot}', f'=SUM({c}{r0}:{c}{r0+8})', fmt=PCT, bold=True)
w(ct, f'A{tot+1}', 'Founders combined (F1+F2+F3)', bold=True)
for c in 'BCDEF':
    w(ct, f'{c}{tot+1}', f'=SUM({c}{r0}:{c}{r0+2})', fmt=PCT, bold=True)
w(ct, f'A{tot+2}', 'Post-money valuation $', bold=True)
w(ct, f'C{tot+2}', f'={PRE_CAP}', fmt=USD)
w(ct, f'D{tot+2}', f'={S_PRE}+{S_AMT}', fmt=USD)
w(ct, f'E{tot+2}', f'={A_PRE}+{A_AMT}', fmt=USD)
w(ct, f'F{tot+2}', f'={B_PRE}+{B_AMT}', fmt=USD)
w(ct, f'A{tot+3}', 'Value of founders\' combined stake at round price $', bold=True)
for c in 'CDEF':
    w(ct, f'{c}{tot+3}', f'={c}{tot+1}*{c}{tot+2}', fmt=USD)
w(ct, f'A{tot+4}', 'Step-up vs previous post-money', bold=True)
w(ct, f'D{tot+4}', f'=IF(C{tot+2}>0,{S_PRE}/C{tot+2},0)', fmt=MULT)
w(ct, f'E{tot+4}', f'=IF(D{tot+2}>0,{A_PRE}/D{tot+2},0)', fmt=MULT)
w(ct, f'F{tot+4}', f'=IF(E{tot+2}>0,{B_PRE}/E{tot+2},0)', fmt=MULT)
notes = {SAFE_R: 'amount ÷ post-money cap; diluted by later new money only', SEED_R: 'amount ÷ (pre + amount)', POOL_R: 'max(target, prior pool diluted)', r0: 'absorbs seed pool top-up; pro-rata dilution after'}
for rr, n in notes.items():
    w(ct, f'G{rr}', n, font=NOTE)
ch = BarChart(); ch.type = 'col'; ch.grouping = 'stacked'; ch.overlap = 100; ch.title = 'Ownership by round'
data = Reference(ct, min_col=1, max_col=6, min_row=r0, max_row=r0 + 8)
ch2 = BarChart(); ch2.type = 'col'; ch2.grouping = 'stacked'; ch2.overlap = 100; ch2.title = 'Ownership by round (stacked)'
for i in range(9):
    s = Reference(ct, min_col=2, max_col=6, min_row=r0 + i, max_row=r0 + i)
    from openpyxl.chart import Series
    ser = Series(s, title=holders[i]); ch2.series.append(ser)
ch2.set_categories(Reference(ct, min_col=2, max_col=6, min_row=3, max_row=3)); ch2.height = 9; ch2.width = 20
ct.add_chart(ch2, f'A{tot+7}')

# ---------------- Outcomes
oc = wb.create_sheet('Outcomes')
exits = [50000000, 100000000, 250000000, 500000000, 1000000000, 3000000000]
widths(oc, {'A': 40, **{L(2 + i): 15 for i in range(len(exits))}})
w(oc, 'A1', 'FOUNDER PROCEEDS AT EXIT (common, after Series B, before taxes; ignores liquidation preferences)', font=H1)
w(oc, 'A2', 'Total preference stack (1x non-participating) = sum of money raised; it only bites when exit value < preference stack or when investors prefer their preference.', font=NOTE, wrap=True)
w(oc, 'A4', 'Exit value $', bold=True)
for j, ex in enumerate(exits):
    w(oc, f'{L(2+j)}4', ex, font=BLUE, fmt=USD)
lines = [('Founder 1', f'CapTable!$F${r0}'), ('Founder 2', f'CapTable!$F${r0+1}'), ('Founder 3', f'CapTable!$F${r0+2}'), ('Founders combined', f'CapTable!$F${tot+1}')]
for i, (lab, refc) in enumerate(lines, 5):
    w(oc, f'A{i}', lab, bold=(lab == 'Founders combined'))
    for j in range(len(exits)):
        c = L(2 + j)
        w(oc, f'{c}{i}', f'={c}$4*{refc}', fmt=USD)
w(oc, 'A10', 'Preference stack $ (total raised)', bold=True)
w(oc, 'B10', f'={PRE_AMT}+{S_AMT}+{A_AMT}+{B_AMT}', fmt=USD)
w(oc, 'A11', 'Exit value where common gets ≈ nothing (≈ pref stack)', bold=True); w(oc, 'B11', '=B10', fmt=USD)

wb.calculation.fullCalcOnLoad = True
wb.save(OUT); print('saved', OUT)
