"""Generate voiceover stems with local Kokoro TTS (free, offline).

Usage:  python3 audio/tts.py audio/lines.json audio/vo/new
Setup:  pip install kokoro-onnx soundfile
        Download kokoro-v1.0.onnx and voices-v1.0.bin from
        https://github.com/thewh1teagle/kokoro-onnx/releases and set KOKORO_DIR (default ~/.cache/hyperframes/tts).
lines.json: [{"id": "o1", "text": "...", "voice": "af_heart", "speed": 1.06}, ...]
Voices used: af_heart (narrator, en-us), bm_george (client email voice, en-gb).
"""
import json, os, sys
import soundfile as sf
from kokoro_onnx import Kokoro

d = os.path.expanduser(os.environ.get("KOKORO_DIR", "~/.cache/hyperframes/tts"))
k = Kokoro(f"{d}/models/kokoro-v1.0.onnx", f"{d}/voices/voices-v1.0.bin")
lines, out = json.load(open(sys.argv[1])), sys.argv[2]
os.makedirs(out, exist_ok=True)
for l in lines:
    v = l.get("voice", "af_heart")
    a, sr = k.create(l["text"], voice=v, speed=l.get("speed", 1.06), lang="en-gb" if v.startswith("b") else "en-us")
    sf.write(f"{out}/{l['id']}.wav", a, sr)
    print(l["id"], round(len(a) / sr, 2))
