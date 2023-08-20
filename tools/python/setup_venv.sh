#!/bin/bash

python3 -m venv "$VENV_DIR"

echo "Venv directory: $VENV_DIR"

source "$VENV_DIR/bin/activate"

START_DIR=$BUILD_WORKSPACE_DIRECTORY

# Find requirements.txt files and run pip install on each
find "$START_DIR" -name requirements.txt | while read file; do
    echo "Installing requirements from $file..."
    pip install -r "$file"
    if [ $? -ne 0 ]; then
        echo "Failed to install requirements from $file"
    else
        echo "Successfully installed requirements from $file"
    fi
done
