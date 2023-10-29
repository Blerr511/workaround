#!/bin/bash

set -e

if [ -z "$DIGITALOCEAN_ACCESS_TOKEN_PATH" ]; then
    echo "DIGITALOCEAN_ACCESS_TOKEN_PATH not specified!"
    exit 1
fi

export DIGITALOCEAN_ACCESS_TOKEN=$(cat $DIGITALOCEAN_ACCESS_TOKEN_PATH)

printf "%s\n" "$DIGITALOCEAN_ACCESS_TOKEN" | doctl auth init &

PID=$!

sleep 3

kill -INT $PID

sleep 10
