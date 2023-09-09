def _copy_files_implementation(ctx):
    output_files = []
    for src in ctx.files.srcs:
        output = ctx.actions.declare_file(src.basename)
        ctx.actions.run_shell(
            outputs = [output],
            inputs = [src],
            command = "cp $1 $2",
            arguments = [src.path, output.path]
        )
        output_files.append(output)

    return DefaultInfo(files = depset(output_files))
    return DefaultInfo(files = depset([output]))

copy_files = rule(
    implementation = _copy_files_implementation,
    attrs = {
        "srcs": attr.label_list(allow_files = True),
    },
)
