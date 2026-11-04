#!/usr/bin/env bash
set -euo pipefail

: "${TAG:?}"
: "${PR_TITLE:?}"
: "${PR_NUMBER:?}"
: "${PR_AUTHOR:?}"
: "${PR_URL:?}"
: "${GITHUB_REPOSITORY:?}"

output=${1:-release_notes.md}

{
  printf '## Release %s\n\n' "$TAG"
  printf '### Pull Request\n'
  printf -- '- **PR #%s**: %s\n' "$PR_NUMBER" "$PR_TITLE"
  printf -- '- **Author**: @%s\n' "$PR_AUTHOR"
  printf -- '- **Link**: %s\n\n' "$PR_URL"
  printf '### Changes\n\n'
  printf '%s\n\n' "${PR_BODY:-No description provided}"
  printf '%s\n' '---'
  printf '\n**Full Changelog**: https://github.com/%s/commits/%s\n' \
    "$GITHUB_REPOSITORY" "$TAG"
} > "$output"
