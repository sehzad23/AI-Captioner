import api from "./api"

export const createPost = async (formData) => {
  const res = await api.post("/api/posts", formData);
  return res.data;
};