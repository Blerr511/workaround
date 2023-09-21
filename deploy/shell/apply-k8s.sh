#!/bin/bash
CLUSTER_PATH=$1

[[ -z "$CLUSTER_PATH" ]] && echo "Error: CLUSTER_PATH is not set" && exit 1
[[ -z "$_TAG" ]] && echo "Error: _TAG is not set" && exit 1

echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"

export_vars_script=$(bazel build //tools/aws:aws.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}')

echo "exporter script $export_vars_script"

source $export_vars_script

echo "----------------"
printenv
echo "----------------"

echo "----------------"
printenv | grep AWS
echo "----------------"

bazel run //$CLUSTER_PATH --define _TAG=${_TAG}
