#!/bin/bash

# Check the number of arguments
if [ "$#" -lt 1 ]; then
    echo "You must enter at least 1 command line argument" >&2
    exit 1
fi

# Initialize an empty JSON object
output='{}'

# Iterate over each file
for var in "$@"; do
    if [ ! -f "$var" ]; then
        echo "$var does not exist" >&2
        exit 1
    fi

    # Get the package name and version
    PACKAGE_NAME=$(jq -r '.name' $var)
    PACKAGE_VERSION=$(jq -r '.version' $var)

    # Create a new JSON object for the package-version pair
    package_json=$(jq -n --arg pn "$PACKAGE_NAME" --arg pv "$PACKAGE_VERSION" '{($pn): $pv}')

    # Merge the new JSON object into the output JSON object
    output=$(jq -s '.[0] * .[1]' <<< "$output $package_json")
done

# Echo the output
echo "${output}"
