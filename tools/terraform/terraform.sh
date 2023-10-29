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

[[ -z "$TF_VAR_gcp_terraform_bucket" ]] && echo "Error: TF var gcp_terraform_bucket is not set" && exit 1

echo "Terraform workdir: $WORKDIR"

if [ -n "$KUBECONFIG" ]; then
  echo "Using KUBECONFIG: $KUBECONFIG"
  export KUBECONFIG=$(pwd)/$KUBECONFIG
  export KUBECONFIGPATH=$KUBECONFIG
fi

cd $WORKDIR

case $@ in
*"init"*)
  echo "Running terraform with buckend config 'bucket=$TF_VAR_gcp_terraform_bucket'"
  terraform $@ -backend-config="bucket=$TF_VAR_gcp_terraform_bucket"
  exit 0
  ;;
esac

terraform $@
