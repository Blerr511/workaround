import openai


class ImageGen:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def generate(self, prompt: str, n=1):
        response = openai.Image.create(
            api_key=self.api_key, prompt=prompt, n=n, size="1024x1024"
        )

        return response["data"]
