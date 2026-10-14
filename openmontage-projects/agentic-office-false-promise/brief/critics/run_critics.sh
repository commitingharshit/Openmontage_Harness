#!/bin/bash
# usage: run_critics.sh <round_name> <candidate description> [image files...]
cd "$(dirname "$0")"; R=$1; CAND=$2; shift 2; IMG=(); for i in "$@"; do IMG+=(-i "$i"); done
mkdir -p runs/$R
for c in craft story customer; do
  ( codex exec --skip-git-repo-check -s read-only -m gpt-6.1-sol "${IMG[@]}" -o runs/$R/$c.json \
    "$(cat SHARED.md; echo; cat $c.md; echo; echo "TASK: Evaluate this CANDIDATE: $CAND. Output the JSON only.")" </dev/null >/dev/null 2>runs/$R/$c.err ) &
done; wait
python3 - "$R" <<'P'
import json,sys,re
R=sys.argv[1]; out={}
for c in ["craft","story","customer"]:
    t=open(f"runs/{R}/{c}.json").read(); m=re.search(r"\{.*\}",t,re.S); out[c]=json.loads(m.group(0))
C,S,P=out["craft"]["score"],out["story"]["score"],out["customer"]["score"]; Q=0.25*C+0.30*S+0.45*P
cf=[f for c in out.values() for f in c.get("constraint_failures",[])]
print(f"ROUND {R}: Craft {C} · Story {S} · Customer {P} → Q {Q:.1f} · constraint failures {len(cf)}")
cu=out["customer"]; print(f"  recognition {cu.get('recognition')} resonance {cu.get('resonance')} persuasion {cu.get('persuasion')} · would_try: {cu.get('would_try')}")
print(f"  scroll-away: {out['story'].get('scroll_away_second')}s · hook_2s: {cu.get('hook_2s')} · BUY: {cu.get('buy_decision')}")
for c in out: print(f"  [{c}] top: {out[c].get('top_revision')}")
json.dump({"round":R,"C":C,"S":S,"P":P,"Q":round(Q,1),"constraint_failures":cf},open(f"runs/{R}/summary.json","w"),indent=1)
P
