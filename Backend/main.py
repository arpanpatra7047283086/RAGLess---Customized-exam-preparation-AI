import os.path
import re
from pathlib import Path
import gdown
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_core.messages import HumanMessage
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pydantic import BaseModel

from Workflow.graph import agent
import Workflow.utils as utils
from mongo.operations.users import user_login, register

app = FastAPI()

# Enhanced CORS for reliable Frontend-Backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
PDF_DIR = BASE_DIR / "documents"
PDF_DIR.mkdir(exist_ok=True)

class PdfUrlInput(BaseModel):
    url: str
    filename: str

@app.get("/")
def read_root():
    return {"status": "online", "message": "StudyGenAI Backend is ready"}

@app.post("/download_pdf")
def download_pdf(params: PdfUrlInput):
    file_path = PDF_DIR / params.filename
    try:
        if "drive.google.com" in params.url:
            gdown.download(params.url, str(file_path), quiet=False, fuzzy=True)
        else:
            response = requests.get(params.url, stream=True, timeout=30)
            response.raise_for_status()
            with open(file_path, "wb") as f:
                for chunk in response.iter_content(8192):
                    f.write(chunk)

        loader = PyPDFLoader(str(file_path))
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
        full_text = re.sub(r"\s+", " ", " ".join(doc.page_content for doc in documents))
        chunks = text_splitter.split_text(full_text)

        docs = [Document(page_content=chunk, metadata={"source": params.filename}) for chunk in chunks]
        utils.update_vector_store(docs)
        utils.collection.update_one({"source": params.filename}, {"$set": {"status": "indexed"}}, upsert=True)

        if file_path.exists(): file_path.unlink()
        return {"status": 201, "message": "Document indexed successfully"}
    except Exception as e:
        return {"status": 500, "message": str(e)}

class AgentInput(BaseModel):
    doc_id: str | None = None
    query: str
    operation: str
    context: str | None = None

@app.post("/query_agent")
def query_agent(params: AgentInput):
    try:
        # Pass data to LangGraph agent
        response = agent.invoke({
            "doc_id": params.doc_id,
            "operation": params.operation,
            "query": params.query,
            "context": params.context,
            "messages": [HumanMessage(content=params.query)]
        })

        messages = response.get("messages", [])
        answer = messages[-1].content if messages else "No response generated."

        return {
            "doc_id": params.doc_id,
            "operation": params.operation,
            "query": params.query,
            "response": answer,
            "status": 200
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"response": f"Backend Error: {str(e)}", "status": 500}

@app.post('/signup')
def signup(params: dict):
    return register(name=params.get("name"), email=params.get("email"), password=params.get("password"))

@app.post('/login')
def login(params: dict):
    return user_login(email=params.get("email"), password=params.get("password"))
