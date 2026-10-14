import sys; sys.path.insert(0, '.')
from xlhelp import *
OUT = sys.argv[1] if len(sys.argv) > 1 else '../models/15_FINANCIAL_MODEL.xlsx'
SCEN = int(sys.argv[2]) if len(sys.argv) > 2 else 2
N = 60; C0 = 4  # first month column = D
MC = [L(C0 + i) for i in range(N)]
FIRST, LAST = MC[0], MC[-1]

wb = Workbook()
ws = wb.active; ws.title = 'README'
widths(ws, {'A': 118})
for i, (t, f) in enumerate([
    ('Agentic Office — 5-year Financial Model (15_FINANCIAL_MODEL.xlsx)', H1),
    ('Monthly, Jan-2027 (month 1 = pre-seed close) to Dec-2031. Scenario selector: Inputs!C3 (1 Conservative, 2 Base, 3 Aggressive).', BLACK),
    ('Sheets: Inputs (scenario assumptions with IDs F/R/C/O) · Headcount (roles, hire months, loaded cost) · Model (monthly engine) · Annual (yearly roll-up, unit economics) · Snapshot (static comparison of the three scenarios).', BLACK),
    ('Colour code: blue = input, black = formula, green = cross-sheet link, yellow = key assumption.', BLACK),
    ('Revenue logic: paid pilots (months 4–9) convert to mid-market customers; founder-led selling then ramped AEs add mid-market logos; enterprise AEs after seed; a small self-serve Pro line. Churn and expansion applied monthly.', BLACK),
    ('COGS logic: inference as % of revenue (from 10_PRICING_MODEL PackPricing), declining annually as model prices fall; hosting per customer; support/CS % of revenue; payment fees on self-serve.', BLACK),
    ('Funding: pre-seed, seed and Series A amounts and months are inputs; the seed and A are CONTINGENT on milestones in 16_FUNDRAISING.md — the model shows what happens if they close on time.', BLACK),
    ('Nothing in this model is traction. All revenue is a forecast built from hypotheses (see governance/ASSUMPTIONS.md).', BOLD),
], 1):
    w(ws, f'A{i}', t, font=f, wrap=True)

inp = wb.create_sheet('Inputs')
widths(inp, {'A': 7, 'B': 58, 'C': 11, 'D': 13, 'E': 13, 'F': 13, 'G': 13, 'H': 70})
w(inp, 'A1', 'INPUTS', font=H1)
w(inp, 'B3', 'Scenario selector (1=Conservative, 2=Base, 3=Aggressive)', font=BOLD)
w(inp, 'C3', SCEN, font=BLUE, fill=YELLOW)
w(inp, 'D3', '=CHOOSE(C3,"Conservative","Base","Aggressive")', bold=True)
w(inp, 'B4', 'Model start (month 1)', font=BOLD); w(inp, 'C4', '=DATE(2027,1,1)', fmt='mmm-yyyy', font=BLUE)
header(inp, 6, ['ID', 'Assumption', 'Unit', 'Conservative', 'Base', 'Aggressive', 'ACTIVE', 'Rationale / source'])
I = {}
irows = [
    ('F01', 'Pre-seed raise (recommended ask; same in all scenarios)', '$', 1250000, 1250000, 1250000, 'Derived in 16_FUNDRAISING.md from 18–20-month milestone plan'),
    ('F02', 'Seed raise (contingent on milestones)', '$', 4000000, 6000000, 9000000, 'Median seed round sizes; see 16_FUNDRAISING'),
    ('F03', 'Seed close month', 'month', 22, 19, 16, ''),
    ('F04', 'Series A raise (contingent)', '$', 12000000, 18000000, 28000000, ''),
    ('F05', 'Series A close month', 'month', 44, 38, 32, ''),
    ('F06', 'Opening cash (founder capital / grants)', '$', 20000, 20000, 20000, 'Assumption'),
    ('R01', 'Paid pilots (design partners converting to paid)', 'count', 2, 4, 6, 'Hypothesis: 10 design partners → 4 paid pilots'),
    ('R02', 'Pilot fee', '$/mo', 1500, 2500, 4000, ''),
    ('R03', 'Pilot start month', 'month', 5, 4, 4, ''),
    ('R04', 'Pilot end month (conversion month = end+1)', 'month', 10, 9, 8, ''),
    ('R05', 'Pilot → customer conversion', '%', 0.40, 0.60, 0.75, 'Validation plan H7'),
    ('R06', 'Founder-led new mid-market logos per month', 'logos/mo', 0.5, 1.0, 1.5, 'Founders sell until AEs ramp'),
    ('R07', 'Founder-led selling start month', 'month', 9, 7, 6, ''),
    ('R08', 'Founder-led selling end month', 'month', 24, 24, 24, ''),
    ('R09', 'Mid-market ACV at signing', '$/yr', 10000, 15000, 20000, '≈ 4 packs × $250 × 12 + platform fee (PackPricing); anchors: Rollstack median $7.9k, Cube median $22.1k, Datarails from $20–24k/yr'),
    ('R10', 'Mid-market deals per ramped AE per month', 'deals', 1.0, 1.5, 2.0, '12–24 deals/yr; $150–400k new ARR per AE per yr'),
    ('R11', 'AE ramp (months to full productivity)', 'months', 5, 4, 3, ''),
    ('R12', 'Mid-market monthly logo/revenue churn', '%', 0.020, 0.015, 0.010, '≈ 22% / 17% / 11% annual'),
    ('R13', 'Mid-market monthly expansion on retained MRR', '%', 0.010, 0.018, 0.025, 'More packs per customer; seats'),
    ('R14', 'Enterprise deals per ramped enterprise AE per month', 'deals', 0.20, 0.33, 0.50, '2.4–6 deals/yr'),
    ('R15', 'Enterprise ACV at signing', '$/yr', 80000, 120000, 180000, 'Workiva avg ≈ $134k'),
    ('R16', 'Enterprise AE ramp', 'months', 7, 6, 5, ''),
    ('R17', 'Enterprise monthly churn', '%', 0.006, 0.004, 0.003, ''),
    ('R18', 'Enterprise monthly expansion', '%', 0.012, 0.020, 0.025, ''),
    ('R19', 'Self-serve Pro start month', 'month', 12, 10, 9, ''),
    ('R20', 'Self-serve new paid seats in first month', 'seats', 5, 10, 20, ''),
    ('R21', 'Self-serve new-seat monthly growth (to month 36)', '%', 0.05, 0.08, 0.12, ''),
    ('R22', 'Self-serve new-seat monthly growth after month 36', '%', 0.01, 0.02, 0.03, ''),
    ('R23', 'Self-serve monthly seat churn', '%', 0.06, 0.05, 0.04, ''),
    ('R24', 'Pro price', '$/seat/mo', 60, 60, 60, '10_PRICING_MODEL Tiers'),
    ('C01', 'Inference cost as % of subscription revenue (year 1)', '%', 0.25, 0.15, 0.09, 'PackPricing: $28.8/$250 = 11.5% at base; buffer added'),
    ('C02', 'Annual decline in inference cost ratio', '%', 0.20, 0.30, 0.40, 'Model price declines + deterministic share rising'),
    ('C03', 'Enterprise inference % of revenue (BYO-model common)', '%', 0.08, 0.05, 0.03, ''),
    ('C04', 'Hosting per mid-market customer', '$/mo', 60, 40, 30, ''),
    ('C05', 'Hosting per Pro seat', '$/mo', 3, 2, 1.2, ''),
    ('C06', 'Dedicated/private infra per enterprise customer', '$/mo', 2500, 1500, 800, ''),
    ('C07', 'Support & customer success as % of revenue (COGS)', '%', 0.12, 0.08, 0.05, ''),
    ('C08', 'Payment processing on self-serve revenue', '%', 0.03, 0.03, 0.03, ''),
    ('O01', 'Marketing programs pre-seed phase', '$/mo', 1000, 1500, 2500, 'Content, events, LinkedIn'),
    ('O02', 'Marketing programs seed phase', '$/mo', 6000, 8000, 12000, ''),
    ('O03', 'Marketing programs Series A phase', '$/mo', 20000, 30000, 45000, ''),
    ('O04', 'Legal, accounting, admin pre-seed / seed / A phases', '$/mo', 2000, 2000, 2000, 'Phase 1; phases 2 and 3 = ×3 and ×7'),
    ('O05', 'Tools & software per employee', '$/mo', 150, 150, 150, ''),
    ('O06', 'R&D compute, evals, dev infra — pre-seed phase', '$/mo', 1500, 2000, 2500, 'Phases 2/3 = ×3 / ×8'),
    ('O07', 'Travel — pre-seed phase', '$/mo', 800, 1200, 1500, 'US/UK design-partner trips; phases 2/3 = ×4 / ×10'),
    ('O08', 'Office / co-working — pre-seed phase', '$/mo', 300, 500, 500, 'Phases 2/3 = ×6 / ×20'),
    ('O09', 'One-off: incorporation / US flip legal (month 2)', '$', 20000, 20000, 20000, 'Only if US investors require a Delaware parent'),
    ('O10', 'One-off: SOC 2 Type I (month 12)', '$', 25000, 25000, 25000, 'Vanta/Drata + auditor'),
    ('O11', 'SOC 2 Type II + pen test, annual from seed+9', '$/yr', 40000, 40000, 40000, ''),
    ('O12', 'Annual salary increase', '%', 0.08, 0.08, 0.08, 'India tech market'),
]
for i, (iid, name, unit, c_, b_, a_, src) in enumerate(irows, 7):
    fmt = PCT if unit == '%' else (USD if unit.startswith('$') else NUM1)
    w(inp, f'A{i}', iid, bold=True); w(inp, f'B{i}', name, wrap=True); w(inp, f'C{i}', unit)
    for col, v in zip('DEF', (c_, b_, a_)):
        w(inp, f'{col}{i}', v, font=BLUE, fmt=fmt)
    w(inp, f'G{i}', f'=CHOOSE($C$3,D{i},E{i},F{i})', fmt=fmt, fill=YELLOW if iid in ('F01', 'R09', 'R10', 'R12', 'C01') else None)
    w(inp, f'H{i}', src, font=NOTE, wrap=True)
    I[iid] = f'Inputs!$G${i}'

# ---------------------------------------------------------------- Headcount
hc = wb.create_sheet('Headcount')
widths(hc, {'A': 34, 'B': 10, 'C': 10, **{c: 9 for c in MC}})
w(hc, 'A1', 'HEADCOUNT PLAN — loaded monthly cost (USD). Hire month may reference seed (S) or Series A (A) close month.', font=H1)
header(hc, 3, ['Role', 'Function', 'Hire month', 'Monthly cost'] + [f'M{i+1}' for i in range(N)], start=1)
# we need 4 fixed cols: A role, B function, C hire month (formula), D.. would clash with month cols; shift months: use col E onward for months
HC0 = 5
HMC = [L(HC0 + i) for i in range(N)]
for i in range(N):
    hc.cell(row=3, column=HC0 + i, value=f'M{i+1}').font = H2
    hc.cell(row=3, column=HC0 + i).fill = HEAD
hc.cell(row=3, column=4, value='Monthly cost $').font = H2
w(hc, 'A2', 'Month index →', font=NOTE)
for i, col in enumerate(HMC):
    w(hc, f'{col}2', i + 1, font=NOTE)
S = I['F03']; A_ = I['F05']
roles = [
    # name, function, hire (int or ('S',k) or ('A',k)), cost, founder_step
    ('Founder 1 — CEO (product + sales)', 'S&M', 1, 2000, True),
    ('Founder 2 — CTO (kernels + orchestration)', 'R&D', 1, 2000, True),
    ('Founder 3 — Founder\'s office / GTM ops', 'G&A', 1, 2000, True),
    ('Founding engineer (existing contributor)', 'R&D', 1, 4000, False),
    ('Founding engineer (existing contributor)', 'R&D', 1, 4000, False),
    ('Engineer — Rust / OOXML kernels', 'R&D', 3, 4500, False),
    ('Engineer — Office add-in + review UI', 'R&D', 4, 4000, False),
    ('Product designer', 'R&D', 5, 3000, False),
    ('Forward-deployed engineer (design partners)', 'S&M', 6, 4000, False),
    ('Founding AE (US/UK, remote)', 'AE', 10, 13000, False),
    ('SDR (India)', 'S&M', 10, 1500, False),
    ('Customer success (India)', 'S&M', 12, 2500, False),
    ('Engineer (seed hire)', 'R&D', ('S', 1), 5000, False),
    ('Engineer (seed hire)', 'R&D', ('S', 2), 5000, False),
    ('Engineer — security / DevOps (seed)', 'R&D', ('S', 3), 5000, False),
    ('Engineer (seed hire)', 'R&D', ('S', 4), 5000, False),
    ('AE #2 (US)', 'AE', ('S', 2), 13000, False),
    ('Marketing lead', 'S&M', ('S', 2), 4000, False),
    ('Finance & ops', 'G&A', ('S', 4), 2500, False),
    ('AE #3 (UK)', 'AE', ('S', 6), 12000, False),
    ('Enterprise AE (US)', 'EAE', ('S', 6), 17000, False),
    ('Solutions engineer (US)', 'S&M', ('S', 8), 12000, False),
    ('Customer success #2', 'S&M', ('S', 8), 2500, False),
    ('Engineer (seed hire)', 'R&D', ('S', 9), 5000, False),
    ('Engineer (seed hire)', 'R&D', ('S', 12), 5000, False),
    ('AE #4', 'AE', ('A', 1), 13000, False),
    ('AE #5', 'AE', ('A', 2), 13000, False),
    ('Enterprise AE #2', 'EAE', ('A', 2), 17000, False),
    ('AE #6', 'AE', ('A', 4), 13000, False),
    ('AE #7', 'AE', ('A', 6), 13000, False),
    ('Enterprise AE #3', 'EAE', ('A', 6), 17000, False),
    ('AE #8', 'AE', ('A', 9), 13000, False),
    ('Enterprise AE #4', 'EAE', ('A', 12), 17000, False),
    ('Engineers ×4 (Series A)', 'R&D4', ('A', 1), 5500, False),
    ('Engineers ×4 (Series A)', 'R&D4', ('A', 6), 5500, False),
    ('Customer success ×3 (Series A)', 'S&M3', ('A', 3), 3000, False),
    ('Marketing ×2 (Series A)', 'S&M2', ('A', 3), 5000, False),
    ('Solutions engineer #2', 'S&M', ('A', 4), 12000, False),
    ('Head of Sales (US)', 'S&M', ('A', 2), 22000, False),
    ('People / recruiting', 'G&A', ('A', 3), 3000, False),
    ('Finance #2', 'G&A', ('A', 6), 3000, False),
]
mult = {'R&D4': 4, 'S&M3': 3, 'S&M2': 2}
r0 = 4
for i, (name, fn, hire, cost, fstep) in enumerate(roles):
    r = r0 + i
    w(hc, f'A{r}', name); w(hc, f'B{r}', fn)
    if isinstance(hire, int):
        w(hc, f'C{r}', hire, font=BLUE)
    else:
        base = S if hire[0] == 'S' else A_
        w(hc, f'C{r}', f'={base}+{hire[1]}', font=GREEN)
    w(hc, f'D{r}', cost, font=BLUE, fmt=USD)
    k = mult.get(fn, 1)
    for j, col in enumerate(HMC):
        m = j + 1; yr = f'INT(({m}-1)/12)'
        if fstep:
            f = f'=IF({m}>=$C{r},IF({m}>={S},2.5,1)*$D{r},0)'
        else:
            f = f'=IF({m}>=$C{r},{k}*$D{r}*(1+{I["O12"]})^{yr},0)'
        w(hc, f'{col}{r}', f, fmt=NUM)
rl = r0 + len(roles) - 1
tot = rl + 2
labels = [('Total payroll $', None), ('R&D payroll', 'R&D*'), ('S&M payroll (incl. AEs)', 'S&M*'), ('G&A payroll', 'G&A')]
w(hc, f'A{tot}', 'Total payroll $', bold=True)
w(hc, f'A{tot+1}', 'R&D payroll', bold=True)
w(hc, f'A{tot+2}', 'S&M payroll (incl. AEs, SDR, CS, SE)', bold=True)
w(hc, f'A{tot+3}', 'G&A payroll', bold=True)
w(hc, f'A{tot+4}', 'Headcount (people)', bold=True)
w(hc, f'A{tot+5}', 'Mid-market AE ramped capacity', bold=True)
w(hc, f'A{tot+6}', 'Enterprise AE ramped capacity', bold=True)
for j, col in enumerate(HMC):
    m = j + 1
    rng = f'{col}{r0}:{col}{rl}'
    w(hc, f'{col}{tot}', f'=SUM({rng})', fmt=NUM, bold=True)
    w(hc, f'{col}{tot+1}', f'=SUMIF($B${r0}:$B${rl},"R&D*",{rng})', fmt=NUM)
    w(hc, f'{col}{tot+2}', f'=SUMIF($B${r0}:$B${rl},"S&M*",{rng})+SUMIF($B${r0}:$B${rl},"AE",{rng})+SUMIF($B${r0}:$B${rl},"EAE",{rng})', fmt=NUM)
    w(hc, f'{col}{tot+3}', f'=SUMIF($B${r0}:$B${rl},"G&A",{rng})', fmt=NUM)
    # headcount: count roles hired × multiplier
    parts = []
    for i, (name, fn, hire, cost, fstep) in enumerate(roles):
        k = mult.get(fn, 1)
        parts.append(f'{k}*({m}>=$C${r0+i})')
    w(hc, f'{col}{tot+4}', '=' + '+'.join(parts), fmt=NUM)
    ae = [r0 + i for i, x in enumerate(roles) if x[1] == 'AE']
    eae = [r0 + i for i, x in enumerate(roles) if x[1] == 'EAE']
    w(hc, f'{col}{tot+5}', '=' + '+'.join([f'MAX(0,MIN(1,({m}-$C${r})/{I["R11"]}))' for r in ae]), fmt=NUM1)
    w(hc, f'{col}{tot+6}', '=' + '+'.join([f'MAX(0,MIN(1,({m}-$C${r})/{I["R16"]}))' for r in eae]), fmt=NUM1)
HROW = {'pay': tot, 'rd': tot + 1, 'sm': tot + 2, 'ga': tot + 3, 'hc': tot + 4, 'ae': tot + 5, 'eae': tot + 6}

# ---------------------------------------------------------------- Model
md = wb.create_sheet('Model')
widths(md, {'A': 46, 'B': 12, 'C': 14, **{c: 11 for c in MC}})
w(md, 'A1', 'MONTHLY MODEL (USD)', font=H1)
R = {}
order = []
def row(key, label, fmt=NUM, bold=False):
    R[key] = len(order) + 4; order.append((key, label, fmt, bold))
for k, lab, fmt, bold in [
    ('m', 'Month index', NUM, False), ('date', 'Month', 'mmm-yy', False), ('yr', 'Year (1–5)', NUM, False), ('phase', 'Funding phase (1 pre-seed, 2 seed, 3 Series A)', NUM, False),
    ('h1', '— PAID PILOTS —', None, True), ('pil', 'Active paid pilots', NUM1, False), ('pilmrr', 'Pilot MRR', USD, False),
    ('h2', '— MID-MARKET (packs) —', None, True), ('fl', 'Founder-led new logos', NUM1, False), ('conv', 'Pilot conversions', NUM1, False), ('aecap', 'Ramped AE capacity (link)', NUM1, False), ('aelog', 'AE-sourced new logos', NUM1, False),
    ('mmnew', 'Total new mid-market logos', NUM1, False), ('mmchurnl', 'Churned logos', NUM1, False), ('mmlog', 'Active mid-market logos', NUM1, True),
    ('mmnewmrr', 'New MRR', USD, False), ('mmexp', 'Expansion MRR', USD, False), ('mmchurn', 'Churned MRR', USD, False), ('mmmrr', 'Mid-market MRR', USD, True),
    ('h3', '— ENTERPRISE —', None, True), ('eaecap', 'Ramped enterprise AE capacity (link)', NUM1, False), ('enew', 'New enterprise logos', NUM1, False), ('echurnl', 'Churned enterprise logos', NUM1, False), ('elog', 'Active enterprise logos', NUM1, True),
    ('enewmrr', 'New MRR', USD, False), ('eexp', 'Expansion MRR', USD, False), ('echurn', 'Churned MRR', USD, False), ('emrr', 'Enterprise MRR', USD, True),
    ('h4', '— SELF-SERVE PRO —', None, True), ('pnew', 'New paid seats', NUM1, False), ('pchurn', 'Churned seats', NUM1, False), ('pseats', 'Active Pro seats', NUM1, True), ('pmrr', 'Pro MRR', USD, True),
    ('h5', '— REVENUE —', None, True), ('mrr', 'Total MRR', USD, True), ('arr', 'ARR (MRR × 12)', USD, True), ('rev', 'Revenue (month)', USD, True), ('logos', 'Paying organisations', NUM1, False),
    ('h6', '— COGS —', None, True), ('infr', 'Inference', USD, False), ('host', 'Hosting & dedicated infra', USD, False), ('supp', 'Support & CS', USD, False), ('pay', 'Payment processing', USD, False), ('cogs', 'Total COGS', USD, True), ('gp', 'Gross profit', USD, True), ('gm', 'Gross margin %', PCT, False),
    ('h7', '— OPERATING EXPENSES —', None, True), ('prd', 'R&D payroll', USD, False), ('psm', 'S&M payroll', USD, False), ('pga', 'G&A payroll', USD, False), ('mkt', 'Marketing programs', USD, False), ('tools', 'Tools & software', USD, False), ('legal', 'Legal, accounting, admin', USD, False), ('rdc', 'R&D compute & evals', USD, False), ('trav', 'Travel', USD, False), ('office', 'Office', USD, False), ('oneoff', 'One-offs (legal flip, SOC 2)', USD, False), ('opex', 'Total opex', USD, True),
    ('h8', '— PROFIT & CASH —', None, True), ('ebitda', 'EBITDA', USD, True), ('burn', 'Net burn (if negative EBITDA)', USD, False), ('eq', 'Equity raised', USD, False), ('cash', 'Cash balance (end of month)', USD, True), ('runway', 'Runway at current burn (months)', NUM1, False), ('hc', 'Headcount', NUM, False),
]:
    row(k, lab, fmt, bold)
for k, lab, fmt, bold in order:
    w(md, f'A{R[k]}', lab, bold=bold)
def ref(k, col): return f'{col}{R[k]}'
for j, col in enumerate(MC):
    m = j + 1
    prev = MC[j - 1] if j > 0 else None
    hcol = HMC[j]
    P = lambda k: f'{prev}{R[k]}' if prev else '0'
    f = {}
    f['m'] = m
    f['date'] = f'=DATE(2027,{m},1)'
    f['yr'] = f'=INT(({col}{R["m"]}-1)/12)+1'
    f['phase'] = f'=1+({col}{R["m"]}>={I["F03"]})+({col}{R["m"]}>={I["F05"]})'
    mm = f'{col}{R["m"]}'
    f['pil'] = f'=IF(AND({mm}>={I["R03"]},{mm}<={I["R04"]}),{I["R01"]},0)'
    f['pilmrr'] = f'={ref("pil",col)}*{I["R02"]}'
    f['fl'] = f'=IF(AND({mm}>={I["R07"]},{mm}<={I["R08"]}),{I["R06"]},0)'
    f['conv'] = f'=IF({mm}={I["R04"]}+1,{I["R01"]}*{I["R05"]},0)'
    f['aecap'] = f'=Headcount!{hcol}{HROW["ae"]}'
    f['aelog'] = f'={ref("aecap",col)}*{I["R10"]}'
    f['mmnew'] = f'={ref("fl",col)}+{ref("conv",col)}+{ref("aelog",col)}'
    f['mmchurnl'] = f'={P("mmlog")}*{I["R12"]}'
    f['mmlog'] = f'={P("mmlog")}+{ref("mmnew",col)}-{ref("mmchurnl",col)}'
    f['mmnewmrr'] = f'={ref("mmnew",col)}*{I["R09"]}/12'
    f['mmexp'] = f'={P("mmmrr")}*{I["R13"]}'
    f['mmchurn'] = f'={P("mmmrr")}*{I["R12"]}'
    f['mmmrr'] = f'={P("mmmrr")}+{ref("mmnewmrr",col)}+{ref("mmexp",col)}-{ref("mmchurn",col)}'
    f['eaecap'] = f'=Headcount!{hcol}{HROW["eae"]}'
    f['enew'] = f'={ref("eaecap",col)}*{I["R14"]}'
    f['echurnl'] = f'={P("elog")}*{I["R17"]}'
    f['elog'] = f'={P("elog")}+{ref("enew",col)}-{ref("echurnl",col)}'
    f['enewmrr'] = f'={ref("enew",col)}*{I["R15"]}/12'
    f['eexp'] = f'={P("emrr")}*{I["R18"]}'
    f['echurn'] = f'={P("emrr")}*{I["R17"]}'
    f['emrr'] = f'={P("emrr")}+{ref("enewmrr",col)}+{ref("eexp",col)}-{ref("echurn",col)}'
    f['pnew'] = f'=IF({mm}<{I["R19"]},0,{I["R20"]}*(1+{I["R21"]})^(MIN({mm},36)-MIN({I["R19"]},36))*(1+{I["R22"]})^MAX(0,{mm}-MAX(36,{I["R19"]})))'
    f['pchurn'] = f'={P("pseats")}*{I["R23"]}'
    f['pseats'] = f'={P("pseats")}+{ref("pnew",col)}-{ref("pchurn",col)}'
    f['pmrr'] = f'={ref("pseats",col)}*{I["R24"]}'
    f['mrr'] = f'={ref("pilmrr",col)}+{ref("mmmrr",col)}+{ref("emrr",col)}+{ref("pmrr",col)}'
    f['arr'] = f'={ref("mrr",col)}*12'
    f['rev'] = f'={ref("mrr",col)}'
    f['logos'] = f'={ref("pil",col)}+{ref("mmlog",col)}+{ref("elog",col)}'
    yrr = f'{col}{R["yr"]}'
    f['infr'] = f'=({ref("pilmrr",col)}+{ref("mmmrr",col)}+{ref("pmrr",col)})*{I["C01"]}*(1-{I["C02"]})^({yrr}-1)+{ref("emrr",col)}*{I["C03"]}'
    f['host'] = f'={ref("mmlog",col)}*{I["C04"]}+{ref("pseats",col)}*{I["C05"]}+{ref("elog",col)}*{I["C06"]}'
    f['supp'] = f'={ref("rev",col)}*{I["C07"]}'
    f['pay'] = f'={ref("pmrr",col)}*{I["C08"]}'
    f['cogs'] = f'={ref("infr",col)}+{ref("host",col)}+{ref("supp",col)}+{ref("pay",col)}'
    f['gp'] = f'={ref("rev",col)}-{ref("cogs",col)}'
    f['gm'] = f'=IF({ref("rev",col)}>0,{ref("gp",col)}/{ref("rev",col)},0)'
    f['prd'] = f'=Headcount!{hcol}{HROW["rd"]}'
    f['psm'] = f'=Headcount!{hcol}{HROW["sm"]}'
    f['pga'] = f'=Headcount!{hcol}{HROW["ga"]}'
    ph = f'{col}{R["phase"]}'
    f['mkt'] = f'=IF({mm}<6,0,CHOOSE({ph},{I["O01"]},{I["O02"]},{I["O03"]}))'
    f['tools'] = f'=Headcount!{hcol}{HROW["hc"]}*{I["O05"]}'
    f['legal'] = f'={I["O04"]}*CHOOSE({ph},1,3,7)'
    f['rdc'] = f'={I["O06"]}*CHOOSE({ph},1,3,8)'
    f['trav'] = f'={I["O07"]}*CHOOSE({ph},1,4,10)'
    f['office'] = f'={I["O08"]}*CHOOSE({ph},1,6,20)'
    f['oneoff'] = f'=IF({mm}=2,{I["O09"]},0)+IF({mm}=12,{I["O10"]},0)+IF(AND({mm}>={I["F03"]}+9,MOD({mm}-({I["F03"]}+9),12)=0),{I["O11"]},0)'
    f['opex'] = '=' + '+'.join(ref(k, col) for k in ['prd', 'psm', 'pga', 'mkt', 'tools', 'legal', 'rdc', 'trav', 'office', 'oneoff'])
    f['ebitda'] = f'={ref("gp",col)}-{ref("opex",col)}'
    f['burn'] = f'=MAX(0,-{ref("ebitda",col)})'
    f['eq'] = f'=IF({mm}=1,{I["F01"]},0)+IF({mm}={I["F03"]},{I["F02"]},0)+IF({mm}={I["F05"]},{I["F04"]},0)'
    f['cash'] = f'={P("cash") if prev else I["F06"]}+{ref("eq",col)}+{ref("ebitda",col)}'
    if j >= 2:
        f['runway'] = f'=IF(AVERAGE({MC[j-2]}{R["burn"]}:{col}{R["burn"]})>0,{ref("cash",col)}/AVERAGE({MC[j-2]}{R["burn"]}:{col}{R["burn"]}),999)'
    else:
        f['runway'] = f'=IF({ref("burn",col)}>0,{ref("cash",col)}/{ref("burn",col)},999)'
    f['hc'] = f'=Headcount!{hcol}{HROW["hc"]}'
    for k, lab, fmt, bold in order:
        if k.startswith('h') and k[1:].isdigit():
            continue
        if k in f:
            cell = w(md, f'{col}{R[k]}', f[k], fmt=fmt, bold=bold, font=GREEN if isinstance(f[k], str) and 'Headcount!' in f[k] else BLACK)
w(md, 'B3', 'Unit'); w(md, 'C3', 'Note')
for c in MC:
    md[f'{c}3'].value = None
md.freeze_panes = 'D4'

# ---------------------------------------------------------------- Annual
an = wb.create_sheet('Annual', 1)
widths(an, {'A': 46, 'B': 15, 'C': 15, 'D': 15, 'E': 15, 'F': 15, 'G': 60})
w(an, 'A1', 'ANNUAL SUMMARY', font=H1); w(an, 'A2', '=Inputs!D3&" scenario — all figures USD"', bold=True)
header(an, 4, ['Metric', 'Year 1 (2027)', 'Year 2 (2028)', 'Year 3 (2029)', 'Year 4 (2030)', 'Year 5 (2031)', 'Definition'])
YR = f'Model!${FIRST}${R["yr"]}:${LAST}${R["yr"]}'
def sumyr(k, y): return f'=SUMIF({YR},{y},Model!${FIRST}${R[k]}:${LAST}${R[k]})'
def endyr(k, y): return f'=INDEX(Model!${FIRST}${R[k]}:${LAST}${R[k]},1,{12*y})'
amet = [
    ('Exit ARR', 'arr', 'end', USD, 'MRR × 12 in December'),
    ('Revenue', 'rev', 'sum', USD, ''),
    ('Gross profit', 'gp', 'sum', USD, ''),
    ('Gross margin %', None, 'gm', PCT, 'GP ÷ revenue'),
    ('Total opex', 'opex', 'sum', USD, ''),
    ('EBITDA', 'ebitda', 'sum', USD, ''),
    ('Net burn', 'burn', 'sum', USD, ''),
    ('Equity raised', 'eq', 'sum', USD, ''),
    ('Ending cash', 'cash', 'end', USD, ''),
    ('Ending headcount', 'hc', 'end', NUM, ''),
    ('Paying organisations (exit)', 'logos', 'end', NUM1, 'Pilots + mid-market + enterprise'),
    ('Mid-market logos (exit)', 'mmlog', 'end', NUM1, ''),
    ('Enterprise logos (exit)', 'elog', 'end', NUM1, ''),
    ('Pro seats (exit)', 'pseats', 'end', NUM1, ''),
    ('New mid-market + enterprise logos', None, 'newlogos', NUM1, ''),
    ('S&M spend (payroll + marketing + travel)', None, 'sm', USD, 'Blended CAC numerator'),
    ('Blended CAC per new organisation', None, 'cac', USD, 'S&M spend ÷ new organisations'),
    ('Average ACV of new logos (blended)', None, 'acv', USD, 'New MRR × 12 ÷ new logos'),
    ('CAC payback (months, gross-margin adjusted)', None, 'payback', NUM1, 'CAC ÷ (ACV/12 × GM%)'),
    ('Implied annual logo churn (mid-market)', None, 'churn', PCT, '1 − (1 − monthly churn)^12'),
    ('Implied mid-market NRR', None, 'nrr', PCT, '(1 − churn + expansion)^12'),
    ('LTV (GM-adjusted, 5-yr cap) per mid-market logo', None, 'ltv', USD, 'ACV × GM% × min(5, 1/annual churn)'),
    ('LTV / CAC', None, 'ltvcac', MULT, ''),
    ('Burn multiple (net burn ÷ net new ARR)', None, 'bm', MULT, '<2 good at seed stage; <1.5 at A'),
]
AR = {}
for i, (lab, key, typ, fmt, d) in enumerate(amet, 5):
    AR[typ if key is None else lab] = i
    w(an, f'A{i}', lab, bold=lab in ('Exit ARR', 'Ending cash', 'EBITDA'))
    w(an, f'G{i}', d, font=NOTE)
    for y in range(1, 6):
        col = L(1 + y)
        if typ == 'sum': fx = sumyr(key, y)
        elif typ == 'end': fx = endyr(key, y)
        elif typ == 'gm': fx = f'=IF({col}6>0,{col}7/{col}6,0)'
        elif typ == 'newlogos': fx = f'=SUMIF({YR},{y},Model!${FIRST}${R["mmnew"]}:${LAST}${R["mmnew"]})+SUMIF({YR},{y},Model!${FIRST}${R["enew"]}:${LAST}${R["enew"]})'
        elif typ == 'sm': fx = f'=SUMIF({YR},{y},Model!${FIRST}${R["psm"]}:${LAST}${R["psm"]})+SUMIF({YR},{y},Model!${FIRST}${R["mkt"]}:${LAST}${R["mkt"]})+SUMIF({YR},{y},Model!${FIRST}${R["trav"]}:${LAST}${R["trav"]})'
        elif typ == 'cac': fx = f'=IF({col}19>0,{col}20/{col}19,0)'
        elif typ == 'acv': fx = f'=IF({col}19>0,(SUMIF({YR},{y},Model!${FIRST}${R["mmnewmrr"]}:${LAST}${R["mmnewmrr"]})+SUMIF({YR},{y},Model!${FIRST}${R["enewmrr"]}:${LAST}${R["enewmrr"]}))*12/{col}19,0)'
        elif typ == 'payback': fx = f'=IF(AND({col}22>0,{col}8>0),{col}21/({col}22/12*{col}8),0)'
        elif typ == 'churn': fx = f'=1-(1-{I["R12"]})^12'
        elif typ == 'nrr': fx = f'=(1-{I["R12"]}+{I["R13"]})^12'
        elif typ == 'ltv': fx = f'={I["R09"]}*MAX(0,{col}8)*MIN(5,IF({col}24>0,1/{col}24,5))'
        elif typ == 'ltvcac': fx = f'=IF({col}21>0,{col}26/{col}21,0)'
        elif typ == 'bm':
            prevarr = f'{L(y)}5' if y > 1 else '0'
            fx = f'=IF(({col}5-{prevarr})>0,{col}11/({col}5-{prevarr}),0)'
        w(an, f'{col}{i}', fx, fmt=fmt, font=GREEN if 'Model!' in fx else BLACK)
w(an, 'A31', 'Minimum cash balance over 60 months', bold=True)
w(an, 'B31', f'=MIN(Model!{FIRST}{R["cash"]}:{LAST}{R["cash"]})', fmt=USD, bold=True)
w(an, 'A32', 'Month of minimum cash', bold=True)
w(an, 'B32', f'=MATCH(B31,Model!{FIRST}{R["cash"]}:{LAST}{R["cash"]},0)', fmt=NUM)
w(an, 'A33', 'Cumulative burn to seed close (months 1 → seed month − 1)', bold=True)
w(an, 'B33', f'=-SUMIF(Model!{FIRST}{R["m"]}:{LAST}{R["m"]},"<"&{I["F03"]},Model!{FIRST}{R["ebitda"]}:{LAST}{R["ebitda"]})', fmt=USD, bold=True)
w(an, 'A34', 'ARR at seed close month', bold=True)
w(an, 'B34', f'=INDEX(Model!{FIRST}{R["arr"]}:{LAST}{R["arr"]},1,{I["F03"]})', fmt=USD, bold=True)
w(an, 'A35', 'ARR at Series A close month', bold=True)
w(an, 'B35', f'=INDEX(Model!{FIRST}{R["arr"]}:{LAST}{R["arr"]},1,{I["F05"]})', fmt=USD, bold=True)
w(an, 'A36', 'Paying organisations at seed close', bold=True)
w(an, 'B36', f'=INDEX(Model!{FIRST}{R["logos"]}:{LAST}{R["logos"]},1,{I["F03"]})', fmt=NUM1, bold=True)
w(an, 'A37', 'Cash at seed close (before seed money)', bold=True)
w(an, 'B37', f'=INDEX(Model!{FIRST}{R["cash"]}:{LAST}{R["cash"]},1,{I["F03"]})-{I["F02"]}', fmt=USD, bold=True)

wb.calculation.fullCalcOnLoad = True
wb.save(OUT)
import json
json.dump({'R': R, 'AR': AR}, open('fin_rows.json', 'w'))
print('saved', OUT)
