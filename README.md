# 🤗 Soutien Ensemble

Une plateforme complète et bienveillante de soutien psychologique permettant aux personnes de **partager leurs sentiments** et de **recevoir du soutien** dans un environnement sécurisé.

![License](https://img.shields.io/badge/License-ISC-green)
![Status](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)

---

## 🎯 Features

✅ **Partage Anonyme** - Publiez vos sentiments en restant anonyme ou avec votre pseudo  
✅ **Soutien Communautaire** - Recevez du soutien avec des clics "🤗 Soutenir"  
✅ **Commentaires Bienveillants** - Laissez des messages d'encouragement  
✅ **Détection d'Urgence** - Signalement automatique des messages en détresse  
✅ **Ressources d'Urgence** - Numéros d'aide et contacts importants  
✅ **Messages Motivants** - Carousel d'images inspirantes  
✅ **Statistiques** - Suivi des posts, soutiens et commentaires  
✅ **Responsive** - Fonctionne sur mobile, tablette et desktop  

---

## 🚀 Quick Start

### Option 1: Test Local (Recommended First)

```bash
# Clone/extract the project
cd soutien-ensemble

# Install and start backend (Terminal 1)
cd backend
npm install
npm start

# Install and start frontend (Terminal 2)
cd frontend
npm install
npm start
```

Frontend opens at **http://localhost:3000** 🎉

### Option 2: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

---

## 📚 Documentation

- **[STATUS.md](STATUS.md)** - Complete project status and what's been done
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - How to deploy to production
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **[DEPLOYMENT_GUIDE.md#troubleshooting](DEPLOYMENT_GUIDE.md#troubleshooting)** - Troubleshooting

---

## 📱 Project Structure

```
soutien-ensemble/
├── backend/              # Node.js/Express API
│   ├── server.js        # Main server
│   ├── routes/          # API endpoints
│   ├── Models/          # Data models
│   └── middleware/      # Authentication
├── frontend/            # React app
│   ├── src/
│   │   ├── App.js       # Main component
│   │   ├── App.css      # Styles
│   │   └── components/  # Reusable components
│   └── build/           # Production build
├── functions/           # Firebase Cloud Functions
├── mobile/              # React Native (future)
└── DEPLOYMENT_GUIDE.md  # How to go live
```

---

## 🌐 Deploy to Production

### Quick Deployment (5 minutes total)

1. **Frontend** (GitHub Pages):
   ```bash
   cd frontend
   npm run deploy
   ```
   → Lives at: https://pikatcho509.github.io/soutien-ensemble

2. **Backend** (Render):
   - Go to https://render.com
   - Connect GitHub repo
   - Set root to `backend/`
   - Deploy!
   → Lives at: https://soutien-api.onrender.com

3. **Connect them**:
   - Update `frontend/src/App.js`
   - Replace `http://localhost:5000` with Render URL
   - Redeploy frontend

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed steps.**

---

## 🔗 Share With Friends

Once deployed:

```
https://pikatcho509.github.io/soutien-ensemble
```

Friends can:
- 📝 Browse posts from the community
- ✍️ Create anonymous posts
- 🤗 Add support to posts
- 💬 Leave encouraging comments
- 📞 Access emergency resources

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, CSS3, Responsive Design |
| **Backend** | Node.js, Express.js |
| **Hosting** | GitHub Pages (frontend), Render (backend) |
| **Database** | In-memory (demo), upgradeable to MongoDB/PostgreSQL |
| **Functions** | Firebase Cloud Functions (optional) |

---

## 📊 API Endpoints

```bash
GET  /api/health              # Check API status
GET  /api/posts               # Get all posts
POST /api/posts               # Create a post
GET  /api/posts/:id           # Get specific post
POST /api/posts/:id/support   # Add support
POST /api/comments            # Add comment
GET  /api/stats               # Get statistics
GET  /api/support-message     # Get random support message
```

---

## 🎨 Customization

Before deploying, customize:

1. **Colors** - Edit `:root` variables in `frontend/src/App.css`
2. **Text** - Edit welcome messages in `frontend/src/App.js`
3. **Images** - Add your own images to `frontend/public/images/`
4. **Emergency Contacts** - Update phone numbers in `backend/server.js`

---

## ⚠️ Important Notes

- **Data is in-memory** during development. Restarts lose all posts.
- **For production**, connect to a database (MongoDB, PostgreSQL, etc.)
- **No authentication** required in demo mode (upgradeable)
- **Emergency numbers are French** - Update for your region

---

## 🔒 Security

- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on all endpoints
- ✅ Emergency message detection
- ✅ Anonymity options for sensitive posts
- ⚠️ **Upgrade**: Add authentication, database encryption, rate limiting

---

## 📈 Next Steps (Production)

1. Connect to real database
2. Add user authentication
3. Set up email notifications
4. Add moderation system
5. Integrate real emergency services
6. Add analytics
7. Set up monitoring/logging

---

## 💪 Testing Checklist

Before inviting friends:

- [ ] Create post locally
- [ ] Add support locally
- [ ] Leave comment locally
- [ ] Deploy frontend to GitHub Pages
- [ ] Deploy backend to Render
- [ ] Update API URL in frontend
- [ ] Test deployed version
- [ ] Share URL with friends

**[See full checklist in STATUS.md](STATUS.md#-success-checklist)**

---

## 📝 License

ISC License - See LICENSE file

---

## 👥 Contributing

This is a mental health support platform. Before contributing:

1. Read our values above
2. Ensure changes don't compromise safety
3. Test thoroughly locally
4. Document your changes

---

## 🤝 Support

Have questions? Check:

- 📖 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- 📊 [STATUS.md](STATUS.md)
- 🔧 [backend/README.md](backend/README.md)
- 🐛 [Troubleshooting Section](DEPLOYMENT_GUIDE.md#troubleshooting)

---

## 🎉 Made With 💖

For people struggling with their mental health, offering them a safe space to be heard and supported.

---

**Let's build a more compassionate world together. 🌍💜**
