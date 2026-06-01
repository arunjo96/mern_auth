import API from "./api";

export const registerUser = (userData) => API.post("/auth/register", userData);

export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  API.post(`/auth/reset-password/${token}`, {
    newPassword,
  });

export const getProfile = () => API.get("/auth/profile");

export const updateProfile = (data) => API.put("/auth/update-profile", data);
