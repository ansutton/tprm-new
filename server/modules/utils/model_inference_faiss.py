from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.chat_models import ChatOllama
from langchain.docstore import InMemoryDocstore
from langchain.docstore.document import Document
import faiss

def generate_model_response(vector_store, question):
    # LLM from Ollama
    local_model = "knoopx/hermes-2-pro-mistral:7b-q8_0"
    llm = ChatOllama(model=local_model)

    QUERY_PROMPT = PromptTemplate(
        input_variables=["question"],
        template="""You are an AI language model assistant. Your task is to generate five different versions of 
        the given user question to retrieve relevant documents from vector database. By generating multiple respectives 
        on the user question, your goal is to help the user overcome some of the limitations of the distance-based 
        similarity search. Provide these alternative questions separated by newlines.
        Original question: {question}""",
    )

    retriever = MultiQueryRetriever.from_llm(
        vector_store.as_retriever(), llm, prompt=QUERY_PROMPT
    )

    # RAG Prompt
    template = """Answer the question based ONLY on the following context: {context}
    Question: {question}
    Ensure that you mention the page number or position in the document from which you arrived at your response. 
    Cite the original wordings in the document along with it. Make this a separate line in the response along with your answer.
    Try to make your responses as concise as possible.

    """

    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    rag_response = chain.invoke((question))

    return rag_response
