def copy_to_source(name, source, destionation, data, **kwargs):
    native.sh_binary(
        name = name,
        srcs = ["//tools/bazel/copy-to-source:copy.sh"],
        args = [
            source,
            destionation,
        ],
        data = data,
        **kwargs
    )
