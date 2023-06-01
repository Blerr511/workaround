#!/bin/bash

command -v docker >/dev/null 2>&1 || {
    echo "ERROR: docker cli not found!"
    exit 1
}

docker $@
