import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-captioner-yzqx.onrender.com/api",
  withCredentials: true, // 🔥 cookie ke liye
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default api;