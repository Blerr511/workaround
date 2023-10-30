#!/bin/bash

set -e

export_vars_script=$(bazel build //tools/doctl:doctl.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}')

source export_vars_script

DIGITALOCEAN_ACCESS_TOKEN_PATH=$(bazel build //sandbox/gcp/secrets:do_tf_access_key 2>&1 | grep "_secret_data" | awk '{print $1}')

if [ -z "$DIGITALOCEAN_ACCESS_TOKEN_PATH" ]; then
    echo "DIGITALOCEAN_ACCESS_TOKEN_PATH not specified!"
    exit 1
fi

export DIGITALOCEAN_ACCESS_TOKEN=$(cat $DIGITALOCEAN_ACCESS_TOKEN_PATH)

doctl auth init
