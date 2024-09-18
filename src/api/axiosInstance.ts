import axios from "axios";

const axiosInstance  = axios.create({
  baseURL: 'http://54.160.233.140:8080/matchplay-api',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;