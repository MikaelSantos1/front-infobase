
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("auth:user");
    const token = user ? JSON.parse(user).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401
    ) {
     localStorage.removeItem('auth:user')
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);