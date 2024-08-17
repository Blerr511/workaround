load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def load_node_repositories():
    http_archive(
        name = "aspect_rules_js",
        sha256 = "6b7e73c35b97615a09281090da3645d9f03b2a09e8caa791377ad9022c88e2e6",
        strip_prefix = "rules_js-2.0.0",
        url = "https://github.com/aspect-build/rules_js/releases/download/v2.0.0/rules_js-v2.0.0.tar.gz",
    )

    http_archive(
        name = "aspect_rules_ts",
        sha256 = "ee7dcc35faef98f3050df9cf26f2a72ef356cab8ad927efb1c4dc119ac082a19",
        strip_prefix = "rules_ts-3.0.0",
        url = "https://github.com/aspect-build/rules_ts/releases/download/v3.0.0/rules_ts-v3.0.0.tar.gz",
    )

    http_archive(
        name = "aspect_rules_swc",
        sha256 = "d63d7b283249fa942f78d2716ecff3edbdc10104ee1b9a6b9464ece471ef95ea",
        strip_prefix = "rules_swc-2.0.0",
        url = "https://github.com/aspect-build/rules_swc/releases/download/v2.0.0/rules_swc-v2.0.0.tar.gz",
    )
