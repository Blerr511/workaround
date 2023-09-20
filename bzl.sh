#!/usr/bin/env bash

command -v bazel >/dev/null 2>&1 || {
  echo "ERROR: bazel not found!"
  exit 1
}

echo "Running custom bazel"

currentDir=$(pwd)

while [[ "$currentDir" != "" && ! -e "$currentDir/WORKSPACE" ]]; do
  currentDir=${currentDir%/*}
done

if [[ ! -e "$currentDir/WORKSPACE" ]]; then
  echo "No WORKSPACE file found in any parent directory."
  exit 1
fi

bazel_rc=.bazelrc

if [[ ! -z $_ENV ]]; then
  bazel_rc=.aspect/bazelrc/$_ENV/.bazelrc
  echo "Using $bazel_rc"
fi

echo "bazel --bazelrc=\"$currentDir/$bazel_rc\" $@"

bazel --bazelrc="$currentDir/$bazel_rc" $@
