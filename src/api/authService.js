import api from './api';
import { handleRequest } from "../utils/apiHelpers"

// 🔍 Récupérer tous les utilisateurs
export const fetchUsers = () =>
  handleRequest(() => api.get('/auth'));

// ➕ Créer un utilisateur (signup)
export const createUser = (payload) =>
  handleRequest(() => api.post('/auth/register', payload));

// ✏️ Mettre à jour un utilisateur
export const updateUser = (id, payload) =>
  handleRequest(() => api.put(`/auth/${id}`, payload));

// 🗑️ Supprimer un utilisateur
export const deleteUser = (id) =>
  handleRequest(() => api.delete(`/auth/${id}`));

// 🔑 Login
export const loginUser = (payload) =>
  handleRequest(() => api.post('/auth/login', payload));

// 🚪 Logout
export const logoutUser = () =>
  handleRequest(() => api.post('/auth/logout'));

// 👤 Profil utilisateur connecté
export const fetchProfile = () =>
  handleRequest(() => api.get('/auth/profile'));

// 🔄 Mot de passe oublié
export const forgotPassword = (payload) =>
    handleRequest(() => api.post('/auth/forgot-password', payload));
export const changePassword = (payload) => 
  handleRequest(() => api.post('/auth/change-password', payload));
 
  // 🔍 Vérifier si l'email existe
export const checkEmailExists = (email) =>
  handleRequest(() => api.post('/auth/check-email', { email }));

