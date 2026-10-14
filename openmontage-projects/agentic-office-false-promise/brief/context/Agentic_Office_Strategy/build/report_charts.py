import sys, json; sys.path.insert(0,'.')
from charts_style import *
O='report/'
def save(f): plt.tight_layout(); plt.savefig(O+f,dpi=200); plt.close()
# c1 market
fig,ax=plt.subplots(figsize=(8,4))
labels=['TAM · A top-down','TAM · B bottom-up','TAM · C enterprise','SAM · B','SAM · C','SOM (Y5 ARR, base)']
vals=[10.8,4.89,10.8,0.79,2.88,0.0096]
cols=[MUTED,COBALT,MUTED,COBALT,MUTED,COBALT]
b=ax.bar(labels,vals,color=cols,width=0.6)
for r,v in zip(b,vals): ax.text(r.get_x()+r.get_width()/2,v+0.2,(f'${v:.2f}B' if v>=0.1 else f'${v*1000:.1f}M'),ha='center',fontsize=9,color=INK)
ax.set_ylabel('$B per year'); ax.set_ylim(0,12.5); plt.xticks(fontsize=8.5,rotation=12)
ax.set_title('Market sizing by method (base scenario). Blue = figures quoted; grey = bounds',fontsize=10,color=MUTED,loc='left'); save('c1_market.png')
# c2 ARR
yrs=['2027','2028','2029','2030','2031']
fig,ax=plt.subplots(figsize=(8,4))
for name,v,c in [('Conservative',[0.04,0.24,0.63,1.20,2.47],MUTED),('Base',[0.17,0.78,2.21,4.82,9.58],COBALT),('Aggressive',[0.42,2.14,6.98,17.96,33.39],INK)]:
    ax.plot(yrs,v,marker='o',color=c,lw=2,label=name); ax.text(4.08,v[-1],f'${v[-1]:.1f}M',va='center',fontsize=9,color=c)
ax.set_ylabel('Exit ARR, $M'); ax.legend(frameon=False); ax.set_title('Exit ARR by year, three scenarios (15_FINANCIAL_MODEL)',fontsize=10,color=MUTED,loc='left'); save('c2_arr.png')
# c3 wedge
lab=['Recurring Office packs (W6)','Offshore production teams (W4)','Document-estate changes (W5)','IB/PE front office (W1)','Consulting teams (W2)','Developer infrastructure (W7)','India litigation (W3)','Individual prosumers (W8)']
val=[3.86,3.48,3.40,3.14,3.12,2.98,2.80,2.30]
fig,ax=plt.subplots(figsize=(8,3.8)); b=ax.barh(lab[::-1],val[::-1],color=[LIGHT if i<7 else COBALT for i in range(8)],edgecolor=[MUTED]*7+[COBALT])
for r,v in zip(b,val[::-1]): ax.text(v+0.03,r.get_y()+r.get_height()/2,f'{v:.2f}',va='center',fontsize=9)
ax.set_xlim(0,5); ax.set_title('Wedge scoring: 10 weighted criteria, 1–5 (09_MARKET_MODEL › Segments)',fontsize=10,color=MUTED,loc='left'); save('c3_wedge.png')
# c4 margin
fig,ax=plt.subplots(figsize=(8,3.8))
lab=['$60 seat\nlight user','$60 seat\ntypical user','$60 seat\nheavy user','$60 seat\npower user','$250 pack\nbase usage']
val=[0.76,0.42,-0.27,-2.2,0.74]
b=ax.bar(lab,[max(v,-0.6) for v in val],color=[MUTED,MUTED,'#B3261E','#B3261E',COBALT],width=0.6)
for r,v in zip(b,val): ax.text(r.get_x()+r.get_width()/2,(max(v,-0.6)+0.04 if v>0 else max(v,-0.6)-0.1),f'{v:.0%}',ha='center',fontsize=9)
ax.axhline(0,color=RULE); ax.set_ylim(-0.75,1); ax.set_yticks([]); ax.set_title('Gross margin by pricing unit (base cost scenario; power-user bar truncated)',fontsize=10,color=MUTED,loc='left'); save('c4_margin.png')
# c5 ownership
fig,ax=plt.subplots(figsize=(8,3.6)); lab=['Founding','Pre-seed + pool','Seed','Series A','Series B']; val=[0.90,0.6975,0.522,0.3974,0.3259]
b=ax.bar(lab,val,color=COBALT,width=0.55)
for r,v in zip(b,val): ax.text(r.get_x()+r.get_width()/2,v+0.02,f'{v:.0%}',ha='center',fontsize=9)
ax.set_ylim(0,1); ax.set_yticks([]); ax.set_title('Founders combined ownership, base path (17_CAP_TABLE_MODEL; placeholder founding split)',fontsize=10,color=MUTED,loc='left'); save('c5_owner.png')
# c6 spend
fig,ax=plt.subplots(figsize=(8,3.6)); lab=['Engineering & product','Go-to-market team','Security & legal','Travel, marketing, tools','Customer COGS','R&D compute & evals','G&A']; val=[363,246,81,75,60,36,36]
b=ax.barh(lab[::-1],val[::-1],color=COBALT)
for r,v in zip(b,val[::-1]): ax.text(v+4,r.get_y()+r.get_height()/2,f'${v}k',va='center',fontsize=9)
ax.set_xlim(0,420); ax.set_xticks([]); ax.set_title('18-month gross spend ≈ $0.90M, base case (≈$0.26M funded by revenue)',fontsize=10,color=MUTED,loc='left'); save('c6_spend.png')
print('charts ok')
