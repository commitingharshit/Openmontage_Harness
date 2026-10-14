import sys; sys.path.insert(0,'.')
from charts_style import *
OUT='../research/competitors/maps/'
maps={
 'map_A_agentic_vs_architecture':('Traditional Office  →  Agentic','AI overlay  →  AI-native architecture',{
  'M365 Copilot':(7.3,3.1),'Claude for Office':(7.6,3.9),'ChatGPT for Office':(5.5,2.3),'Gemini Workspace':(6.6,4.2),'think-cell / UpSlide':(1.2,1.2),
  'Workiva':(4,5),'Datarails':(4.9,4.1),'Rollstack':(3.8,5.8),'Gamma':(5.8,8.2),'Genspark':(8.0,9.2),'Rogo':(7.6,7.4),'Hebbia':(6.6,8.0),
  'Model ML':(7.9,6.8),'Harvey':(7.0,6.9),'TamLabs':(6.1,4.9),'Endex':(7.8,5.4)},(6.0,7.0),(8.7,8.0)),
 'map_B_structure_vs_autonomy':('Visual editor  →  Structured / programmable document system','Human editing tool  →  Autonomous agent environment',{
  'Word / PowerPoint (no AI)':(1,1),'M365 Copilot':(3,5.6),'Claude for Office':(4,6.1),'Workiva':(7.2,3),'Datarails':(6.5,4.1),'Rollstack':(7.2,4.6),
  'OfficeCLI (OSS)':(9.2,5.1),'Gamma':(2.4,6.2),'Genspark':(4,8.2),'Rogo':(5,7.1),'Hebbia':(6.1,6.5),'Endex':(5.5,7.6),'think-cell':(5.2,1.5),'TamLabs':(5,4.9)},(6.5,6.0),(8.2,7.6)),
 'map_C_scope_vs_vertical':('Single-document assistant  →  Multi-file workflow environment','General productivity  →  Vertical professional workflow',{
  'M365 Copilot':(3.5,2),'Claude for Office':(6,2.6),'ChatGPT for Office':(3,1.5),'Gemini Workspace':(5,2.1),'Notion AI':(4.4,0.9),'Glean':(7.2,2),
  'Workiva':(8.2,7),'Datarails':(7,8.1),'Cube':(6.4,7.8),'Rollstack':(6,5),'Rogo':(6,8.7),'Hebbia':(8,7.5),'Model ML':(7.1,8.6),'Harvey':(5.6,9.2),
  'TamLabs':(1.5,3),'Juniper Square':(6.9,5.6),'Shortcut':(2.4,6.6),'Endex':(4,8),'DataSnipper':(4.2,7),'Gamma':(2.2,3.7)},(6.8,4.0),(8.7,6.4)),
}
for name,(xl,yl,pts,today,target) in maps.items():
    fig,ax=plt.subplots(figsize=(10,6.6),dpi=200)
    ax.set_xlim(0,10); ax.set_ylim(0,10); ax.set_xticks([]); ax.set_yticks([])
    ax.axhline(5,color=RULE,lw=0.8); ax.axvline(5,color=RULE,lw=0.8)
    for k,(x,y) in pts.items():
        ax.scatter(x,y,s=36,color=INK,zorder=3)
        ax.annotate(k,(x,y),xytext=(6,4),textcoords='offset points',fontsize=9.5,color=INK)
    ax.scatter(*today,s=90,facecolors='none',edgecolors=COBALT,lw=1.6,zorder=4)
    ax.annotate('Agentic Office today\n(prototype)',today,xytext=(-10,-30),textcoords='offset points',fontsize=9,color=COBALT,ha='center')
    ax.scatter(*target,s=120,color=COBALT,zorder=5)
    ax.annotate('Agentic Office\n(wedge target)',target,xytext=(8,-4),textcoords='offset points',fontsize=10,color=COBALT,fontweight='bold')
    ax.annotate('',xy=target,xytext=today,arrowprops=dict(arrowstyle='->',color=COBALT,lw=1.2,ls='--'))
    ax.set_xlabel(xl,fontsize=11); ax.set_ylabel(yl,fontsize=11)
    fig.text(0.01,0.01,'Positions are analyst judgements from public product pages (Sep 2026); see 04_COMPETITIVE_LANDSCAPE.md for the logic.',fontsize=7.5,color=MUTED)
    plt.tight_layout(); plt.savefig(OUT+name+'.png'); plt.close()
print('ok')
