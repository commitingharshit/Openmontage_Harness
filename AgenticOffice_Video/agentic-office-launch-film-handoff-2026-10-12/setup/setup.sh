#!/bin/sh
# One-time setup for the Agentic Office film workflow (macOS).
# Run from the handoff folder:  sh setup/setup.sh
set -e
cd "$(dirname "$0")/.."

echo "1/4 Claude Code skills -> ~/.claude/skills"
mkdir -p ~/.claude/skills
for s in setup/claude-skills/*/; do
  name=$(basename "$s")
  if [ -d ~/.claude/skills/"$name" ]; then echo "  skip $name (already installed)"; else cp -R "$s" ~/.claude/skills/"$name"; echo "  added $name"; fi
done

echo "2/4 Tools (Node, ffmpeg, Python)"
command -v brew >/dev/null || { echo "  Install Homebrew first: https://brew.sh"; exit 1; }
command -v node >/dev/null || brew install node
command -v ffmpeg >/dev/null || brew install ffmpeg
command -v python3 >/dev/null || brew install python
python3 -m pip install --user kokoro-onnx soundfile

echo "3/4 Kokoro voice model -> ~/.cache/hyperframes/tts"
D=~/.cache/hyperframes/tts; mkdir -p $D/models $D/voices
U=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -f $D/models/kokoro-v1.0.onnx ] || curl -L -o $D/models/kokoro-v1.0.onnx $U/kokoro-v1.0.onnx
[ -f $D/voices/voices-v1.0.bin ] || curl -L -o $D/voices/voices-v1.0.bin $U/voices-v1.0.bin

echo "4/4 Remotion project"
(cd film && npm install && npx tsc --noEmit)

echo "Done. Open this folder in Claude Code and start with: 'Read CLAUDE.md and preview the V27 cut.'"
