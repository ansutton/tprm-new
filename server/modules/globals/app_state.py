from abc import ABC, abstractmethod

class AppState:
    models_pulled = False
    is_complete = False
    number_of_questions = 0
    analyses: dict[str, object] = {}

    def to_dict(self):
        return {
            "number_of_questions": self.number_of_questions,
            "models_pulled": self.models_pulled,
            "is_complete": self.is_complete,
            "analyses": self.analyses
        }

class AnalysisData:
    question = ""
    ai_analysis = ""
    tp_response = ""
    citations = ""
    pages = ""
    tp_confidence_score = 0
    ai_confidence_score = 0
    similarity_score = 0
    answers_align = False

app_state = AppState()
