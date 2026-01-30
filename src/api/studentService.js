import api from './api';

// Récupérer tous les étudiants
export const fetchStudents = async (params = {}) => {
  const response = await api.get('/students/', { params });
  console.log("tout les etudiants",response.data)
  return response.data;
  
};

// Créer un étudiant
export const createStudent = async (payload) => {
  const response = await api.post('/students/', payload);
  return response.data;
};

// Mettre à jour un étudiant
export const updateStudent = async (id, payload) => {
  const response = await api.put(`/students/${id}`, payload);
  return response.data;
};

// Supprimer un étudiant
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

// Statistiques
export const fetchStats = async () => {
  const response = await api.get('/students/stats');
  console.log("tout les stats",response.data)
  return response.data;
};