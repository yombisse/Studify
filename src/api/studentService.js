import api from './api';

// Récupérer tous les étudiants
export const fetchStudents = async (params = {}) => {
  const response = await api.get('/', { params });
  console.log("tout les etudiants",response.data)
  return response.data;
  
};

// Créer un étudiant
export const createStudent = async (payload) => {
  const response = await api.post('/', payload);
  return response.data;
};

// Supprimer un étudiant
export const deleteStudent = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
