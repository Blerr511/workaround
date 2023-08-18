from app_lib import ImageGen
import config


imgapi = ImageGen(api_key=config.openai_api_key)

print("hello world")
print("Api Key")
print(config.openai_api_key)
