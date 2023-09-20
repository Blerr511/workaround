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

AWS_ACCESS_KEY_ID=$(cat $(bzl.sh build //sandbox/gcp:aws_cloud_builder_ak_id 2>&1 | grep "_secret_data" | awk '{ print $1 }'))
AWS_ACCESS_KEY_SECRET=$(cat $(bzl.sh build //sandbox/gcp:aws_cloud_builder_ak_secret 2>&1 | grep "_secret_data" | awk '{ print $1 }'))

./bzl.sh run //tools/aws:aws.configure --define AWS_DEFAULT_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} --define AWS_DEFAULT_ACCESS_KEY_SECRET=${AWS_ACCESS_KEY_SECRET}
