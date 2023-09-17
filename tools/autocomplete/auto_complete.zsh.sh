# Custom Bazel autocompletion for zsh with caching
_bazel_complete() {
    local curcontext="$curcontext" state line
    typeset -A opt_args

    local now=$(date +%s)
    if [[ $((now - _bazel_cache_time)) -gt 300 ]]; then
        unset _bazel_cache_results
    fi

    _arguments -C \
        '1: :->subcmds' \
        '*:: :->args'

    case $state in
    subcmds)
        local commands=("build" "run" "test")
        _describe "command" commands
        ;;
    args)
        local workspace_root=""
        local dir="$PWD"

        while [[ "$dir" != "/" ]]; do
            if [[ -f "$dir/WORKSPACE" ]] || [[ -f "$dir/WORKSPACE.bazel" ]]; then
                workspace_root="$dir"
                break
            fi
            dir="$(dirname "$dir")"
        done

        if [[ -z "$workspace_root" ]]; then
            return 1
        fi

        if [[ -z "$_bazel_cache_results" ]]; then
            _bazel_cache_results=($(bazel query "kind('.*_binary', //...)" --output label 2>/dev/null | sed 's#^//##'))
            _bazel_cache_time=$(date +%s)
        fi

        local escaped_results=()
        for target in "${_bazel_cache_results[@]}"; do
            escaped_results+=("//${target//:/\\:}")
        done

        _describe "targets" escaped_results
        ;;
    esac
}

chpwd() {
    unset _bazel_cache_results
}

compdef _bazel_complete bazel
