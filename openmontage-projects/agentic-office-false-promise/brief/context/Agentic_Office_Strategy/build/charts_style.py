import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
for p in ['/System/Library/Fonts/HelveticaNeue.ttc','/System/Library/Fonts/Menlo.ttc']:
    try: fm.fontManager.addfont(p)
    except Exception as e: print('font',e)
BG='#F8F7F3'; INK='#1B1B1A'; MUTED='#8A877F'; RULE='#D9D6CE'; COBALT='#3157F6'; LIGHT='#E7E5DE'
plt.rcParams.update({'font.family':['Helvetica Neue','DejaVu Sans'],'font.size':11,'axes.edgecolor':RULE,'axes.labelcolor':INK,'xtick.color':MUTED,'ytick.color':MUTED,'figure.facecolor':BG,'axes.facecolor':BG,'savefig.facecolor':BG,'axes.spines.top':False,'axes.spines.right':False})
