from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
import itertools
import pymupdf
import faiss
import numpy as np

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

    chunks = list(
        itertools.chain.from_iterable([text_splitter.split_text(page) for page in data])
    )


    # Generate embeddings using OllamaEmbeddings
    embedding_model = OllamaEmbeddings(model ='nomic-embed-text', show_progress=True)
    embeddings = embedding_model.embed_documents(chunks)
    embeddings_np = np.array([embedding for embedding in embeddings])

    dimension = embeddings_np.shape[1]
    index = faiss.IndexFlatL2(dimension)

    index.add(embeddings_np)

    return index

def _get_page_contents_from_pdf_in_memory(pdf_file):
    with pymupdf.open("pdf", pdf_file) as doc:
        page_contents = [page.get_text() for page in doc]
        return page_contents


def _get_page_contents_from_pdf_file_path(pdf_file_path):
    with pymupdf.open(pdf_file_path) as doc:
        page_contents = [page.get_text() for page in doc]
        return page_contents
    
