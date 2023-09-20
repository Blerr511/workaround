_bazel_complete() {
    local cur prev commands
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    commands="build run test"

    if [[ $COMP_CWORD -eq 1 ]]; then
        COMPREPLY=( $(compgen -W "$commands" -- "$cur") )
        return 0
    fi

    local now=$(date +%s)
    if [[ $((now - _bazel_cache_time)) -gt 300 ]]; then
        unset _bazel_cache_results
    fi

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
        _bazel_cache_results=$(bazel query "kind('.*_binary', //...)" --output label 2>/dev/null)
        _bazel_cache_time=$(date +%s)
    fi

    COMPREPLY=( $(compgen -W "${_bazel_cache_results}" -- "$cur") )
    return 0
}

_bazel_cache_time=0
_bazel_cache_results=""
complete -F _bazel_complete bazel
