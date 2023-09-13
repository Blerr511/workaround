command -v eksctl >/dev/null 2>&1 || {
  echo "ERROR: eksctl cli not found!"
  exit 1
}

eksctl $@

