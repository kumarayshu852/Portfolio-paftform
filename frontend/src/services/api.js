import axios from 'axios';

const API = axios.create({
  baseURL: window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : "https://portfolio-paftform.onrender.com/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const changeEmail = (data) => API.put('/profile/change-email', data);

// Project APIs
export const getProjects = () => API.get('/projects');
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const addProject = (formData) => API.post('/projects', formData);
export const editProject = (id, formData) => API.put(`/projects/${id}`, formData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

//Profile APIs
export const getProfile=()=>API.get('/profile');
export const updateProfile=(formData)=>API.put('/profile',formData);
export const changePassword=(data)=>API.put('/profile/change-password')