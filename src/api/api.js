
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.11.113:8000/api", // adapte selon ton backend
});

// ⚡ Intercepteur pour ajouter le token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  console.log("token",token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

