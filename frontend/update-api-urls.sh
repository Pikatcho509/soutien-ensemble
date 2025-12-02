#!/bin/bash

echo "🚀 Mise à jour de toutes les URLs API vers Render"
echo "=================================================="

# URL de votre backend sur Render
RENDER_URL="https://soutien-api.onrender.com"

echo "Nouvelle URL: $RENDER_URL"

# Liste des ports locaux courants à remplacer
PORTS=("5000" "3000" "3001" "8000" "8080" "4000" "9000")

for port in "${PORTS[@]}"; do
  echo "🔍 Recherche et remplacement de localhost:$port..."
  
  # Compter les occurrences avant
  before=$(grep -r "localhost:$port" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
  
  if [ "$before" -gt 0 ]; then
    echo "   Trouvé $before occurrence(s) de localhost:$port"
    
    # Remplacer http://localhost:port
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
      -exec sed -i "s|http://localhost:$port|$RENDER_URL|g" {} \;
    
    # Remplacer https://localhost:port
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
      -exec sed -i "s|https://localhost:$port|$RENDER_URL|g" {} \;
    
    # Remplacer localhost:port sans protocole
    find src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) \
      -exec sed -i "s|localhost:$port|$RENDER_URL|g" {} \;
  fi
done

echo "✅ Toutes les URLs ont été mises à jour !"
echo ""
echo "📋 Vérification:"
echo "Occurrences de 'localhost:' restantes:"
grep -r "localhost:" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | head -5

echo ""
echo "Occurrences de 'soutien-api.onrender.com':"
grep -r "soutien-api.onrender.com" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" 2>/dev/null | head -5
