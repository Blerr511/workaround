from app_lib import GPTQuestionnaire
import config


questionnaire_api = GPTQuestionnaire(api_key=config.openai_api_key)

print(questionnaire_api.get_questions(themes=["physics"], count=10))
print(questionnaire_api.get_questions(themes=["physics"], count=10))
