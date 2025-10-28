import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { supportAPI } from '../utils/api';

const Supporters = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBecomeSupporter = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      await supportAPI.becomeSupporter();
      setMessage('Félicitations ! Vous êtes maintenant un supporter.');
      // Recharger les données utilisateur
      window.location.reload();
    } catch (error) {
      setMessage('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="supporters-container">
      <div className="supporters-hero">
        <h1>Devenez Supporter</h1>
        <p>Rejoignez notre communauté de soutien et aidez les autres</p>
      </div>

      <div className="supporters-content">
        <div className="supporter-info">
          <div className="info-card">
            <h3>🤗 Qu'est-ce qu'un supporter ?</h3>
            <p>Les supporters sont des membres actifs de notre communauté qui s'engagent à :</p>
            <ul>
              <li>Répondre aux publications avec bienveillance</li>
              <li>Offrir du soutien et des mots encourageants</li>
              <li>Créer un environnement positif et sécurisé</li>
              <li>Signaler les contenus inappropriés</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>💫 Votre impact</h3>
            <p>En devenant supporter, vous contribuez à :</p>
            <ul>
              <li>Rendre la plateforme plus accueillante</li>
              <li>Aider les personnes en difficulté</li>
              <li>Créer des connexions significatives</li>
              <li>Sauver des vies par votre écoute</li>
            </ul>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="become-supporter-section">
            {user?.role === 'supporter' || user?.role === 'professional' || user?.role === 'admin' ? (
              <div className="already-supporter">
                <h3>🎉 Vous êtes déjà un supporter !</h3>
                <p>Merci de votre engagement dans notre communauté.</p>
                <p>Continuez à soutenir les autres membres avec bienveillance.</p>
              </div>
            ) : (
              <div className="supporter-cta">
                <h3>Rejoignez les supporters</h3>
                <p>Engagez-vous à soutenir les autres membres de notre communauté</p>
                
                {message && (
                  <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
                    {message}
                  </div>
                )}

                <button 
                  onClick={handleBecomeSupporter}
                  disabled={loading}
                  className="cta-button primary large"
                >
                  {loading ? 'Inscription...' : 'Devenir Supporter'}
                </button>

                <div className="supporter-guidelines">
                  <h4>Engagements du supporter :</h4>
                  <ul>
                    <li>✓ Respecter la confidentialité des échanges</li>
                    <li>✓ Faire preuve d'empathie et de bienveillance</li>
                    <li>✓ Ne pas donner de conseils médicaux</li>
                    <li>✓ Signaler tout contenu inquiétant</li>
                    <li>✓ Maintenir un environnement sécurisé</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="not-authenticated">
            <h3>Connexion requise</h3>
            <p>Veuillez vous connecter pour devenir supporter.</p>
          </div>
        )}

        <div className="emergency-notice">
          <h4>⚠️ Important</h4>
          <p>
            En tant que supporter, vous n'êtes pas un professionnel de santé. 
            En cas de détresse sévère ou d'idées suicidaires, orientez la personne 
            vers les ressources professionnelles appropriées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Supporters;