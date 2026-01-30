import api from './api';

// 🔍 Récupérer tous les utilisateurs
export const fetchUsers = async (params = {}) => {
  const response = await api.get('/users/', { params });
  console.log("Tous les utilisateurs:", response.data);
  return response.data;
};

// ➕ Créer un utilisateur (signup)
export const createUser = async (payload) => {
  const response = await api.post('/users/signup', payload);
  return response.data;
};

// ✏️ Mettre à jour un utilisateur
export const updateUser = async (id, payload) => {
  const response = await api.put(`/users/${id}`, payload);
  return response.data;
};

// 🗑️ Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// 🔑 Login
export const loginUser = async (payload) => {
  const response = await api.post('/users/login', payload, { withCredentials: true });
  return response.data;
};

// 🚪 Logout
export const logoutUser = async () => {
  const response = await api.post('/users/logout', {}, { withCredentials: true });
  return response.data;
};

// 👤 Profil utilisateur connecté
export const fetchProfile = async () => {
  const response = await api.get('/users/profile', { withCredentials: true });
  return response.data;
};

// 🔄 Mot de passe oublié (reset direct)
export const forgotPassword = async (payload) => {
  const response = await api.post('/users/forgot-password', payload);
  return response.data;
};
