#!/bin/bash

WORKSPACE_PATH=$(bazel info | grep "workspace:" | awk '{print $2}')

export SCHEMA_PATH=$WORKSPACE_PATH/$(bazel build //server/apps/gateway:schema 2>&1 | grep schema.gql | awk '{print $1}')
echo "Schema path: ${SCHEMA_PATH}"

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Script directory: $CURRENT_DIR"

export OUTPUT="$CURRENT_DIR/src/__generated__/apollo.ts"
echo "Output file: $OUTPUT"

export NODE_PATH="$CURRENT_DIR/node_modules"

export OPERATIONS=$WORKSPACE_PATH/client/packages/core/src/operations/**

"$CURRENT_DIR/node_modules/.bin/ts-node" "$CURRENT_DIR/src/generate.ts"
