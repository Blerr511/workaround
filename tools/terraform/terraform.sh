#!/bin/bash

command -v terraform >/dev/null 2>&1 || {
  echo "ERROR: terraform cli not found!"
  exit 1
}

[[ -z "$WORKDIR" ]] && echo "Error: WORKDIR is not set" && exit 1
[[ -z "$CLOUDSDK_CONFIG" ]] && echo "Error: CLOUDSDK_CONFIG is not set" && exit 1
[[ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]] && echo "ERROR: GOOGLE_APPLICATION_CREDENTIALS must be set for 'gcloud' cli to run" && exit 1
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/$GOOGLE_APPLICATION_CREDENTIALS"
[[ -f "$GOOGLE_APPLICATION_CREDENTIALS" ]] || (echo "ERROR: GOOGLE_APPLICATION_CREDENTIALS referencing non existing file" && exit 1)

[[ -n "$TF_VAR_gcp_project_number" ]] && TF_VAR_gcp_project_number=$(eval $TF_VAR_gcp_project_number)

echo "Terraform workdir: $WORKDIR"

cd $WORKDIR

terraform $@
