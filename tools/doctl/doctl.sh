#!/bin/bash

command -v doctl >/dev/null 2>&1 || {
    echo "ERROR: doctl cli not found!"
    exit 1
}

doctl $@
