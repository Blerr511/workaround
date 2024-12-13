load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def load_node_repositories():
    http_archive(
        name = "aspect_rules_ts",
        sha256 = "cff3137b043ff6bf1a2542fd9691dc762432370cd39eb4bb0756d288de52067d",
        strip_prefix = "rules_ts-3.3.2",
        url = "https://github.com/aspect-build/rules_ts/releases/download/v3.3.2/rules_ts-v3.3.2.tar.gz",
    )

    http_archive(
        name = "aspect_rules_swc",
        sha256 = "d63d7b283249fa942f78d2716ecff3edbdc10104ee1b9a6b9464ece471ef95ea",
        strip_prefix = "rules_swc-2.0.0",
        url = "https://github.com/aspect-build/rules_swc/releases/download/v2.0.0/rules_swc-v2.0.0.tar.gz",
    )
