"""Adapter from the Babel CLI to the ts_project#transpiler interface

See https://bazelbuild.github.io/rules_nodejs/TypeScript.html#ts_project-transpiler
"""

load("@npm//:@babel/cli/package_json.bzl", "bin")

def babel(name, srcs, out_dir = None, presets = {}, **kwargs):
    # rules_js runs under the output tree in bazel-out/[arch]/bin
    execroot = "../../.."

    outs = []

    # In this example we compile each file individually on .ts src files.
    # The src files must be .ts files known at the loading phase in order
    # to setup the babel compilation for each .ts file.
    #
    # You might instead use a single babel_cli call to compile
    # a directory of sources into an output directory,
    # but you'll need to:
    # - make sure the input directory only contains files listed in srcs
    # - make sure the js_outs are actually created in the expected path
    for idx, src in enumerate(srcs):
        if not src.endswith(".ts") and not src.endswith(".tsx"):
            fail("babel example transpiler only supports source .ts files")

        # Predict the output paths where babel will write
        if out_dir:
            js_out = "%s/%s" % (out_dir, src.replace(".tsx", ".ts").replace(".ts", ".js"))
            map_out = "%s/%s" % (out_dir, src.replace(".tsx", ".ts").replace(".ts", ".js.map"))
        else:
            js_out = src.replace(".tsx", ".ts").replace(".ts", ".js")
            map_out = src.replace(".tsx", ".ts").replace(".ts", ".js.map")

        presets_names = []
        preset_deps = []

        for key in presets:
            presets_names.append(key)
            preset_deps.append(presets[key])

        # see https://babeljs.io/docs/en/babel-cli
        args = [
            "{}/$(location {})".format(execroot, src),
            "--out-file",
            "{}/$(location {})".format(execroot, js_out),
            "--source-maps",
        ]

        if len(presets_names) != 0:
            presets_str = ",".join(presets_names)
            args.append("--presets={}".format(presets_str))

        bin.babel(
            name = "{}_{}".format(name, idx),
            srcs = [
                src,
            ] + preset_deps,
            outs = [js_out, map_out],
            args = args,
            **kwargs
        )

        outs.append(js_out)
        outs.append(map_out)

    # The target whose default outputs are the js files which ts_project() will reference
    native.filegroup(
        name = name,
        srcs = outs,
    )
