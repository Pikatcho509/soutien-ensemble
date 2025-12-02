#!/bin/bash

echo "🔧 Réparation des chemins pour /soutien-ensemble..."

# 1. Mettre à jour package.json
if [ -f "package.json" ]; then
  echo "Mise à jour de package.json..."
  # Ajouter homepage si elle n'existe pas
  if ! grep -q '"homepage"' package.json; then
    sed -i '/"version"/a\  "homepage": "/soutien-ensemble",' package.json
    echo "✓ homepage ajoutée"
  fi
fi

# 2. Chercher les fichiers de routing
find src -name "*.js" -o -name "*.jsx" | xargs grep -l "BrowserRouter\|Router" 2>/dev/null | head -5

# 3. Créer un patch pour index.js ou App.js
if [ -f "src/index.js" ]; then
  echo "Patch pour src/index.js..."
  # Créer une backup
  cp src/index.js src/index.js.backup
  
  # Ajouter HashRouter ou modifier BrowserRouter
  cat > src/index.js.patch << 'PATCH'
// Import HashRouter au lieu de BrowserRouter si nécessaire
import { HashRouter as Router } from 'react-router-dom';

// OU pour BrowserRouter avec basename
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter basename="/soutien-ensemble">
  <App />
</BrowserRouter>
PATCH
  echo "Patch créé: src/index.js.patch"
fi

echo "✅ Script de réparation terminé"
echo "📋 Étapes manuelles:"
echo "1. Ouvrez src/index.js"
echo "2. Remplacez BrowserRouter par HashRouter OU ajoutez basename"
echo "3. Redémarrez: npm start"
