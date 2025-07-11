load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

build_file_content = """filegroup(
    name = "envsubst_bin",
    srcs = ["envsubst"],
    visibility = ["//visibility:public"],
)
"""

def load_envsubst_deps():
    http_archive(
        name = "envsubst_darwin_amd64",
        urls = ["https://github.com/a8m/envsubst/releases/download/v1.4.1/envsubst-v1.4.1-darwin-amd64.tar.gz"],
        strip_prefix = "",
        build_file_content = build_file_content,
        integrity = "sha256-eXDbjvbuEwSnMsnT/7/4v/RZFzZGcWdzHUxTn7AviCI=",
    )

    http_archive(
        name = "envsubst_darwin_arm64",
        urls = ["https://github.com/a8m/envsubst/releases/download/v1.4.1/envsubst-v1.4.1-darwin-arm64.tar.gz"],
        strip_prefix = "",
        build_file_content = build_file_content,
        integrity = "sha256-izAiepusxq6/KsDMy62Twj/UOhtJcJGDja7FNIhrDsU=",
    )

    http_archive(
        name = "envsubst_linux_amd64",
        urls = ["https://github.com/a8m/envsubst/releases/download/v1.4.1/envsubst-v1.4.1-linux-amd64.tar.gz"],
        strip_prefix = "",
        build_file_content = build_file_content,
    )

    http_archive(
        name = "envsubst_linux_arm64",
        urls = ["https://github.com/a8m/envsubst/releases/download/v1.4.1/envsubst-v1.4.1-linux-arm64.tar.gz"],
        strip_prefix = "",
        integrity = "sha256-dMc4dgG1mgm+W6Dxh+nOCCfopiqM/UZLdGm1Q6yKmYs=",
        build_file_content = build_file_content,
    )
