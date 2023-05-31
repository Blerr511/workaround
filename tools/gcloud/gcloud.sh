#!/bin/bash

command -v gcloud >/dev/null 2>&1 || {
  echo "ERROR: gcloud cli not found!"
  exit 1
}

gcloud $@
