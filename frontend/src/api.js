import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

// attach token automatically (if you use DRF auth)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPersons = () => api.get('persons/')
export const createPerson = (data) => api.post('persons/', data)
export const getPerson = (id) => api.get(`persons/${id}/`)
export const updatePerson = (id, data) => api.put(`persons/${id}/`, data)
export const deletePerson = (id) => api.delete(`persons/${id}/`)

export default api

