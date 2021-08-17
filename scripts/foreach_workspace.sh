#!/usr/bin/env bash

set -e

workspaces="$(node ./scripts/changes.js)"
tasks="$@"

for t in $tasks; do
  yarn workspaces foreach --include $workspaces run $t
done
