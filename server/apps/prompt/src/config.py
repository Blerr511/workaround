import os

openai_api_key = os.getenv("OPENAI_API_KEY")

redis_host = os.getenv("REDIS_HOST")

redis_port = int(os.getenv("REDIS_PORT"))

redis_password = os.getenv("REDIS_PASSWORD")

redis_db = int(os.getenv("REDIS_DB"))
