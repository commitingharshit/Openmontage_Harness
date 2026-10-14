#!/bin/sh
# Mix VO stems over the music bed and master to -16 LUFS, then mux onto the silent Remotion render.
# Usage: sh audio/mix.sh film/out/v28-picture.mp4 videos/agentic-office-launch-28.mp4 o1@0.4 o2@3.1 v05@24.9 ...
# Each stem is audio/vo/v22/<id>.wav placed at <seconds> (start times = the scene comments in film/src/Film22.tsx).
# Music is ducked to ~18% under the voice. Re-tune volumes by ear; this reproduces the method, not the exact V27 mix
# (the V27 mix itself is audio/mix-v27.wav — use it with mux only if picture timing is unchanged).
set -e
PIC=$1; OUT=$2; shift 2
VO=${VO_DIR:-audio/vo/v22}
inputs="-i audio/music/v11-jazz-rolls.wav"; filt=""; mixin="[m]"; n=1
for s in "$@"; do
  id=${s%@*}; t=${s#*@}; ms=$(awk "BEGIN{print int($t*1000)}")
  inputs="$inputs -i $VO/$id.wav"
  filt="$filt[$n:a]aresample=48000,aformat=channel_layouts=stereo,adelay=$ms|$ms[v$n];"
  mixin="$mixin[v$n]"; n=$((n+1))
done
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$PIC")
ffmpeg -y -i "$PIC" $inputs -filter_complex \
 "[1:a]volume=0.18,afade=t=out:st=$(awk "BEGIN{print $DUR-2}"):d=2[m];${filt}${mixin}amix=inputs=$n:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 320k -t "$DUR" -movflags +faststart "$OUT"
