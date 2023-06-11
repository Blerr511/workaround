load("@io_bazel_rules_docker//container:container.bzl", "container_image", "container_layer", "container_push")
load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

def format_deps(deps):
    deps_str = ""
    for dep in deps:
        deps_str += "$(location {}) ".format(dep)
    return deps_str.rstrip()  # remove trailing space

def js_image(name, srcs, deps, package_json, entry_point):
    native.filegroup(
        name = "{}_json".format(name),
        srcs = [package_json],
        visibility = ["//visibility:private"],
    )

    deps_str = format_deps(deps)

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
        name = "{name}_image".format(name = name),
        base = "@node_base//image",
        tars = ["{name}_ts_tar".format(name = name)],
        layers = ["{name}_app_layer".format(name = name), "{name}_root_layer".format(name = name)],
        cmd = """
        ls /app/{package}/
        npm install -g pnpm
        mv /app/{package}/prod_package.json /app/{package}/package.json
        ls /app/{package}/
        cat /app/{package}/package.json
        cd /app && pnpm install --prod
        node /app/{package}/{entry_point}
        """.format(entry_point = entry_point, package = native.package_name()),
        visibility = ["//visibility:public"],
    )
    # TODO configure image push
    container_push(
        name = "{name}_image_push".format(name = name),
        image = "{name}_image".format(name = name),
        format = "Docker",
        registry = "$(GCP_DOCKER_ARTIFACTS_LOCATION).pkg.dev",
        repository = "$(GCP_PROJECT_ID)/$(GCP_DOCKER_ARTIFACTS_REPOSITORY)/$(GCP_DOCKER_BACKEND_IMAGE)",
        toolchains = ["//sandbox:gcp_env_vars"],
    )
