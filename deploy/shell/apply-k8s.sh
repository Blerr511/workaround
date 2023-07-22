#!/bin/bash

CLUSTER_PATH=$1

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
if [[ -e "${SCRIPT_DIR}/.env" ]]; then
    for line in $(cat "${SCRIPT_DIR}/.env"); do
        export $line
    done
fi

[[ -z "$CLUSTER_PATH" ]] && echo "Error: CLUSTER_PATH is not set" && exit 1
[[ -z "$_CLUSTER" ]] && echo "Error: _CLUSTER is not set" && exit 1
[[ -z "$_TAG" ]] && echo "Error: _TAG is not set" && exit 1

/workspace/bzl.sh run //$CLUSTER_PATH --define _CLUSTER=${_CLUSTER} --define _TAG=${_TAG}
