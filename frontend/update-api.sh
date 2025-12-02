#!/bin/bash

echo "🔄 Mise à jour des URLs API vers Render..."

# URL de votre backend Render
RENDER_URL="https://soutien-api.onrender.com"

# Remplacer localhost:10000 (le port de votre backend)
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:10000|${RENDER_URL}|g" {} \;

# Remplacer localhost:3001, 5000, 8000 (autres ports courants)
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:3001|${RENDER_URL}|g" {} \;

find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:5000|${RENDER_URL}|g" {} \;

find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:8000|${RENDER_URL}|g" {} \;

echo "✅ URLs mises à jour !"
echo "Backend URL: ${RENDER_URL}"

# Afficher les changements
echo "📝 Changements détectés:"
grep -r "${RENDER_URL}" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" | head -10
