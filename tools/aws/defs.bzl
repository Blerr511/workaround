def user_arn(name, acces_key_id, access_secret, toolchains = [], srcs = [], tags = []):
    native.genrule(
        name = name,
        outs = [".{}_arn.txt".format(name)],
        srcs = ["//tools/aws:aws.sh"] + srcs,
        tags = ["requires-network"] + tags,
        cmd = """
            export AWS_ACCESS_KEY_ID={acces_key_id}
            export AWS_SECRET_ACCESS_KEY={access_secret}
            $(location //tools/aws:aws.sh) sts get-caller-identity | jq ".Arn" | sed "s/\\"//g" > $@
        """.format(access_secret = access_secret, acces_key_id = acces_key_id),
        toolchains = ["//sandbox:aws_env_vars"] + toolchains,
    )
