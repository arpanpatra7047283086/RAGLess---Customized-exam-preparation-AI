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
            status: response.status,
            message: result?.message ?? "",
            data: result?.user
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
            status: response.status,
            message: result?.message ?? "",
            data: {
                email: result?.email,
                name: result?.name,
                id: result?.id
            }
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Network error" };
    }
};
