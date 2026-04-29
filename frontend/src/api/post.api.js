import api from "./api"

export const createPost = async (formData) => {
  const res = await api.post("/posts", formData);
  return res.data;
};