build --action_env=WR_TMP_DATA=/workspace/.wr
build --sandbox_writable_path=/workspace/.wr
build --remote_timeout=3600
build --google_default_credentials=true
build --google_credentials=/workspace/.wr/service_account_credentials.json
build --remote_cache=https://storage.googleapis.com/bzl-remote-cache
