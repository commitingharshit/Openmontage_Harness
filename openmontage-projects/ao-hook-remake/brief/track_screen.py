"""Track the 4 corners of a blank (bright, low-saturation) laptop screen in every frame of a plate.
Usage: <venv python> track_screen.py plate.mp4 out.json [--fps 30]
Output: {"fps": 30, "w": 1920, "h": 1080, "frames": [[[x,y]*4 tl,tr,br,bl], ...]}  (sampled at --fps from the plate's clock)
"""
import cv2, json, sys, numpy as np

def order(pts):
    pts = pts.reshape(4, 2).astype(float); c = pts.mean(0)
    ang = np.arctan2(pts[:, 1] - c[1], pts[:, 0] - c[0]); p = pts[np.argsort(ang)]   # clockwise in image coords, starting at -pi (left)
    i = int(np.argmin(p.sum(1))); p = np.roll(p, -i, axis=0)                          # start at top-left
    return [p[0], p[1], p[2], p[3]]                                                      # tl, tr, br, bl

def quad(frame, prev):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = ((hsv[..., 2] > VTH) & (hsv[..., 1] < 70)).astype(np.uint8) * 255
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    cs, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not cs: return prev
    c = max(cs, key=cv2.contourArea)
    if cv2.contourArea(c) < 0.02 * frame.shape[0] * frame.shape[1]: return prev
    hull = cv2.convexHull(c)
    for eps in (0.01, 0.02, 0.03, 0.05, 0.08):
        ap = cv2.approxPolyDP(hull, eps * cv2.arcLength(hull, True), True)
        if len(ap) == 4: return order(ap)
    x, y, w, h = cv2.boundingRect(c)   # fallback: hands may break the hull -> min-area rectangle
    return order(cv2.boxPoints(cv2.minAreaRect(c)))

VTH = float(sys.argv[sys.argv.index("--v") + 1]) if "--v" in sys.argv else 170.0
src, out = sys.argv[1], sys.argv[2]; fps = float(sys.argv[sys.argv.index('--fps') + 1]) if '--fps' in sys.argv else 30.0
cap = cv2.VideoCapture(src); vf = cap.get(cv2.CAP_PROP_FPS); n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
W, H = int(cap.get(3)), int(cap.get(4)); raw = []; prev = None
for i in range(n):
    ok, f = cap.read()
    if not ok: break
    prev = quad(f, prev); raw.append(prev)
raw = [r if r is not None else raw[-1] for r in raw]
arr = np.array(raw, dtype=float)                       # (n,4,2)
k = 5; pad = np.pad(arr, ((k, k), (0, 0), (0, 0)), mode='edge')   # temporal smoothing kills edge jitter
sm = np.stack([pad[i:i + 2 * k + 1].mean(0) for i in range(len(arr))])
frames = [sm[min(len(sm) - 1, int(round(t / fps * vf)))].round(1).tolist() for t in range(int(len(sm) / vf * fps))]
json.dump({"fps": fps, "w": W, "h": H, "frames": frames}, open(out, 'w'))
print(out, len(frames), 'frames; first quad', frames[0], 'last', frames[-1])
