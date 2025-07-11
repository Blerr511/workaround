def substitution_file(name, file, outs = None, data = [], substitutions = {}, **kwargs):
    export_commands = []
    shell_format = ""
    for key, value in substitutions.items():
        export_commands.append("export {}={}".format(key, value))
        shell_format = "{shell_format} {p}{s}{key}{e}".format(shell_format = shell_format, key = key, p = "$$", s = "{", e = "}")

    if outs == None:
        outs = "generated_{}".format(file)

    cmd = select({
        "@platforms//os:osx": """
            {exports}
            $(location @envsubst_darwin_amd64//:envsubst_bin) '{shell_format}' < $(location {file}) > $@
        """.format(
            exports = "\n".join(export_commands),
            file = file,
            shell_format = shell_format,
        ),
        "@platforms//os:linux": """
            {exports}
            $(location @envsubst_linux_amd64//:envsubst_bin) '{shell_format}' < $(location {file}) > $@
        """.format(
            exports = "\n".join(export_commands),
            file = file,
            shell_format = shell_format,
        ),
    })

    native.genrule(
        name = name,
        srcs = [file] + data,
        outs = [outs],
        cmd = cmd,
        tools = [
            "@envsubst_darwin_amd64//:envsubst_bin",
            "@envsubst_linux_amd64//:envsubst_bin",
            "@envsubst_darwin_arm64//:envsubst_bin",
            "@envsubst_linux_arm64//:envsubst_bin",
        ],
        **kwargs
    )

def _symlink_node_modules_impl(ctx):
    # Create a symlink for each file in srcs
    for src in ctx.files.srcs:
        ctx.actions.symlink(
            output = ctx.actions.declare_symlink(ctx.attr.output + "/" + src.basename),
            target_path = src.basename,
        )

    return DefaultInfo()

symlink_node_modules = rule(
    implementation = _symlink_node_modules_impl,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
        "output": attr.string(default = "node_modules"),
    },
)
