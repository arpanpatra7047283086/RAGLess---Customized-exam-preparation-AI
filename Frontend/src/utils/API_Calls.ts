export const register = async ({ name, email, password }: { name: string, email: string, password: string }): Promise<{ message: string; status: number; data?: { name?: string; id?: string; email?: string } }> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? "",
            data: result?.data
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Network error" };
    }
};

export const login = async ({ email, password }: { email: string, password: string }): Promise<{ message: string; status: number; data?: { name?: string; email?: string; id?: string } }> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? "",
            data: result?.data
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Network error" };
    }
};

export const downloadPdf = async ({ url, filename }: { url: string, filename: string }): Promise<{ message: string; status: number }> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/download_pdf`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url,
                filename
            })
        });

        const result = await response.json();
        return {
            status: result.status || response.status,
            message: result?.message ?? ""
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Network error" };
    }
};

export const queryAgent = async ({ doc_id, query, operation }: { doc_id: string | null, query: string, operation: string }): Promise<{ response: string; status: number }> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/query_agent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                doc_id,
                query,
                operation
            })
        });

        const result = await response.json();
        return {
            status: response.status,
            response: result?.response ?? ""
        };
    } catch (error) {
        console.error(error);
        return { status: 500, response: "Network error" };
    }
};
