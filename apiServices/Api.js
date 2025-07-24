import axios from "axios";

const BASEURL = process.env.BASEURL || "http://localhost:8000/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const api = axios.create({
  baseURL: BASEURL,
});

const AUTH_TOKEN = getToken();
if (AUTH_TOKEN) {
  api.defaults.headers.common["authorization"] = `Bearer ${AUTH_TOKEN}`;
}

api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

api.interceptors.request.use((req) => {
  // You can add loading logic here if needed
  return req;
});

api.interceptors.response.use(
  (response) => {
    // You can add global response logic here
    return response;
  },
  (error) => {
    if (!error["response"]) {
      showErrorMessage("Your authorization token is invalid or expired");
      if (typeof window !== "undefined") window.location.replace("/");
      return Promise.reject(error);
    } else if (error.response.status === 403) {
      showErrorMessage("Your authorization token is invalid or expired");
      if (typeof window !== "undefined") window.location.replace("/");
    } else if (error.response.status === 401) {
      showErrorMessage("Something went wrong. kindly contact your administrator");
      if (typeof window !== "undefined") window.location.replace("/");
    }
    return Promise.reject(error.response);
  }
);

export const refreshTokenApi = async (refreshToken) => {
  return api.post("/auth/refresh-token", { refreshToken });
};

function showErrorMessage(message) {
  // You can use a toast/notification library here
  console.error("Error:", message);
}

export default api;
