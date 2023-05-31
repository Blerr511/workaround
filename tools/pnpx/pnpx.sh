#!/bin/bash

command -v pnpx >/dev/null 2>&1 || {
    echo "ERROR: pnpx cli not found!"
    exit 1
}


# check if PACKAGE_PATH environment variable is provided and is a directory
# if [ -n "$PACKAGE_PATH" ] && [ -d "$PACKAGE_PATH" ]; then
#     cd "$PACKAGE_PATH" || {
#         echo "ERROR: Failed to change directory to ${PACKAGE_PATH}!"
#         exit 1
#     }
# fi


pnpx $@
