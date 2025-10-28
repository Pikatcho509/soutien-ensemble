const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 5000
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['depression', 'anxiety', 'solitude', 'espoir', 'temoinage', 'general'],
    default: 'general',
    required: true 
  },
  mood: {
    type: String,
    enum: ['triste', 'anxieux', 'colère', 'calme', 'espoir', 'mélancolique', 'confus', 'fatigué'],
    default: 'triste'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isAnonymous: { type: Boolean, default: false },
  supportCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { 
  timestamps: true 
});

// Index pour les recherches
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);