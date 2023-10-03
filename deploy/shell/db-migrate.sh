#!/bin/bash

set -e

echo "Running Migration"

connection_string=$(cat $(bazel build //deploy/cluster/backend:backend_data_source_url.local 2>&1 | grep data_source_connection_string_local.txt | awk '{print $1}'))

echo $connection_string

bazel run //sandbox/gcp:bastion.proxy

bazel run //server/packages/data-source:migrate --action_env=DATA_SOURCE_POSTGRES_URL=$connection_string

bazel run //sandbox/gcp:bastion.proxy_drop

echo "DB migration completed"
