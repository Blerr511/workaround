load("@io_bazel_rules_docker//container:container.bzl", "container_image", "container_layer", "container_push")
load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")
load("@io_bazel_rules_docker//docker/util:run.bzl", "container_run_and_commit")

def format_deps(deps):
    deps_str = ""
    for dep in deps:
        deps_str += "$(location {}) ".format(dep)
    return deps_str.rstrip()  # remove trailing space

def js_image(name, srcs, package_json, image, tag = "latest", deps = [], post_install = [], start_cmd = "node"):
    native.filegroup(
        name = "{}_json".format(name),
        srcs = [package_json],
        visibility = ["//visibility:private"],
    )

    deps_str = format_deps(deps)

    if len(deps) > 0:
        native.genrule(
            name = "{}_prod_package_json".format(name),
            srcs = [
                ":{}_json".format(name),
            ] + deps,  # List all package.json as sources
            outs = ["prod_package.json"],  # Output file
            cmd = """
            SCRIPT_LOC=$(location //tools/shell:prod_deps)
            VERSION_SCRIPT_LOC=$(location //tools/shell:versions_json)

            mkdir tmp
            touch tmp/version.json

            VERSION_JSON=tmp/version.json

            $$VERSION_SCRIPT_LOC {deps_str} > $$VERSION_JSON

            $$SCRIPT_LOC $(location :{name}_json) $$VERSION_JSON > $@

            """.format(name = name, deps_str = deps_str),
            tools = [
                "//tools/shell:versions_json",
                "//tools/shell:prod_deps",
            ],
            visibility = ["//visibility:private"],
        )
    else:
        native.genrule(
            name = "{}_prod_package_json".format(name),
            srcs = [
                ":{}_json".format(name),
            ] + deps,  # List all package.json as sources
            outs = ["prod_package.json"],  # Output file
            cmd = """
            cat $(location :{name}_json) > $@
            """.format(name = name, deps_str = deps_str),
            visibility = ["//visibility:private"],
        )

    container_layer(
        name = "{name}_root_layer".format(name = name),
        directory = "/app",
        files = [
            "//:package.json",
            "//:pnpm-lock.yaml",
            "//:pnpm-workspace.yaml",
            "//tools/gcloud:npmrc",
        ],
        visibility = ["//visibility:private"],
    )

    pkg_tar(
        name = "{name}_ts_tar".format(name = name),
        srcs = srcs,
        package_dir = "/app/{package}".format(package = native.package_name()),
        visibility = ["//visibility:private"],
    )

    container_layer(
        name = "{name}_app_layer".format(name = name),
        directory = "/app/{package}".format(package = native.package_name()),
        files = ["{}_prod_package_json".format(name)],
        visibility = ["//visibility:private"],
    )

    container_image(
        name = "{name}_image_base".format(name = name),
        base = "@node_base//image",
        tars = ["{name}_ts_tar".format(name = name)],
        layers = ["{name}_app_layer".format(name = name), "{name}_root_layer".format(name = name)],
        visibility = ["//visibility:public"],
    )

    container_run_and_commit(
        name = "{name}_install_node_modules".format(name = name),
        commands = [
            "npm install -g pnpm",
            "mv /app/{package}/prod_package.json /app/{package}/package.json".format(package = native.package_name()),
            "cd /app && pnpm install",
        ] + post_install,
        image = ":{name}_image_base.tar".format(name = name),
    )

    container_image(
        name = "{name}_image".format(name = name),
        base = ":{name}_install_node_modules".format(name = name),
        cmd = """
        cd /app/{package}
        {start}
        """.format(package = native.package_name(), start = start_cmd),
        visibility = ["//visibility:public"],
    )
