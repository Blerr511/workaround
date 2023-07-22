#!/usr/bin/env bash

command -v bazel >/dev/null 2>&1 || {
  echo "ERROR: bazel not found!"
  exit 1
}

echo "Running custom bazel"

bazel_rc=${BAZEL_RC_PATH:-.bazelrc}

bazel --bazelrc=$bazel_rc $@
