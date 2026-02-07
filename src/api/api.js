
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.11.113:8000/api",
   // adapte selon ton backend
  timeout: 10000,
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
// ⚠️ NOUVEAU: Intercepteur des réponses (gère les erreurs)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Erreur 401 = Token expiré ou invalide
      if (error.response.status === 401) {
        await AsyncStorage.removeItem("authToken");
        // Vous pouvez rediriger vers Login ici
      }
    }
    return Promise.reject(error);
  }
);

export default api;

