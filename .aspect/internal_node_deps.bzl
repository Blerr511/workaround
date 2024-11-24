load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def load_node_repositories():
    http_archive(
        name = "aspect_rules_ts",
        sha256 = "9acd128abe77397505148eaa6895faed57839560dbf2177dd6285e51235e2724",
        strip_prefix = "rules_ts-3.3.1",
        url = "https://github.com/aspect-build/rules_ts/releases/download/v3.3.1/rules_ts-v3.3.1.tar.gz",
    )
    
    http_archive(
        name = "aspect_rules_swc",
        sha256 = "d63d7b283249fa942f78d2716ecff3edbdc10104ee1b9a6b9464ece471ef95ea",
        strip_prefix = "rules_swc-2.0.0",
        url = "https://github.com/aspect-build/rules_swc/releases/download/v2.0.0/rules_swc-v2.0.0.tar.gz",
    )
