from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
import itertools
import fitz

def create_database_vectors(pdf_file):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len,
        is_separator_regex=False,
    )

    with fitz.open("pdf", pdf_file) as doc:
        page_contents = [page.get_text() for page in doc]
        data = page_contents
    chunks = list(itertools.chain.from_iterable([text_splitter.split_text(page) for page in data]))

    vector_db = Chroma.from_texts(
        texts=[chunk for chunk in chunks],
        embedding=OllamaEmbeddings(model="nomic-embed-text",show_progress=True),
        collection_name="local-rag"
    )