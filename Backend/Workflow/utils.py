import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from mongo.init import client

load_dotenv()

# Path for local vector storage
INDEX_PATH = os.path.join(os.path.dirname(__file__), "..", "faiss_index")

# Using a lightweight local embedding model that fits in Render's 512MB RAM
# This model uses approx 80MB-120MB of RAM.
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Keep mongo client for metadata and user auth
db = client["rag_db"]
collection = db["documents"]

def get_vector_store():
    """Helper to load the vector store locally"""
    if os.path.exists(INDEX_PATH):
        try:
            return FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
        except Exception as e:
            print(f"Error loading FAISS index: {e}")
            return None
    return None

def update_vector_store(docs):
    """Adds documents to FAISS and saves it locally"""
    vs = get_vector_store()
    if vs is None:
        vs = FAISS.from_documents(docs, embeddings)
    else:
        vs.add_documents(docs)

    vs.save_local(INDEX_PATH)
    return vs
