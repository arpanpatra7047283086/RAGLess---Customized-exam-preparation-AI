from langchain_core.tools import tool
import Workflow.utils as utils

@tool
def retrieve_context(query: str, doc_id: str = None):
    """Retrieve information to help answer a query, optionally filtered by subject/doc_id."""
    # Get the latest vector store instance
    vector_store = utils.get_vector_store()

    if vector_store is None:
        return "Error: No documents have been indexed yet. Please upload a PDF first."

    try:
        # If doc_id is provided, we can try to filter results
        # FAISS search with filter depends on how metadata is stored
        # For now, we'll retrieve and then filter if needed, or just search everything

        search_kwargs = {}
        if doc_id:
            # Simple filter matching the source filename (case-insensitive check)
            # This assumes the doc_id (Subject) is part of the filename
            pass

        retrieved_docs = vector_store.similarity_search(query, k=4)

        # If doc_id is provided, filter the results in-memory to be safe
        if doc_id:
            filtered_docs = [
                doc for doc in retrieved_docs
                if doc_id.lower() in doc.metadata.get('source', '').lower()
            ]
            # If filtering left us with nothing, keep original results but prioritize them?
            # Actually, let's just use retrieved_docs if filtering is too strict
            if filtered_docs:
                retrieved_docs = filtered_docs

        serialized = "\n\n".join(
            (f"Source: {doc.metadata.get('source', 'Unknown')}\nContent: {doc.page_content}")
            for doc in retrieved_docs
        )
        return serialized
    except Exception as e:
        print(f"Retrieval error in tool: {e}")
        return f"Error during retrieval: {str(e)}"
