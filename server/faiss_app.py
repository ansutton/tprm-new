# Custom modules
from modules.utils.file_parser import parse_csv_file_buffer, parse_pdf_file_buffer
from modules.utils.model_inference import generate_model_response
from modules.utils.rag import create_database_vectors
from modules.globals.app_state import app_state

# Flask modules
from flask import Flask, request, jsonify
from flask_cors import CORS

# Misc modules
import json

app = Flask(__name__)

CORS(app)


# CORS Headers
@app.after_request
def after_request(response):
    response.headers.add(
        "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
    )
    response.headers.add(
        "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS"
    )
    return response


# Submit endpoint.
# Request data expected:
# {
#    questionsCsvFileBuffer: [base64 string],
#    evidencePdfFileBuffer: [base64 string], # TODO: should handle multiple files in the future
#    thirdPartyResponsesXslxFileBuffer: [base64 string] # TODO: Ensure data structure for this is defined.
# }
# Submit endpoint
@app.route("/submit", methods=["POST"])
def main():
    try:
        request_data = request.json
        csv_file_buffer = request_data["questionsCsvFileBuffer"]
        questions = parse_csv_file_buffer(csv_file_buffer)
        app_state.number_of_questions = len(questions)
        app_state.questions = questions
        pdf_file_buffer = request_data["evidencePdfFileBuffer"]
        pdf_file_content = parse_pdf_file_buffer(pdf_file_buffer)

        # Create Faiss index and chunks (assuming your create_database_vectors function returns both)
        faiss_index, chunks = create_database_vectors(pdf_file_content)

        # Process questions
        for question in questions:
            response = generate_model_response(faiss_index, chunks, question)
            app_state.responses.append(response)

        return jsonify({"message": "Finished TPRM Accelerator process."})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Poll endpoint used by the client to longpoll for app state updates.
@app.route("/poll", methods=["GET"])
def poll():
    try:
        # Get current app state.
        app_state_json_string = json.dumps(app_state.to_dict())

        # Send to client.
        return jsonify({"message": app_state_json_string})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Test vector db for test endpoints.
test_faiss_index = None
test_chunks = None



# Load document test endpoint.
@app.route("/load_document", methods=["POST"])
def load_document():
    global test_faiss_index, test_chunks
    try:
        request_data = request.json
        pdfFilePath = request_data["filePath"]

        test_faiss_index, test_chunks = create_database_vectors(pdfFilePath, True) 

        return jsonify({"message": "Successfully loaded the document"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Generate RAG test endpoint.
@app.route("/generate_rag", methods=["POST"])
def generate_rag():
    global test_faiss_index, test_chunks
    try:
        request_data = request.json
        question = request_data["text"]

        if test_faiss_index is None or test_chunks is None:
            return jsonify({"error": "Document not loaded. Use /load_document first."}), 400

        rag_response = generate_model_response(test_faiss_index, test_chunks, question)
        return jsonify({"generate_rag": rag_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route("/hello_world", methods=["POST"])
def hello_world():
    try:
        return jsonify({"hello_world": "Hello World! [from python server]"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def index():
    return "This is a basic flask application"


if __name__ == "__main__":
    app.run(debug=True, port=8001)
