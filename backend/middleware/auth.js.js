const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Accès refusé. Token manquant.' 
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'soutien_secret_key'
    );
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        message: 'Token invalide. Utilisateur non trouvé.' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        message: 'Compte désactivé.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Token invalide.',
      error: error.message 
    });
  }
};

module.exports = auth;