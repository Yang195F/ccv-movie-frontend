const API_BASE_URL = "https://localhost:5000/api";

const apiRoutes = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        logout: `${API_BASE_URL}/auth/logout`,
    },
    user: {
        profile: `${API_BASE_URL}/user/profile`,
        update: `${API_BASE_URL}/user/update`,
    },
    queue: {
        getStatus: `${API_BASE_URL}/queue/status`,
        joinQueue: `${API_BASE_URL}/queue/join`,
    }
};

export default apiRoutes;