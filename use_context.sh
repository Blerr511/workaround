#!/bin/bash

VALID_ENUM=("dev")

containsElement() {
    local e match="$1"
    shift
    for e; do [[ "$e" == "$match" ]] && return 0; done
    return 1
}

if [ "$#" -eq 1 ]; then
    ARGUMENT="$1"
    containsElement "$ARGUMENT" "${VALID_ENUM[@]}"
    if [ $? -eq 0 ]; then
        shopt -s dotglob
        mkdir -p $(pwd)/.aspect/bazelrc/current
        cp -r $(pwd)/.aspect/bazelrc/$ARGUMENT/* $(pwd)/.aspect/bazelrc/current/
    else
        echo "Invalid argument. Please provide one of the following values: ${VALID_ENUM[*]}"
        exit 1
    fi
else
    shopt -s dotglob
    rm -rf .aspect/bazelrc/current/*
fi
