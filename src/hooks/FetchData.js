import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data; // Extract and return the response data
};
