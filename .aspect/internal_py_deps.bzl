load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def load_py_repositories():
    http_archive(
        name = "aspect_rules_py",
        sha256 = "59446563a724b1cb449a604c8fbcd85e18a7001e9bb230ef59d78154886ad8cc",
        strip_prefix = "rules_py-0.7.3",
        url = "https://github.com/aspect-build/rules_py/releases/download/v0.7.3/rules_py-v0.7.3.tar.gz",
    )
