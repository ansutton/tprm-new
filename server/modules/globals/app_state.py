from abc import ABC, abstractmethod

class AppState:
    number_of_questions = 0
    analyses: dict[str, object] = {}

    def to_dict(self):
        return {
            "number_of_questions": self.number_of_questions,
            "analyses": self.analyses
        }

class AnalysisData:
    question = ""
    ai_analysis = ""
    tp_response = ""
    citation = ""
    pages = ""
    tp_confidence_score = 0
    ai_confidence_score = 0
    tp_similarity_score = 0
    ai_similarity_score = 0

app_state = AppState()
