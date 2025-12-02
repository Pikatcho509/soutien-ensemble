#!/bin/bash

echo "🔗 Connexion de soutien-ensemble au backend Render"
echo "==================================================="

# Demander l'URL du backend Render
read -p "Entrez l'URL de votre backend sur Render (ex: https://soutien-api.onrender.com): " RENDER_URL

if [ -z "$RENDER_URL" ]; then
    echo "❌ URL requise!"
    exit 1
fi

echo "📡 URL du backend: $RENDER_URL"

# 1. Créer le fichier .env
echo "🔧 Création du fichier .env..."
if [ -f "vite.config.js" ] || [ -f "vite.config.ts" ]; then
    echo "VITE_API_URL=$RENDER_URL" > .env
    echo "VITE_APP_NAME=soutien-ensemble" >> .env
    echo "Framework détecté: Vite"
elif grep -q "react-scripts" package.json; then
    echo "REACT_APP_API_URL=$RENDER_URL" > .env
    echo "REACT_APP_ENV=production" >> .env
    echo "Framework détecté: React (Create React App)"
elif grep -q "next" package.json; then
    echo "NEXT_PUBLIC_API_URL=$RENDER_URL" > .env
    echo "NEXT_PUBLIC_APP_NAME=soutien-ensemble" >> .env
    echo "Framework détecté: Next.js"
else
    echo "API_URL=$RENDER_URL" > .env
    echo "Framework: Inconnu, utilisation d'API_URL simple"
fi

# 2. Rechercher les appels API
echo "🔍 Recherche des appels API vers localhost..."
echo "Les fichiers suivants contiennent 'localhost':"
grep -r -l "localhost" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | head -10

# Compter le nombre de fichiers
FILE_COUNT=$(grep -r -l "localhost" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
echo "📊 $FILE_COUNT fichiers à mettre à jour"

# 3. Remplacer les URLs
if [ $FILE_COUNT -gt 0 ]; then
    echo "🔄 Remplacement des URLs locales par $RENDER_URL..."
    
    # Remplacer http://localhost:port
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
        -exec sed -i "s|http://localhost:[0-9]\{3,4\}|$RENDER_URL|g" {} \;
    
    # Remplacer https://localhost:port
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
        -exec sed -i "s|https://localhost:[0-9]\{3,4\}|$RENDER_URL|g" {} \;
    
    # Remplacer localhost:port sans protocole (dans les commentaires ou strings)
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
        -exec sed -i "s|localhost:[0-9]\{3,4\}|$RENDER_URL|g" {} \;
    
    echo "✅ Remplacement terminé!"
else
    echo "ℹ️ Aucun appel localhost trouvé dans src/"
fi

# 4. Vérifier si Axios est utilisé
echo "📦 Vérification des dépendances API..."
if grep -q "axios" package.json; then
    echo "✓ Axios détecté"
else
    echo "📌 Axios non trouvé, utilisation probable de fetch"
fi

# 5. Créer un fichier de configuration API
echo "📁 Création du fichier de configuration API..."
mkdir -p src/config

cat > src/config/api.js << APIEOF
// Configuration API pour soutien-ensemble
const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.REACT_APP_API_URL || 
            process.env.VITE_API_URL || 
            process.env.NEXT_PUBLIC_API_URL || 
            '$RENDER_URL',
  
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
  return \`\${baseUrl}/\${cleanEndpoint}\`;
};

// Fonction pour obtenir les headers avec authentification
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const headers = { ...API_CONFIG.REQUEST_CONFIG.headers };
  
  if (token) {
    headers['Authorization'] = \`Bearer \${token}\`;
  }
  
  return headers;
};

export default API_CONFIG;
APIEOF

# 6. Créer un service API unifié
cat > src/services/api.js << SERVICEEOF
// Service API unifié pour soutien-ensemble
import API_CONFIG from '../config/api';

/**
 * Service API pour communiquer avec le backend
 */
class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si présent
    const token = localStorage.getItem('token');
    if (token) {
      defaultOptions.headers.Authorization = \`Bearer \${token}\`;
    }

    try {
      const response = await fetch(url, defaultOptions);
      
      // Vérifier si la réponse est OK
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      // Essayer de parser la réponse en JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Méthodes HTTP simplifiées
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Méthodes spécifiques à soutien-ensemble
  async login(credentials) {
    return this.post('/auth/login', credentials);
  }

  async register(userData) {
    return this.post('/auth/register', userData);
  }

  async getProfile() {
    return this.get('/users/profile');
  }

  async getSupportGroups() {
    return this.get('/groups');
  }

  // Upload de fichier (si nécessaire)
  async uploadFile(endpoint, file, data = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Ajouter les autres données
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const url = \`\${this.baseUrl}\${endpoint}\`;
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token ? \`Bearer \${token}\` : '',
      },
      body: formData,
    });

    return response.json();
  }
}

// Export d'une instance unique
export default new ApiService();
SERVICEEOF

echo "🎉 Configuration terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Installez les dépendances: npm install"
echo "2. Testez en local: npm start"
echo "3. Vérifiez dans les DevTools (F12 → Network) que les appels vont vers $RENDER_URL"
echo "4. Si tout fonctionne: git add . && git commit -m 'Connect to Render' && git push"
echo ""
echo "🔗 Backend URL: $RENDER_URL"
echo "🌐 Votre frontend est maintenant connecté à Render!"
