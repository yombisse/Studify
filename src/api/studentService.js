import api from './api';
import {handleRequest} from "../utils/apiHelpers"

// 🔍 Récupérer tous les étudiants
export const fetchStudents = (params = {}) =>
  handleRequest(() => api.get('/students', { params }));

// ➕ Créer un étudiant
export const createStudent = (payload) =>
  handleRequest(() => api.post('/students', payload));
// ✏️ Mettre à jour un étudiant
export const updateStudent = (id, payload) =>
  handleRequest(() => api.put(`/students/${id}`, payload));

// 🗑️ Supprimer un étudiant
export const deleteStudent = (id) =>
  handleRequest(() => api.delete(`/students/${id}`));

// 📊 Statistiques
export const fetchStats = () =>
  handleRequest(() => api.get('/students/stats'));
