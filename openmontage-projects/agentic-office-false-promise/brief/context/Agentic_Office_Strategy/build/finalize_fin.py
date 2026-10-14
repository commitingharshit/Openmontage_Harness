import sys, json, openpyxl; sys.path.insert(0, '.')
from xlhelp import *
P = '../models/15_FINANCIAL_MODEL.xlsx'
snap = json.load(open('fin_snapshot.json')); g = json.load(open('runway_grid.json'))
wb = openpyxl.load_workbook(P); an = wb['Annual']
labels = {r: an[f'A{r}'].value for r in range(5, 29)}; xl = {r: an[f'A{r}'].value for r in range(31, 38)}
sn = wb.create_sheet('Snapshot', 2)
widths(sn, {'A': 44, **{L(i): 14 for i in range(2, 17)}})
w(sn, 'A1', 'SCENARIO SNAPSHOT: static values generated from this model with Inputs!C3 = 1, 2, 3 (regenerate after edits)', font=H1)
w(sn, 'A2', 'Blue = pasted static values. Live figures are on Annual (active scenario only).', font=NOTE)
col = 2
for s, name in (('1', 'Conservative'), ('2', 'Base'), ('3', 'Aggressive')):
    w(sn, f'{L(col)}4', name, bold=True)
    for y in range(5): w(sn, f'{L(col+y)}5', f'Y{y+1}', bold=True)
    for r in range(5, 29):
        w(sn, f'A{r+1}', labels[r])
        for y in range(5): w(sn, f'{L(col+y)}{r+1}', snap[s][str(r)][y], font=BLUE, fmt=an[f'B{r}'].number_format)
    col += 5
w(sn, 'A31', 'Milestone checks', bold=True)
for i, r in enumerate(range(31, 38)):
    w(sn, f'A{32+i}', xl[r])
    for j, s in enumerate(('1', '2', '3')): w(sn, f'{L(2+j*5)}{32+i}', snap[s]['x'][str(r)], font=BLUE, fmt=an[f'B{r}'].number_format)
fs = wb.create_sheet('FundingStress', 3)
widths(fs, {'A': 34, 'B': 16, 'C': 16, 'D': 16, 'E': 16, 'F': 16, 'G': 60})
w(fs, 'A1', 'PRE-SEED SIZING STRESS TEST: month cash hits zero if NO seed and NO Series A ever close', font=H1)
w(fs, 'A2', 'Static snapshot (pre-seed F01 varied; F03/F05 pushed beyond month 60). ">60" = cash never negative within 60 months.', font=NOTE, wrap=True)
header(fs, 4, ['Scenario \\ pre-seed raise', '$750k', '$1.0M', '$1.25M', '$1.5M', '$2.0M', 'Reading'])
for i, (s, name) in enumerate(((1, 'Conservative revenue'), (2, 'Base revenue'), (3, 'Aggressive revenue')), 5):
    w(fs, f'A{i}', name)
    for j, p in enumerate((750000, 1000000, 1250000, 1500000, 2000000)):
        m = g[f'{s}_{p}'][0]; w(fs, f'{L(2+j)}{i}', m if m else '>60', font=BLUE)
w(fs, 'G5', 'Conservative case needs ≥$1.25M to reach month 29 without new money.', font=NOTE)
w(fs, 'G6', 'Base case is default-alive on the pre-seed team alone (min cash ≈ $5k at month 28 with $750k: too thin).', font=NOTE)
w(fs, 'A9', 'Minimum cash (no seed) $', bold=True)
for i, (s, name) in enumerate(((1, 'Conservative'), (2, 'Base'), (3, 'Aggressive')), 10):
    w(fs, f'A{i}', name)
    for j, p in enumerate((750000, 1000000, 1250000, 1500000, 2000000)): w(fs, f'{L(2+j)}{i}', g[f'{s}_{p}'][1], font=BLUE, fmt=USD)
wb.calculation.fullCalcOnLoad = True; wb.save(P); print('finalized', wb.sheetnames)
