const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Créer une publication
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, mood, isAnonymous, tags } = req.body;
    
    const post = new Post({
      title,
      content,
      category,
      mood,
      isAnonymous,
      tags: tags || [],
      author: req.user.id
    });

    await post.save();
    await post.populate('author', 'username profile');

    res.status(201).json({
      message: 'Publication créée avec succès',
      post
    });
  } catch (error) {
    console.error('Erreur création post:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du post',
      error: error.message 
    });
  }
});

// Obtenir toutes les publications (avec pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const skip = (page - 1) * limit;

    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('author', 'username profile avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération posts:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des posts',
      error: error.message 
    });
  }
});

// Obtenir une publication spécifique
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profile avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username profile avatar'
        }
      });

    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du post',
      error: error.message 
    });
  }
});

// Donner du soutien à une publication
router.post('/:id/support', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée' });
    }

    post.supportCount += 1;
    await post.save();
    
    res.json({ 
      message: 'Soutien ajouté',
      supportCount: post.supportCount 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors du soutien',
      error: error.message 
    });
  }
});

// Publications d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username profile')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des posts utilisateur',
      error: error.message 
    });
  }
});

module.exports = router;