from flask import Flask, request, jsonify
from flask_cors import CORS

# RAG Creation
from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
import fitz
import itertools
# LLM Inference
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever

from pathlib import Path
from pydantic import BaseModel

app = Flask(__name__)

CORS(app)

# CORS Headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
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

@app.route('/load_document', methods=['POST'])
def load_document():
    global vector_db
    try:
        # Parse JSON payload from request
        request_data = request.json

        # Extract data from request
        filePath = request_data['filePath'] 

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            length_function=len,
            is_separator_regex=False,
        )      

        # Load document txt or pdf
        if filePath.endswith('.pdf'):
            # Extract text from PDF using PyMuPDF
            with fitz.open(filePath) as doc:
                page_contents = [page.get_text() for page in doc]
                data = page_contents
            chunks = list(itertools.chain.from_iterable([text_splitter.split_text(page) for page in data]))
            vector_db = Chroma.from_texts(
                texts=[chunk for chunk in chunks],
                embedding=OllamaEmbeddings(model="nomic-embed-text",show_progress=True),
                collection_name="local-rag"
            )
        else:
            # Load document txt
            with open(filePath) as f:
                data = f.read()
            texts = text_splitter.create_documents([data])

            chunks = text_splitter.split_documents(texts)

            # Add to vector database
            vector_db = Chroma.from_documents(
                documents=chunks,
                embedding=OllamaEmbeddings(model="nomic-embed-text",show_progress=True),
                collection_name="local-rag"
            )

        return jsonify({'message': "successfully loaded the document"})
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
    
@app.route('/')
def index():
    return "This is a basic flask application"

if __name__ == '__main__':
    app.run(debug=True, port=8001)