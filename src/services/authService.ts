import apiRoutes from "../config/apiRoutes";
export const login = async (userId: string, password: string) => {
    try {
        const response = await fetch(apiRoutes.auth.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed!");
        }

        return { success: true, data };
    } catch (error: any) {
        return { success: false, message: error.message || "An unknown error occurred" };
    }
};