import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      {/* Section Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Vous n'êtes pas seul</h1>
          <p>Un espace sûr pour partager vos sentiments, être écouté et trouver du soutien dans une communauté bienveillante</p>
          <div className="hero-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="cta-button primary">
                  Rejoindre la communauté
                </Link>
                <Link to="/login" className="cta-button secondary">
                  Se connecter
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-post" className="cta-button primary">
                  ✍️ Exprimer mes sentiments
                </Link>
                <Link to="/posts" className="cta-button secondary">
                  🤗 Soutenir les autres
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Ressources d'urgence */}
      <section className="emergency-resources">
        <h2>📞 Ressources immédiates</h2>
        <p className="resources-subtitle">En cas de détresse immédiate, n'hésitez pas à contacter :</p>
        <div className="resources-grid">
          <div className="resource-card urgent">
            <h3>SOS Dépression</h3>
            <p>0800 00 00 00</p>
            <small>24h/24, 7j/7 - Appel gratuit</small>
          </div>
          <div className="resource-card urgent">
            <h3>Écoute Suicide</h3>
            <p>3114</p>
            <small>Numéro national gratuit</small>
          </div>
          <div className="resource-card">
            <h3>SOS Amitié</h3>
            <p>09 72 39 40 50</p>
            <small>Écoute 24h/24</small>
          </div>
          <div className="resource-card">
            <h3>Urgences Médicales</h3>
            <p>15</p>
            <small>Samu - Urgences vitales</small>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="features">
        <h2>Comment ça marche ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Exprimez-vous librement</h3>
            <p>Partagez vos sentiments en toute confidentialité, de façon anonyme si vous préférez</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤗</div>
            <h3>Recevez du soutien</h3>
            <p>Obtenez des messages bienveillants et encourageants de notre communauté</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Connectez-vous</h3>
            <p>Rencontrez des personnes qui comprennent ce que vous traversez</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Espace sécurisé</h3>
            <p>Modération bienveillante pour garantir un environnement sûr pour tous</p>
          </div>
        </div>
      </section>

      {/* Message de bienvenue personnalisé */}
      {isAuthenticated && (
        <section className="welcome-section">
          <div className="welcome-card">
            <h3>Bon retour parmi nous, {user?.username} !</h3>
            <p>Nous sommes heureux de vous revoir. N'hésitez pas à partager vos sentiments ou à soutenir les autres membres.</p>
            <div className="welcome-actions">
              <Link to="/create-post" className="cta-button primary">
                Partager mes sentiments
              </Link>
              <Link to="/posts" className="cta-button secondary">
                Lire les publications
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;