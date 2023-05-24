#!/bin/bash

# Get the package path from the first positional argument
PACKAGE_PATH="$1"

echo $PACKAGE_PATH

# If the package path is not provided or does not exist, exit the script with an error
if [[ -z "$PACKAGE_PATH" ]] || [[ ! -d "$PACKAGE_PATH" ]]; then
  echo "Error: Invalid or no package path provided" && exit 1
fi

# Check if nodemon.json exists in the package directory
if [[ ! -f "$PACKAGE_PATH/nodemon.json" ]]; then
  echo "Error: nodemon.json not found in package directory" && exit 1
fi

# Read the config from nodemon.json
CONFIG_JSON=$(cat "$PACKAGE_PATH/nodemon.json")

# Parse the config using jq
EXEC=$(echo "$CONFIG_JSON" | jq -r '.exec')
EXT=$(echo "$CONFIG_JSON" | jq -r '.ext')

# Modify the watch paths
WATCH_PATHS=($(echo "$CONFIG_JSON" | jq -r '.watch[]'))
for i in "${!WATCH_PATHS[@]}"; do
  # If the path starts with "./", prepend the package path
  if [[ ${WATCH_PATHS[$i]} = "./"* ]]; then
    WATCH_PATHS[$i]="$PACKAGE_PATH/${WATCH_PATHS[$i]}"
  fi
done

# Check if nodemon is installed
command -v nodemon >/dev/null 2>&1 || {
  echo "WARNING: nodemon not found! Installing globally"
  npm install -g nodemon
}

# Construct the watch options for nodemon
WATCH_OPTS=""
for path in "${WATCH_PATHS[@]}"; do
  WATCH_OPTS+=" --watch $path"
done

echo $WATCH_OPTS;

# Run nodemon with the extracted and modified configuration
nodemon $WATCH_OPTS --exec "$EXEC" --ext $EXT
