class AppState:
    number_of_questions = 0
    questions = []
    responses = []

    def to_dict(self):
        return {
            "number_of_questions": self.number_of_questions,
            "questions": self.questions,
            "responses": self.responses,
        }


app_state = AppState()
