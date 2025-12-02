const API_BASE_URL = 'https://votre-backend.onrender.com/api';

// Fonction utilitaire pour les appels API
export const apiClient = {
  get: async (endpoint, requiresAuth = false) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    return handleResponse(response);
  },

  post: async (endpoint, data, requiresAuth = false) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async (endpoint, data, requiresAuth = false) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async (endpoint, requiresAuth = false) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    return handleResponse(response);
  },
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
};

// API spécifiques
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  getProfile: () => apiClient.get('/auth/me', true),
  updateProfile: (profileData) => apiClient.put('/auth/profile', profileData, true),
};

export const postsAPI = {
  getAll: (page = 1, limit = 10, category = 'all') => 
    apiClient.get(`/posts?page=${page}&limit=${limit}&category=${category}`),
  getById: (id) => apiClient.get(`/posts/${id}`),
  create: (postData) => apiClient.post('/posts', postData, true),
  support: (id) => apiClient.post(`/posts/${id}/support`, {}, true),
  getUserPosts: (userId) => apiClient.get(`/posts/user/${userId}`),
};

export const commentsAPI = {
  getByPost: (postId) => apiClient.get(`/comments/post/${postId}`),
  create: (commentData) => apiClient.post('/comments', commentData, true),
  like: (id) => apiClient.post(`/comments/${id}/like`, {}, true),
};

export const supportAPI = {
  becomeSupporter: () => apiClient.post('/support/become-supporter', {}, true),
  getStats: () => apiClient.get('/support/stats', true),
};