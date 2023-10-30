#!/bin/bash

set -e

if [ -z "$CLUSTER_NAME" ]; then
    echo "CLUSTER_NAME not specified!"
    exit 1
fi

CLUSTER_ID=$(doctl k8s cluster list --format ID,Name | grep $CLUSTER_NAME | awk '{print $1}')

if [ -z "$CLUSTER_ID" ]; then
    echo "Cluster not found!"
    exit 1
fi

doctl k8s cluster kubeconfig show $CLUSTER_ID >$1
