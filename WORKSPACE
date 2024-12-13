node_version = "18.18.2"

python_version = "3.10"

load("//.aspect:internal_lib_deps.bzl", "load_lib_repositories")

load_lib_repositories()

load("//.aspect:internal_node_deps.bzl", "load_node_repositories")

load_node_repositories()

load("//.aspect:internal_py_deps.bzl", "load_py_repositories")

load_py_repositories()

load("//.aspect:internal_container_deps.bzl", "load_container_repositories")

load_container_repositories()

## Aspect rules py

load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies", "aspect_bazel_lib_register_toolchains", "register_copy_directory_toolchains", "register_copy_to_directory_toolchains")

aspect_bazel_lib_dependencies()

aspect_bazel_lib_register_toolchains()

load("@aspect_rules_py//py:repositories.bzl", "rules_py_dependencies")

rules_py_dependencies()

load("@aspect_rules_py//py:toolchains.bzl", "rules_py_toolchains")

rules_py_toolchains()

load("@rules_python//python:repositories.bzl", "py_repositories", "python_register_toolchains")

python_register_toolchains(
    name = "python3_10",
    python_version = python_version,
)

py_repositories()

rules_py_dependencies()

rules_py_toolchains()

load("@python3_10//:defs.bzl", "interpreter")
load("@rules_python//python:pip.bzl", "pip_parse")

pip_parse(
    name = "image_gen_deps",
    python_interpreter_target = interpreter,
    requirements_lock = "//server/apps/image-gen:requirements.txt",
)

load("@image_gen_deps//:requirements.bzl", install_image_gen_deps = "install_deps")

install_image_gen_deps()

pip_parse(
    name = "prompt_deps",
    python_interpreter_target = interpreter,
    requirements_lock = "//server/apps/prompt:requirements.txt",
)

load("@prompt_deps//:requirements.bzl", install_prompt_deps = "install_deps")

install_prompt_deps()

load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    ts_integrity = "sha512-cW9T5W9xY37cc+jfEnaUvX91foxtHkza3Nw3wkoF4sSlKn0MONdkdEndig/qPBWXNkmplh3NzayQzCiHM4/hqw==",
    ts_version_from = "//:package.json",
)

load("@aspect_rules_swc//swc:repositories.bzl", "swc_register_toolchains", LATEST_SWC_VERSION = "LATEST_VERSION")

swc_register_toolchains(
    name = "swc",
    swc_version = LATEST_SWC_VERSION,
)

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = node_version,
)

load("@aspect_rules_js//npm:repositories.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
    pnpm_version = "8.3.1",
    prod = False,
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

load(
    "@io_bazel_rules_docker//toolchains/docker:toolchain.bzl",
    docker_toolchain_configure = "toolchain_configure",
)

docker_toolchain_configure(
    name = "docker_config",
    docker_flags = [
        "--log-level=debug",
    ],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "node_base",
    registry = "index.docker.io",
    repository = "library/node",
    tag = node_version,
)

container_pull(
    name = "python_base",
    registry = "index.docker.io",
    repository = "library/python",
    tag = "3.9.10",
)

load(
    "@io_bazel_rules_docker//python3:image.bzl",
    _py_image_repos = "repositories",
)

_py_image_repos()

load("@io_bazel_rules_k8s//k8s:k8s.bzl", "k8s_repositories")

k8s_repositories()

load("@io_bazel_rules_k8s//toolchains/kubectl:kubectl_configure.bzl", "kubectl_configure")
# load("@io_bazel_rules_k8s//k8s:k8s_go_deps.bzl", k8s_go_deps = "deps")

# k8s_go_deps()

kubectl_configure(name = "local_k8s_config")
