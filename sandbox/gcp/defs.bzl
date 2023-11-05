def secret_version(name, secret, toolchains = [], visibility = [], version = "latest", **kwargs):
    native.genrule(
        name = name,
        srcs = ["//tools/gcloud:gcloud.sh"],
        outs = [".%s_secret_data" % name],
        cmd = """
        export CLOUDSDK_CONFIG=$(GCP_CLOUDSDK_CONFIG)
        export PROJECT_ID=$(GCP_PROJECT_ID)
        $(location //tools/gcloud:gcloud.sh) secrets versions access {version} --secret="{secret}" --out-file=$@
        """.format(version = version, secret = secret),
        tags = ["requires-network", "gcp-secret"],
        toolchains = [
            "//sandbox:gcp_env_vars",
            "//sandbox:workspace_env_vars",
        ] + toolchains,
        visibility = ["//visibility:public"],
        **kwargs
    )

    native.genrule(
        name = "%s.base64" % name,
        srcs = [":%s" % name],
        outs = [".%s_base64_secret_data" % name],
        visibility = ["//visibility:public"],
        cmd = """
        cat $(location :{name}) | base64 | tr -d '[:space:]' > $@
        """.format(name = name),
        **kwargs
    )
