import redis
import config
import json

r = redis.StrictRedis(
    host=config.redis_host, port=config.redis_port, db=config.redis_db
)


class GPTMemorize:
    key: str

    def __init__(self, key: str) -> None:
        assert key is not None, "key can not be empty"
        assert isinstance(key, str), "key should be string"
        self.key = key

    def memorize(self, message: dict[str, str]) -> None:
        assert message["role"] is not None, "Message role shouldn't be empty"
        assert message["content"] is not None, "Message content shouldn't be empty"

        chat_json = json.dumps(message)

        r.lpush(self.key, chat_json)

    def get_memo(self, count=100) -> list[dict]:
        recent_chats_json = r.lrange(self.key, 0, count - 1)

        recent_chats = [json.loads(chat_json) for chat_json in recent_chats_json]

        return recent_chats
