# 🏗️ Project Architecture

## Local Development Setup

```
Your Computer
│
├─ TERMINAL 1: Backend
│  └─ cd backend && npm start
│     │
│     └─ 🖥️  Node.js Server
│        └─ http://localhost:5000
│           │
│           ├─ GET  /api/posts
│           ├─ POST /api/posts
│           ├─ POST /api/comments
│           ├─ POST /api/posts/:id/support
│           ├─ GET  /api/stats
│           ├─ GET  /api/health ✅ (test this)
│           └─ GET  /api/support-message
│
├─ TERMINAL 2: Frontend
│  └─ cd frontend && npm start
│     │
│     └─ 🌐 React Development Server
│        └─ http://localhost:3000
│           │
│           ├─ App.js
│           ├─ Components/
│           └─ Styles
│
└─ Browser
   └─ http://localhost:3000
      │
      └─ Fetches from http://localhost:5000
```

---

## Production Deployment (Online)

```
GITHUB REPOSITORY
│
├─ Frontend Branch (main)
│  └─ npm run deploy
│     │
│     └─ Pushes to gh-pages branch
│        │
│        └─ 📡 GitHub Pages CDN
│           └─ https://pikatcho509.github.io/soutien-ensemble ✅
│              │
│              ├─ Static HTML/CSS/JS
│              ├─ Cached globally
│              └─ Fetches API from Render
│
├─ Backend Directory (main)
│  └─ Auto-deployed by Render (via GitHub webhook)
│     │
│     └─ 🖥️  Render Container
│        └─ https://soutien-api-xxxx.onrender.com ✅
│           │
│           ├─ Node.js Server
│           ├─ Port 5000
│           ├─ Live API endpoints
│           └─ In-memory database (demo)
│
└─ Users' Browsers
   │
   ├─ Visit: https://pikatcho509.github.io/soutien-ensemble
   │  │
   │  └─ Loads frontend from GitHub Pages CDN (fast ⚡)
   │     │
   │     └─ Fetches data from: https://soutien-api-xxxx.onrender.com
   │        │
   │        └─ Makes API calls (create posts, add support, etc.)
   │
   └─ Users can share this link with friends! 🎉
```

---

## File Flow - How It Works

```
User Action (Browser)
│
├─ Click: "✍️ Partager mes sentiments"
│  │
│  └─ Frontend: App.js opens CreatePostForm component
│
├─ Fill: Title, Mood, Message
│  │
│  └─ Frontend: React state updates
│
├─ Click: "Publier 🤗"
│  │
│  ├─ Frontend: Validates input
│  │
│  ├─ POST to Backend: /api/posts
│  │  │
│  │  └─ Backend: server.js receives request
│  │     │
│  │     ├─ Validates: title + content not empty
│  │     ├─ Detects: Emergency keywords
│  │     ├─ Creates: New post object
│  │     ├─ Stores: In memory (posts array)
│  │     │
│  │     └─ Returns: JSON response
│  │
│  ├─ Frontend: Receives response
│  │  │
│  │  ├─ Shows: Alert with message
│  │  ├─ Closes: Form
│  │  └─ Fetches: Updated posts list
│  │
│  └─ Frontend: Refreshes UI
│     │
│     └─ User sees: New post in feed! ✅
│
├─ Click: "🤗 Soutenir"
│  │
│  ├─ Frontend: Sends POST /api/posts/:id/support
│  │  │
│  │  └─ Backend: Increments supportCount
│  │
│  ├─ Frontend: Receives count
│  │  │
│  │  └─ Updates: Button text with new count
│  │
│  └─ User sees: Support count increased! ✅
│
└─ Click: "💬 Commenter"
   │
   ├─ Frontend: Shows comment form
   │
   ├─ User writes: Message of support
   │
   ├─ Click: "💬 Envoyer"
   │  │
   │  └─ POST to Backend: /api/comments
   │     │
   │     └─ Backend: Creates comment, stores it
   │
   ├─ Frontend: Hides form
   │  │
   │  └─ Fetches: Comments list
   │
   └─ User sees: Comment appears below post! ✅
```

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    SOUTIEN ENSEMBLE                         │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
            ┌─────────┐ ┌─────────┐ ┌──────────┐
            │ Frontend│ │ Backend │ │ Database │
            └────┬────┘ └────┬────┘ └─────┬────┘
                 │           │            │
            React 18.2     Express.js   In-Memory
            CSS3             Node.js    (upgradeable
            Components       PORT:5000   to MongoDB)
            │                │            │
            │                │            │
         State               API          Data
         Routes              Endpoints    Storage
         Hooks               Logic        Persistence
                 │
                 │ (JSON Requests)
                 │
            HTTP/CORS
                 │
        ┌────────┴────────┐
        │                 │
    Local Dev      Production
    (localhost)     (GitHub Pages +
                     Render)
```

---

## Deployment Flow

```
You (Local Machine)
│
├─ Git: Edit files (App.js, server.js, etc.)
│  │
│  └─ Git: Commit changes
│     │
│     └─ Git: Push to GitHub
│        │
│        ├─ Main branch receives code
│        │
│        ├─ GitHub Pages webhook triggers
│        │  │
│        │  └─ npm run deploy
│        │     │
│        │     └─ Frontend deployed
│        │        https://pikatcho509.github.io/soutien-ensemble
│        │
│        └─ Render webhook triggers
│           │
│           └─ Render checks backend/ directory
│              │
│              ├─ npm install (backend/)
│              ├─ npm start
│              │
│              └─ Backend deployed
│                 https://soutien-api-xxxx.onrender.com
│
└─ Users visit website
   │
   └─ Everything works! 🎉
```

---

## Data Flow - Create Post → Display

```
                Frontend (React)
                     │
         ┌───────────┼───────────┐
         │           │           │
      (1)            (2)         (3)
    User fills    User clicks  Component
    form          "Publier"    state updates
         │           │           │
         └───────────┼───────────┘
                     │
                   POST /api/posts
                  (JSON payload)
                     │
                     ▼
              Backend (Express)
                     │
         ┌───────────┼───────────┐
         │           │           │
      (4)            (5)         (6)
   Receive     Validate &    Store in
   request    Process      Memory
     │           │           │
     └───────────┼───────────┘
                 │
           Return JSON
          (success + post)
                 │
                 ▼
            Frontend (React)
                 │
         ┌───────┼───────┐
         │       │       │
      (7)     (8)       (9)
    Update   Refresh   Show new
    state    feed      post in list
         │       │       │
         └───────┼───────┘
                 │
              ✅ User sees
              their post!
```

---

## Emergency Detection Logic

```
User creates post with content:
│
└─ Backend: CheckString for keywords
   │
   ├─ Contains: "suicid" | "mourir" | "suicide"?
   │  └─ YES → Mark as emergency ⚠️
   │
   ├─ Contains: "je vais me tuer" | "finir ma vie"?
   │  └─ YES → Mark as emergency ⚠️
   │
   └─ Contains: "désespéré" | "sans espoir"?
      └─ YES → Mark as emergency ⚠️
         │
         └─ Frontend: Shows RED ALERT
            ├─ 🚨 Message marked urgent
            ├─ Emergency resources popup
            ├─ Notify support team
            └─ Highlight in feed
```

---

## Summary

- **Frontend** = React UI (runs in browser)
- **Backend** = Express server (processes requests)
- **Local** = Both run on your computer
- **Production** = Frontend on GitHub Pages, Backend on Render
- **Communication** = JSON over HTTP/CORS

**All together = Fully functional support platform! 🤗**
