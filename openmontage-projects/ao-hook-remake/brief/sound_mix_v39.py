"""V28c hook sound design: VO + music arc + room tone + spot SFX, mastered to -16 LUFS.
Usage: python3 sound_mix_v28c.py  -> artifacts/film_audio_v39.wav (35.4 s)
Arc: light jazz while AI "helps" (0-11.4) -> suspense bed once the email lands -> heartbeat + clock as the
regenerate drags -> riser into overload -> hard silence at 32.6 for the question.
"""
import os, subprocess
CUTS = [1.2, 4.5, 5.07, 8.0, 9.8, 12.47, 13.93, 15.6, 16.5, 22.97, 24.07, 24.87, 27.53, 30.0, 31.07, 31.83, 34.5, 35.0, 36.77, 37.4, 38.8, 39.7, 40.3, 41.6, 44.57, 45.63]
H = os.path.expanduser('~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12')
P = os.path.expanduser('~/Desktop/OpenMontage/projects/ao-hook-remake')
S = f'{P}/assets/sfx'
END, CUT = 121.4, 43.6

# (file, at, vol, src_start, dur, fade_in, fade_out)
cues = []
def c(f, at, vol, ss=0.0, dur=None, fi=0.0, fo=0.0): cues.append((f, at, vol, ss, dur, fi, fo))

# --- voice ---
for i, t, d in [('k1', 0.4, 'v29'), ('z1s', 6.0, 'v39'), ('k3c', 11.0, 'v35'), ('o3s', 12.5, 'v39'), ('o4s', 15.35, 'v39'), ('z5f', 18.15, 'v31'),
                ('n1s', 24.0, 'v39'), ('n2d', 28.0, 'v35'), ('n3s', 30.2, 'v39'), ('k4s', 34.6, 'v39'), ('o6', 37.6, 'v22'), ('k5', 40.95, 'v29'), ('k6', 46.3, 'v29')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
# --- beds ---
c(f'{S}/bass_pulse.mp3', 0.0, 0.20, 0, 4.5, 0.2, 0.3)                          # cold open: dread
c(f'{S}/heart_fast.mp3', 0.0, 0.25, 0, 4.5, 0.2, 0.3)
c(f'{S}/rewind.mp3', 4.45, 0.9, 0, 0.9, 0, 0.3)
c(f'{S}/music_hazy_after_hours_132.mp3', 5.05, 0.17, 8, 12.4, 0.4, 1.0)        # the helpful-AI mood, dies when the email lands
c(f'{S}/office.mp3', 5.05, 0.10, 2, CUT - 5.05, 1.0, 0.05)                     # room tone…
c(f'{S}/office.mp3', CUT, 0.07, 20, 49.6 - CUT, 0, 0.3)                   # …and only room tone after the cursor stops
c(f'{S}/suspense.mp3', 17.3, 0.22, 4, 41.6 - 17.3, 1.5, 0.3)
c(f'{S}/bass_pulse.mp3', 28.3, 0.18, 0, CUT - 28.3, 0.8, 0.02)
c(f'{S}/heart_slow.mp3', 30.8, 0.30, 0, 4.2, 0.5, 0.3)
c(f'{S}/swell.mp3', 31.2, 0.30, 0, 3.6, 0.2, 0.4)
c(f'{S}/heart_fast.mp3', 37.4, 0.30, 0, 4.2, 0.2, 0.3)
c(f'{S}/riser.mp3', 38.6, 0.55, 28.0, 3.0, 0.4, 0.05)
c(f'{S}/heart_slow.mp3', 41.6, 0.40, 10, CUT - 41.6, 0.1, 0.02)               # back at Send: just a heartbeat, then nothing
# --- the Done motif: same chime, louder each time, the third one echoes ---
c(f'{S}/done_chime.mp3', 11.05, 0.35)
c(f'{S}/done_chime.mp3', 27.5, 0.5)
for d, v in ((0, 0.65), (0.18, 0.35), (0.36, 0.2), (0.54, 0.1)): c(f'{S}/done_chime.mp3', 34.45 + d, v)
# --- spot effects ---
c(f'{S}/buzz.mp3', 0.05, 0.6, 0, 0.9, 0, 0.3)                                  # phone
c(f'{S}/key.mp3', 2.0, 0.3); c(f'{S}/key.mp3', 2.6, 0.3); c(f'{S}/impact.mp3', 3.1, 0.3, 0, 1.0, 0, 0.5)   # the two numbers, the ≠
c(f'{S}/typing_soft.mp3', 8.6, 0.55, 1.0, 1.3, 0.05, 0.1)
c(f'{S}/pop.mp3', 9.95, 0.35)
c(f'{S}/whoosh.mp3', 12.35, 0.45)
c(f'{S}/glitch.mp3', 14.47, 0.85); c(f'{S}/static.mp3', 14.5, 0.35, 0, 0.5, 0, 0.2)
for t in (14.75, 14.95, 15.15): c(f'{S}/key.mp3', t, 0.3)
c(f'{S}/typing_hard.mp3', 15.6, 0.5, 2.0, 1.3, 0.05, 0.2)
c(f'{S}/buzz.mp3', 17.1, 0.55, 0, 1.2, 0, 0.3); c(f'{S}/bell.mp3', 17.15, 0.25, 0, 1.2, 0, 0.4)
c(f'{S}/whoosh2.mp3', 23.7, 0.3)
c(f'{S}/typing_soft.mp3', 24.1, 0.5, 6.0, 1.1, 0.05, 0.1)
c(f'{S}/pop.mp3', 25.25, 0.3)
for i in range(6): c(f'{S}/key.mp3', 25.55 + i * 0.33, 0.22)
c(f'{S}/buzz.mp3', 28.3, 0.6, 0, 1.0, 0, 0.3); c(f'{S}/bell.mp3', 28.35, 0.22, 0, 1.0, 0, 0.4)
c(f'{S}/whoosh2.mp3', 29.1, 0.3)
c(f'{S}/typing_hard.mp3', 30.1, 0.6, 5.0, 0.85, 0.02, 0.1)
c(f'{S}/pop.mp3', 30.95, 0.3)
c(f'{S}/clock_fast.mp3', 31.6, 0.5, 0, 2.5, 0.1, 0.1)
c(f'{S}/whoosh2.mp3', 36.05, 0.35); c(f'{S}/static.mp3', 36.2, 0.3, 0, 0.4, 0, 0.2)   # slide 4 reverted
c(f'{S}/whoosh.mp3', 37.35, 0.5)
for i, t in enumerate((37.95, 38.35, 38.75, 39.15)): c(f'{S}/{"whoosh2" if i % 2 else "whoosh"}.mp3', t, 0.45)
c(f'{S}/impact.mp3', 39.7, 0.55, 0, 1.6, 0, 0.6)
for i in range(4): c(f'{S}/buzz.mp3', 40.4 + i * 0.2, 0.35, 0, 0.5, 0, 0.1)
c(f'{S}/clock_fast.mp3', 40.3, 0.55, 0, 1.3, 0, 0.05)
c(f'{S}/buzz.mp3', 41.7, 0.5, 0, 0.8, 0, 0.3); c(f'{S}/bell.mp3', 41.75, 0.2, 0, 0.8, 0, 0.4)
c(f'{S}/identity.mp3', 46.2, 0.35)                                              # the new, quiet confirmation

# ================= V30 second half (49.6–85.1): calm, precise, one sound per visible edit =================
for i, t, d in [('a1c', 49.9, 'v32'), ('a2', 55.1, 'v30'), ('a3b', 57.0, 'v31'), ('a4b', 60.45, 'v31'), ('a5', 64.6, 'v30'), ('a6', 69.6, 'v30'), ('a7b', 75.2, 'v31'), ('a8c', 82.6, 'v32')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
M = f'{S}/music_digital_clouds_175.mp3'
c(M, 49.6, 0.20, 0.0, 23.0, 1.2, 0.6)                 # confident bed under the product
c(M, 72.6, 0.07, 23.0, 2.4, 0.2, 0.2)                 # dips: her hand on the mouse
c(M, 75.0, 0.24, 25.4, END - 75.0, 0.3, 2.5)          # Sent → dawn → end card
c(f'{S}/whoosh2.mp3', 49.8, 0.3)                       # logo
for t in (51.8, 52.05, 52.3): c(f'{S}/key.mp3', t, 0.28)  # the three apps land
c(f'{S}/typing_soft.mp3', 55.0, 0.32, 3.0, 2.8, 0.1, 0.2)  # the one request
c(f'{S}/pop.mp3', 58.0, 0.28)
c(f'{S}/key.mp3', 60.9, 0.3)                           # 8.9 → 8.5
c(f'{S}/whoosh2.mp3', 62.15, 0.22)
c(f'{S}/key.mp3', 62.5, 0.28)                          # tracked change
c(f'{S}/whoosh2.mp3', 64.35, 0.22)
c(f'{S}/pop_long.mp3', 65.85, 0.35)                    # Accept
c(f'{S}/whoosh2.mp3', 66.55, 0.25)
c(f'{S}/key.mp3', 66.95, 0.3)                          # 10 of 10 reviewed
c(f'{S}/whoosh2.mp3', 69.45, 0.32)                     # slide 4 ringed
c(f'{S}/heart_slow.mp3', 72.6, 0.22, 20, 1.9, 0.3, 0.4)
c(f'{S}/click.mp3', 74.55, 0.7, 0, 0.5)                # she presses Send
c(f'{S}/identity.mp3', 75.0, 0.45)                     # the new, quiet "done"
c(f'{S}/static.mp3', 80.3, 0.15, 0, 0.3, 0, 0.15)      # the strike-through
c(f'{S}/identity.mp3', 82.5, 0.3)                      # logo
c(f'{S}/office.mp3', 79.0, 0.05, 12, END - 79.0, 0.5, 0.2)   # no digital silence under the CTA
c(f'{S}/office.mp3', 72.6, 0.06, 30, 3.5, 0.3, 0.3)    # her office, around the Send
c(f'{S}/city_morning.mp3', 76.1, 0.13, 0, 8.6, 0.6, 1.5)  # the city waking up
c(f'{S}/birds_morning.mp3', 76.1, 0.12, 0, 4.5, 0.5, 1.2)

# ================= V34: drop the old tail, build the 49–145.5 s post-reveal =================
cues[:] = [q for q in cues if q[1] < 49.0]
for i, t, d in [('v1', 49.3, 'v34'), ('v2', 54.7, 'v34'), ('v3', 58.7, 'v34'), ('v4c', 67.7, 'v38'), ('v5', 78.4, 'v34'), ('v6', 91.3, 'v34'),
                ('c1', 104.3, 'v33'), ('c2b', 106.2, 'v35'), ('v8b', 115.3, 'v35'), ('c3', 123.4, 'v33'), ('a7b', 132.0, 'v31'), ('a8c', 142.6, 'v32')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
M = f'{S}/music_digital_clouds_175.mp3'
c(M, 49.0, 0.20, 0.0, 80.8, 1.5, 0.6); c(M, 129.8, 0.07, 80.8, 2.2, 0.2, 0.2); c(M, 132.0, 0.24, 83.0, END - 132.0, 0.3, 2.5)
c(f'{S}/office.mp3', 49.0, 0.06, 5, 3.6, 0.3, 0.4)                         # the room around the laptop
c(f'{S}/whoosh2.mp3', 49.0, 0.25); c(f'{S}/whoosh.mp3', 51.6, 0.35)      # push into the screen
c(f'{S}/whoosh2.mp3', 54.3, 0.22); c(f'{S}/key.mp3', 55.5, 0.2)
c(f'{S}/typing_soft.mp3', 58.4, 0.38, 1.0, 2.9, 0.05, 0.2); c(f'{S}/pop.mp3', 61.3, 0.28)   # her hands, the real prompt
c(f'{S}/whoosh2.mp3', 64.35, 0.2)
c(f'{S}/whoosh2.mp3', 67.3, 0.22)
for t in (68.5, 69.6, 70.7): c(f'{S}/key.mp3', t, 0.22)                  # plan steps tick through
c(f'{S}/whoosh2.mp3', 71.3, 0.22); c(f'{S}/identity.mp3', 74.7, 0.25); c(f'{S}/whoosh.mp3', 76.2, 0.3)   # €74.6m lifts and travels
c(f'{S}/clock_fast.mp3', 78.0, 0.08, 0, 2.5, 0.3, 0.3); c(f'{S}/key.mp3', 82.2, 0.25); c(f'{S}/key.mp3', 86.2, 0.25)
c(f'{S}/whoosh2.mp3', 90.9, 0.22); c(f'{S}/pop_long.mp3', 92.3, 0.35); c(f'{S}/whoosh2.mp3', 95.55, 0.3)
c(f'{S}/whoosh2.mp3', 103.9, 0.22)
for t in (104.8, 105.4, 106.0): c(f'{S}/key.mp3', t, 0.2)
c(f'{S}/pop.mp3', 108.4, 0.3); c(f'{S}/whoosh2.mp3', 109.3, 0.25); c(f'{S}/whoosh2.mp3', 110.75, 0.2)
c(f'{S}/whoosh2.mp3', 114.95, 0.2)
for t in (116.0, 116.6, 117.2): c(f'{S}/key.mp3', t, 0.2)
c(f'{S}/whoosh2.mp3', 122.95, 0.2); c(f'{S}/key.mp3', 124.0, 0.22); c(f'{S}/whoosh2.mp3', 126.15, 0.2)
c(f'{S}/office.mp3', 130.0, 0.07, 30, 6.0, 0.3, 0.5); c(f'{S}/heart_slow.mp3', 130.0, 0.2, 20, 1.4, 0.2, 0.3)
c(f'{S}/click.mp3', 131.35, 0.7, 0, 0.5); c(f'{S}/identity.mp3', 131.65, 0.45)          # she presses Send; the lights come on
c(f'{S}/city_morning.mp3', 133.0, 0.12, 0, 6.0, 1.0, 1.0); c(f'{S}/birds_morning.mp3', 136.1, 0.12, 0, 3.0, 0.4, 1.0)
c(f'{S}/static.mp3', 140.3, 0.15, 0, 0.3, 0, 0.15); c(f'{S}/identity.mp3', 142.5, 0.3)
c(f'{S}/office.mp3', 139.0, 0.05, 12, END - 139.0, 0.5, 0.2)

# ================= V35 retime of the post-reveal tail (team 102, sources 108.8, local 113.8, payoff 118.3, end 127.3) =================
def remap(t):
    if t < 102.0: return t
    if t < 104.0: return t - 2.0          # end of the hero review hold
    if t < 110.8: return t - 2.0          # team + proposal
    if t < 115.0: return None             # repeated Room thread: cut
    if t < 120.0: return t - 6.2          # sources
    if t < 123.0: return None
    if t < 127.5: return t - 9.2          # local workspace
    if t < 130.0: return None
    return t - 11.7                       # payoff, dawn, end card
keep=[]
for (f,at,*rest) in cues:
    if 'music_digital_clouds' in f: continue            # rebuilt below as a shaped score
    if '/vo/' in f and ('c2b' in f): keep.append((f,at,*rest)); continue
    nt=remap(at)
    if nt is None: continue
    keep.append((f,nt,*rest))
cues[:]=keep
M = f'{S}/music_digital_clouds_175.mp3'   # score shaped to the story: build to the Accept, dip before Send, near-silence before the tagline
for at, vol, src, dur, fi, fo in [(49.0, .16, 0, 29.0, 1.5, .6), (78.0, .21, 29, 13.0, .8, .4), (91.0, .30, 42, 3.5, .4, .6), (94.5, .19, 45.5, 22.5, .6, .8),
                                  (117.0, .06, 68, 3.3, .3, .3), (120.3, .26, 71.3, 3.7, .2, 1.2), (127.6, .18, 75, END - 127.6, .8, 2.0)]:
    c(M, at, vol, src, dur, fi, fo)
c(f'{S}/ticktock.mp3', 49.0, 0.07, 0, 3.6, 0.4, 0.5)                      # the warm room's own quiet
c(f'{S}/impact.mp3', 44.57, 0.22, 0.2, 0.8, 0, 0.5)                        # her head drops to the desk
c(f'{S}/birds_morning.mp3', 127.3, 0.06, 2, END - 127.3, 0.6, 1.0)         # room tone to the last frame
for t in (52.6, 54.4, 56.4, 58.4, 61.4, 64.4, 67.4, 78.0, 94.1, 106.0, 113.8, 117.0, 118.3):   # a soft touch on every product cut
    if not any(abs(q[1] - t) < 0.3 and '/vo/' not in q[0] for q in cues): c(f'{S}/key.mp3', t, 0.12)

# ================= V36: rebuild everything after 78 s (precision montage 78–85, hero on the laptop 85–95, team 95, local 101.8, payoff 106.3, end 115.3) =================
cues[:] = [q for q in cues if q[1] < 78.0 and 'music_digital_clouds' not in q[0]]
for i, t, d in [('v5', 78.4, 'v34'), ('v6', 87.0, 'v34'), ('c1', 95.3, 'v33'), ('c2b', 99.2, 'v35'), ('c3', 102.0, 'v33'), ('a7b', 108.3, 'v31'), ('a8c', 118.9, 'v32')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
M = f'{S}/music_digital_clouds_175.mp3'
for at, vol, src, dur, fi, fo in [(49.0, .16, 0, 29.0, 1.5, .5), (78.0, .21, 29, 7.8, .5, .3), (85.8, .34, 36.8, 3.7, .15, .8), (89.5, .19, 40.5, 15.5, .6, .8),
                                  (105.0, .06, 56, 2.9, .3, .2), (107.9, .27, 58.9, 4.3, .15, 1.2), (115.6, .18, 75, END - 115.6, .8, 2.0)]:
    c(M, at, vol, src, dur, fi, fo)
c(f'{S}/office.mp3', 49.0, 0.035, 8, 57.0, 1.0, 1.0)                      # a quiet room under every product shot
c(f'{S}/whoosh2.mp3', 77.9, 0.22); c(f'{S}/key.mp3', 80.3, 0.2); c(f'{S}/key.mp3', 82.6, 0.2)
c(f'{S}/whoosh2.mp3', 84.95, 0.22); c(f'{S}/whoosh.mp3', 85.3, 0.3)      # into the laptop
c(f'{S}/pop_long.mp3', 86.3, 0.42); c(f'{S}/impact.mp3', 86.3, 0.3, 0, 1.4, 0, 0.8)   # the Accept downbeat, VO clear
c(f'{S}/whoosh2.mp3', 88.35, 0.22); c(f'{S}/whoosh2.mp3', 91.15, 0.3)
c(f'{S}/whoosh2.mp3', 94.95, 0.22)
for t in (95.8, 96.4, 97.0): c(f'{S}/key.mp3', t, 0.2)
c(f'{S}/pop.mp3', 99.0, 0.3); c(f'{S}/whoosh2.mp3', 99.9, 0.25); c(f'{S}/whoosh2.mp3', 101.75, 0.22); c(f'{S}/key.mp3', 102.8, 0.22); c(f'{S}/whoosh2.mp3', 104.95, 0.2)
c(f'{S}/office.mp3', 106.3, 0.07, 30, 6.0, 0.3, 0.5); c(f'{S}/heart_slow.mp3', 106.3, 0.2, 20, 1.4, 0.2, 0.3)
c(f'{S}/click.mp3', 107.65, 0.7, 0, 0.5); c(f'{S}/identity.mp3', 107.95, 0.45)
c(f'{S}/city_morning.mp3', 109.0, 0.12, 0, 6.0, 1.0, 1.0); c(f'{S}/birds_morning.mp3', 112.4, 0.12, 0, 3.0, 0.4, 1.0)
c(f'{S}/static.mp3', 116.6, 0.15, 0, 0.3, 0, 0.15); c(f'{S}/identity.mp3', 118.8, 0.3)
c(f'{S}/birds_morning.mp3', 115.3, 0.06, 2, END - 115.3, 0.6, 1.0)
for t in CUTS:                                                             # every silent hook cut gets a soft touch
    if not any(abs(q[1] - t) < 0.3 and '/vo/' not in q[0] for q in cues): c(f'{S}/whoosh2.mp3', t - 0.05, 0.18)

# human typing: drop the looped typing beds on the three prompts, click once per real keystroke (same schedule as the picture)
import json as _j, random as _r
cues[:] = [q for q in cues if not (('typing_soft' in q[0] or 'typing_hard' in q[0]) and (8.0 <= q[1] <= 9.5 or 23.5 <= q[1] <= 24.6 or 29.5 <= q[1] <= 31.0))]
_rnd = _r.Random(7)
for t in _j.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../artifacts/typing_keys.json'))):
    c(f'{S}/key.mp3', t - 0.01, round(_rnd.uniform(0.16, 0.26), 3))

# ===== V38: collaboration before the hero; hero +6.8 s; brand read clear of the sting; dropouts filled =====
moved=[]
for (f,at,*rest) in cues:
    if 'music_digital_clouds' in f and at >= 78: continue
    if 'identity.mp3' in f and abs(at - 118.8) < 0.05: at = 117.9
    if '/a8c.wav' in f: at = 119.3
    elif 84.9 <= at < 91.3: at += 6.8           # hero (incl. its VO and the Accept downbeat) now 91.75–98
    elif 94.9 <= at < 101.0: at -= 10.0         # team + proposal now 84.95–91
    moved.append((f,at,*rest))
cues[:]=moved
M = f'{S}/music_digital_clouds_175.mp3'
for at, vol, src, dur, fi, fo in [(78.0, .21, 29, 14.6, .5, .3), (92.6, .34, 43.6, 3.7, .15, .8), (96.3, .19, 47.3, 8.7, .6, .8),
                                  (105.0, .06, 56, 2.9, .3, .2), (107.9, .27, 58.9, 4.3, .15, 1.2), (115.6, .18, 75, END - 115.6, .8, 2.0)]:
    c(M, at, vol, src, dur, fi, fo)
c(f'{S}/static.mp3', 4.6, 0.22, 0, 0.35, 0, 0.1)                           # the flash-forward
c(f'{S}/office.mp3', 112.0, 0.045, 25, END - 112.0, 0.8, 1.0)            # no dropouts at the end

# ===== V39: brand read clear; sting ends before it; a real transient on every cut =====
cues[:] = [((f'{H}/audio/vo/v39/b2.wav', 119.3, *q[2:]) if '/a8c.wav' in q[0] else q) for q in cues]
cues[:] = [((q[0], 116.8, *q[2:]) if ('identity.mp3' in q[0] and abs(q[1] - 117.9) < 0.05) else q) for q in cues]
for t in [1.2, 4.5, 5.07, 8.0, 9.8, 12.45, 12.47, 13.9, 13.93, 15.6, 16.5, 20.4, 21.3, 22.97, 23.8, 24.07, 24.87, 25.1, 30.0, 30.95, 31.07, 31.83, 34.5, 35.0, 36.77, 37.4, 39.2, 40.3, 41.6, 44.57, 45.63, 49.0, 52.6, 54.4, 56.0, 58.4, 61.4, 64.4, 67.0, 68.73, 71.4, 78.0, 80.3, 85.0, 89.0, 91.8, 95.2, 106.3, 107.3, 107.9, 112.4, 115.3]:
    if t > END - 0.3: continue
    if not any(abs(q[1] - t) < 0.25 and '/vo/' not in q[0] and 'music_' not in q[0] for q in cues):
        c(f'{S}/click.mp3', t - 0.02, 0.24, 0, 0.3); c(f'{S}/whoosh2.mp3', t - 0.1, 0.28)

fixed=[]
for (f,at,vol,ss,dur,fi,fo) in cues:
    if dur is not None and (dur <= 0 or at + dur > END): dur = END - at
    if at >= END or (dur is not None and dur <= 0.05): continue
    fixed.append((f,at,vol,ss,dur,fi,min(fo, dur) if dur else fo))
cues[:]=fixed

args, filt, labels = [], [], []
for n, (f, at, vol, ss, dur, fi, fo) in enumerate(cues):
    args += ['-i', f]
    ch = f'[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=start={ss}' + (f':duration={dur}' if dur else '') + ',asetpts=PTS-STARTPTS'
    if fi: ch += f',afade=t=in:d={fi}'
    if fo and dur: ch += f',afade=t=out:st={max(0, dur - fo)}:d={fo}'
    ms = int(at * 1000)
    filt.append(f'{ch},volume={vol},adelay={ms}|{ms}[a{n}]'); labels.append(f'[a{n}]')
BED=('music_', 'jazz', 'suspense', 'bass_pulse', 'heart_', 'swell', 'riser', 'hazy')
vo=[l for l,(f,*_) in zip(labels,cues) if '/audio/vo/' in f]
bed=[l for l,(f,*_) in zip(labels,cues) if '/audio/vo/' not in f and any(b in f for b in BED)]
sfx=[l for l,(f,*_) in zip(labels,cues) if '/audio/vo/' not in f and not any(b in f for b in BED)]
filt.append(f'{"".join(vo)}amix=inputs={len(vo)}:normalize=0,highpass=f=90,equalizer=f=2500:t=o:w=1.3:g=4.5,equalizer=f=250:t=o:w=1:g=-2.5,asplit=2[vo][key]')
filt.append(f'{"".join(bed)}amix=inputs={len(bed)}:normalize=0,equalizer=f=2000:t=o:w=1.5:g=-3[bed]')
filt.append(f'{"".join(sfx)}amix=inputs={len(sfx)}:normalize=0[sfx]')
filt.append('[bed][key]sidechaincompress=threshold=0.03:ratio=5:attack=12:release=350:makeup=1[ducked]')
filt.append(f'[vo][ducked][sfx]amix=inputs=3:normalize=0,atrim=0:{END},apad=whole_dur={END},loudnorm=I=-14.3:TP=-2:LRA=11,volume=1.9dB,alimiter=limit=0.79:attack=2:release=60:level=false,aresample=48000[out]')
os.makedirs(f'{P}/artifacts', exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', ';'.join(filt), '-map', '[out]', f'{P}/artifacts/film_audio_v39.wav'], check=True)
print('cues', len(cues))

