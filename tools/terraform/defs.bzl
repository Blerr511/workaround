def tf(name, vars = None, env = None, tags = [], **kwargs):
    if vars == None:
        vars = dict()
    if env == None:
        env = dict()

    tf_vars = dict()
    for k, v in vars.items():
        new_key = "TF_VAR_" + k
        tf_vars[new_key] = v

    merged_env = dict()
    for k, v in env.items():
        merged_env[k] = v
    for k, v in tf_vars.items():
        merged_env[k] = v

    native.sh_binary(
        name = name,
        env = merged_env,
        srcs = ["//tools/terraform:terraform"],
        tags = ["requires-network"] + tags,
        **kwargs
    )
