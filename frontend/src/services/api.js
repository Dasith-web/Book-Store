import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/",
});

// Intercept 401 responses so we can log out automatically if desired
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
