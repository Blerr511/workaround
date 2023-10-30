#!/bin/bash
CLUSTER_PATH=$1

[[ -z "$CLUSTER_PATH" ]] && echo "Error: CLUSTER_PATH is not set" && exit 1
[[ -z "$_TAG" ]] && echo "Error: _TAG is not set" && exit 1

export_aws_vars_script=$(bazel build //tools/aws:aws.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}')
export_doctl_vars_script=$(bazel build //tools/doctl:doctl.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}')

source $export_aws_vars_script
source $export_doctl_vars_script

bazel run //$CLUSTER_PATH --define _TAG=${_TAG}
