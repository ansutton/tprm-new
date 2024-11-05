from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.chat_models import ChatOllama
from langchain.chains import RetrievalQA


def generate_model_response(vector_db, question):
    # LLM from Ollama
    local_model = "llama3.2"
    llm = ChatOllama(model=local_model)

    qa_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type="stuff",
        retriever = vector_db.as_retriever(search_kwargs={"k":3}),
        return_source_documents = True
        )
    
    def get_answer(query):
        result = qa_chain({"query": query})
        response = result['result']

        source_documents = result['source_documents']
        pages = []
        citations = []
        for doc in source_documents:
            source = doc.metadata['source']
            pages.append((source, ' ', doc.metadata['page_number'], doc.metadata['evidence_doc_type']))
            citations.append((source, doc.metadata['page_number'], doc.page_content))  # Include source in the citation
        return {
            "response": response,
            "pages": pages,
            "citations": citations
        }

    structured_answer = get_answer(question)
    return structured_answer