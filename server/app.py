# Custom modules
from modules.utils.file_parser import parse_csv_file_buffer, parse_pdf_file_buffer
from modules.utils.model_inference import generate_model_response
from modules.utils.rag import create_database_vectors
from modules.globals.app_state import app_state

# Flask modules
from flask import Flask, request, jsonify
from flask_cors import CORS

# Misc modules
# import json

app = Flask(__name__)

CORS(app)

# CORS Headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

# Submit endpoint.
# Request data expected:
# {
#    questionsCsvFileBuffer: [base64 string],
#    evidencePdfFileBuffer: [base64 string], # TODO: should handle multiple files in the future
#    thirdPartyResponsesXslxFileBuffer: [base64 string] # TODO: Ensure data structure for this is defined.
# }
@app.route('/submit', methods=['POST'])
def main():
    try:
        print(app_state.responses)

        request_data = request.json

        csv_file_buffer = request_data['questionsCsvFileBuffer']
        questions = parse_csv_file_buffer(csv_file_buffer)
        print(questions)
        print(questions[0])
        pdf_file_buffer = request_data['evidencePdfFileBuffer']
        pdf_file_content = parse_pdf_file_buffer(pdf_file_buffer)
        # print(pdf_file_content)

        # Create Ollama Embeddings and database vectors.
        vector_db = create_database_vectors(pdf_file_content)

        print(vector_db)

        response = generate_model_response(vector_db, questions[0])
        app_state.responses.append(response)
        print(app_state.responses)
        # json.encode(app_state)

        print(response)
        return jsonify({'message': "successfully loaded the documents"})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Below are testing routes for Postman calls.
test_vector_db = ""

@app.route('/load_document', methods=['POST'])
def load_document():
    global test_vector_db
    try:
        # Parse JSON payload from request
        request_data = request.json

        # Extract data from request
        pdfFilePath = request_data['filePath']

        # Create Ollama Embeddings and database vectors.
        test_vector_db = create_database_vectors(pdfFilePath, True)

        return jsonify({'message': "successfully loaded the document"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/generate_rag', methods=['POST'])
def generate_rag():
    global test_vector_db
    try:
        # Parse JSON payload from request
        request_data = request.json

        # Extract data from request
        question = request_data['text']

        rag_response = generate_model_response(test_vector_db, question)

        return jsonify({'generate_rag': rag_response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/hello_world', methods=['POST'])
def hello_world():
    try:
        return jsonify({'hello_world': 'Hello World! [from python server]'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/')
def index():
    return "This is a basic flask application"

if __name__ == '__main__':
    app.run(debug=True, port=8001)