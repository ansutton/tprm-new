from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain.docstore import InMemoryDocstore
from langchain.docstore.document import Document
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import FAISS
import itertools
import pymupdf
import faiss
import numpy as np
import base64
from io import BytesIO

def create_database_vectors(pdf_file, from_file_path=False):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len,
        is_separator_regex=False,
    )

    if from_file_path:
        data = _get_page_contents_from_pdf_file_path(pdf_file)
    else:
        data = _get_page_contents_from_pdf_in_memory(pdf_file)


    documents = text_splitter.split_documents(data)


    # Generate embeddings using OllamaEmbeddings
    embedding_model = OllamaEmbeddings(model ='nomic-embed-text', show_progress=True)
    batch_size = 50
    texts=[doc for doc in documents]
    documents_embeddings = []


    for i in range(0, len(texts),batch_size):
        batch_texts = texts[i:i+batch_size]
        batch_embeddings = embedding_model.embed_documents(batch_texts)
        documents_embeddings.extend(batch_embeddings)
    
    #create FAISS index and add the embeddings
    document_embeddings_np = np.array(documents_embeddings)
    dimension = document_embeddings_np.shape[1]
    faiss_index = faiss.IndexFlatL2(dimension)
    faiss_index.add(document_embeddings_np)

    docstore = InMemoryDocstore(dict(enumerate(documents)))
    index_to_docstore_id = {i: i for i in range(len(documents))}

    vector_store = FAISS(embedding_model, faiss_index, docstore, index_to_docstore_id)

    return vector_store

def _get_page_contents_from_pdf_in_memory(pdf_file):
    # with pymupdf.open("pdf", pdf_file) as doc:
    #     page_contents = [page.get_text() for page in doc]
    #     return page_contents
    # Decode the base64 string
    pdf_loader = PyPDFLoader(pdf_file)
    raw_documents= pdf_loader.load()
    return raw_documents


def _get_page_contents_from_pdf_file_path(pdf_file_path):
    # with pymupdf.open(pdf_file_path) as doc:
    #     page_contents = [page.get_text() for page in doc]
    #    return page_contents
    pdf_loader = PyPDFLoader(pdf_file_path)
    raw_documents= pdf_loader.load()
    return raw_documents
