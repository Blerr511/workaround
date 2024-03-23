#!/bin/bash

command -v prisma >/dev/null 2>&1 || {
    echo "WARNING: prisma not found! Installing globally"
    npm install -g prisma
}

source ./preapare_env.sh

pnpm prisma $@
