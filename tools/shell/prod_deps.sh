#!/bin/bash

# Check the number of arguments
if [ "$#" -ne 2 ]; then
    echo "You must enter exactly 2 command line arguments" >&2
    exit 1
fi

# Check if files exist
for var in "$@"; do
    if [ ! -f "$var" ]; then
        echo "$var does not exist" >&2
        exit 1
    fi
done

# Define the package.json and version.json paths
PACKAGE_JSON=$1
VERSION_JSON=$2

# Read the new versions
NEW_VERSIONS=$(jq -c '.' ${VERSION_JSON})

# Set the initial contents to the current package.json
output=$(cat ${PACKAGE_JSON})

# Iterate over each key-value pair
for row in $(echo "${NEW_VERSIONS}" | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]"); do
    KEY=$(echo $row | cut -d'=' -f1)
    VALUE=$(echo $row | cut -d'=' -f2)

    # Replace the versions in the package.json
    output=$(echo ${output} | jq --arg KEY "$KEY" --arg VALUE "$VALUE" '
        if ((.dependencies[$KEY]? | select(type == "string") | startswith("workspace:")) // false) then .dependencies[$KEY]=$VALUE
        elif ((.devDependencies[$KEY]? | select(type == "string") | startswith("workspace:")) // false) then .devDependencies[$KEY]=$VALUE
        else . end
    ')
done

echo ${output}
