"""V28c hook sound design: VO + music arc + room tone + spot SFX, mastered to -16 LUFS.
Usage: python3 sound_mix_v28c.py  -> artifacts/hook_audio_v29.wav (35.4 s)
Arc: light jazz while AI "helps" (0-11.4) -> suspense bed once the email lands -> heartbeat + clock as the
regenerate drags -> riser into overload -> hard silence at 32.6 for the question.
"""
import os, subprocess
H = os.path.expanduser('~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12')
P = os.path.expanduser('~/Desktop/OpenMontage/projects/ao-hook-remake')
S = f'{P}/assets/sfx'
END, CUT = 49.6, 43.6

# (file, at, vol, src_start, dur, fade_in, fade_out)
cues = []
def c(f, at, vol, ss=0.0, dur=None, fi=0.0, fo=0.0): cues.append((f, at, vol, ss, dur, fi, fo))

# --- voice ---
for i, t, d in [('k1', 0.4, 'v29'), ('o1', 6.0, 'v22'), ('k3', 11.0, 'v29'), ('o3b', 12.5, 'v22'), ('o4', 15.55, 'v22'), ('o5f', 18.15, 'v22'),
                ('n1', 24.0, 'v28'), ('n2', 28.35, 'v28'), ('n3', 30.2, 'v28'), ('k4', 34.6, 'v29'), ('o6', 37.6, 'v22'), ('k5', 42.3, 'v29'), ('k6', 46.3, 'v29')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
# --- beds ---
c(f'{S}/bass_pulse.mp3', 0.0, 0.20, 0, 4.5, 0.2, 0.3)                          # cold open: dread
c(f'{S}/heart_fast.mp3', 0.0, 0.25, 0, 4.5, 0.2, 0.3)
c(f'{S}/rewind.mp3', 4.45, 0.9, 0, 0.9, 0, 0.3)
c(f'{H}/audio/music/v11-jazz-rolls.wav', 5.05, 0.15, 0, 12.4, 0.4, 1.0)        # the helpful-AI mood, dies when the email lands
c(f'{S}/office.mp3', 5.05, 0.10, 2, CUT - 5.05, 1.0, 0.05)                     # room tone…
c(f'{S}/office.mp3', CUT, 0.07, 20, END - CUT - 0.4, 0, 0.6)                   # …and only room tone after the cursor stops
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

args, filt, labels = [], [], []
for n, (f, at, vol, ss, dur, fi, fo) in enumerate(cues):
    args += ['-i', f]
    ch = f'[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=start={ss}' + (f':duration={dur}' if dur else '') + ',asetpts=PTS-STARTPTS'
    if fi: ch += f',afade=t=in:d={fi}'
    if fo and dur: ch += f',afade=t=out:st={max(0, dur - fo)}:d={fo}'
    ms = int(at * 1000)
    filt.append(f'{ch},volume={vol},adelay={ms}|{ms}[a{n}]'); labels.append(f'[a{n}]')
filt.append(f'{"".join(labels)}amix=inputs={len(labels)}:normalize=0,atrim=0:{END},apad=whole_dur={END},loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000[out]')
os.makedirs(f'{P}/artifacts', exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', ';'.join(filt), '-map', '[out]', f'{P}/artifacts/hook_audio_v29.wav'], check=True)
print('cues', len(cues))

