#!/bin/bash

currentDir=$(pwd)

while [[ "$currentDir" != "" && ! -e "$currentDir/WORKSPACE" ]]; do
    currentDir=${currentDir%/*}
done

if [[ ! -e "$currentDir/WORKSPACE" ]]; then
    echo "No WORKSPACE file found in any parent directory."
    exit 1
fi

if [[ -e "$currentDir/.env" ]]; then
    for line in $(cat "$SCRIPT_DIR/.env"); do
        export $line
    done
fi

CLUSTER_PATH=$1

[[ -z "$CLUSTER_PATH" ]] && echo "Error: CLUSTER_PATH is not set" && exit 1
[[ -z "$_TAG" ]] && echo "Error: _TAG is not set" && exit 1

export_vars_script=$(cat $(bzl.sh build //tools/aws:aws.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}'))

source $export_vars_script

./bzl.sh run //$CLUSTER_PATH --define _TAG=${_TAG}
