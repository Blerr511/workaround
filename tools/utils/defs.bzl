def substitution_file(name, file, outs = None, data = [], substitutions = {}, **kwargs):
    export_commands = []
    shell_format = ""
    for key, value in substitutions.items():
        export_commands.append("export {}={}".format(key, value))
        print(key)
        shell_format = "{shell_format} {p}{s}{key}{e}".format(shell_format = shell_format, key = key,p = "$$",s = "{",e = "}")
    print(shell_format)
    
    cmd_string = """
        {exports}
        envsubst '{shell_format}' < $(location {file}) > $@
    """.format(
        exports = "\n".join(export_commands),
        file = file,
        shell_format = shell_format,
    )

    if outs == None:
        outs = "generated_{}".format(file)

    native.genrule(
        name = name,
        srcs = [file] + data,
        outs = [outs],
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
