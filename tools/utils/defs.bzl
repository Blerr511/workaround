def substitution_file(name, file, data = [], substitutions = {}, **kwargs):
    export_commands = []
    for key, value in substitutions.items():
        export_commands.append("export {}={}".format(key, value))

    cmd_string = """
        {exports}
        envsubst < $(location {file}) > $@
    """.format(
        exports = "\n".join(export_commands),
        file = file,
    )

    native.genrule(
        name = name,
        srcs = [file] + data,
        outs = ["generated_{}".format(file)],
        cmd = cmd_string,
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
