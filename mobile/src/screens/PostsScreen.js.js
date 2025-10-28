import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Données mockées pour la démonstration
  const mockPosts = [
    {
      id: '1',
      title: 'Journée difficile aujourd\'hui',
      content: 'Je me sens vraiment seul et dépassé par les événements. Le simple fait de me lever ce matin a été un combat.',
      author: 'Anonyme',
      mood: 'triste',
      supportCount: 5,
      commentCount: 3,
      isAnonymous: true,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Un petit pas en avant',
      content: 'Aujourd\'hui j\'ai réussi à sortir faire une petite marche. C\'est peu mais pour moi c\'est énorme.',
      author: 'Marie',
      mood: 'espoir',
      supportCount: 12,
      commentCount: 8,
      isAnonymous: false,
      createdAt: '2024-01-15T08:15:00Z'
    },
    {
      id: '3',
      title: 'Anxiété qui monte',
      content: 'Les pensées négatives tournent en boucle dans ma tête. Je n\'arrive pas à les arrêter.',
      author: 'Anonyme',
      mood: 'anxieux',
      supportCount: 8,
      commentCount: 5,
      isAnonymous: true,
      createdAt: '2024-01-14T20:45:00Z'
    }
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    // Simuler un chargement API
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts();
    setRefreshing(false);
  };

  const handleSupport = (postId) => {
    Alert.alert(
      'Soutien',
      'Votre soutien a été envoyé 🤗',
      [{ text: 'OK' }]
    );
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des publications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Espace d'Expression</Text>
          <Text style={styles.subtitle}>
            Lisez et soutenez les membres de notre communauté
          </Text>
        </View>

        {/* Liste des publications */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* En-tête de la publication */}
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <Text style={styles.author}>
                  {post.isAnonymous ? '🕵️ Anonyme' : `👤 ${post.author}`}
                </Text>
                <Text style={styles.date}>
                  {formatDate(post.createdAt)}
                </Text>
              </View>
              <Text style={styles.mood}>
                {moodEmojis[post.mood] || '😊'}
              </Text>
            </View>

            {/* Titre et contenu */}
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleSupport(post.id)}
              >
                <Ionicons name="heart" size={20} color="#667eea" />
                <Text style={styles.actionText}>
                  Soutenir ({post.supportCount})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble" size={20} color="#666" />
                <Text style={styles.actionText}>
                  Commenter ({post.commentCount})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {posts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              Aucune publication pour le moment
            </Text>
            <Text style={styles.emptyStateText}>
              Soyez le premier à partager vos sentiments
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Exprimer')}
            >
              <Text style={styles.primaryButtonText}>
                Créer une publication
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bouton flottant pour créer une publication */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Exprimer')}
      >
        <Ionicons name="create" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  postCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mood: {
    fontSize: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 15,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#667eea',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PostsScreen;