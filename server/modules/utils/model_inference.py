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
        pages = set()
        citations = []
        for doc in source_documents:
            # Subtract 1 from the page number to correct the offset
            pages.add(doc.metadata['page'] - 1)
            citations.append((doc.metadata['page'] - 1, doc.page_content))

        return {
            "response": response,
            "pages": list(pages),
            "citations": citations
        }

    structured_answer = get_answer(question)
    return structured_answer