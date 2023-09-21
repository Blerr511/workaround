#!/bin/bash

currentDir=$(pwd)

if [[ -e "/workspace/.env" ]]; then
    for line in $(cat "/workspace/.env"); do
        export $line
    done
fi

AWS_ACCESS_KEY_ID=$(cat $(bazel build //sandbox/gcp:aws_cloud_builder_ak_id 2>&1 | grep "_secret_data" | awk '{ print $1 }'))
AWS_ACCESS_KEY_SECRET=$(cat $(bazel build //sandbox/gcp:aws_cloud_builder_ak_secret 2>&1 | grep "_secret_data" | awk '{ print $1 }'))

bazel run //tools/aws:aws.configure --define AWS_DEFAULT_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} --define AWS_DEFAULT_ACCESS_KEY_SECRET=${AWS_ACCESS_KEY_SECRET}
