import tensorflow as tf # type: ignore
from langchain_community.embeddings import OllamaEmbeddings

def semantic_similarity(ai_analysis, tp_response):
    # Use the same OllamaEmbeddings model
    embedding_model = OllamaEmbeddings(model='nomic-embed-text', show_progress=True)
    ai_answer_embedding = embedding_model.embed_query(ai_analysis)
    third_party_answer_embedding = embedding_model.embed_query(tp_response)

    # Calculate semantic similarity
    ai_answer_embedding_tensor = tf.constant(ai_answer_embedding)
    third_party_answer_embedding_tensor = tf.constant(third_party_answer_embedding)

    similarity = tf.reduce_sum(ai_answer_embedding_tensor * third_party_answer_embedding_tensor) / (tf.norm(ai_answer_embedding_tensor) * tf.norm(third_party_answer_embedding_tensor))

    return str(similarity.numpy())