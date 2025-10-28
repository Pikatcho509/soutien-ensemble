import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    username: 'Marie123',
    email: 'marie@email.com',
    role: 'user',
    joinDate: '2024-01-01',
    supportGiven: 12,
    postsCount: 5
  });

  const [settings, setSettings] = useState({
    notifications: true,
    anonymousMode: false,
    darkMode: false
  });

  const menuItems = [
    {
      icon: 'person',
      title: 'Modifier le profil',
      description: 'Mettre à jour vos informations',
      onPress: () => Alert.alert('Info', 'Fonctionnalité à venir')
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      description: 'Gérer les notifications',
      type: 'switch',
      value: settings.notifications,
      onValueChange: (value) => updateSetting('notifications', value)
    },
    {
      icon: 'eye-off',
      title: 'Mode anonyme',
      description: 'Publier anonymement par défaut',
      type: 'switch',
      value: settings.anonymousMode,
      onValueChange: (value) => updateSetting('anonymousMode', value)
    },
    {
      icon: 'moon',
      title: 'Mode sombre',
      description: 'Activer le thème sombre',
      type: 'switch',
      value: settings.darkMode,
      onValueChange: (value) => updateSetting('darkMode', value)
    },
    {
      icon: 'shield-checkmark',
      title: 'Confidentialité',
      description: 'Paramètres de confidentialité',
      onPress: () => Alert.alert('Info', 'Fonctionnalité à venir')
    },
    {
      icon: 'help-circle',
      title: 'Aide et support',
      description: 'Centre d\'aide et contact',
      onPress: () => Alert.alert('Info', 'Fonctionnalité à venir')
    },
    {
      icon: 'information-circle',
      title: 'À propos',
      description: 'À propos de l\'application',
      onPress: () => Alert.alert(
        'À propos',
        'Soutien Ensemble v1.0.0\n\nUne application dédiée au soutien psychologique mutuel.'
      )
    }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            // Logique de déconnexion
            Alert.alert('Déconnecté', 'À bientôt !');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête du profil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {user.role === 'supporter' ? '🤗 Supporter' : '👤 Membre'}
          </Text>
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.supportGiven}</Text>
          <Text style={styles.statLabel}>Soutiens</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.postsCount}</Text>
          <Text style={styles.statLabel}>Publications</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {Math.floor((new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24))}
          </Text>
          <Text style={styles.statLabel}>Jours</Text>
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => navigation.navigate('Exprimer')}
        >
          <Ionicons name="create" size={24} color="#667eea" />
          <Text style={styles.quickActionText}>Exprimer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => navigation.navigate('Publications')}
        >
          <Ionicons name="chatbubbles" size={24} color="#667eea" />
          <Text style={styles.quickActionText}>Publications</Text>
        </TouchableOpacity>

        {user.role !== 'supporter' && (
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => navigation.navigate('Soutien')}
          >
            <Ionicons name="heart" size={24} color="#667eea" />
            <Text style={styles.quickActionText}>Supporter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Menu des paramètres */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            disabled={item.type === 'switch'}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={22} color="#667eea" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </View>

            {item.type === 'switch' ? (
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#767577', true: '#667eea' }}
                thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
              />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#666" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#f44336" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  roleText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '500',
  },
  statsSection: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  quickActions: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom: 20,
  },
  quickAction: {
    alignItems: 'center',
    padding: 10,
  },
  quickActionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  menuSection: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: 15,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default ProfileScreen;