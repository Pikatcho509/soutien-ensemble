const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Données de test
let posts = [
  {
    id: 1,
    title: "Besoin de parler aujourd'hui",
    content: "Je me sens seul et j'ai besoin de partager ce que je ressens. Les journées sont longues et difficiles en ce moment.",
    author: "Anonyme",
    mood: "triste",
    supportCount: 3,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Petite victoire du jour",
    content: "Aujourd'hui j'ai réussi à sortir de chez moi après plusieurs jours. C'est un petit pas mais ça fait du bien.",
    author: "Marie",
    mood: "espoir", 
    supportCount: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: "Anxiété qui monte",
    content: "Les pensées négatives tournent en boucle dans ma tête. Je n'arrive pas à les arrêter.",
    author: "Anonyme",
    mood: "anxieux",
    supportCount: 5,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  }
];
// Données pour les commentaires (déplacées en haut pour éviter les ReferenceError)
let comments = [
  {
    id: 1,
    postId: 1,
    author: "Supporteur",
    content: "Je comprends ce que vous traversez. Vous n'êtes pas seul 🤗",
    createdAt: new Date()
  },
  {
    id: 2,
    postId: 1, 
    author: "Anonyme",
    content: "Chaque jour est une nouvelle chance. Courage !",
    createdAt: new Date()
  }
];
// Ajoutez cette fonction AVANT les routes
function detectEmergency(content) {
  const emergencyKeywords = [
    'suicid', 'mourir', 'mort', 'suicide', 'je veux mourir', 
    'je vais me tuer', 'finir ma vie', 'plus envie de vivre',
    'désespéré', 'désespoir', 'sans espoir', 'courage'
  ];
  
  return emergencyKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
}

// Modifiez la route de création de posts pour inclure la détection
app.post('/api/posts', (req, res) => {
  const { title, content, mood = 'triste', author = 'Anonyme' } = req.body;
  
  // Validation basique
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Le titre et le contenu sont obligatoires'
    });
  }
  
  // Détection d'urgence
  const isEmergency = detectEmergency(content);
  
  const newPost = {
    id: posts.length + 1,
    title: title.trim(),
    content: content.trim(),
    author: author.trim() || 'Anonyme',
    mood: mood,
    supportCount: 0,
    isEmergency: isEmergency,
    createdAt: new Date()
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    message: isEmergency ? 
      'Publication créée. 💡 Ressources d\'urgence disponibles.' : 
      'Publication créée avec succès!',
    post: newPost
  });
});
const supportiveMessages = [
  "Vous êtes plus fort que vous ne le pensez 💪",
  "Chaque petit pas compte, même les plus petits 👣",
  "Vos sentiments sont valides et importants ❤️",
  "Vous n'êtes pas seul dans cette épreuve 🤗",
  "Le soleil se lèvera encore demain ☀️",
  "Prenez soin de vous, vous le méritez 🌟",
  "Les nuages finissent toujours par passer ⛅",
  "Votre présence dans ce monde compte 🌍",
  "Un jour à la fois, vous y arriverez 📅",
  "Votre courage m'inspire ✨",
  "La tempête ne dure pas toujours 🌈",
  "Vous avez déjà surmonté tant de choses 🏔️",
  "Votre vulnérabilité est une force, pas une faiblesse 🛡️",
  "Le monde a besoin de votre lumière unique 💫",
  "Respirez profondément, vous êtes en sécurité maintenant 🌬️"
];

app.get('/api/support-message', (req, res) => {
  const randomMessage = supportiveMessages[Math.floor(Math.random() * supportiveMessages.length)];
  res.json({
    success: true,
    message: randomMessage
  });
});
const motivationalImages = [
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400",
    alt: "Sunrise over mountains",
    credit: "Natures beauty"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&w=400", 
    alt: "Beautiful landscape",
    credit: "Scenic view"
  },
  {
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&w=400",
    alt: "Calm lake reflection",
    credit: "Peaceful waters"
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=400",
    alt: "Misty forest",
    credit: "Magical forest"
  }
];

app.get('/api/motivational-image', (req, res) => {
  const randomImage = motivationalImages[Math.floor(Math.random() * motivationalImages.length)];
  res.json({
    success: true,
    image: randomImage
  });
});
// ==================== ROUTES DE L'API ====================

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ API Soutien Ensemble en fonctionnement!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    totalPosts: posts.length
  });
});

// Obtenir toutes les publications
app.get('/api/posts', (req, res) => {
  // Trier par date de création (plus récent en premier)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({
    success: true,
    posts: sortedPosts,
    total: posts.length,
    message: `${posts.length} publications chargées`
  });
});

// Obtenir une publication spécifique
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({ 
      success: false,
      message: 'Publication non trouvée' 
    });
  }
  
  res.json({
    success: true,
    post: post
  });
});

// Créer une nouvelle publication
/* La route de création de posts précédente a été supprimée car
   une autre version plus complète (avec détection d'urgence)
   est déjà définie plus haut. */

app.post('/api/comments', (req, res) => {
  const { postId, content, author = 'Visiteur' } = req.body;  // Changé à "Visiteur"
  
  if (!postId || !content) {
    return res.status(400).json({
      success: false,
      message: 'Le contenu du commentaire est obligatoire'
    });
  }
  
  const newComment = {
    id: comments.length + 1,
    postId: parseInt(postId),
    author: author.trim() || 'Visiteur',  // Par défaut "Visiteur"
    content: content.trim(),
    createdAt: new Date()
  };
  
  comments.push(newComment);
  
  res.status(201).json({
    success: true,
    message: 'Commentaire ajouté avec succès! 🤗',
    comment: newComment
  });
});
// Donner du soutien à une publication
app.post('/api/posts/:id/support', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({ 
      success: false,
      message: 'Publication non trouvée' 
    });
  }
  
  post.supportCount += 1;
  
  res.json({ 
    success: true,
    message: '🤗 Merci pour votre soutien!',
    supportCount: post.supportCount 
  });
});

// Route pour les statistiques
app.get('/api/stats', (req, res) => {
  const totalSupport = posts.reduce((sum, post) => sum + post.supportCount, 0);
  const moodStats = {};
  
  posts.forEach(post => {
    moodStats[post.mood] = (moodStats[post.mood] || 0) + 1;
  });
  
  res.json({
    success: true,
    stats: {
      totalPosts: posts.length,
      totalSupport: totalSupport,
      averageSupport: (totalSupport / posts.length).toFixed(1),
      moodDistribution: moodStats
    }
  });
});



// ==================== DÉMARRAGE DU SERVEUR ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║            🚀 SERVEUR BACKEND DÉMARRÉ         ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║ 📍 Port: ' + PORT + '                                  ║');
  console.log('║ 🌐 Environnement: Développement               ║');
  console.log('║ 📊 Posts chargés: ' + posts.length + '                         ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║                📋 ENDPOINTS                   ║');
  console.log('║ • http://localhost:' + PORT + '/api/health     ║');
  console.log('║ • http://localhost:' + PORT + '/api/posts      ║');
  console.log('║ • http://localhost:' + PORT + '/api/stats      ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  console.log('💡 Conseil: Testez l\'API dans votre navigateur:');
  console.log('   → http://localhost:' + PORT + '/api/health');
  console.log('');
});