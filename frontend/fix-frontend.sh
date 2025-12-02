#!/bin/bash

echo "🔧 Correction du frontend pour le backend Render..."

# URL du backend
BACKEND_URL="https://soutien-api.onrender.com"

# 1. Créer le fichier .env
echo "REACT_APP_API_URL=$BACKEND_URL" > .env
echo "✅ Fichier .env créé"

# 2. Remplacer les URLs localhost dans le code source
echo "🔄 Remplacement des URLs locales dans le code source..."

# Rechercher et remplacer les appels à localhost (avec le port 10000, 3001, etc.)
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|http://localhost:10000|$BACKEND_URL|g" {} \;
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|http://localhost:3001|$BACKEND_URL|g" {} \;
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|http://localhost:5000|$BACKEND_URL|g" {} \;

echo "✅ Remplacement terminé"

# 3. Vérifier le fichier package.json pour la homepage
echo "📦 Vérification de package.json..."
if grep -q '"homepage"' package.json; then
  echo "⚠️  La homepage est définie. Pour le développement local, il est préférable de la supprimer."
  echo "   Vous pouvez modifier manuellement package.json ou exécuter :"
  echo "   sed -i '/\"homepage\"/d' package.json"
fi

echo "🎉 Correction terminée. Redémarrez le serveur avec 'npm start'"
