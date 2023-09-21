command -v aws >/dev/null 2>&1 || {
    echo "ERROR: aws cli not found!"
    exit 1
}

printenv | grep AWS

echo -e "$AWS_ACCESS_KEY_ID\n$AWS_ACCESS_KEY_SECRET\n$AWS_DEFAULT_REGION\njson" | aws configure
