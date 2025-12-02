# Soutien Ensemble - Full Setup & Deployment Guide

## 🚀 Quick Start - Test Locally

### Prerequisites
- Node.js 18+ installed
- Git configured with GitHub credentials

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Functions (Firebase)
cd ../functions
npm install
```

### Step 2: Start Backend (Port 5000)

```bash
cd backend
npm start
```

Expected output:
```
╔════════════════════════════════════════════════╗
║            🚀 SERVEUR BACKEND DÉMARRÉ         ║
║ 📍 Port: 5000                                  ║
╚════════════════════════════════════════════════╝
```

Test it: http://localhost:5000/api/health

### Step 3: Start Frontend (Port 3000)

In a new terminal:

```bash
cd frontend
npm start
```

The browser will open automatically to http://localhost:3000

### Step 4: Test Locally

1. Create a post by clicking "✍️ Partager mes sentiments"
2. Enter title, mood, and message
3. Click "Publier 🤗"
4. See it appear in the feed
5. Click "🤗 Soutenir" to add support
6. Click "💬 Commenter" to add comments

---

## 🌐 Deploy to Production

### Option 1: GitHub Pages (Frontend Only)

GitHub Pages is **free** and perfect for static sites.

**Prerequisite**: Your GitHub repo must be public and you must have push access.

```bash
cd frontend
npm run deploy
```

This creates and pushes a `gh-pages` branch automatically.

**Your frontend will be live at**:
```
https://pikatcho509.github.io/soutien-ensemble
```

⚠️ **Important**: The frontend will try to connect to your backend API. Since GitHub Pages is static, you **also need to deploy the backend** (see Option 2 below).

---

### Option 2: Deploy Backend to Render (Free Tier)

Render.com offers free hosting with automatic deployments.

#### Steps:

1. **Push your code to GitHub** (already done ✓)

2. **Sign up for Render**
   - Go to https://render.com
   - Click "Sign up" and use GitHub credentials

3. **Create a Web Service**
   - Click "New +" → "Web Service"
   - Select your `soutien-ensemble` repository
   - Connect GitHub account if prompted

4. **Configure the Service**
   - **Name**: `soutien-api` (or any name)
   - **Environment**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
   - Leave other settings as default

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - You'll get a URL like: `https://soutien-api.onrender.com`

6. **Update Frontend Config**
   - Edit `frontend/src/App.js`
   - Find all lines with `http://localhost:5000`
   - Replace with your Render URL: `https://soutien-api.onrender.com`
   - Rebuild: `npm run build`
   - Run deploy again: `npm run deploy`

Your API will be live at: `https://soutien-api.onrender.com/api/health`

---

### Option 3: Firebase (Both Frontend + Backend + Database)

Firebase offers an integrated solution with hosting, functions, and database.

#### Requirements
- Firebase CLI installed: `npm install -g firebase-tools`
- Google account

#### Steps

1. **Initialize Firebase** (if not done):
   ```bash
   firebase init
   ```

2. **Deploy Frontend**
   ```bash
   firebase deploy --only hosting
   ```

3. **Deploy Backend Functions**
   ```bash
   firebase deploy --only functions
   ```

Your site will be at: `https://soutien-ensemble.web.app`

---

## ✅ Final Checklist

- [ ] Backend runs locally: `npm start` in `backend/` → http://localhost:5000/api/health responds
- [ ] Frontend runs locally: `npm start` in `frontend/` → http://localhost:3000 opens
- [ ] Can create posts and add support in local version
- [ ] Backend is deployed (Render, Firebase, Heroku, etc.)
- [ ] Frontend is deployed (GitHub Pages or Firebase)
- [ ] Frontend API URL is updated to point to deployed backend
- [ ] Share deployed URL with friends

---

## 🔗 Share With Friends

Once deployed, share this URL:
```
https://pikatcho509.github.io/soutien-ensemble
```

They can:
1. Browse existing posts
2. Create anonymous posts (no login required for demo)
3. Add support and comments
4. See emergency resources if needed

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Or use a different port
PORT=3001 npm start
```

### Frontend can't connect to backend
- Check backend is running: http://localhost:5000/api/health
- Check frontend is using correct backend URL in `App.js`
- Check for CORS issues in browser console

### GitHub Pages shows 404
- Ensure `homepage` in `frontend/package.json` is: `"https://pikatcho509.github.io/soutien-ensemble"`
- Ensure `predeploy` script runs build before deploy

### Render deployment fails
- Check `backend/package.json` is valid JSON
- Check `npm start` script exists and points to `server.js`
- Check Node.js version compatibility (18+)

---

## 📝 Local Testing Checklist

Test these scenarios locally before inviting friends:

1. **Create a Post**
   - Title: "Test Post"
   - Mood: "espoir"
   - Content: "This is a test"
   - Result: Post appears in feed

2. **Add Support**
   - Click "🤗 Soutenir" on any post
   - Result: Counter increases

3. **Add Comment**
   - Click "💬 Commenter"
   - Write: "Great message!"
   - Result: Comment appears below post

4. **View Stats**
   - Posts, supports, and comments counters update
   - Hero section shows correct counts

5. **Emergency Section**
   - Visible at bottom with contact numbers
   - Links work (phone, WhatsApp)

---

## 🎨 Customize

Before deploying, you can customize:

- **Colors**: Edit `:root` variables in `frontend/src/App.css`
- **Messages**: Edit welcome messages and support messages in `frontend/src/App.js`
- **Branding**: Change "Soutien Ensemble" title and logo
- **API Endpoints**: Add new endpoints in `backend/server.js`

---

**Made with 💖 for mental health support**
