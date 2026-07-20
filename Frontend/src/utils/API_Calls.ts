// API Types
export interface UserData {
    id?: string;
    name?: string;
    email?: string;
}

export interface ApiResponse<T = any> {
    message: string;
    status: number;
    data?: T;
}

export interface QueryAgentResponse {
    doc_id: string | null;
    operation: string;
    query: string;
    response: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Authentication: Register a new user
 */
export const register = async (payload: { name: string, email: string, password: string }): Promise<ApiResponse<UserData>> => {
    try {
        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? "Registration failed",
            data: result?.data
        };
    } catch (error) {
        console.error("Signup Error:", error);
        return { status: 500, message: "Network error" };
    }
};

/**
 * Authentication: Login existing user
 */
export const login = async (payload: { email: string, password: string }): Promise<ApiResponse<UserData>> => {
    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? "Login failed",
            data: result?.data
        };
    } catch (error) {
        console.error("Login Error:", error);
        return { status: 500, message: "Network error" };
    }
};

/**
 * Document Processing: Upload/Process PDF from URL
 */
export const downloadPdf = async (payload: { url: string, filename: string }): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${BACKEND_URL}/download_pdf`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? "Processing failed"
        };
    } catch (error) {
        console.error("PDF Download Error:", error);
        return { status: 500, message: "Network error" };
    }
};

/**
 * AI Agent: Query the study assistant
 */
export const queryAgent = async (payload: { doc_id: string | null, query: string, operation: string }): Promise<QueryAgentResponse | { status: number, response: string }> => {
    try {
        const response = await fetch(`${BACKEND_URL}/query_agent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok) {
            return result as QueryAgentResponse;
        } else {
            return {
                status: response.status,
                response: result?.response ?? "Agent query failed"
            };
        }
    } catch (error) {
        console.error("Agent Query Error:", error);
        return { status: 500, response: "Network error" };
    }
};
