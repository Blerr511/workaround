#!/bin/bash

set -e

echo "Running Migration"

bazel run //deploy/cluster/backend:data-source-migration-job.apply --define _TAG=$_TAG

JOB_STATUS=""

while [[ $JOB_STATUS != "Complete" ]]; do
    echo "Waiting for migration job to complete..."
    sleep 10
    # TODO - replace hardocded job name with variable
    JOB_STATUS=$(kubectl get jobs data-source-migration -o=jsonpath='{.status.conditions[?(@.type=="Complete")].type}')
    echo "JOB_STATUS $JOB_STATUS"
done

bazel run //deploy/cluster/backend:data-source-migration-job.delete --define _TAG=$_TAG

echo "DB Migrateion complete!"
