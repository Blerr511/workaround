#!/bin/bash
# Check the number of arguments
if [ "$#" -ne 1 ]; then
    echo "You must enter exactly 1 command line arguments" >&2
    exit 1
fi


# Check if files exist
for var in "$@"; do
    if [ ! -f "$var" ]; then
        echo "$var does not exist" >&2
        exit 1
    fi
done

PACKAGE_JSON=$1

NEW_VERSIONS=$(cat ${PACKAGE_JSON} | jq .version)

echo $NEW_VERSIONS