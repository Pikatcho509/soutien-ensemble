# 🚀 QUICK COMMANDS - Copy & Paste These

## Local Testing (Do This First!)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

Wait for:
```
╔════════════════════════════════════════════════╗
║            🚀 SERVEUR BACKEND DÉMARRÉ         ║
║ 📍 Port: 5000                                  ║
╚════════════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

Browser opens automatically to `http://localhost:3000`

### Test These:
1. Create post: "✍️ Partager mes sentiments"
2. Type title, mood, message
3. Click "Publier 🤗"
4. Click "🤗 Soutenir" on a post
5. Click "💬 Commenter" on a post

✅ If all work: **Local testing complete!**

---

## Deploy to GitHub Pages (Frontend)

```bash
cd frontend
npm run deploy
```

Wait for completion. Then check:
```
https://pikatcho509.github.io/soutien-ensemble
```

⚠️ Won't work yet - backend is still local! Go to Step 2.

---

## Deploy to Render (Backend)

### Manually (Recommended):

1. Go to https://render.com
2. Sign up with GitHub account
3. Click "New +" → "Web Service"
4. Select `soutien-ensemble` repo
5. Fill in:
   - **Name**: `soutien-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
6. Click "Create Web Service"
7. Wait for deployment
8. Copy your URL (like `https://soutien-api-xxxx.onrender.com`)
9. Test: Visit `https://soutien-api-xxxx.onrender.com/api/health`

Should return:
```json
{
  "message": "✅ API Soutien Ensemble en fonctionnement!",
  "status": "OK",
  "totalPosts": 3
}
```

---

## Connect Frontend to Backend (Deployed)

Edit `frontend/src/App.js`:

Search for: `http://localhost:5000`

Replace ALL occurrences with your Render URL: `https://soutien-api-xxxx.onrender.com`

**Then redeploy:**
```bash
cd frontend
npm run build
npm run deploy
```

---

## Final Check

Visit: https://pikatcho509.github.io/soutien-ensemble

Should be fully functional! ✅

---

## Share This Link With Friends

```
https://pikatcho509.github.io/soutien-ensemble
```

---

## If Something Breaks

### Frontend won't load:
```bash
# Clear cache and rebuild
cd frontend
rm -rf build
npm run build
npm run deploy
```

### Backend not responding:
```bash
# Check if running
curl http://localhost:5000/api/health

# If error, restart:
cd backend
npm start
```

### Port already in use:
```bash
# Use different port
PORT=3001 npm start
```

### Git push fails:
```bash
# Check status
git status

# Add and commit
git add .
git commit -m "Updates"

# Push
git push
```

---

## Useful Links

- 📖 Full docs: `DEPLOYMENT_GUIDE.md`
- 📊 Status: `STATUS.md`
- 🔧 API: `backend/README.md`
- 📱 Frontend: `frontend/README.md`

---

**Success = ✅ Local works + ✅ GitHub Pages works + ✅ Render works**
