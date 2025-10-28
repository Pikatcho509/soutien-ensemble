import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { postsAPI, commentsAPI } from '../utils/api';

const PostCard = ({ post, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [supportCount, setSupportCount] = useState(post.supportCount || 0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const moodEmojis = {
    triste: '😔',
    anxieux: '😰',
    colère: '😠',
    calme: '😌',
    espoir: '✨',
    mélancolique: '🌧️',
    confus: '😵',
    fatigué: '😴'
  };

  const handleSupport = async () => {
    if (!isAuthenticated) return;
    
    try {
      await postsAPI.support(post._id);
      setSupportCount(supportCount + 1);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Erreur lors du soutien:', error);
      alert('Erreur lors de l\'ajout du soutien');
    }
  };

  const loadComments = async () => {
    if (!showComments && comments.length === 0) {
      try {
        setLoading(true);
        const data = await commentsAPI.getByPost(post._id);
        setComments(data);
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error);
      } finally {
        setLoading(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      await commentsAPI.create({
        content: newComment,
        postId: post._id
      });
      
      setNewComment('');
      // Recharger les commentaires
      const data = await commentsAPI.getByPost(post._id);
      setComments(data);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      alert('Erreur lors de l\'ajout du commentaire');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          {post.isAnonymous ? (
            <>
              <span>🕵️</span>
              <span>Anonyme</span>
            </>
          ) : (
            <>
              <span>👤</span>
              <span>{post.author?.username || 'Utilisateur'}</span>
            </>
          )}
        </div>
        <div className="post-mood">
          {moodEmojis[post.mood] || '😊'}
        </div>
      </div>

      <h3>{post.title}</h3>
      <p className="post-content">{post.content}</p>

      <div className="post-meta">
        <span className="post-category">#{post.category}</span>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>

      <div className="post-footer">
        <div className="post-actions">
          <button 
            onClick={handleSupport}
            className="support-button"
            disabled={!isAuthenticated}
          >
            🤗 Soutenir ({supportCount})
          </button>
          
          <button 
            onClick={loadComments}
            className="comment-button"
          >
            💬 Commenter ({post.commentCount || 0})
          </button>
        </div>

        {showComments && (
          <div className="comments-section">
            {loading ? (
              <p>Chargement des commentaires...</p>
            ) : (
              <>
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment._id} className="comment">
                      <div className="comment-header">
                        <strong>{comment.author?.username}</strong>
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p className="no-comments">Aucun commentaire pour le moment.</p>
                  )}
                </div>
                
                <form onSubmit={handleComment} className="comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Votre message de soutien..."
                    rows="3"
                    disabled={!isAuthenticated}
                  />
                  <button 
                    type="submit" 
                    disabled={!isAuthenticated || !newComment.trim()}
                    className="submit-button"
                  >
                    Envoyer
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;