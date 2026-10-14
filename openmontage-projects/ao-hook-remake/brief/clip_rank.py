"""Gather free footage candidates (Mixkit CDN previews + CC-BY YouTube) and rank them per shot with CLIP.
Run with OpenMontage/.venv/bin/python. Output: corpus/ranking.json + corpus/sheets/<shot>.jpg (top 6 per shot).
"""
import json, os, re, subprocess, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor
P = os.path.expanduser('~/Desktop/OpenMontage/projects/ao-hook-remake/corpus')
YT = os.path.expanduser('~/Desktop/OpenMontage/.venv/bin/yt-dlp')
os.makedirs(f'{P}/raw', exist_ok=True); os.makedirs(f'{P}/frames', exist_ok=True); os.makedirs(f'{P}/sheets', exist_ok=True)

SHOTS = {
    'phone_desk': 'a smartphone lighting up with a notification on a dark desk at night, cinematic close-up',
    'empty_office': 'an empty office at night with city lights through the window, one person working, cinematic',
    'hands_typing': 'close-up of hands typing on a laptop keyboard in a dark room, screen glow',
    'face_screen': 'a tired professional woman staring at a laptop screen late at night, face lit by the screen',
    'rub_eyes': 'an exhausted person rubbing their eyes at a desk at night',
    'clock': 'close-up of a wall clock ticking, hands moving',
    'coffee': 'a cup of coffee next to a laptop on a desk at night',
    'trackpad': 'close-up of a finger on a laptop trackpad about to click',
    'stress': 'a stressed business person holding their head in front of a computer',
    'city_night': 'city skyline at night from a high office window',
}
MIXKIT_Q = ['office-night', 'night', 'tired', 'phone', 'smartphone', 'typing', 'keyboard', 'clock', 'stress', 'laptop', 'coffee',
            'business-woman', 'working-late', 'computer', 'office', 'city-night', 'exhausted', 'notification', 'desk']
YT_IDS = ['-JHOJ9aNVkw', 'Ttp_7kE9Wc8', '93ExS-bS3-U', 'Unb3rUXjtV8', 'FTNONQFI014', 'y8r-wbV-4kU', 'POdVJfYym7E', 'eslE1eYvmM8', '_-SQ3B0oEQE'] + sys.argv[1:]

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read()

ids = set()
for q in MIXKIT_Q:
    try: ids |= set(re.findall(r'assets\.mixkit\.co/videos/(\d+)/\1-360\.mp4', get(f'https://mixkit.co/free-stock-video/{q}/').decode('utf8', 'ignore')))
    except Exception as e: print('mixkit page fail', q, e)
print('mixkit ids', len(ids))

def fetch_mixkit(i):
    out = f'{P}/raw/mixkit_{i}.mp4'
    if not os.path.exists(out):
        try: open(out, 'wb').write(get(f'https://assets.mixkit.co/videos/{i}/{i}-360.mp4'))
        except Exception: return None
    return out
def fetch_yt(i):
    out = f'{P}/raw/yt_{i}.mp4'
    if not os.path.exists(out):
        lic = subprocess.run([YT, '--skip-download', '--print', '%(license)s', '--', i], capture_output=True, text=True).stdout
        if 'Creative Commons' not in lic: print('skip non-CC', i); return None
        subprocess.run([YT, '-q', '-f', 'bv*[height<=1080][ext=mp4]/b[ext=mp4]', '--download-sections', '*0-40', '-o', out, '--', i], capture_output=True)
    return out if os.path.exists(out) else None
with ThreadPoolExecutor(8) as ex:
    files = [f for f in ex.map(fetch_mixkit, sorted(ids)) if f] + [f for f in ex.map(fetch_yt, YT_IDS) if f]
print('files', len(files))

def frames(f):
    name = os.path.splitext(os.path.basename(f))[0]; outs = []
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout or 0)
    for j, fr in enumerate((0.2, 0.5, 0.8)):
        o = f'{P}/frames/{name}_{j}.jpg'
        if not os.path.exists(o): subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(dur * fr), '-i', f, '-frames:v', '1', '-vf', 'scale=384:-2', o])
        if os.path.exists(o): outs.append(o)
    return name, outs
with ThreadPoolExecutor(8) as ex: fr = dict(ex.map(frames, files))

import torch, open_clip
from PIL import Image
model, _, pre = open_clip.create_model_and_transforms('ViT-B-32', pretrained='laion2b_s34b_b79k'); tok = open_clip.get_tokenizer('ViT-B-32'); model.eval()
names = [n for n in fr if fr[n]]
with torch.no_grad():
    img = []
    for n in names:
        e = model.encode_image(torch.stack([pre(Image.open(p).convert('RGB')) for p in fr[n]])); e = e / e.norm(dim=-1, keepdim=True); img.append(e.mean(0))
    I = torch.stack(img); I = I / I.norm(dim=-1, keepdim=True)
    T = model.encode_text(tok(list(SHOTS.values()))); T = T / T.norm(dim=-1, keepdim=True)
    S = (T @ I.T).numpy()
rank = {}
for si, shot in enumerate(SHOTS):
    order = S[si].argsort()[::-1][:6]; rank[shot] = [(names[j], round(float(S[si][j]), 3)) for j in order]
    tiles = [fr[names[j]][1] for j in order]
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *sum([['-i', t] for t in tiles], []), '-filter_complex',
        ''.join(f'[{k}]scale=384:216:force_original_aspect_ratio=increase,crop=384:216,drawtext=text={k + 1}:x=8:y=8:fontsize=28:fontcolor=yellow[t{k}];' for k in range(len(tiles)))
        + ''.join(f'[t{k}]' for k in range(len(tiles))) + f'xstack=inputs={len(tiles)}:layout=0_0|384_0|768_0|0_216|384_216|768_216', f'{P}/sheets/{shot}.jpg'])
json.dump(rank, open(f'{P}/ranking.json', 'w'), indent=1)
print(json.dumps(rank, indent=0)[:3000])
