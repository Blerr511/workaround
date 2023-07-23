#!/bin/bash

command -v gcloud >/dev/null 2>&1 || {
  echo "ERROR: gcloud cli not found!"
  exit 1
}

case $@ in

*"auth login"*)
  cd $WORKDIR
  gcloud $@ &&
    echo "Set '$PROJECT_ID' as a default project for config '$CLOUDSDK_CONFIG'..." &&
    gcloud config set project $PROJECT_ID &&
    echo "Successfully authenicated!" &&
    exit 0
  ;;
esac

gcloud $@
