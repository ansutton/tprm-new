from abc import ABC, abstractmethod

class AppState:
    models_pulled = False
    number_of_questions = 0
    embeddings_count = 0
    embeddings_total = 0
    analyses: dict[str, object] = {}
    is_complete = False

    def to_dict(self):
        return {
            "number_of_questions": self.number_of_questions,
            "embeddings_count": self.embeddings_count,
            "embeddings_total": self.embeddings_total,
            "models_pulled": self.models_pulled,
            "analyses": self.analyses,
            "is_complete": self.is_complete,
        }

class AnalysisData:
    question = ""
    tp_response = ""
    evidence_doc = ""
    ai_analysis = ""
    citations = ""
    pages = ""
    tp_confidence_score = 0
    ai_confidence_score = 0
    similarity_score = 0
    answers_align = False
    is_analysis_complete = False

app_state = AppState()
