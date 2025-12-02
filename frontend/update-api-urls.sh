#!/bin/bash
echo "🔄 Mise à jour des URLs API..."

# Remplacez par votre URL Render
RENDER_URL="https://votre-backend.onrender.com"

# Remplacer localhost:3001 (backend typique)
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:3001|$RENDER_URL|g" {} \;

# Remplacer localhost:5000
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:5000|$RENDER_URL|g" {} \;

# Remplacer localhost:8000
find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s|http://localhost:8000|$RENDER_URL|g" {} \;

echo "✅ URLs mises à jour !"
echo "Nouvelle URL: $RENDER_URL"
