import sys; sys.path.insert(0, '.')
from xlhelp import *
OUT = '../models/10_PRICING_MODEL.xlsx'
wb = Workbook()
ws = wb.active; ws.title = 'README'
widths(ws, {'A': 115})
for i, t in enumerate([
    ('Agentic Office — Pricing & Unit-Cost Model (10_PRICING_MODEL.xlsx)', H1),
    ('Purpose: test candidate price points against (1) market benchmarks, (2) inference + infrastructure cost at different activity levels, (3) value per persona (see 09_MARKET_MODEL D_Value).', BLACK),
    ('Scenario selector: Costs!C3 (1 Conservative = expensive models/heavy use, 2 Base, 3 Aggressive = cheap models/efficient). Blue = input. Black = formula.', BLACK),
    ('Sheets: Benchmarks (comparable prices with sources) · Costs (LLM prices, token profiles, routing, infra) · RunCost (cost per agent run type) · UserCost (COGS per user by activity) · PriceGrid (gross margin at $15–$200 per seat) · Tiers (proposed packaging) · Enterprise (ACV scenarios $10k–$250k).', BLACK),
    ('CRITICAL GAP: token counts per run are assumptions. Replace with telemetry from Hermes/recursive_DAG runs on real packs (RESEARCH_GAPS G005).', BOLD),
    ('Anthropic list prices from the Claude API reference cached 2026-09-25 (Tier 1). Open-weight prices are Tier-3 aggregator quotes — sensitivity only.', BLACK),
], 1):
    w(ws, f'A{i}', t[0], font=t[1], wrap=True)

# -------------------------------------------------- Benchmarks
bm = wb.create_sheet('Benchmarks')
widths(bm, {'A': 26, 'B': 30, 'C': 13, 'D': 16, 'E': 34, 'F': 9, 'G': 70})
w(bm, 'A1', 'Comparable pricing (accessed 2026-09-30)', font=H1)
header(bm, 3, ['Vendor', 'Product / tier', 'Price $/mo', 'Unit', 'Notes', 'Tier', 'Source'])
bench = [
    ('Microsoft', 'M365 Copilot add-on', 30, 'user/mo', 'On top of M365 E3/E5/Business; Agent Mode in Word/Excel/PPT included', 1, 'https://www.microsoft.com/en-us/microsoft-365-copilot/pricing'),
    ('OpenAI', 'ChatGPT Business', 25, 'user/mo (monthly)', '$20 annual; 2-seat min; ChatGPT in Word/Excel/PPT add-in incl. Free', 3, 'eesel.ai / elephas.app summaries of openai.com/business pricing'),
    ('OpenAI', 'ChatGPT Business premium seat', 125, 'user/mo', 'Introduced Aug 2026 (reported)', 3, 'elephas.app'),
    ('Anthropic', 'Claude Team standard', 25, 'user/mo', '5-seat min; Claude for Excel/Word/PPT on all paid plans', 3, 'claude pricing summaries; verify claude.com/pricing'),
    ('Anthropic', 'Claude Team premium', 100, 'user/mo (annual)', '$125 monthly', 3, 'ai.zenken.co.jp'),
    ('Google', 'Workspace Business Standard (incl. Gemini)', 14, 'user/mo', 'Gemini bundled since Mar 2025', 3, 'eesel.ai'),
    ('Shortcut', 'Pro', 20, 'user/mo', 'Excel agent; Free 30 credits/day; Teams $160/mo + $20/seat', 2, 'https://shortcut.ai/pricing'),
    ('Hebbia', 'Lite seat', 271, 'seat/mo (=$3.25k/yr)', 'Sales-quoted; $3–3.5k/seat/yr', 3, 'trustradius / metronome pricing index'),
    ('Hebbia', 'Full seat', 833, 'seat/mo (=$10k/yr)', 'Sales-quoted', 3, 'trustradius / sacra'),
    ('Harvey', 'Per lawyer (reported)', 1000, 'lawyer/mo', 'Reported $1,000–1,200 with 20-seat min; high uncertainty', 3, 'costbench / eesel (Tier 3) — CONTRADICTIONS C006'),
    ('Workiva', 'Average revenue per customer', 11134, 'customer/mo (=$133.6k/yr)', 'Derived: FY25 revenue $885M / 6,624 customers', 1, 'Workiva 8-K Q4 2025'),
    ('Gamma', 'Pro (reference)', 20, 'user/mo', 'AI presentations; $102M ARR Oct 2025', 3, 'sacra'),
    ('Rollstack', 'Annual contract (median of 4 buyers)', 656, 'org/mo (=$7.9k/yr)', 'Range $6.75k–20.2k/yr; data→slides refresh', 3, 'vendr.com/marketplace/rollstack'),
    ('Cube', 'Annual contract (median of 58 buyers)', 1842, 'org/mo (=$22.1k/yr)', 'Range $15k–80k/yr; + $5–10k implementation', 3, 'eightx.co / costbench (Vendr-style data)'),
    ('Datarails', 'Annual platform fee (from; median contract $55k)', 1667, 'org/mo (=$20k/yr from)', 'From ~$20–24k/yr; median $55k (4 reports); implementation extra', 3, 'coefficient.io / costbench'),
    ('think-cell', 'Per user (reference)', 25, 'user/mo', 'Charting add-in used across consulting/banking; ~ $300/yr', 3, 'think-cell.com price list (verify)'),
]
for i, row in enumerate(bench, 4):
    for j, v in enumerate(row):
        cell = w(bm, f'{L(j+1)}{i}', v, font=BLUE if j == 2 else (NOTE if j == 6 else BLACK), fmt=USD if j == 2 else None)
w(bm, f'A{5+len(bench)}', 'Read-across: horizontal AI seats cluster at $14–30; premium agent seats $100–125; vertical workflow tools $250–1,000+/seat; mid-market reporting tools price per organisation at ~$8k (Rollstack) to ~$22k (Cube) medians; Workiva ~$134k avg. Our $15k base ACV sits between.', font=NOTE, wrap=True)

# -------------------------------------------------- Costs
cs = wb.create_sheet('Costs')
widths(cs, {'A': 8, 'B': 56, 'C': 12, 'D': 13, 'E': 13, 'F': 13, 'G': 13, 'H': 70})
w(cs, 'A1', 'COST INPUTS', font=H1)
w(cs, 'B3', 'Scenario (1=Conservative/expensive, 2=Base, 3=Aggressive/cheap)', font=BOLD)
w(cs, 'C3', 2, font=BLUE, fill=YELLOW)
header(cs, 5, ['ID', 'Input', 'Unit', 'Conservative', 'Base', 'Aggressive', 'ACTIVE', 'Source / note'])
C = {}
cin = [
    ('P01', 'Premium model input price (Claude Opus 5.5)', '$/MTok', 4, 4, 4, 'Anthropic API list, cached 2026-09-25'),
    ('P02', 'Premium model output price (Opus 5.5)', '$/MTok', 20, 20, 20, 'Anthropic'),
    ('P03', 'Premium model cache-read price', '$/MTok', 0.20, 0.20, 0.20, 'Anthropic'),
    ('P04', 'Workhorse model input (Claude Sonnet 5.5)', '$/MTok', 2, 2, 2, 'Anthropic'),
    ('P05', 'Workhorse model output (Sonnet 5.5)', '$/MTok', 10, 10, 10, 'Anthropic'),
    ('P06', 'Workhorse cache-read', '$/MTok', 0.20, 0.20, 0.20, 'Anthropic'),
    ('P07', 'Fast model input (Claude Haiku 4.5)', '$/MTok', 1, 1, 1, 'Anthropic'),
    ('P08', 'Fast model output (Haiku 4.5)', '$/MTok', 5, 5, 5, 'Anthropic'),
    ('P09', 'Fast model cache-read (assumed 10% of input)', '$/MTok', 0.10, 0.10, 0.10, 'Assumption based on Anthropic cache pricing ratio'),
    ('P10', 'Open-weight model input (e.g., DeepSeek V4 via API)', '$/MTok', 0.60, 0.35, 0.25, 'Tier-3 aggregator quote; repo currently routes workers to deepseek-v4-pro / kimi-k2.5'),
    ('P11', 'Open-weight model output', '$/MTok', 2.40, 1.40, 1.00, 'Tier-3'),
    ('R01', 'Token share routed to premium model', '%', 0.35, 0.20, 0.10, 'Planner/conductor + hard reasoning'),
    ('R02', 'Token share routed to workhorse model', '%', 0.50, 0.55, 0.45, ''),
    ('R03', 'Token share routed to fast model', '%', 0.15, 0.15, 0.20, 'Extraction, classification, verification'),
    ('R04', 'Token share routed to open-weight model', '%', 0.00, 0.10, 0.25, 'Remainder must make R01..R04 = 100%'),
    ('R05', 'Prompt-cache hit rate on input tokens (closed models)', '%', 0.40, 0.60, 0.75, 'Workspace context packs are highly reusable'),
    ('T01', 'Light edit (single object) — input tokens', 'tokens', 40000, 30000, 20000, 'Assumption — replace with telemetry (G005)'),
    ('T02', 'Light edit — output tokens', 'tokens', 4000, 3000, 2000, ''),
    ('T03', 'Multi-file task — input tokens', 'tokens', 400000, 250000, 150000, 'Plan + retrieve + patch 2–4 files'),
    ('T04', 'Multi-file task — output tokens', 'tokens', 30000, 20000, 12000, ''),
    ('T05', 'Full pack update (4–8 files, verify, repair) — input tokens', 'tokens', 2000000, 1200000, 700000, 'Recurring monthly/quarterly pack'),
    ('T06', 'Full pack update — output tokens', 'tokens', 120000, 80000, 50000, ''),
    ('T07', 'Verification / visual-QA pass — input tokens', 'tokens', 200000, 150000, 80000, 'Rendered pages/slides as images'),
    ('T08', 'Verification pass — output tokens', 'tokens', 12000, 8000, 5000, ''),
    ('I01', 'Hosting, storage, indexing per active seat per month', '$/seat/mo', 3.0, 2.0, 1.2, 'Cloud VM share, object storage, SQLite/Postgres indexes; local-first reduces this'),
    ('I02', 'OCR / PDF parsing per seat per month', '$/seat/mo', 1.5, 0.8, 0.4, 'Scanned PDFs; many sources are digital'),
    ('I03', 'Embeddings per seat per month', '$/seat/mo', 0.5, 0.3, 0.1, ''),
    ('I04', 'Support & customer success as % of revenue (in COGS)', '%', 0.12, 0.08, 0.05, 'Onboarding of packs is hands-on early'),
    ('I05', 'Payment processing (self-serve) % of revenue', '%', 0.035, 0.03, 0.03, 'Stripe-like'),
    ('I06', 'Annual inference cost decline (same capability)', '%', 0.20, 0.30, 0.40, 'Used by the financial model for out-years'),
]
for i, (cid, name, unit, c_, b_, a_, src) in enumerate(cin, 6):
    fmt = PCT if unit == '%' else (NUM if unit == 'tokens' else '$#,##0.00')
    w(cs, f'A{i}', cid, bold=True); w(cs, f'B{i}', name, wrap=True); w(cs, f'C{i}', unit)
    for col, v in zip('DEF', (c_, b_, a_)):
        w(cs, f'{col}{i}', v, font=BLUE, fmt=fmt)
    w(cs, f'G{i}', f'=CHOOSE($C$3,D{i},E{i},F{i})', fmt=fmt, fill=YELLOW if cid.startswith('T') or cid == 'R05' else None)
    w(cs, f'H{i}', src, font=NOTE, wrap=True)
    C[cid] = f'Costs!$G${i}'
chk = 6 + len(cin) + 1
w(cs, f'B{chk}', 'Check: routing shares sum to 100%', font=BOLD)
w(cs, f'G{chk}', f'={C["R01"]}+{C["R02"]}+{C["R03"]}+{C["R04"]}', fmt=PCT)

# -------------------------------------------------- RunCost
rc = wb.create_sheet('RunCost')
widths(rc, {'A': 34, 'B': 13, 'C': 13, 'D': 14, 'E': 14, 'F': 14, 'G': 14, 'H': 14})
w(rc, 'A1', 'COST PER AGENT RUN (blended across routed models)', font=H1)
header(rc, 3, ['Run type', 'Input tokens', 'Output tokens', 'Premium $', 'Workhorse $', 'Fast $', 'Open-weight $', 'Blended $/run'])
runs = [('Light edit', 'T01', 'T02'), ('Multi-file task', 'T03', 'T04'), ('Full pack update', 'T05', 'T06'), ('Verification / visual QA', 'T07', 'T08')]
def model_cost(inp, out, pin, pout, pcache, cached=True):
    if cached:
        return f'(({inp})*(1-{C["R05"]})*{pin}+({inp})*{C["R05"]}*{pcache}+({out})*{pout})/1000000'
    return f'(({inp})*{pin}+({out})*{pout})/1000000'
for i, (name, ti, to) in enumerate(runs, 4):
    w(rc, f'A{i}', name); w(rc, f'B{i}', f'={C[ti]}', font=GREEN, fmt=NUM); w(rc, f'C{i}', f'={C[to]}', font=GREEN, fmt=NUM)
    w(rc, f'D{i}', '=' + model_cost(f'B{i}', f'C{i}', C['P01'], C['P02'], C['P03']), fmt='$#,##0.000')
    w(rc, f'E{i}', '=' + model_cost(f'B{i}', f'C{i}', C['P04'], C['P05'], C['P06']), fmt='$#,##0.000')
    w(rc, f'F{i}', '=' + model_cost(f'B{i}', f'C{i}', C['P07'], C['P08'], C['P09']), fmt='$#,##0.000')
    w(rc, f'G{i}', '=' + model_cost(f'B{i}', f'C{i}', C['P10'], C['P11'], C['P10'], cached=False), fmt='$#,##0.000')
    w(rc, f'H{i}', f'=D{i}*{C["R01"]}+E{i}*{C["R02"]}+F{i}*{C["R03"]}+G{i}*{C["R04"]}', fmt='$#,##0.000', bold=True)
w(rc, 'A9', 'Reading: a full recurring-pack update costs on the order of a few dollars in inference; the value it replaces is hours of analyst time (D_Value).', font=NOTE)

# -------------------------------------------------- UserCost
uc = wb.create_sheet('UserCost')
widths(uc, {'A': 22, 'B': 11, 'C': 13, 'D': 13, 'E': 13, 'F': 14, 'G': 14, 'H': 14, 'I': 60})
w(uc, 'A1', 'COGS PER USER PER MONTH BY ACTIVITY PROFILE', font=H1)
header(uc, 3, ['Profile', 'Light edits', 'Multi-file tasks', 'Pack updates', 'Verify passes', 'Inference $/mo', 'Infra $/mo', 'Direct COGS $/mo', 'Description'])
profiles = [
    ('Light', 30, 5, 0, 2, 'Occasional user; reviewing more than running'),
    ('Typical', 60, 25, 4, 10, 'Analyst on a monthly pack + ad-hoc tasks'),
    ('Heavy', 150, 60, 12, 30, 'Owner of several packs; weekly updates'),
    ('Power / offshore producer', 300, 150, 40, 80, 'Full-time producer in a delivery team'),
]
for i, (name, le, mf, pu, vp, desc) in enumerate(profiles, 4):
    w(uc, f'A{i}', name, bold=True)
    for col, v in zip('BCDE', (le, mf, pu, vp)):
        w(uc, f'{col}{i}', v, font=BLUE, fmt=NUM)
    w(uc, f'F{i}', f'=B{i}*RunCost!$H$4+C{i}*RunCost!$H$5+D{i}*RunCost!$H$6+E{i}*RunCost!$H$7', fmt='$#,##0.00', font=GREEN)
    w(uc, f'G{i}', f'={C["I01"]}+{C["I02"]}+{C["I03"]}', fmt='$#,##0.00', font=GREEN)
    w(uc, f'H{i}', f'=F{i}+G{i}', fmt='$#,##0.00', bold=True)
    w(uc, f'I{i}', desc, font=NOTE)

# -------------------------------------------------- PriceGrid
pg = wb.create_sheet('PriceGrid')
prices = [15, 25, 40, 60, 100, 200]
widths(pg, {'A': 26, **{L(2 + i): 12 for i in range(len(prices))}, 'I': 70})
w(pg, 'A1', 'GROSS MARGIN BY PRICE POINT × ACTIVITY PROFILE (after support % and payment fees)', font=H1)
w(pg, 'A2', 'GM = (price − direct COGS − price × (support% + payment%)) ÷ price. Red flag < 60%; target ≥ 70%.', font=NOTE)
header(pg, 4, ['Profile \\ price $/seat/mo'] + [f'${p}' for p in prices])
for j, p in enumerate(prices):
    w(pg, f'{L(2+j)}3', p, font=BLUE, fmt=USD)
for i in range(4):
    r = 5 + i
    w(pg, f'A{r}', f'=UserCost!A{4+i}', font=GREEN)
    for j in range(len(prices)):
        col = L(2 + j)
        w(pg, f'{col}{r}', f'=({col}$3-UserCost!$H${4+i}-{col}$3*({C["I04"]}+{C["I05"]}))/{col}$3', fmt=PCT)
w(pg, 'A10', 'Contribution $/seat/mo (Typical profile)', font=BOLD)
for j in range(len(prices)):
    col = L(2 + j)
    w(pg, f'{col}10', f'={col}$3-UserCost!$H$5-{col}$3*({C["I04"]}+{C["I05"]})', fmt='$#,##0.00')
w(pg, 'A12', 'Conclusion: flat seats below ~$40 do not survive Heavy/Power users; price seats at $60–100 with pooled run credits, meter pack runs for power users, and offer BYO-model (customer pays inference) for enterprise.', font=NOTE, wrap=True)
pg.merge_cells('A12:H12'); pg.row_dimensions[12].height = 30

# -------------------------------------------------- Tiers
tr = wb.create_sheet('Tiers')
widths(tr, {'A': 16, 'B': 13, 'C': 15, 'D': 14, 'E': 70, 'F': 40})
w(tr, 'A1', 'PROPOSED PACKAGING (hypothesis — validate with 21_VALIDATION_PLAN H4/H5)', font=H1)
header(tr, 3, ['Tier', 'Price', 'Unit', 'Included pack runs/mo', 'Capabilities that justify it', 'Target buyer'])
tiers = [
    ('Free trial', 0, '14 days', 3, 'One workspace, one pack template, all review features; watermark on exports', 'Individual evaluator'),
    ('Pro', 60, '$/user/mo', 10, 'Workspace, cross-file edits, semantic review, restore points, provenance, BYO files; bring-your-own model key optional', 'Individual analyst / controller'),
    ('Team', 90, '$/user/mo (min 5)', 25, 'Shared pack templates & skills, reviewer roles, approval gates, period roll-forward, tie-out checks, audit log export', 'FP&A / reporting lead'),
    ('Business', 30000, '$/yr platform + seats', 200, 'Unlimited packs, SSO, SOC 2 report, data residency choice, admin policies, priority onboarding (forward-deployed engineer)', 'CFO / Head of FP&A / delivery head'),
    ('Enterprise / private', 120000, '$/yr+', 0, 'Private cloud or on-prem, BYO model (Azure OpenAI, Bedrock, open-weight), ethical walls per client, custom skills, SLAs', 'CFO / CIO / COO of delivery firm'),
    ('Overage', 3, '$/pack run', 0, 'Pack runs beyond pooled credits; covers inference for power users', ''),
]
for i, row in enumerate(tiers, 4):
    for j, v in enumerate(row):
        w(tr, f'{L(j+1)}{i}', v, font=BLUE if j in (1, 3) else BLACK, fmt=USD if j == 1 else None, wrap=(j == 4))
    tr.row_dimensions[i].height = 30

# -------------------------------------------------- Enterprise ACV scenarios
en = wb.create_sheet('Enterprise')
widths(en, {'A': 36, 'B': 14, 'C': 14, 'D': 14, 'E': 14, 'F': 14})
w(en, 'A1', 'ENTERPRISE ACV SCENARIOS — gross margin', font=H1)
acvs = [10000, 25000, 50000, 100000, 250000]
header(en, 3, ['Line'] + [f'ACV ${a:,}' for a in acvs])
seats = [8, 20, 40, 80, 200]
dep = [0, 0, 6000, 18000, 45000]
labels = ['ACV $/yr', 'Seats', 'Profile mix: share Heavy (rest Typical)', 'Inference + infra $/yr', 'Private deployment / dedicated infra $/yr', 'Support & CS $/yr', 'Gross profit $/yr', 'Gross margin %', 'Effective $/seat/mo']
for i, lab in enumerate(labels, 4):
    w(en, f'A{i}', lab, bold=(lab.startswith('Gross')))
for j, (acv, st, dp) in enumerate(zip(acvs, seats, dep)):
    col = L(2 + j)
    w(en, f'{col}4', acv, font=BLUE, fmt=USD)
    w(en, f'{col}5', st, font=BLUE, fmt=NUM)
    w(en, f'{col}6', 0.3, font=BLUE, fmt=PCT)
    w(en, f'{col}7', f'={col}5*12*({col}6*UserCost!$H$6+(1-{col}6)*UserCost!$H$5)', fmt=USD)
    w(en, f'{col}8', dp, font=BLUE, fmt=USD)
    w(en, f'{col}9', f'={col}4*{C["I04"]}', fmt=USD)
    w(en, f'{col}10', f'={col}4-{col}7-{col}8-{col}9', fmt=USD, bold=True)
    w(en, f'{col}11', f'=IF({col}4>0,{col}10/{col}4,0)', fmt=PCT, bold=True)
    w(en, f'{col}12', f'={col}4/{col}5/12', fmt=USD)
w(en, 'A14', 'BYO-model deployments remove most of row 7 from our COGS; margins then approach 85–90%.', font=NOTE)

wb.calculation.fullCalcOnLoad = True
wb.save(OUT); print('saved', OUT)

# -------------------------------------------------- PackPricing (value metric = recurring pack)
wb = __import__('openpyxl').load_workbook(OUT)
pk = wb.create_sheet('PackPricing', 7)
widths(pk, {'A': 60, 'B': 15, 'C': 15, 'D': 15, 'E': 72})
w(pk, 'A1', 'PRICE PER RECURRING PACK (value metric = the pack, not the seat)', font=H1)
w(pk, 'A2', 'A "pack" = one recurring multi-file deliverable (e.g., monthly board pack: model.xlsx + deck.pptx + memo.docx + source PDFs). Editors/reviewers of that pack are included.', font=NOTE, wrap=True)
header(pk, 4, ['Input / output', 'Conservative', 'Base', 'Aggressive', 'Note'])
prow = [
    ('Pack price $/pack/month', 150, 250, 400, USD, 'Hypothesis H5. Mid-market team with ~4 packs → ~$12k/yr + platform fee'),
    ('Full pack updates per month', 6, 4, 3, NUM, 'Period roll-forward + re-cuts after review'),
    ('Multi-file tasks per pack per month', 60, 40, 25, NUM, 'Ad-hoc edits, commentary, re-cuts'),
    ('Verification passes per pack per month', 30, 20, 12, NUM, ''),
    ('Light edits per pack per month', 150, 100, 60, NUM, ''),
    ('Share of pack-update & verification work done deterministically (zero-LLM) once the link graph exists', 0.30, 0.60, 0.80, PCT, 'Numbers propagate via the dependency graph + kernels; LLM only for narrative & new structure. Hypothesis H9'),
    ('Human hours per pack per month without product', 20, 30, 40, NUM, 'Hypothesis H2 — measure in interviews'),
    ('Time reduction on those hours', 0.20, 0.35, 0.50, PCT, 'Mechanical update portion is largest; Hypothesis H3'),
    ('Loaded $/hour of the preparer (US)', 73, 73, 90, '$#,##0', 'D_Value: US financial analyst loaded ≈ $73/hr'),
]
for i, (lab, c_, b_, a_, fmt, note) in enumerate(prow, 5):
    w(pk, f'A{i}', lab, wrap=True)
    for col, v in zip('BCD', (c_, b_, a_)):
        w(pk, f'{col}{i}', v, font=BLUE, fmt=fmt)
    w(pk, f'E{i}', note, font=NOTE, wrap=True)
    pk.row_dimensions[i].height = 28
for col in 'BCD':
    x = col
    w(pk, f'A15', 'Inference COGS per pack per month', bold=True)
    w(pk, f'{x}15', f'=({x}6*RunCost!$H$6+{x}8*RunCost!$H$7)*(1-{x}10)+{x}7*RunCost!$H$5+{x}9*RunCost!$H$4', fmt='$#,##0.00')
    w(pk, 'A16', 'Infra per pack per month (≈ 3 active users)', bold=True)
    w(pk, f'{x}16', f'=3*({C["I01"]}+{C["I02"]}+{C["I03"]})', fmt='$#,##0.00')
    w(pk, 'A17', 'Support + payment % × price', bold=True)
    w(pk, f'{x}17', f'={x}5*({C["I04"]}+{C["I05"]})', fmt='$#,##0.00')
    w(pk, 'A18', 'Gross margin % per pack', bold=True)
    w(pk, f'{x}18', f'=({x}5-{x}15-{x}16-{x}17)/{x}5', fmt=PCT, bold=True)
    w(pk, 'A19', 'Value created per pack per month ($)', bold=True)
    w(pk, f'{x}19', f'={x}11*{x}12*{x}13', fmt=USD)
    w(pk, 'A20', 'Price as % of value created (capture)', bold=True)
    w(pk, f'{x}20', f'=IF({x}19>0,{x}5/{x}19,0)', fmt=PCT, bold=True)
    w(pk, 'A21', 'Inference COGS if 0% deterministic (for comparison)', bold=True)
    w(pk, f'{x}21', f'={x}6*RunCost!$H$6+{x}8*RunCost!$H$7+{x}7*RunCost!$H$5+{x}9*RunCost!$H$4', fmt='$#,##0.00')
w(pk, 'A23', 'Inference cost cells use the ACTIVE cost scenario (Costs!C3); columns vary usage, price and value assumptions.', font=NOTE)
w(pk, 'A24', 'Reading: pack pricing at ~$250/month keeps capture near a third of created value and gross margin ≥70% only if a large share of recurring updates runs deterministically. The deterministic kernel is therefore a margin asset, not just a quality asset.', font=NOTE, wrap=True)
pk.row_dimensions[24].height = 30
wb.calculation.fullCalcOnLoad = True
wb.save(OUT); print('added PackPricing')
