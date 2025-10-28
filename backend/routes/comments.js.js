const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Créer un commentaire
router.post('/', auth, async (req, res) => {
  try {
    const { content, postId, parentComment } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    const comment = new Comment({
      content,
      author: req.user.id,
      post: postId,
      parentComment: parentComment || null
    });

    await comment.save();
    await comment.populate('author', 'username profile avatar');

    res.status(201).json({
      message: 'Commentaire ajouté',
      comment
    });
  } catch (error) {
    console.error('Erreur création commentaire:', error);
    res.status(500).json({ 
      message: 'Erreur lors de l\'ajout du commentaire',
      error: error.message 
    });
  }
});

// Obtenir les commentaires d'une publication
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ 
      post: req.params.postId,
      parentComment: null 
    })
    .populate('author', 'username profile avatar')
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username profile avatar'
      }
    })
    .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des commentaires',
      error: error.message 
    });
  }
});

// Aimer un commentaire
router.post('/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    comment.likes += 1;
    await comment.save();
    
    res.json({ 
      message: 'Like ajouté',
      likes: comment.likes 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors du like',
      error: error.message 
    });
  }
});

module.exports = router;