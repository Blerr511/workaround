#!/bin/bash

echo "Running Migration"

export DATE_NOW=$(date +%s)

export_vars_script=$(bazel build //tools/doctl:doctl.export_vars 2>&1 | grep "export_vars.sh" | awk '{print $1}')

source $export_vars_script

export KUBECONFIG=$(bazel build //sandbox/cluster:kubeconfig 2>&1 | grep "kubeconfig.yaml" | awk '{print $1}')

bazel run //deploy/cluster/backend:data-source-migration-job.apply --define _TAG=$_TAG --action_env=UUID=$DATE_NOW

echo "Running job id: data-source-migration-$DATE_NOW"

JOB_STATUS=""
JOB_FAILED=0
COUNTER=0
MAX_ATTEMPTS=60

while [[ $JOB_STATUS != "Complete" && $JOB_FAILED -eq 0 && $COUNTER -lt $MAX_ATTEMPTS ]]; do
    echo "Waiting for migration job to complete..."
    sleep 10
    # TODO - replace hardcoded job name with variable
    JOB_STATUS=$(kubectl get jobs data-source-migration-$DATE_NOW -o=jsonpath='{.status.conditions[?(@.type=="Complete")].type}')
    JOB_FAILED=$(kubectl get jobs data-source-migration-$DATE_NOW -o=jsonpath='{.status.failed}')
    echo "JOB_STATUS $JOB_STATUS"
    ((COUNTER++))
done

bazel run //deploy/cluster/backend:data-source-migration-job.delete --define _TAG=$_TAG --action_env=UUID=$DATE_NOW

if [[ $JOB_FAILED -gt 0 ]]; then
    echo "Migration job failed!"
    exit 1
elif [[ $COUNTER -eq $MAX_ATTEMPTS ]]; then
    echo "Migration job timed out!"
    exit 1
fi

echo "DB Migration complete!"
