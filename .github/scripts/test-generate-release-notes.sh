#!/usr/bin/env bash
set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT
cd "$scratch"

export TAG=v1.3.0
export PR_TITLE='Map update with `touch title-ran`'
export PR_NUMBER=8
export PR_AUTHOR=viniciusoike
export PR_URL=https://github.com/inspercidades/observatorio/pull/8
export PR_BODY='Line one `touch body-ran`
Line two $(touch body-ran-too) | pipe & ampersand'
export GITHUB_REPOSITORY=inspercidades/observatorio

bash "$script_dir/generate-release-notes.sh" "$scratch/notes.md"

grep -Fq 'Map update with `touch title-ran`' notes.md
grep -Fq 'Line one `touch body-ran`' notes.md
grep -Fq 'Line two $(touch body-ran-too) | pipe & ampersand' notes.md
grep -Fq 'https://github.com/inspercidades/observatorio/commits/v1.3.0' notes.md
test ! -e title-ran
test ! -e body-ran
test ! -e body-ran-too

export PR_BODY=''
bash "$script_dir/generate-release-notes.sh" "$scratch/empty-body.md"
grep -Fq 'No description provided' empty-body.md
