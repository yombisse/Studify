import api from './api';

// 🔍 Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  const response = await api.get('/auth');
  return response.data;
};

// ➕ Créer un utilisateur (signup)
export const createUser = async (payload) => {
  const response = await api.post('/auth/signin', payload);
  return response.data;
};

// ✏️ Mettre à jour un utilisateur
export const updateUser = async (id, payload) => {
  const response = await api.put(`/auth/${id}`, payload);
  return response.data;
};

// 🗑️ Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/${id}`);
  return response.data;
};

// 🔑 Login
export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

// 🚪 Logout
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// 👤 Profil utilisateur connecté
export const fetchProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// 🔄 Mot de passe oublié
export const forgotPassword = async (payload) => {
  const response = await api.post('/auth/forgot-password', payload);
  return response.data;
};
