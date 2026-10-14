"""V28c hook sound design: VO + music arc + room tone + spot SFX, mastered to -16 LUFS.
Usage: python3 sound_mix_v28c.py  -> artifacts/hook_audio_v28c.wav (35.4 s)
Arc: light jazz while AI "helps" (0-11.4) -> suspense bed once the email lands -> heartbeat + clock as the
regenerate drags -> riser into overload -> hard silence at 32.6 for the question.
"""
import os, subprocess
H = os.path.expanduser('~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12')
P = os.path.expanduser('~/Desktop/OpenMontage/projects/ao-hook-remake')
S = f'{P}/assets/sfx'
END, CUT = 35.4, 32.6

# (file, at, vol, src_start, dur, fade_in, fade_out)
cues = []
def c(f, at, vol, ss=0.0, dur=None, fi=0.0, fo=0.0): cues.append((f, at, vol, ss, dur, fi, fo))

# --- voice ---
for i, t, d in [('o1', 0.5, 'v22'), ('o2', 3.0, 'v22'), ('o3b', 6.8, 'v22'), ('o4', 9.8, 'v22'), ('o5f', 12.4, 'v22'),
                ('n1', 17.4, 'v28'), ('n2', 21.6, 'v28'), ('n3', 23.6, 'v28'), ('o6', 28.6, 'v22'), ('o7', 33.0, 'v22')]:
    c(f'{H}/audio/vo/{d}/{i}.wav', t, 1.0)
# --- beds ---
c(f'{H}/audio/music/v11-jazz-rolls.wav', 0.0, 0.16, 0, 12.2, 0.3, 1.0)        # the "helpful AI" mood, dies when the email lands
c(f'{S}/office.mp3', 0.0, 0.10, 2, CUT, 1.0, 0.05)                             # room tone, whole hook
c(f'{S}/suspense.mp3', 11.6, 0.22, 4, CUT - 11.6, 1.5, 0.05)                   # tension bed from the email on
c(f'{S}/bass_pulse.mp3', 21.6, 0.18, 0, CUT - 21.6, 0.8, 0.05)                 # "one number changes"
c(f'{S}/heart_slow.mp3', 24.4, 0.30, 0, 4.0, 0.5, 0.3)
c(f'{S}/heart_fast.mp3', 28.4, 0.30, 0, CUT - 28.4, 0.2, 0.05)
c(f'{S}/swell.mp3', 24.6, 0.30, 0, 3.8, 0.2, 0.6)                              # peaks ~28.1 as the progress bar crawls
c(f'{S}/riser.mp3', 29.4, 0.55, 27.8, CUT - 29.4, 0.4, 0.02)                   # into overload, cut dead at 32.6
# --- spot effects ---
c(f'{S}/typing_soft.mp3', 0.6, 0.55, 1.0, 1.3, 0.05, 0.1)                      # typing the first prompt
c(f'{S}/pop.mp3', 1.95, 0.35)                                                  # send
c(f'{S}/pop_long.mp3', 3.0, 0.30)                                              # reply lands
c(f'{S}/key.mp3', 4.3, 0.35)                                                   # file card
c(f'{S}/whoosh2.mp3', 5.2, 0.22)                                               # "AI said it was done."
c(f'{S}/whoosh.mp3', 6.2, 0.45)                                                # dive into the file
c(f'{S}/glitch.mp3', 8.72, 0.85)                                               # "wrecked"
c(f'{S}/static.mp3', 8.75, 0.35, 0, 0.5, 0, 0.2)
for t in (9.0, 9.2, 9.4): c(f'{S}/key.mp3', t, 0.3)                            # flags pop
c(f'{S}/typing_hard.mp3', 9.9, 0.45, 2.0, 1.4, 0.05, 0.2)                      # fixing by hand
c(f'{S}/buzz.mp3', 11.35, 0.55, 0, 1.2, 0, 0.3)                                # phone buzz: the email
c(f'{S}/bell.mp3', 11.4, 0.25, 0, 1.2, 0, 0.4)
c(f'{S}/whoosh2.mp3', 17.1, 0.35)                                              # back to the chat
c(f'{S}/typing_soft.mp3', 17.5, 0.5, 6.0, 1.1, 0.05, 0.1)
c(f'{S}/pop.mp3', 18.65, 0.3)
for i in range(6): c(f'{S}/key.mp3', 18.95 + i * 0.33, 0.22)                   # slides appear one by one
c(f'{S}/pop_long.mp3', 20.9, 0.3)                                              # deck done
c(f'{S}/buzz.mp3', 21.75, 0.6, 0, 1.0, 0, 0.3)                                 # partner: the number changed
c(f'{S}/bell.mp3', 21.8, 0.22, 0, 1.0, 0, 0.4)
c(f'{S}/whoosh2.mp3', 22.5, 0.3)                                               # ring on slide 2
c(f'{S}/typing_hard.mp3', 23.5, 0.6, 5.0, 0.85, 0.02, 0.1)                     # angry re-prompt
c(f'{S}/pop.mp3', 24.35, 0.3)
c(f'{S}/clock_fast.mp3', 25.0, 0.5, 0, 2.5, 0.1, 0.1)                          # time-lapse 8:41 -> 8:46
c(f'{S}/ticktock.mp3', 27.4, 0.45, 0, 1.0, 0, 0.3)
c(f'{S}/whoosh.mp3', 28.35, 0.5)                                               # into the tabs
for i, t in enumerate((29.0, 29.4, 29.8, 30.2)): c(f'{S}/{"whoosh2" if i % 2 else "whoosh"}.mp3', t - 0.05, 0.45)
c(f'{S}/impact.mp3', 30.7, 0.55, 0, 1.6, 0, 0.6)                               # "Repeat."
for i in range(4): c(f'{S}/buzz.mp3', 31.4 + i * 0.2, 0.35, 0, 0.5, 0, 0.1)    # notifications pile up
c(f'{S}/clock_fast.mp3', 31.3, 0.55, 0, CUT - 31.3, 0, 0.02)
c(f'{S}/impact.mp3', CUT - 0.02, 0.35, 0.25, 0.9, 0, 0.8)                     # the cut: one low thud tail, then silence

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
subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', ';'.join(filt), '-map', '[out]', f'{P}/artifacts/hook_audio_v28c.wav'], check=True)
print('cues', len(cues))
