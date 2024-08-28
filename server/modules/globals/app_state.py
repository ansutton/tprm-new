from abc import ABC, abstractmethod

class AppState:
    number_of_questions = 0
    # questions = []
    # responses = []
    analyses: dict[str, object] = {}

    def to_dict(self):
        return {
            "number_of_questions": self.number_of_questions,
            # "questions": self.questions,
            # "responses": self.responses,
        }

class TPRMData:
    question = ""
    ai_analysis = ""
    tp_response = ""
    confidence_score = 0
    similarity_score = 0

app_state = AppState()
