// Configuration API pour soutien-ensemble
const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.REACT_APP_API_URL || 
            process.env.VITE_API_URL || 
            process.env.NEXT_PUBLIC_API_URL || 
            'npm install',
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    USER: {
      PROFILE: '/users/profile',
      UPDATE: '/users/update',
      DELETE: '/users/delete',
    },
    // Ajoutez vos endpoints spécifiques ici
    SUPPORT: {
      GROUPS: '/groups',
      MESSAGES: '/messages',
      RESOURCES: '/resources',
    }
  },
  
  // Configuration des requêtes
  REQUEST_CONFIG: {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

// Fonction utilitaire pour obtenir l'URL complète
export const getApiUrl = (endpoint) => {
  // Supprimer le slash en double si nécessaire
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
};

// Fonction pour obtenir les headers avec authentification
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const headers = { ...API_CONFIG.REQUEST_CONFIG.headers };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export default API_CONFIG;
