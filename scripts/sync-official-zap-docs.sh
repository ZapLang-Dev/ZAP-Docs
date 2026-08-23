#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${1:-../zap-source}"
DOCS_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_DIR="$DOCS_ROOT/client/public"
SOURCE_COMMIT="$(git -C "$SOURCE_DIR" rev-parse HEAD 2>/dev/null || true)"
CURRENT_COMMIT="$(sed -n 's/.*"commit": "\([^"]*\)".*/\1/p' "$PUBLIC_DIR/official-docs-manifest.json" 2>/dev/null || true)"

if [[ ! -d "$SOURCE_DIR/.git" ]]; then
  echo "Source repository not found: $SOURCE_DIR" >&2
  exit 1
fi

if [[ "$SOURCE_COMMIT" == "$CURRENT_COMMIT" && -n "$CURRENT_COMMIT" ]]; then
  printf 'Source commit %s is already synchronized\n' "$SOURCE_COMMIT"
  exit 0
fi

rm -rf "$PUBLIC_DIR/official-docs"
mkdir -p "$PUBLIC_DIR/official-docs"
cp -a "$SOURCE_DIR/docs/." "$PUBLIC_DIR/official-docs/"
cp "$SOURCE_DIR/README.md" "$PUBLIC_DIR/official-README.md"
cp "$SOURCE_DIR/CHANGELOG_EN.md" "$PUBLIC_DIR/official-CHANGELOG_EN.md"

cat > "$PUBLIC_DIR/official-docs-manifest.json" <<EOF
{
  "repository": "https://github.com/hidecard/zap",
  "branch": "$(git -C "$SOURCE_DIR" rev-parse --abbrev-ref HEAD)",
  "commit": "$(git -C "$SOURCE_DIR" rev-parse HEAD)",
  "syncedAt": "$(git -C "$SOURCE_DIR" show -s --format=%cI HEAD)",
  "documentationFiles": $(git -C "$SOURCE_DIR" ls-files 'docs/*' | wc -l),
  "readme": "/official-README.md",
  "changelog": "/official-CHANGELOG_EN.md",
  "directory": "/official-docs/"
}
EOF

printf 'Synchronized %s official documentation files from %s\n' "$(find "$PUBLIC_DIR/official-docs" -type f | wc -l)" "$(git -C "$SOURCE_DIR" rev-parse HEAD)"
