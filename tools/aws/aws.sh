command -v aws >/dev/null 2>&1 || {
  echo "ERROR: aws cli not found!"
  exit 1
}

# case $@ in

# *"auth login"*)
#   ;;
# esac

aws $@

