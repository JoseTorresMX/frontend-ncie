// js/api/v1/apiClient.js

import axios from 'axios';
import { API_CONFIG } from './config.js'; // Importa tu configuración API

const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL, // Usa la BASE_URL de tu configuración
    headers: {
        ...API_CONFIG.DEFAULT_HEADERS // Incluye los headers por defecto
    }
});

// Opcional: Interceptor para añadir el token de autenticación a todas las solicitudes
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Opcional: Interceptor para manejar errores comunes (ej. 401 Unauthorized)
apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        console.error("Autenticación fallida o token expirado. Redirigiendo a login...");
        // window.location.href = '/login'; // Descomenta y ajusta si necesitas redirigir
    }
    return Promise.reject(error);
});

export default apiClient;