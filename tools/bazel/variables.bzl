def _import_env_vars_impl(ctx):
    mapping_dict = {}

    for _, (make_var_name, env_var_name) in enumerate(ctx.attr.vars_mapping.items()):
        if not (env_var_name in ctx.configuration.default_shell_env):
            fail("{var_name} not found in local environment. Check your .bazelrc/.bazelrc.local or the 'vars_mapping' in the 'import_env_vars_rule' rule".format(var_name = env_var_name))

        value = ctx.configuration.default_shell_env[env_var_name]

        # Enable custom substitution logic
        for _, subst_env_name in enumerate(ctx.configuration.default_shell_env):
            if (value.find("$(" + subst_env_name + ")") != -1):
                value = value.replace("$(" + subst_env_name + ")", ctx.configuration.default_shell_env[subst_env_name])

        mapping_dict[make_var_name] = value

    # Create the .env file content
    content = ""
    for make_var_name, value in mapping_dict.items():
        content += make_var_name + "=" + value + "\n"

    # Write the content to the .env file
    ctx.actions.write(ctx.outputs.env, content)

    return [
        platform_common.TemplateVariableInfo(mapping_dict),
    ]

import_env_vars = rule(
    implementation = _import_env_vars_impl,
    attrs = {
        "vars_mapping": attr.string_dict(allow_empty = False, doc = "Provide mapping dictionary in the format { [MAKE_VAR]:[EXPORTED_ENV_VAR] }"),
    },
    outputs = {"env": "%{name}.env"},
)

# def _env_file_impl(ctx):
#     content = ""
#     for var_name in ctx.attr.vars_mapping:
#         content += var_name + "=" + "$(var_name)" + "\n"
#     ctx.actions.write(ctx.outputs.env, content)

# env_file = rule(
#     implementation = _env_file_impl,
#     attrs = {
#         "vars_mapping": attr.string_list(allow_empty = False),
#     },
#     outputs = {"env": "%{name}.env"},
# )
# 0
