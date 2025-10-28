// Dans la route POST /api/posts
app.post('/api/posts', (req, res) => {
  // ... validation existante ...
  
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title: title.trim(),
    content: content.trim(),
    author: author.trim() || 'Anonyme',
    mood: mood,
    supportCount: 0,
    createdAt: new Date()
  };
  
  posts.push(newPost);
  savePosts(posts); // ← AJOUTER CETTE LIGNE
  
  res.status(201).json({
    success: true,
    message: 'Publication créée avec succès! 🤗',
    post: newPost
  });
});

// Dans la route POST /api/posts/:id/support
app.post('/api/posts/:id/support', (req, res) => {
  // ... code existant ...
  
  post.supportCount += 1;
  savePosts(posts); // ← AJOUTER CETTE LIGNE
  
  res.json({ 
    success: true,
    message: '🤗 Merci pour votre soutien!',
    supportCount: post.supportCount 
  });
});