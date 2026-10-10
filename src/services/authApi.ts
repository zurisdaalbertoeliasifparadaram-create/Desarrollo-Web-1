// src/services/authApi.ts
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { notifyGlobalError } from '../utils/errorHandler';

// URL base de API-RH (instancia en Cloud Run), sin /api/v1.
const AUTH_BASE_URL: string = import.meta.env.VITE_AUTH_API_URL ?? '';

// La URL es válida solo si es absoluta (http/https). Si falta, o se dejó el texto de
// relleno de .env.example, el navegador la trataría como una ruta del propio sitio y
// el servidor respondería con un confuso "405".
export const isAuthApiConfigured = /^https?:\/\//.test(AUTH_BASE_URL);

export const AUTH_API_NOT_CONFIGURED_MESSAGE =
  'Falta configurar la URL de API-RH (VITE_AUTH_API_URL). Avisa al administrador del sitio.';

export const authApiClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Adjunta el access token a las rutas que lo requieren (/auth/me, /auth/logout).
// Login y refresh son públicas: todavía no hay token que enviar.
authApiClient.interceptors.request.use((config) => {
  // Falla rápido y con un mensaje claro, sin enviar la petición a ningún lado.
  if (!isAuthApiConfigured) {
    console.error('[Config]', AUTH_API_NOT_CONFIGURED_MESSAGE);
    return Promise.reject(new Error(AUTH_API_NOT_CONFIGURED_MESSAGE));
  }

  const authData = localStorage.getItem('auth-storage');
  if (authData) {
    try {
      const token = JSON.parse(authData)?.state?.user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Si el JSON es inválido, lo ignoramos y la petición sigue sin token
    }
  }
  return config;
});

// Si el access token expiró a mitad de sesión, intenta renovarlo una vez con
// el refresh token y reintenta la petición original antes de rendirse.
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    notifyGlobalError(error); // red caída, 403 y 5xx: un toast global
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login')
      || originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      // getState() lee el store fuera de un componente, sin necesidad del hook
      const newAccessToken = await useAuthStore.getState().refreshSession();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
