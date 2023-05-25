#!/bin/bash

docker info >/dev/null 2>&1 || (echo "ERROR: Docker host is not running!" && exit -1)

command -v docker-compose >/dev/null 2>&1 || {
  echo "ERROR: docker-compose cli not found!"
  exit 1
}

docker-compose $@
