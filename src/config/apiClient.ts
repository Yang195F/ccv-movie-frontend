import { refreshToken } from "../services/tokenService";

export const apiClient = async (url: string, options: RequestInit = {}) => {
  let token = sessionStorage.getItem("authToken");

  const headers: Record<string, string> = {
    ...options.headers as Record<string, string>,
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(url, { ...options, headers });
    }
  }

  return res;
};
