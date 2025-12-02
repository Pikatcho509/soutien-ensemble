import React, { useState, useEffect } from 'react';
import './App.css';

// Configuration API - Modifie l'URL Render ici si nécessaire
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://soutien-api.onrender.com'; // À remplacer par ton URL Render réelle

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [supportMessage, setSupportMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images motivantes (images libres de droits via Unsplash)
  const motivationalImages = [
    { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b6e4a2d7f3a9b9c6f3b0d8b9a9a1a4b',
      text: "Nouveau jour, nouvelles opportunités" },
    { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2d5f6a1b3f4c5e6a7b8c9d0e1f2a3b4c',
      text: "Après la pluie vient le beau temps" },
    { url: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a9b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
      text: "Vous êtes plus fort que vous ne le pensez" },
    { url: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c2b1a9f8e7d6c5b4a3b2c1d0e9f8a7b',
      text: "Votre lumière intérieure brille toujours" },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
      text: "Chaque jour est une nouvelle croissance" }
  ];

  // Messages de bienvenue motivants
  const welcomeMessages = [
    "Bienvenue dans votre espace de paix 🤗",
    "Ici, vous pouvez être vous-même en toute sécurité 🌟", 
    "Votre bien-être est notre priorité 💫",
    "Prenez un moment pour respirer et partager 🌬️",
    "Vous n'êtes jamais seul dans vos combats 🤝",
    "Chaque partage est un pas vers la guérison 👣"
  ];

  useEffect(() => {
    fetchPosts();
    fetchSupportMessage();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/posts`);
      const data = await response.json();
      if (data.success) setPosts(data.posts);
    } catch (error) {
      setError('Impossible de charger les publications');
    } finally {
      setLoading(false);
    }
  };

  const fetchSupportMessage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/support-message`);
      const data = await response.json();
      if (data.success) setSupportMessage(data.message);
    } catch (error) {
      // Message de secours
      setSupportMessage("Prenez soin de vous, vous le méritez 🌟");
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/comments`);
      const data = await response.json();
      if (data.success) {
        setComments(prev => ({ ...prev, [postId]: data.comments }));
      }
    } catch (error) {
      console.error('Erreur chargement commentaires:', error);
    }
  };

  const handleSupport = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, supportCount: data.supportCount } : post
        ));
        alert('🤗 ' + data.message);
      }
    } catch (error) {
      console.error('Erreur soutien:', error);
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        fetchPosts();
        setShowCreateForm(false);
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur création post:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!newComment[postId]?.trim()) {
      alert('Veuillez écrire un commentaire');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: newComment[postId],
          author: user?.username || 'Anonyme'
        })
      });
      const data = await response.json();
      if (data.success) {
        setNewComment(prev => ({ ...prev, [postId]: '' }));
        fetchComments(postId);
        alert('💬 Commentaire publié !');
      }
    } catch (error) {
      console.error('Erreur commentaire:', error);
    }
  };

  const toggleComments = (postId) => {
    if (!user) {
      alert('🔐 Veuillez vous connecter pour commenter');
      setShowAuth(true);
      return;
    }
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!comments[postId]) fetchComments(postId);
  };

  const nextMotivationalImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % motivationalImages.length);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    alert(`🎉 Bienvenue ${userData.username} !`);
  };

  const getMoodEmoji = (mood) => {
    const emojis = { 
      triste: '😔', 
      anxieux: '😰', 
      espoir: '✨', 
      calme: '😌',
      colère: '😠',
      mélancolique: '🌧️',
      fatigué: '😴',
      confus: '😵'
    };
    return emojis[mood] || '😊';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  // Écran de chargement
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">⏳</div>
        <h2>Chargement de votre espace de soutien</h2>
        <p>Préparation de votre environnement sécurisé...</p>
      </div>
    );
  }

  // Écran d'erreur
  if (error) {
    return (
      <div className="error-screen">
        <div className="error-icon">❌</div>
        <h2>Erreur de connexion</h2>
        <p>{error}</p>
        <button onClick={fetchPosts} className="btn-retry">Réessayer</button>
        <div className="help-text">
          <p>💡 Assurez-vous que le serveur backend est démarré sur le port 5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header avec connexion */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-emoji">🤗</span>
              <h1>Soutien Ensemble</h1>
            </div>
            <div className="header-actions">
              {user ? (
                <div className="user-info">
                  <span className="welcome-user">👋 Bonjour, {user.username}</span>
                  <button onClick={() => setUser(null)} className="btn-logout">
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuth(true)} className="btn-login">
                  🔐 Connexion
                </button>
              )}
            </div>
          </div>
          <p className="tagline">Vous n'êtes pas seul • Espace sécurisé • Écoute bienveillante</p>
        </div>
      </header>

      {/* Section Hero avec messages de bienvenue */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="welcome-messages">
              <h2>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</h2>
              <p>Partagez vos sentiments en toute confidentialité et recevez du soutien</p>
            </div>

            {/* Images motivantes interactives */}
            <div className="motivational-display">
              <div className="motivational-card">
                {motivationalImages[currentImageIndex].url ? (
                  <div className="motivational-image">
                    <img src={motivationalImages[currentImageIndex].url} alt={motivationalImages[currentImageIndex].text} />
                    <small>{motivationalImages[currentImageIndex].text}</small>
                  </div>
                ) : (
                  <div className="motivational-emoji-large">{motivationalImages[currentImageIndex].emoji}</div>
                )}
                <div className="motivational-controls">
                  <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + motivationalImages.length) % motivationalImages.length)} className="btn-prev-motivation">⬅️</button>
                  <button onClick={nextMotivationalImage} className="btn-next-motivation">➡️</button>
                </div>
              </div>
            </div>

            {/* Message de soutien aléatoire */}
            {supportMessage && (
              <div className="support-message-bubble">
                <span className="bubble-emoji">💫</span>
                <p>{supportMessage}</p>
                <button onClick={fetchSupportMessage} className="btn-new-message">
                  🔄 Nouveau message
                </button>
              </div>
            )}

            {/* Bouton d'action principal */}
            <div className="hero-actions">
              {user ? (
                <button onClick={() => setShowCreateForm(true)} className="btn-create-main">
                  ✍️ Partager mes sentiments
                </button>
              ) : (
                <button onClick={() => setShowAuth(true)} className="btn-create-main">
                  🔐 Se connecter pour partager
                </button>
              )}
              
              <button onClick={fetchPosts} className="btn-refresh-main">
                🔄 Actualiser les publications
              </button>
            </div>

            {/* Statistiques */}
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Publications</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {posts.reduce((sum, post) => sum + post.supportCount, 0)}
                </span>
                <span className="stat-label">Soutiens</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {Object.values(comments).flat().length}
                </span>
                <span className="stat-label">Commentaires</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de création de post */}
      {showCreateForm && (
        <CreatePostForm 
          onSubmit={handleCreatePost}
          onClose={() => setShowCreateForm(false)}
          user={user}
        />
      )}

      {/* Formulaire d'authentification simplifié */}
      {showAuth && (
        <AuthForm 
          onLogin={handleLogin}
          onClose={() => setShowAuth(false)}
        />
      )}

      {/* Section des publications */}
      <section className="posts-section">
        <div className="container">
          <div className="section-header">
            <h3>📝 Dernières publications de la communauté</h3>
            <div className="section-actions">
              <button onClick={fetchPosts} className="btn-refresh">
                🔄 Actualiser
              </button>
            </div>
          </div>

          <div className="posts-grid">
            {posts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h4>Aucune publication pour le moment</h4>
                <p>Soyez le premier à partager vos sentiments</p>
                {!user && (
                  <button onClick={() => setShowAuth(true)} className="btn-connect-invite">
                    🔐 Se connecter pour commencer
                  </button>
                )}
              </div>
            ) : (
              posts.map(post => (
                <PostCard 
                  key={post.id}
                  post={post}
                  showComments={showComments[post.id]}
                  comments={comments[post.id] || []}
                  newComment={newComment[post.id] || ''}
                  user={user}
                  onSupport={() => handleSupport(post.id)}
                  onToggleComments={() => toggleComments(post.id)}
                  onCommentChange={(content) => setNewComment(prev => ({ ...prev, [post.id]: content }))}
                  onCommentSubmit={() => handleComment(post.id)}
                  getMoodEmoji={getMoodEmoji}
                  formatDate={formatDate}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section d'urgence */}
      <EmergencySection />

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

// Composant de formulaire de création de post
function CreatePostForm({ onSubmit, onClose, user }) {
  const [formData, setFormData] = useState({
    title: '', 
    content: '', 
    mood: 'triste', 
    author: user ? 'Moi' : 'Anonyme'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Veuillez remplir le titre et le contenu');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-header">
          <h3>✍️ Partager mes sentiments</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Comment vous sentez-vous aujourd'hui ?"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Votre message *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Décrivez vos sentiments, vos pensées, ce que vous traversez..."
              rows="6"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Humeur</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
              >
                <option value="triste">😔 Triste</option>
                <option value="anxieux">😰 Anxieux</option>
                <option value="colère">😠 Colère</option>
                <option value="calme">😌 Calme</option>
                <option value="espoir">✨ Plein d'espoir</option>
                <option value="mélancolique">🌧️ Mélancolique</option>
                <option value="fatigué">😴 Fatigué</option>
                <option value="confus">😵 Confus</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Publication</label>
              <select
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              >
                <option value="Anonyme">🕵️ Anonyme</option>
                <option value="Moi">👤 Avec mon pseudo</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              Publier 🤗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Composant d'authentification simplifié
function AuthForm({ onLogin, onClose }) {
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: '',
    isLogin: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de connexion
    const userData = {
      id: 1,
      username: formData.username || 'Utilisateur',
      email: formData.email,
      role: 'user'
    };
    onLogin(userData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal">
        <div className="form-header">
          <h3>{formData.isLogin ? '🔐 Connexion' : '👤 Créer un compte'}</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!formData.isLogin && (
            <div className="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Choisissez un nom d'utilisateur"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            {formData.isLogin ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {formData.isLogin ? "Pas de compte ? " : "Déjà un compte ? "}
            <button 
              type="button" 
              onClick={() => setFormData(prev => ({ ...prev, isLogin: !prev.isLogin }))}
              className="btn-switch"
            >
              {formData.isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant de carte de post
function PostCard({ 
  post, 
  showComments, 
  comments, 
  newComment, 
  user, 
  onSupport, 
  onToggleComments, 
  onCommentChange, 
  onCommentSubmit,
  getMoodEmoji,
  formatDate
}) {
  return (
    <div className={`post-card ${post.isEmergency ? 'emergency' : ''}`}>
      {post.isEmergency && (
        <div className="emergency-alert">
          🚨 Message détecté comme urgent - Soutien immédiat disponible
        </div>
      )}
      
      <div className="post-header">
        <div className="post-author">
          <span className="author-avatar">
            {post.author === 'Anonyme' ? '🕵️' : '👤'}
          </span>
          <span className="author-name">{post.author}</span>
        </div>
        <div className="post-mood">
          <span className="mood-emoji">{getMoodEmoji(post.mood)}</span>
          <span className="mood-text">{post.mood}</span>
        </div>
      </div>

      <div className="post-content">
        <h4 className="post-title">{post.title}</h4>
        <p className="post-text">{post.content}</p>
      </div>

      <div className="post-footer">
        <div className="post-meta">
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
        <div className="post-actions">
          <button onClick={onSupport} className="btn-support">
            <span className="support-emoji">🤗</span>
            Soutenir ({post.supportCount})
          </button>
          <button onClick={onToggleComments} className="btn-comment">
            <span className="comment-emoji">💬</span>
            Commenter ({comments.length})
          </button>
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">
                <p>💬 Aucun commentaire pour le moment</p>
                <p>Soyez le premier à soutenir cette personne</p>
              </div>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Votre message de soutien..."
              rows="3"
            />
            <button 
              onClick={onCommentSubmit}
              className="btn-comment-submit"
            >
              {user ? '💬 Envoyer le commentaire' : '🔐 Connectez-vous pour commenter'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant section urgence
function EmergencySection() {
  return (
    <section className="emergency-section">
      <div className="container">
        <div className="emergency-card">
          <h3>🚨 Besoin d'aide immédiate ?</h3>
          <p>Nos équipes sont disponibles 24h/24 pour vous écouter et vous soutenir</p>
          
          <div className="emergency-contacts">
            <div className="emergency-contact">
              <span className="contact-icon">📞</span>
              <div className="contact-info">
                <strong>Appel d'urgence</strong>
                <a href="tel:+50940057183" className="emergency-link">
                  +509 4005-7183
                </a>
                <small>Appel gratuit 24h/24</small>
              </div>
            </div>
            
            <div className="emergency-contact">
              <span className="contact-icon">💬</span>
              <div className="contact-info">
                <strong>WhatsApp</strong>
                <a 
                  href="https://wa.me/50949033260" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="emergency-link"
                >
                  +509 4903-3260
                </a>
                <small>Message instantané</small>
              </div>
            </div>
          </div>
          
          <div className="emergency-note">
            <p>💡 <strong>N'attendez pas</strong> - Ces numéros sont disponibles immédiatement pour toute détresse</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Composant footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>🤗 Soutien Ensemble - Plateforme d'entraide et de soutien psychologique</p>
        <p className="footer-note">
          💡 En cas de détresse immédiate, contactez le <strong>3114</strong> (numéro national gratuit)
        </p>
      </div>
    </footer>
  );
}

export default App;