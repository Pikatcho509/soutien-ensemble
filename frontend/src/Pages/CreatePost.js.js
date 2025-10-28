import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { postsAPI } from '../utils/api';

const CreatePost = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    mood: 'triste',
    isAnonymous: false,
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const moods = [
    { value: 'triste', label: '😔 Triste', emoji: '😔' },
    { value: 'anxieux', label: '😰 Anxieux', emoji: '😰' },
    { value: 'colère', label: '😠 Colère', emoji: '😠' },
    { value: 'calme', label: '😌 Calme', emoji: '😌' },
    { value: 'espoir', label: '✨ Plein d\'espoir', emoji: '✨' },
    { value: 'mélancolique', label: '🌧️ Mélancolique', emoji: '🌧️' },
    { value: 'confus', label: '😵 Confus', emoji: '😵' },
    { value: 'fatigué', label: '😴 Fatigué', emoji: '😴' }
  ];

  const categories = [
    { value: 'general', label: 'Général' },
    { value: 'depression', label: 'Dépression' },
    { value: 'anxiety', label: 'Anxiété' },
    { value: 'solitude', label: 'Solitude' },
    { value: 'espoir', label: 'Message d\'espoir' },
    { value: 'temoinage', label: 'Témoignage' },
    { value: 'conseil', label: 'Demande de conseil' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Veuillez vous connecter pour créer une publication');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await postsAPI.create(postData);
      navigate('/posts');
    } catch (error) {
      setError(error.message || 'Erreur lors de la création de la publication');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="create-post-container">
        <div className="not-authenticated">
          <h2>Connexion requise</h2>
          <p>Veuillez vous connecter pour partager vos sentiments avec la communauté.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h1>Partagez vos sentiments</h1>
        <p>Votre voix compte. Exprimez-vous en toute sécurité et confidentialité.</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Comment vous sentez-vous aujourd'hui ?"
              required
              maxLength="200"
            />
            <small>{formData.title.length}/200 caractères</small>
          </div>

          <div className="form-group">
            <label htmlFor="content">Votre message *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Décrivez vos sentiments, vos pensées, ce que vous traversez..."
              rows="8"
              required
              maxLength="5000"
            />
            <small>{formData.content.length}/5000 caractères</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mood">Humeur actuelle</label>
              <select
                id="mood"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
              >
                {moods.map(mood => (
                  <option key={mood.value} value={mood.value}>
                    {mood.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Mots-clés (optionnel)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="anxiété, solitude, espoir... (séparés par des virgules)"
            />
          </div>

          <div className="form-checkbox">
            <label>
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
              />
              Publier anonymement
            </label>
            <small>Votre nom d'utilisateur ne sera pas affiché</small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cta-button secondary"
              onClick={() => navigate('/posts')}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="cta-button primary"
              disabled={loading}
            >
              {loading ? 'Publication...' : 'Partager avec la communauté'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;