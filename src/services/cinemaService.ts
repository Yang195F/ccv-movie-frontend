import apiRoutes from "../config/apiRoutes";

export const getCinemas = async () => {
    try {
        const response = await fetch(apiRoutes.cinemas.getAll);
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch cinemas",
            };
        }

        return {
            success: true,
            message: "Cinemas fetched successfully.",
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};
