export const login = async (userId: string, password: string) => {
    try {
        const response = await fetch("https://localhost:7094/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed!");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
