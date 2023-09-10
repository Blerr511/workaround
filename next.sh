#!/bin/bash

set -e

package=$(echo $1 | sed 's/\.\///')

echo "Package $package"

echo "Installing node_modules"

pnpm install

echo "Generacting env file"

cat $(bazel build //$package:env 2>&1 | grep "\.env" | awk '{ print $1 }') > $package/.env.local

echo "===========ENV=========="

cat $package/.env.local

echo "===========END=========="

cd $package

pnpm run dev
