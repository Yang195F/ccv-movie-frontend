import apiRoutes from "../config/apiRoutes";

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    const res = await fetch(apiRoutes.auths.refresh, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
    });

    if (!res.ok) {
        localStorage.clear(); // optional: force logout
        return null;
    }

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.token;
};
