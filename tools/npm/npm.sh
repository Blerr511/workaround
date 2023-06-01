#!/bin/bash

command -v npm >/dev/null 2>&1 || {
    echo "ERROR: npm cli not found!"
    exit 1
}

npm $@
