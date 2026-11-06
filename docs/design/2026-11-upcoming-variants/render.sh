#!/usr/bin/env bash
# Render each variant to PNG with headless Chrome: a 1440x900 "first screen", a tall 1440 capture,
# and a 390x844 phone first screen. Usage: ./render.sh [v1 v2 ...]
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p shots
variants=("$@")
[ ${#variants[@]} -eq 0 ] && variants=(v1-news-list v2-agenda-sidebar v3-now-page v4-speaker v5-sticky-profile)
shot() { # file, width, height, out
  google-chrome --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --window-size="$2,$3" --screenshot="shots/$4" "file://$PWD/$1" 2>/dev/null \
    || google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --virtual-time-budget=6000 \
    --window-size="$2,$3" --screenshot="shots/$4" "file://$PWD/$1" 2>/dev/null
  echo "  $4  $(stat -c %s "shots/$4") bytes"
}
for v in "${variants[@]}"; do
  echo "$v"
  shot "$v.html" 1440 900  "$v-fold.png"
  shot "$v.html" 1440 2600 "$v-full.png"
  shot "$v.html" 390  844  "$v-mobile.png"
done
