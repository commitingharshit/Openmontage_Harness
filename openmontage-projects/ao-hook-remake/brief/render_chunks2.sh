#!/bin/bash
# Resumable chunked Remotion render with stall watchdog. Finished chunks (marked .ok) are skipped on re-run.
# usage: render_chunks2.sh <CompositionId> <totalFrames> <out.mp4> <workdir> [chunks] [concurrency]
COMP=$1; TOTAL=$2; OUT=$3; W=$4; N=${5:-12}; CC=${6:-3}; mkdir -p $W
cd ~/Desktop/AgenticOffice_Video/agentic-office-launch-film-handoff-2026-10-12/film || exit 1
B=$(find ~/Desktop/OpenMontage/remotion-composer/node_modules/.remotion/chrome-headless-shell -name chrome-headless-shell -type f | head -1)
STEP=$(( (TOTAL + N - 1) / N )); LIST=$W/list.txt; : > $LIST
for ((i=0; i<N; i++)); do
  A=$((i*STEP)); Z=$(( (i+1)*STEP - 1 )); [ $Z -ge $TOTAL ] && Z=$((TOTAL-1))
  PART=$W/part$(printf %02d $i).mp4
  try=0
  while [ ! -f $PART.ok ] && [ $try -lt 5 ]; do
    try=$((try+1)); LOG=$PART.log; rm -f $PART
    npx remotion render src/index.tsx $COMP $PART --muted --concurrency=$CC --crf=18 --frames=$A-$Z --timeout=120000 --browser-executable="$B" > $LOG 2>&1 &
    PID=$!; LAST=""; SAME=0
    while kill -0 $PID 2>/dev/null; do
      sleep 5; CUR=$(tr '\r' '\n' < $LOG | grep -o 'Rendered [0-9]*' | tail -1)
      if [ "$CUR" = "$LAST" ]; then SAME=$((SAME+5)); else SAME=0; LAST=$CUR; fi
      if [ $SAME -ge 100 ]; then echo "chunk $i stalled at $CUR (try $try)"; kill $PID; pkill -f chrome-headless-shell; sleep 3; break; fi
    done
    wait $PID 2>/dev/null; RC=$?
    if [ $RC -eq 0 ] && [ -s $PART ]; then touch $PART.ok; echo "chunk $i ok ($A-$Z) try $try"; fi
  done
  [ -f $PART.ok ] || { echo "chunk $i FAILED"; exit 1; }
  echo "file '$PART'" >> $LIST
done
ffmpeg -v error -y -f concat -safe 0 -i $LIST -c copy $OUT && echo "DONE $OUT"
