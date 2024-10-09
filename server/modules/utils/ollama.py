import ollama

def init_ollama_models():
    # ollama.pull("llama2")
    ollama.pull("llama3.2")
    ollama.pull("nomic-embed-text")