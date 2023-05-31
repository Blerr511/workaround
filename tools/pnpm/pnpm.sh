#!/bin/bash

command -v pnpm >/dev/null 2>&1 || {
    echo "ERROR: pnpm cli not found!"
    exit 1
}

pnpm $@
