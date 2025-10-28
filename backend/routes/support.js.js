const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Devenir supporter
router.post('/become-supporter', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role: 'supporter' },
      { new: true }
    );

    res.json({
      message: 'Vous êtes maintenant un supporter!',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du rôle',
      error: error.message 
    });
  }
});

// Obtenir les statistiques de soutien
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      supportGiven: user.supportGiven,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message 
    });
  }
});

module.exports = router;