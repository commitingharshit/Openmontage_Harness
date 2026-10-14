import formulas, re
def evaluate(path):
    xl=formulas.ExcelModel().loads(path).finish(); sol=xl.calculate()
    out={}
    for k,v in sol.items():
        m=re.match(r"'\[(.+?)\](.+?)'!(.+)",k)
        if not m: continue
        sheet,ref=m.group(2),m.group(3)
        try: val=v.value[0][0]
        except Exception: val=v
        try: val=float(val)
        except Exception: val=str(val)
        out[(sheet.upper(),ref.upper())]=val
    return out
def errors(vals):
    return {k:v for k,v in vals.items() if isinstance(v,str) and v.startswith('#')}
