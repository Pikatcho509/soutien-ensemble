# Soutien Ensemble - API Backend

Backend Node.js/Express pour la plateforme de soutien psychologique **Soutien Ensemble**.

## Installation

```bash
npm install
```

## Démarrage local

```bash
npm start
```

Le serveur démarre sur `http://localhost:5000`

## Démarrage en développement

```bash
npm run dev
```

## API Endpoints

- `GET /api/health` — Vérifier que l'API fonctionne
- `GET /api/posts` — Récupérer toutes les publications
- `POST /api/posts` — Créer une nouvelle publication
- `GET /api/posts/:id` — Récupérer une publication spécifique
- `POST /api/posts/:id/support` — Ajouter du soutien à une publication
- `POST /api/comments` — Ajouter un commentaire
- `GET /api/stats` — Récupérer les statistiques
- `GET /api/support-message` — Récupérer un message de soutien aléatoire

## Structure

- `server.js` — Serveur principal
- `middleware/` — Middlewares d'authentification
- `Models/` — Modèles de données
- `routes/` — Routes de l'API

## Déploiement sur Render

1. Push votre code sur GitHub
2. Allez sur [render.com](https://render.com)
3. Créez un nouveau **Web Service** depuis votre repo GitHub
4. Configurez:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node.js
5. Render crée automatiquement une URL accessible publiquement (ex: `https://soutien-api.onrender.com`)

## Variables d'environnement

- `PORT` — Port d'écoute (défaut: 5000)

## Notes

- Les données sont stockées en mémoire (elles disparaissent au redémarrage)
- Pour un usage en production, connectez une base de données (MongoDB, PostgreSQL, etc.)
- Les messages d'urgence sont détectés et marqués automatiquement
