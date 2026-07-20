import json
import os
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openrouter import ChatOpenRouter
from pydantic import BaseModel

from Workflow.tool import retrieve_context

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
WORKSPACE = BASE_DIR / "workspace"

openrouter_api_key = os.getenv("OPEN_ROUTER_API_KEY")

model = ChatOpenRouter(
    model="openai/gpt-4o-mini",
    temperature=0.3,
)


def extraction(state: dict):
    return {
        "doc_id": state.get("doc_id"),
        "operation": state["operation"],
        "query": state["query"],
    }


def _context_text(state: dict) -> str:
    context = state.get("context", "")
    if isinstance(context, dict):
        return context.get("context", "")
    return str(context)


def _get_structured_field(response: dict, field: str):
    if field in response:
        return response[field]

    structured = response.get("structured_response")
    if isinstance(structured, dict):
        return structured.get(field)
    if isinstance(structured, BaseModel):
        return getattr(structured, field, None)

    return None

# --- RETRIEVAL AGENT ---
RETRIEVAL_PROMPT = (
    "You are a retrieval assistant. Your goal is to find relevant information for the user query. "
    "Use the 'retrieve_context' tool to search the database. "
    "Return the retrieved information in the 'data' field. "
    "If no relevant information is found, set 'data' to 'No relevant context found.'"
)

class retrievedAgentResponse(BaseModel):
    data: str

retrieval_agent = create_agent(
    model,
    tools=[retrieve_context],
    response_format=retrievedAgentResponse,
    system_prompt=RETRIEVAL_PROMPT
)

def retrieval(state: dict):
    response = retrieval_agent.invoke({
        "messages": [HumanMessage(content=state.get("query"))]
    })
    data = _get_structured_field(response, "data")
    return {"context": data or "No relevant context found."}


# --- SUMMARY AGENT ---
SUMMARY_PROMPT = (
    "You are a summarization agent. Summarize the provided context. "
    "Rule 1: Length should be approximately half of the original. "
    "Rule 2: Include all key points. "
    "Rule 3: Do not add conversational filler or buzzwords. "
    "Rule 4: Output a compact, integrated summary."
)

class summaryAgentResponse(BaseModel):
    summary: str

summaryAgent = create_agent(
    model,
    system_prompt=SUMMARY_PROMPT,
    response_format=summaryAgentResponse,
)

def solveForSummary(state: dict):
    context = _context_text(state)
    response = summaryAgent.invoke({"messages": [HumanMessage(content=f"Context:\n{context}")]})
    summary = _get_structured_field(response, "summary")
    return {"messages": [AIMessage(content=summary or "Unable to generate summary.")]}


# --- QUIZ AGENT ---
QUIZ_PROMPT = (
    "You are a Quiz Generation Agent. Generate 5 multiple-choice questions based strictly on the context. "
    "Each question must have 4 options and 1 correct answer. Do not add explanations."
)

class QuizItem(BaseModel):
    question: str
    options: List[str]
    correct_ans: str

class quizAgentResponse(BaseModel):
    quiz: List[QuizItem]

quizAgent = create_agent(
    model,
    system_prompt=QUIZ_PROMPT,
    response_format=quizAgentResponse,
)

def solveForQuiz(state: dict):
    context = _context_text(state)
    response = quizAgent.invoke({"messages": [HumanMessage(content=f"Context:\n{context}")]})
    quiz = _get_structured_field(response, "quiz")
    return {"messages": [AIMessage(content=json.dumps(quiz or [], default=lambda x: x.model_dump()))]}


# --- FLASHCARD AGENT ---
FLASH_PROMPT = (
    "You are a flashcard generation agent. Create distinct, meaningful flashcards from the context. "
    "Each flashcard should be a single descriptive line (20-25 words)."
)

class flashAgentResponse(BaseModel):
    flash: List[str]

flashAgent = create_agent(
    model,
    system_prompt=FLASH_PROMPT,
    response_format=flashAgentResponse,
)

def solveForFlashCards(state: dict):
    context = _context_text(state)
    response = flashAgent.invoke({"messages": [HumanMessage(content=f"Context:\n{context}")]})
    flashcards = _get_structured_field(response, "flash")
    return {"messages": [AIMessage(content=json.dumps(flashcards or []))]}


# --- CONVERSATION AGENT ---
CONVO_PROMPT = (
    "You are a helpful study assistant. Use the provided context to answer the user's question. "
    "Rule 1: If the context is 'No relevant context found' or doesn't contain the answer, "
    "politely state that you can only answer questions based on the uploaded documents. "
    "Rule 2: Keep the answer concise and direct. Do not hallucinate information outside the context."
)

class convoAgentResponse(BaseModel):
    reply: str

conversationAgent = create_agent(
    model,
    system_prompt=CONVO_PROMPT,
    response_format=convoAgentResponse,
)

def solveForConversation(state: dict):
    context = _context_text(state)
    query = state.get("query", "")
    response = conversationAgent.invoke({
        "messages": [HumanMessage(content=f"Context: {context}\n\nUser Question: {query}")]
    })
    reply = _get_structured_field(response, "reply")
    return {"messages": [AIMessage(content=reply or "I'm sorry, I couldn't find an answer in the documents.")]}
