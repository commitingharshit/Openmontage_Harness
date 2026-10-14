import openpyxl
def rows(path, sheet, start, idcol='A', name='B', unit='C', c='D', b='E', a='F', typ=None, conf=None, src=None):
    ws=openpyxl.load_workbook(path)[sheet]; out=[]
    r=start
    while ws[f'{idcol}{r}'].value:
        out.append(dict(id=ws[f'{idcol}{r}'].value, name=ws[f'{name}{r}'].value, unit=ws[f'{unit}{r}'].value, c=ws[f'{c}{r}'].value, b=ws[f'{b}{r}'].value, a=ws[f'{a}{r}'].value,
                        typ=ws[f'{typ}{r}'].value if typ else '', conf=ws[f'{conf}{r}'].value if conf else '', src=ws[f'{src}{r}'].value if src else ''))
        r+=1
    return out
M=rows('../models/09_MARKET_MODEL.xlsx','Inputs',6,typ='H',conf='I',src='J')
P=rows('../models/10_PRICING_MODEL.xlsx','Costs',6,src='H')
F=rows('../models/15_FINANCIAL_MODEL.xlsx','Inputs',7,src='H')
def fmt(v,u):
    if v is None: return ''
    if u=='%': return f'{v*100:.1f}%'
    if isinstance(v,(int,float)):
        if abs(v)>=1e9: return f'{v/1e9:.1f}B'
        if abs(v)>=1e6: return f'{v/1e6:.2f}M'
        if abs(v)>=1000: return f'{v:,.0f}'
        return f'{v:g}'
    return str(v)
why={'A005':'Scales TAM/SAM linearly','A006':'Defines SAM (wedge filter)','A002':'Doubles TAM if wrong by 2x','A003':'India TAM share','A012':'Drives value & WTP','A013':'Drives price ceiling','A016':'Model C SAM','A026':'Model A TAM','A007':'SAM geography',
 'T05':'Largest COGS driver (pack update tokens)','R05':'Cache hit halves input cost','R01':'Premium-model share drives COGS',
 'F01':'Runway and dilution','F03':'Seed timing; runway risk','R09':'ACV — revenue per logo','R10':'AE productivity — main growth lever','R12':'Churn — retention and LTV','R13':'Expansion — NRR','C01':'Gross margin','R05f':'Pilot conversion','R01f':'Paid pilots — first revenue'}
val={'A006':'H1 interviews','A012':'H3 pilot telemetry','A013':'H5 pricing tests','A005':'H5 pricing tests; pilot ACV','A002':'OECD/ILO occupation data (G003)','A003':'Nasscom/ICAI/GCC data (G004)','A016':'Pilot pricing','A026':'Microsoft seat composition (unavailable) — triangulate with Model B','T05':'Token telemetry on real packs (G005)','T03':'Telemetry','R05':'Telemetry',
 'R09':'Pilot contracts','R10':'AE ramp data after month 10','R12':'Second-cycle retention (H13)','R13':'Packs per customer','C01':'Pilot telemetry','F01':'Raise outcome','R01':'Paid pilot count (H7)','R05_f':'H7'}
lines=['# ASSUMPTIONS — register','','*v1 · 2026-09-30. Generated from the model input sheets (`build/build_assumptions.py`), so IDs match the workbooks exactly. Prefixes: **MM-** = 09_MARKET_MODEL Inputs; **PR-** = 10_PRICING_MODEL Costs; **FM-** = 15_FINANCIAL_MODEL Inputs; **H** = hypotheses in 21_VALIDATION_PLAN. Row-level inputs (BLS employment, document-intensity shares A001, persona hours A011) sit on the method sheets. Owner = role responsible for validating. Status: OPEN unless stated.*','',
'| ID | Assumption | Base | Range (cons → aggr) | Why it matters | Type / confidence | Evidence / source | How to validate | Owner | Status |','|---|---|---|---|---|---|---|---|---|---|']
lines.append('| MM-A001 | Document-intensity share by occupation (row inputs, 30–70%) | per row | ±50% | **Drives TAM Model B directly** | Assumption / Low | Judgement; no time-use data found | Interviews (H2) + O*NET task data (G001) | Founder\'s office | OPEN — CRITICAL |')
lines.append('| MM-A011 | Document-production hours/week per persona (10–30) | per persona | ±50% | Drives value/WTP (D_Value) | Hypothesis / Low | Forrester (vendor, dated) 16 hrs/wk; LP reporting 60–180 hrs/qtr | Interviews + pilot timesheets (H2) | Founder\'s office | OPEN |')
for d in M:
    lines.append(f"| MM-{d['id']} | {d['name']} | {fmt(d['b'],d['unit'])} {d['unit'] if d['unit'] not in ('%',) else ''} | {fmt(d['c'],d['unit'])} → {fmt(d['a'],d['unit'])} | {why.get(d['id'],'Model input')} | {d['typ']} / {d['conf']} | {str(d['src']).replace('|','/')} | {val.get(d['id'],'Desk research')} | Founder\'s office | {'VERIFIED' if d['typ']=='Verified' else 'OPEN'} |")
for d in P:
    lines.append(f"| PR-{d['id']} | {d['name']} | {fmt(d['b'],d['unit'])} {d['unit'] if d['unit']!='%' else ''} | {fmt(d['c'],d['unit'])} → {fmt(d['a'],d['unit'])} | {why.get(d['id'],'COGS input')} | {'Verified' if d['id'] in ('P01','P02','P03','P04','P05','P06','P07','P08') else 'Assumption'} | {str(d['src']).replace('|','/')} | {val.get(d['id'],'Telemetry from pilots' if d['id'][0] in 'TRI' else 'Vendor price pages')} | CTO | {'VERIFIED' if d['id'] in ('P01','P02','P03','P04','P05','P06','P07','P08') else 'OPEN'} |")
whyF={'F01':'Runway and dilution','F02':'Seed size','F03':'Seed timing; runway risk','F05':'Series A timing','R01':'Paid pilots — first revenue','R05':'Pilot → customer conversion','R06':'Founder-led logo velocity','R09':'ACV — revenue per logo','R10':'AE productivity — main growth lever','R12':'Churn — retention and LTV','R13':'Expansion — NRR','R15':'Enterprise ACV','C01':'Gross margin','C02':'Margin trajectory'}
valF={'F01':'Raise outcome','R01':'Paid pilot count (H7)','R05':'H7','R09':'Pilot contracts','R10':'AE ramp data after month 10','R12':'Second-cycle retention (H13)','R13':'Packs per customer','C01':'Pilot telemetry (H9)'}
for d in F:
    key=d['id']
    lines.append(f"| FM-{key} | {d['name']} | {fmt(d['b'],d['unit'])} {d['unit'] if d['unit']!='%' else ''} | {fmt(d['c'],d['unit'])} → {fmt(d['a'],d['unit'])} | {whyF.get(key,'Plan input')} | Assumption / {'Low' if key[0] in 'R' else 'Medium'} | {str(d['src']).replace('|','/')} | {valF.get(key,'Pilot data / plan review')} | CEO | OPEN |")
hyp=[('H1','ICP produces recurring multi-file packs that live in Office files'),('H2','Pack ≥20 person-hours/cycle; ≥30% mechanical'),('H3','Time reduction ≥30% by cycle 2'),('H4','Buyer can sign $10–30k in ≤60 days'),('H5','Pack-based pricing (~$250/pack/month) accepted'),('H6','Reviewers accept agent numeric changes with source/why/impact'),('H7','Design partners convert to paid pilots (~$2.5k/month)'),('H8','Power users prefer workbench form factor'),('H9','≥60% of numeric updates deterministic'),('H10','Platform agents not good enough for the pack job'),('H11','Local-first + BYO model + SOC 2 Type I suffices early'),('H12','Mid-tier delivery firms will pilot on a client account'),('H13','Correction rate falls cycle over cycle'),('H14','India team can sell to US/UK without US presence until ~month 10'),('H15','Legal matter workflow viable as second vertical')]
lines+=['','## Hypotheses (see 21_VALIDATION_PLAN for tests and kill criteria)','','| ID | Hypothesis | Status |','|---|---|---|']+[f'| {h} | {t} | UNTESTED |' for h,t in hyp]
open('../governance/ASSUMPTIONS.md','w').write('\n'.join(lines)+'\n')
print(len(M),len(P),len(F))
