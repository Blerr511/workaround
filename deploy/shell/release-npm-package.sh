#!/bin/bash

set -e

PACKAGE_PATH=$1
PACKAGE_TARGET=$2

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
if [[ -e "${SCRIPT_DIR}/.env" ]]; then
    for line in $(cat "${SCRIPT_DIR}/.env"); do
        export $line
    done
fi

[[ -z "$PACKAGE_PATH" ]] && echo "Error: PACKAGE_PATH is not set" && exit 1
[[ -z "$PACKAGE_TARGET" ]] && echo "Error: PACKAGE_TARGET is not set" && exit 1

PACKAGE_NAME=$(cat $PACKAGE_PATH/package.json | jq -r ".name")

echo "Starting release of package $PACKAGE_NAME"

set +e

VERSIONS_PATH=$(bazel build //tools/gcloud:npm_package_versions --define _PACKAGE=$PACKAGE_NAME 2>&1 | grep "npm_package_versions.txt" | awk '{ print $1 }')

echo "VERSIONS_PATH $VERSIONS_PATH"

VERSIONS=$(cat $VERSIONS_PATH)

VERSION_TO_CHECK=$(cat $PACKAGE_PATH/package.json | jq -r ".version")

set -e

if echo "$VERSIONS" | grep -q "$VERSION_TO_CHECK"; then
    echo "Version $VERSION_TO_CHECK of package $PACKAGE_NAME already exists in the repository $REPO_NAME. Skipping..."
    exit 0
fi

echo "Package $PACKAGE_NAME@$VERSION_TO_CHECK not found in repo, publishing..."

bazel run //$PACKAGE_PATH:$PACKAGE_TARGET

echo "Package $PACKAGE_NAME@$VERSION_TO_CHECK successfully published to artifacts repo"
