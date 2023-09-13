command -v kubectl >/dev/null 2>&1 || {
  echo "ERROR: kubect cli not found!"
  exit 1
}

kubectl $@

