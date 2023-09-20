#!/bin/bash

find . -type f -name "*.sh" -exec chmod +x {} \;

echo "All .sh files have been made executable."
