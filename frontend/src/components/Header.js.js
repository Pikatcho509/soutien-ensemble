import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          Soutien Ensemble
        </Link>
        
        <div className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/posts">Publications</Link>
          <Link to="/supporters">Supporters</Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <div className="avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span>Bonjour, {user?.username}</span>
              </div>
              <Link to="/create-post" className="cta-button primary">
                ✍️ Exprimer
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="cta-button secondary">
                Connexion
              </Link>
              <Link to="/register" className="cta-button primary">
                Inscription
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;