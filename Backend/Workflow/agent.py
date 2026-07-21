import json
import os
import re
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from Workflow.tool import retrieve_context

load_dotenv()

# Use ChatOpenAI pointing to OpenRouter to save on package overhead
# Ensure OPENROUTER_API_KEY is set in Render Environment Variables
model = ChatOpenAI(
    model="openai/gpt-4o-mini",
    temperature=0.1,
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1"
)

def extract_json(text: str):
    """Robustly extract JSON array or object from AI string response."""
    try:
        text = text.strip()
        if text.startswith("```"):
            match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
            if match:
                text = match.group(1)

        start_idx = min(text.find('['), text.find('{'))
        if start_idx == -1: start_idx = 0
        end_idx = max(text.rfind(']'), text.rfind('}'))
        if end_idx == -1: end_idx = len(text)

        return text[start_idx:end_idx+1].strip()
    except Exception:
        return text.strip()

def extraction(state: dict):
    """Initial node to ensure state keys are present."""
    return {
        "doc_id": state.get("doc_id"),
        "operation": state.get("operation"),
        "query": state.get("query")
    }

def _context_text(state: dict) -> str:
    return str(state.get("context", ""))

def retrieval(state: dict):
    # If context is manually provided (e.g. for testing), use it and skip retrieval
    if state.get("context") and len(str(state["context"]).strip()) > 5:
        return {"context": state["context"]}

    query = state.get("query")
    doc_id = state.get("doc_id")
    print(f"Retrieving context for: {query} (Subject: {doc_id})")

    try:
        context_data = retrieve_context.invoke({"query": query, "doc_id": doc_id})
    except Exception as e:
        print(f"Retrieval Error: {e}")
        context_data = "Error retrieving context from database."

    if not context_data or "No documents" in context_data:
        context_data = f"I could not find specific information about {doc_id}. Please ensure you have uploaded the relevant study material in the Admin panel."

    return {"context": context_data}

# --- Specialized Agents ---

def solveForSummary(state: dict):
    context = _context_text(state)
    doc_id = state.get("doc_id", "the subject")
    prompt = f"Summarize the following study material about {doc_id} concisely:\n\n{context}"
    response = model.invoke([
        SystemMessage(content="You are a professional study assistant. Provide concise, factual summaries."),
        HumanMessage(content=prompt)
    ])
    return {"messages": [AIMessage(content=response.content)]}

def solveForQuiz(state: dict):
    context = _context_text(state)
    doc_id = state.get("doc_id", "the subject")
    prompt = (
        f"Based ONLY on the context below about {doc_id}, generate a 5-question multiple choice quiz.\n"
        f"Format the output as a RAW JSON array of objects with keys: question, options (array of 4), correct_ans.\n"
        f"Context: {context}"
    )
    response = model.invoke([
        SystemMessage(content="You are a quiz generator. Output ONLY raw JSON."),
        HumanMessage(content=prompt)
    ])
    return {"messages": [AIMessage(content=extract_json(response.content))]}

def solveForConversation(state: dict):
    query = state.get("query")
    context = _context_text(state)
    doc_id = state.get("doc_id", "the subject")
    prompt = f"Subject: {doc_id}\nContext: {context}\n\nUser Question: {query}"
    response = model.invoke([
        SystemMessage(content="You are an expert tutor. Answer using the provided context only."),
        HumanMessage(content=prompt)
    ])
    return {"messages": [AIMessage(content=response.content)]}

def solveForFlashCards(state: dict):
    context = _context_text(state)
    doc_id = state.get("doc_id", "the subject")
    prompt = (
        f"Generate 5 study flashcards from the context about {doc_id}. "
        f"Format as a RAW JSON array of strings like ['Question? Answer'].\n"
        f"Context: {context}"
    )
    response = model.invoke([
        SystemMessage(content="You are a flashcard generator. Output ONLY raw JSON array of strings."),
        HumanMessage(content=prompt)
    ])
    return {"messages": [AIMessage(content=extract_json(response.content))]}
