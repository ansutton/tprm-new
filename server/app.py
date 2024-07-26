from flask import Flask, request, jsonify
from flask_cors import CORS

# LLM Inference
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever

from pathlib import Path
from pydantic import BaseModel

# Custom modules
from modules.utils.file_parser import parse_csv_file_buffer, parse_pdf_file_buffer
from modules.utils.rag import create_database_vectors

app = Flask(__name__)

CORS(app)

# CORS Headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

# Initiate Vector DB for RAG
vector_db = ""

class CodeGenerationRequest(BaseModel):
    filePath: str

def remove_prompt(response):
    # Check if the response starts with the prompt
    parts =  response.split("[/INST]")
    if len(parts) > 1:
        return parts[-1]
    else:
        return response

# Load Documents endpoint.
# {
#    questionsCsvFileBuffer: [base64 string],
#    evidencePdfFileBuffer: [base64 string], # TODO: should handle multiple files in the future
#    thirdPartyResponsesXslxFileBuffer: [base64 string] # TODO: Ensure data structure for this is defined.
# }
@app.route('/load_documents', methods=['POST'])
def parse():
    global quetsions
    global vector_db

    try:
        request_data = request.json

        csv_file_buffer = request_data['questionsCsvFileBuffer']
        questions = parse_csv_file_buffer(csv_file_buffer)
        print(questions)

        pdf_file_buffer = request_data['evidencePdfFileBuffer']
        pdf_file_content = parse_pdf_file_buffer(pdf_file_buffer)
        # print(pdf_file_content)

        # Create Ollama Embeddings and database vectors.
        vector_db = create_database_vectors(pdf_file_content)

        return jsonify({'message': "successfully loaded the documents"})
        # return jsonify({'security_questions': questions})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_rag', methods=['POST'])
def generate_rag():
    global vector_db

    try:
        # Parse JSON payload from request
        request_data = request.json

        # Extract data from request
        question = request_data['text']

        # LLM from Ollama
        local_model = "llama2"
        llm = ChatOllama(model=local_model)

        QUERY_PROMPT = PromptTemplate(
            input_variables = ["question"],
            template = """You are an AI language model assistant. Your task is to generate five different versions of 
            the given user question to retrieve relevant documents from vector database. By generating multiple respectives 
            on the user question, your goal is to help the user overcome some of the limitations of the distance-based 
            similarity search. Provide these alternative questions separated by newlines.
            Original question: {question}""",
        )

        retriever = MultiQueryRetriever.from_llm(
            vector_db.as_retriever(),
            llm,
            prompt = QUERY_PROMPT
        )

        # RAG Prompt
        template = """Answer the question based ONLY on the following context:
        {context}
        Question: {question}
        """

        prompt = ChatPromptTemplate.from_template(template)

        chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        rag_response = chain.invoke((question))

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