/**
 * Centralized API Communication Bridge
 */

// Fallback to localhost if env is missing
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

console.log("Connecting to Backend at:", BACKEND_URL);

/**
 * Validates if the response is JSON and returns it, or throws an error
 */
async function handleResponse(response: Response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        const text = await response.text();
        console.error("Non-JSON response received:", text);
        throw new Error("Server returned an invalid response format.");
    }
}

export const register = async ({ name, email, password }: any) => {
    try {
        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Signup Fetch Error:", error);
        return { status: 500, message: "Server unreachable" };
    }
};

export const login = async ({ email, password }: any) => {
    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Login Fetch Error:", error);
        return { status: 500, message: "Server unreachable" };
    }
};

export const queryAgent = async ({ doc_id, query, operation }: { doc_id: string | null, query: string, operation: string }) => {
    console.log(`Fetching AI (${operation}) for:`, query);
    try {
        const response = await fetch(`${BACKEND_URL}/query_agent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ doc_id, query, operation })
        });

        const result = await handleResponse(response);
        console.log("Backend AI Response Received");
        return result;
    } catch (error: any) {
        console.error("Agent Fetch Error:", error);
        return {
            status: 500,
            response: `Error: ${error.message || "Could not connect to AI server. Please ensure the backend is running."}`
        };
    }
};

export const downloadPdf = async ({ url, filename }: { url: string, filename: string }) => {
    try {
        const response = await fetch(`${BACKEND_URL}/download_pdf`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, filename })
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("PDF Download Fetch Error:", error);
        return { status: 500, message: "Failed to connect to indexing service." };
    }
};
