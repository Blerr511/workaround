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

AWS_ACCESS_KEY_ID=$(cat $($bazel_cmd build //sandbox/gcp:aws_cloud_builder_ak_id 2>&1 | grep "_secret_data" | awk '{ print $1 }'))
AWS_ACCESS_KEY_SECRET=$(cat $($bazel_cmd build //sandbox/gcp:aws_cloud_builder_ak_secret 2>&1 | grep "_secret_data" | awk '{ print $1 }'))

echo "Running apply command with access key ${AWS_ACCESS_KEY_ID}"

bazel run //$CLUSTER_PATH --define _CLUSTER=${_CLUSTER} --define _TAG=${_TAG} --define AWS_DEFAULT_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} --define AWS_DEFAULT_ACCESS_KEY_SECRET=${AWS_DEFAULT_ACCESS_KEY_SECRET}
