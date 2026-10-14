#!/bin/bash
# Render a Remotion composition in chunks with a stall watchdog (kills + retries a chunk whose progress stops for 150 s), then concat.
# usage: render_chunks.sh <CompositionId> <totalFrames> <out.mp4> [chunks]
COMP=$1; TOTAL=$2; OUT=$3; N=${4:-4}
cd ~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12/film || exit 1
B=$(find ~/Desktop/OpenMontage/remotion-composer/node_modules/.remotion/chrome-headless-shell -name chrome-headless-shell -type f | head -1)
STEP=$(( (TOTAL + N - 1) / N )); LIST=/tmp/${COMP}_chunks.txt; : > $LIST
for ((i=0; i<N; i++)); do
  A=$((i*STEP)); Z=$(( (i+1)*STEP - 1 )); [ $Z -ge $TOTAL ] && Z=$((TOTAL-1))
  PART=/tmp/${COMP}_part$i.mp4
  for try in 1 2 3 4; do
    LOG=/tmp/${COMP}_part$i.log; rm -f $PART
    npx remotion render src/index.tsx $COMP $PART --muted --concurrency=4 --crf=18 --frames=$A-$Z --timeout=90000 --browser-executable="$B" > $LOG 2>&1 &
    PID=$!; LAST=""; SAME=0
    while kill -0 $PID 2>/dev/null; do
      sleep 10; CUR=$(tr '\r' '\n' < $LOG | grep -o 'Rendered [0-9]*' | tail -1)
      if [ "$CUR" = "$LAST" ]; then SAME=$((SAME+10)); else SAME=0; LAST=$CUR; fi
      if [ $SAME -ge 150 ]; then echo "chunk $i stalled at $CUR (try $try) — retrying"; pkill -P $PID; kill $PID; sleep 2; break; fi
    done
    wait $PID 2>/dev/null
    if [ -s $PART ] && grep -q "Encoded" $LOG; then echo "chunk $i ok ($A-$Z)"; break; fi
  done
  [ -s $PART ] || { echo "chunk $i FAILED"; exit 1; }
  echo "file '$PART'" >> $LIST
done
ffmpeg -v error -y -f concat -safe 0 -i $LIST -c copy $OUT && echo "DONE $OUT"
