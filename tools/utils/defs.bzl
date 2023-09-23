def substitution_file(name, file, data = [], substitutions = {}, **kwards):
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
        toolchains = ["//sandbox:aws_env_vars"],
    )
