import api from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutUser = async () => {
  return api("/auth/logout", {
    method: "GET",
  });
};

export const deleteUser = () => {
  return api("/auth/delete", {
    method: "DELETE",
  });
};

export const getMe = () => api("/auth/me");
