import axios from "axios";

const axiosInstance  = axios.create({
  baseURL: 'http://localhost:9090/api/matchplay',
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