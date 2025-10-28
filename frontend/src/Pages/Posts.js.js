import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { postsAPI } from '../utils/api';
import PostCard from '../components/PostCard';
import MoodFilter from '../components/MoodFilter';

const Posts = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    fetchPosts();
  }, [filter, pagination.current]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsAPI.getPosts(pagination.current, 10, filter);
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      setError('Erreur lors du chargement des publications');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchPosts(); // Recharger les posts après une action
  };

  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading-posts">
          <div className="loading-spinner"></div>
          <p>Chargement des publications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>Espace d'expression</h1>
        <p>Lisez et soutenez les membres de notre communauté</p>
        
        <div className="posts-actions">
          <MoodFilter currentFilter={filter} onFilterChange={setFilter} />
          
          {isAuthenticated && (
            <Link to="/create-post" className="cta-button primary">
              ✍️ Partager mes sentiments
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="posts-grid">
        {posts.map(post => (
          <PostCard 
            key={post._id} 
            post={post} 
            onUpdate={handleUpdate}
          />
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="no-posts">
          <p>📝 Aucune publication pour le moment</p>
          <p>Soyez le premier à partager vos sentiments</p>
          {isAuthenticated && (
            <Link to="/create-post" className="cta-button primary">
              Créer la première publication
            </Link>
          )}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button 
            disabled={pagination.current === 1}
            onClick={() => setPagination(prev => ({...prev, current: prev.current - 1}))}
          >
            ← Précédent
          </button>
          
          <span>Page {pagination.current} sur {pagination.pages}</span>
          
          <button 
            disabled={pagination.current === pagination.pages}
            onClick={() => setPagination(prev => ({...prev, current: prev.current + 1}))}
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;