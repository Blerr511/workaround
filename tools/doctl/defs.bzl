def doctl_binary(name, env = {}, toolchains = [], **kwargs):
    default_env = {
        "DIGITALOCEAN_CONTEXT": "$(DIGITALOCEAN_CONTEXT)",
        "XDG_CONFIG_HOME": "$(XDG_CONFIG_HOME)",
    }

    default_env.update(env)

    native.sh_binary(
        name = name,
        env = default_env,
        toolchains = [
            "//sandbox:do_env_vars",
            "//sandbox:workspace_env_vars",
        ] + toolchains,
        **kwargs
    )
