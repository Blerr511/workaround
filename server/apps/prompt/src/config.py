import os


def get_config(key: str):
    value = os.getenv(key)

    if value is not None and value.startswith("file:"):
        d = open(value.replace("file:", ""))
        value = d.read()

    return value


openai_api_key = get_config("OPENAI_API_KEY")

redis_host = get_config("REDIS_HOST")

redis_port = int(get_config("REDIS_PORT"))

redis_password = get_config("REDIS_PASSWORD")

redis_db = int(get_config("REDIS_DB"))
