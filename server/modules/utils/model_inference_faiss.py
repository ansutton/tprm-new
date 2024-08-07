from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.chat_models import ChatOllama
from langchain.callbacks import StdOutCallbackHandler
from langchain_community.embeddings import OllamaEmbeddings

def generate_model_response(faiss_index, chunks, question):  # Pass in the index and chunks
    # LLM from Ollama
    local_model = "llama2"
    llm = ChatOllama(model=local_model)

    # Faiss Vectorstore (as before)
    faiss_vectorstore = FAISS.from_documents(
        chunks, OllamaEmbeddings(model="nomic-embed-text"), index=faiss_index
    )
    retriever = faiss_vectorstore.as_retriever(search_type="similarity")
    
    # RAG Prompt 
    # Same as before
    template = """Answer the question based ONLY on the following context:
    {context}
    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)
    
    # Simplified RetrievalQA Chain
    qa = RetrievalQA.from_chain_type(
        llm=llm, 
        chain_type="stuff", 
        retriever=retriever, 
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True,
        callbacks=[StdOutCallbackHandler()]
    )

    rag_response = qa(question)
    
    return rag_response["result"] 
