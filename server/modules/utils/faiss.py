from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain.docstore.document import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
import faiss # type: ignore
import numpy as np
import tempfile
import os

# Custom modules.
from modules.globals.app_state import app_state # type: ignore

def create_vector_store(pdf_files, from_file_path=False):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len,
        is_separator_regex=False,
    )

    data = get_page_contents_from_multiple_pdfs(pdf_files, from_file_path)

    documents = text_splitter.split_documents(data)


    # Generate embeddings using OllamaEmbeddings
    embedding_model = OllamaEmbeddings(model ='nomic-embed-text', show_progress=True)
    batch_size = 50
    texts=[doc for doc in documents]
    documents_embeddings = []

    # Set total embeddings on app_state.
    app_state.embeddings_total = len(texts)

    for i in range(0, len(texts),batch_size):
        batch_texts = texts[i:i+batch_size]
        batch_embeddings = embedding_model.embed_documents(batch_texts)
        documents_embeddings.extend(batch_embeddings)

        # Increment app_state's embeddings_count.
        app_state.embeddings_count += len(batch_embeddings)
    
    #create FAISS index and add the embeddings
    document_embeddings_np = np.array(documents_embeddings)
    dimension = document_embeddings_np.shape[1]
    faiss_index = faiss.IndexFlatL2(dimension)
    faiss_index.add(document_embeddings_np)

    docstore = InMemoryDocstore(dict(enumerate(documents)))
    index_to_docstore_id = {i: i for i in range(len(documents))}

    vector_store = FAISS(embedding_model, faiss_index, docstore, index_to_docstore_id)
    
    return vector_store

def _get_page_contents_from_pdf_in_memory(pdf_bytes):
    # Write bytes to a temporary file
    with tempfile.NamedTemporaryFile(delete=False,suffix='.pdf') as temp_pdf_file:
        temp_pdf_file.write(pdf_bytes)
        temp_pdf_file_path = temp_pdf_file.name
    # Load temp file
    pdf_loader = PyPDFLoader(temp_pdf_file_path)
    raw_documents= pdf_loader.load()
    # Delete temporary file
    os.remove(temp_pdf_file_path)
    return raw_documents


def _get_page_contents_from_pdf_file_path(pdf_file_path):
    pdf_loader = PyPDFLoader(pdf_file_path)
    raw_documents= pdf_loader.load()
    return raw_documents


def get_page_contents_from_multiple_pdfs(pdf_files, from_file_path=False):
    all_documents = []
    
    for pdf_file in pdf_files:
        if from_file_path:
            documents = _get_page_contents_from_pdf_file_path(pdf_file)
        else:
            documents = _get_page_contents_from_pdf_in_memory(pdf_file)
        
        all_documents.extend(documents)
    
    return all_documents