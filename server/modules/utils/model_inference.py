from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.chat_models import ChatOllama
from langchain.chains import RetrievalQA
from langchain.embeddings import OllamaEmbeddings
import numpy as np

# Initialize the Ollama embeddings model
embedding_model = OllamaEmbeddings(model="nomic-embed-text")


def rerank_documents(documents, question):
    # Compute embeddings for the question
    question_embedding = embedding_model.embed_documents([question])[0]  # Assuming it returns a single embedding

    # Compute embeddings for the retrieved documents
    document_embeddings = embedding_model.embed_documents([doc.page_content for doc in documents])

    # Calculate cosine similarities
    cosine_scores = []
    for doc_embedding in document_embeddings:
        # Ensure doc_embedding is a 1D vector
        cosine_score = np.dot(question_embedding, doc_embedding) / (np.linalg.norm(question_embedding) * np.linalg.norm(doc_embedding))
        cosine_scores.append(cosine_score)

    # Sort documents based on cosine similarity scores
    ranked_docs = sorted(zip(documents, cosine_scores), key=lambda x: x[1], reverse=True)

    # Return documents sorted by their score
    return [doc for doc, score in ranked_docs]


def generate_model_response(vector_db, question):
    # LLM from Ollama
    local_model = "llama3.2"
    llm = ChatOllama(model=local_model)

    qa_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type="stuff",
        retriever = vector_db.as_retriever(search_kwargs={"k":10}),
        return_source_documents = True
        )
    
    def get_answer(query):

        role_context = "You are tasked with answering questions about your organization's security posture. You must answer questions truthfully to the best of your ability, however, you may only use information in the provided evidence documents to answer each question. If the answer to a question you are asked does not appear in any of the provided evidence documents, please respond 'not found.'Otherwise, if there is a clear answer from the provided evidence documents, please provide it as clearly and concisely as possible. If there is contradictory information in the provided documents or you are only able to answer part of a question based on the provided documents, please explain that as clearly and concisely as you can. Please answer this question as concisely as possible:"
        full_prompt = role_context + " " + query
        
        result = qa_chain({"query": full_prompt})
        response = result['result']
        source_documents = result['source_documents']

        ranked_documents = rerank_documents(source_documents, query)  # Use a different variable name
        citations = []
        for doc in ranked_documents:
            source = doc.metadata['source']
            citations.append((source, doc.metadata['page_number'], doc.page_content, doc.metadata['evidence_doc_type']))
        return {
            "response": response,
            "citations": citations
        }

    structured_answer = get_answer(question)
    return structured_answer