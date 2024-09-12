# Custom modules
from modules.utils.confidence_score import find_relevant_sections, semantic_similarity
from modules.utils.file_parser import parse_csv_file_buffer, parse_pdf_file_buffer
from modules.utils.model_inference import generate_model_response
from modules.utils.faiss import create_vector_store
from modules.utils.ollama import init_ollama_models
from modules.globals.app_state import app_state
from modules.utils import similarity_score

# Flask modules
from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore

# Misc modules
import json
import os

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

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
#    parsedExcelFile: [][]any # TODO: Ensure data structure for this is defined.
# }
# Submit endpoint
@app.route("/submit", methods=["POST"])
def main():
    try:
        request_data = request.json
        # Get csv file buffer and parse it.
        csv_file_buffer = request_data["questionsCsvFileBuffer"]
        questions = parse_csv_file_buffer(csv_file_buffer)

        # Set app state no. of questions based on csv.
        app_state.number_of_questions = len(questions)

        # Set app state questions based on csv.
        for i in range(len(questions)):
            app_state.analyses["analysis_%s" % i] = {}
            app_state.analyses["analysis_%s" % i]["question"] = questions[i]
        
        # Get data from Third Party responses file.
        parsed_excel_file = request_data["parsedExcelFile"]

        # Set app state Third Party responses.
        for i in range(len(parsed_excel_file)):
            if i > 0: # skip header line
                if "analysis_%s" % (i - 1) in app_state.analyses:
                    app_state.analyses["analysis_%s" % (i - 1)]["tp_response"] = parsed_excel_file[i][2]

        # Get pdf file buffer and parse it
        pdf_file_buffer = request_data["evidencePdfFileBuffer"]
        pdf_file_content = parse_pdf_file_buffer(pdf_file_buffer)

        # Pull latest models, update if already pulled.
        init_ollama_models()
        app_state.models_pulled = True

        # Create Ollama Embeddings and database vectors based on the pdf.
        vector_db = create_vector_store(pdf_file_content)

        # Loop through each question and add responses, citations, and pages to app state.
        for i in range(len(questions)):
            response_dict = generate_model_response(vector_db, questions[i])
            app_state.analyses["analysis_%s" % i]["ai_analysis"] = response_dict["response"]
            app_state.analyses["analysis_%s" % i]["citations"] = response_dict["citations"]
            app_state.analyses["analysis_%s" % i]["pages"] = response_dict["pages"]

        # Loop through app_state.analyses dict and process confidence and similarity scores.
        for key, value in app_state.analyses.items():
            # Calculate confidence scores for ai_analysis and tp_response.
            relevant_section = find_relevant_sections(vector_db, value["question"])
            conf_scores = semantic_similarity(relevant_section, value["ai_analysis"], value["tp_response"])
            app_state.analyses[key]["tp_confidence_score"] = conf_scores["third_party"]
            app_state.analyses[key]["ai_confidence_score"] = conf_scores["ai"]

            # Calculate similarity score between ai_analysis and tp_response.
            sim_score = similarity_score.semantic_similarity(value["ai_analysis"], value["tp_response"])
            app_state.analyses[key]["similarity_score"] = sim_score

            # Calculate if answers align based on threshold (>= 88%)
            alignment_threshhold = 88
            sim_score_float = float(sim_score) # convert from string to float.
            sim_score_percentage = round(((sim_score_float + 1) / 2) * 100) # convert to cosign percentage.
            app_state.analyses[key]["answers_align"] = sim_score_percentage >= alignment_threshhold

        app_state.is_complete = True
        return jsonify({"message": "Finished TPRM Accelerator process."})

    except Exception as e:
        print(str(e))
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


# Load document test endpoint.
@app.route("/load_document", methods=["POST"])
def load_document():
    global test_faiss_index
    try:
        request_data = request.json
        pdfFilePath = request_data["filePath"]

        test_faiss_index = create_vector_store(pdfFilePath, True) 

        return jsonify({"message": "Successfully loaded the document"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate RAG test endpoint.
@app.route("/generate_rag", methods=["POST"])
def generate_rag():
    global test_faiss_index
    try:
        request_data = request.json
        question = request_data["text"]

        if test_faiss_index is None:
            return jsonify({"error": "Document not loaded. Use /load_document first."}), 400

        rag_response = generate_model_response(test_faiss_index, question)
        return jsonify({"generate_rag": rag_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# create confidence score
@app.route("/create_confidence", methods=["POST"])
def create_confidence():
    global test_faiss_index
    try:
        request_data = request.json
        question = request_data["question"]
        ai_analysis = request_data["ai_analysis"]
        tp_response = request_data["tp_response"]

        if test_faiss_index is None:
            return jsonify({"error": "Document not loaded. Use /load_document first."}), 400

        relevant_section = find_relevant_sections(test_faiss_index, question)
        sem = semantic_similarity(relevant_section, ai_analysis, tp_response)

        return jsonify(sem)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/hello_world", methods=["POST"])
def hello_world():
    try:
        hello = { 'hi': 'world'}
        return jsonify(hello)
        # return jsonify({"hello_world": "Hello World! [from python server]"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def index():
    return "This is a basic flask application"


if __name__ == "__main__":
    app.run(debug=True, port=8001)
