"""Over-the-shoulder plate where hair/hands cover parts of the screen.
1) track the (never-occluded) top edge TL/TR per frame; derive BL/BR from a reference quad by a similarity transform
2) build an occluder matte (hair, fingers) inside the screen and write it as a transparent VP9 webm to lay over the UI.
Usage: <venv python> track_occluded.py plate.mp4 out.json out_occluder.webm"""
import cv2, json, sys, subprocess, os, numpy as np
src, out_json, out_webm = sys.argv[1:4]
REF = np.array([[744, 118], [1838, 146], [1792, 896], [692, 800]], float)   # TL TR BR BL measured at t=4 s
cap = cv2.VideoCapture(src); fps = cap.get(5); n = int(cap.get(7)); W, H = int(cap.get(3)), int(cap.get(4))
tmp = '/tmp/occ_frames'; os.makedirs(tmp, exist_ok=True)
quads = []; prev = (REF[1].copy(), np.arctan2(REF[1][1]-REF[0][1], REF[1][0]-REF[0][0]))
for i in range(n):
    ok, f = cap.read()
    if not ok: break
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    white = ((hsv[..., 2] > 195) & (hsv[..., 1] < 45)).astype(np.uint8)
    # top edge: first white row per column over the never-occluded middle-right span → robust line fit
    xs = np.arange(1000, 1760, 8); ys = []
    for xx in xs:
        col = np.nonzero(white[40:420, xx])[0]; ys.append(col[0] + 40 if len(col) else np.nan)
    ys = np.array(ys, float); ok_ = ~np.isnan(ys)
    # right edge: last white column per row over the middle span
    ry = np.arange(260, 640, 8); rx = []
    for yy in ry:
        row = np.nonzero(white[yy, 1500:1920])[0]; rx.append(row[-1] + 1500 if len(row) else np.nan)
    rx = np.array(rx, float); okr = ~np.isnan(rx)
    if ok_.sum() > 20 and okr.sum() > 15:
        def robust(x, y):
            m, c = np.polyfit(x, y, 1)
            for _ in range(3):
                r = np.abs(y - (m * x + c)); keep = r < max(3, np.percentile(r, 70)); m, c = np.polyfit(x[keep], y[keep], 1)
            return m, c
        mt, ct = robust(xs[ok_], ys[ok_])          # y = mt*x + ct
        mr, cr = robust(ry[okr], rx[okr])          # x = mr*y + cr
        yy = (mt * cr + ct) / (1 - mt * mr); xx = mr * yy + cr
        prev = (np.array([xx, yy]), np.arctan(mt))
    tr, ang = prev
    a_ref = np.arctan2(REF[1][1] - REF[0][1], REF[1][0] - REF[0][0])
    Rm = np.array([[np.cos(ang - a_ref), -np.sin(ang - a_ref)], [np.sin(ang - a_ref), np.cos(ang - a_ref)]])
    q = [Rm @ (p - REF[1]) + tr for p in REF]; cq = np.mean(q, 0); q = [cq + (p - cq) * 1.02 for p in q]; quads.append(q)
    # occluder matte: inside the screen quad, anything that is not screen-white and is a big blob touching the quad border
    poly = np.zeros((H, W), np.uint8); cv2.fillPoly(poly, [np.array(q, np.int32)], 1)
    occ = ((white == 0) & (poly == 1)).astype(np.uint8)
    occ = cv2.morphologyEx(occ, cv2.MORPH_OPEN, np.ones((13, 13), np.uint8))
    num, lab, stats, _ = cv2.connectedComponentsWithStats(occ)
    border = cv2.dilate(poly, np.ones((5, 5), np.uint8)) - cv2.erode(poly, np.ones((25, 25), np.uint8))
    keep = np.zeros_like(occ)
    for k in range(1, num):
        if stats[k, cv2.CC_STAT_AREA] > 6000 and (border[lab == k] > 0).any(): keep[lab == k] = 1
    keep = cv2.dilate(keep, np.ones((5, 5), np.uint8))
    alpha = cv2.GaussianBlur((keep * 255).astype(np.uint8), (9, 9), 0)
    alpha[poly == 0] = 0                                   # outside the screen the base plate shows anyway
    cv2.imwrite(f'{tmp}/f_{i:04d}.png', np.dstack([f, alpha]))
arr = np.array(quads)
k = 6; pad = np.pad(arr, ((k, k), (0, 0), (0, 0)), mode='edge')
sm = np.stack([pad[i:i + 2 * k + 1].mean(0) for i in range(len(arr))])
frames = [sm[min(len(sm) - 1, int(round(t / 30 * fps)))].round(1).tolist() for t in range(int(len(sm) / fps * 30))]
json.dump({'fps': 30, 'w': W, 'h': H, 'frames': frames}, open(out_json, 'w'))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(fps), '-i', f'{tmp}/f_%04d.png', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '4M', '-auto-alt-ref', '0', out_webm], check=True)
print('frames', len(frames), 'quad0', [list(map(round, p)) for p in frames[0]])
