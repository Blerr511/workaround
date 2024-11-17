load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def load_node_repositories():
    http_archive(
        name = "aspect_rules_ts",
        sha256 = "d23ba2b800493a83c3ec9e300e01c74a7b0a58c08893e681417e2c2f48f8c4bb",
        strip_prefix = "rules_ts-3.2.0",
        url = "https://github.com/aspect-build/rules_ts/releases/download/v3.2.0/rules_ts-v3.2.0.tar.gz",
    )
    http_archive(
        name = "aspect_rules_swc",
        sha256 = "d63d7b283249fa942f78d2716ecff3edbdc10104ee1b9a6b9464ece471ef95ea",
        strip_prefix = "rules_swc-2.0.0",
        url = "https://github.com/aspect-build/rules_swc/releases/download/v2.0.0/rules_swc-v2.0.0.tar.gz",
    )
