
import torch
from langchain_community.embeddings import OllamaEmbeddings

def find_relevant_sections(vector_store, question, top_n=50):
    """Retrieves top-N most relevant sections from the vector store based on a question."""
    # Load pre-trained Roberta model and tokenizer
    embedding_model = OllamaEmbeddings(model ='nomic-embed-text', show_progress=True)

    question_embedding = embedding_model.embed_query(question)  # Assuming your embedding model has an embed_query method

    # Perform similarity search
    similar_docs = vector_store.similarity_search_by_vector(question_embedding, k=top_n)

    # Extract relevant sections (assuming each document has a 'page_content' attribute)
    relevant_sections = [doc.page_content for doc in similar_docs]

    return relevant_sections

def semantic_similarity(relevant_sections, ai_analysis, tp_response):
    # Use the same OllamaEmbeddings model
    embedding_model = OllamaEmbeddings(model='nomic-embed-text', show_progress=True)
    answer_embeddings = embedding_model.embed_documents([ai_analysis, tp_response])

    max_similarities = {'ai': 0, 'third_party': 0}

    for section in relevant_sections:
        # Embed the relevant section
        section_embedding = embedding_model.embed_query(section)

        # Calculate semantic similarity 
        similarities_for_section = torch.cosine_similarity(torch.tensor(section_embedding).unsqueeze(0), 
                                                            torch.tensor(answer_embeddings), dim=1)

        max_similarities['ai'] = max(max_similarities['ai'], similarities_for_section[0].item())
        max_similarities['third_party'] = max(max_similarities['third_party'], similarities_for_section[1].item())

    return max_similarities


def semantic_similarity_all(relevant_sections, questions, ai_answers, third_party_answers):
    # Use the same OllamaEmbeddings model
    embedding_model = OllamaEmbeddings(model='nomic-embed-text', show_progress=True)

    similarities = {'ai': [], 'third_party': []}
    for question, rel_sections, ai_answer, third_party_answer in zip(questions, relevant_sections, ai_answers, third_party_answers):
        # Embed the answers 
        answer_embeddings = embedding_model.embed_documents([ai_answer, third_party_answer]) 

        max_similarities = {'ai': 0, 'third_party': 0}
        for section in rel_sections:
            # Embed the relevant section
            section_embedding = embedding_model.embed_query(section)

            # Calculate semantic similarity 
            similarities_for_section = torch.cosine_similarity(torch.tensor(section_embedding).unsqueeze(0), 
                                                               torch.tensor(answer_embeddings), dim=1)

            max_similarities['ai'] = max(max_similarities['ai'], similarities_for_section[0].item())
            max_similarities['third_party'] = max(max_similarities['third_party'], similarities_for_section[1].item())

        similarities['ai'].append(max_similarities['ai'])
        similarities['third_party'].append(max_similarities['third_party'])

    return similarities