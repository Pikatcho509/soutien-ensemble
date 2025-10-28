const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 1000
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  isSupportive: { type: Boolean, default: true },
  isProfessional: { type: Boolean, default: false },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'encouraging', 'empathetic'],
    default: 'empathetic'
  },
  likes: { type: Number, default: 0 },
  isFlagged: { type: Boolean, default: false },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { 
  timestamps: true 
});

// Middleware pour incrémenter le compteur de commentaires du post
commentSchema.post('save', async function() {
  const Post = mongoose.model('Post');
  await Post.findByIdAndUpdate(this.post, { 
    $inc: { commentCount: 1 } 
  });
});

commentSchema.index({ post: 1, createdAt: 1 });
commentSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);