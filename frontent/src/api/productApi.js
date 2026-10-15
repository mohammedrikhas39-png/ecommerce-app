import axios from "axios";
import { API_BASE_URL } from "./config";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
  const response = await apiClient.get("");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await apiClient.post("", product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await apiClient.put(`/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await apiClient.delete(`/${id}`);
};

export default apiClient;