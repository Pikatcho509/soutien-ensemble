import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const emergencyContacts = [
    {
      name: 'SOS Dépression',
      number: '0800000000',
      description: '24h/24, 7j/7 - Appel gratuit'
    },
    {
      name: 'Écoute Suicide',
      number: '3114',
      description: 'Numéro national gratuit'
    },
    {
      name: 'SOS Amitié',
      number: '0972394050',
      description: 'Écoute 24h/24'
    },
    {
      name: 'Urgences Médicales',
      number: '15',
      description: 'Samu - Urgences vitales'
    }
  ];

  const quickActions = [
    {
      title: 'Lire les publications',
      icon: 'chatbubbles',
      screen: 'Publications',
      color: '#667eea'
    },
    {
      title: 'Exprimer mes sentiments',
      icon: 'create',
      screen: 'Exprimer',
      color: '#ff6b6b'
    },
    {
      title: 'Devenir supporter',
      icon: 'heart',
      screen: 'Soutien',
      color: '#4CAF50'
    }
  ];

  const handleEmergencyCall = (number) => {
    Alert.alert(
      `Appeler ${number}`,
      'Voulez-vous composer ce numéro ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Appeler', 
          onPress: () => Linking.openURL(`tel:${number}`)
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Vous n'êtes pas seul</Text>
        <Text style={styles.heroSubtitle}>
          Un espace sûr pour partager et trouver du soutien
        </Text>
      </View>

      {/* Ressources d'urgence */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Ressources immédiates</Text>
        <Text style={styles.sectionSubtitle}>
          En cas de détresse, contactez :
        </Text>
        
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.contactCard,
              index === 0 || index === 1 ? styles.urgentCard : null
            ]}
            onPress={() => handleEmergencyCall(contact.number)}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDescription}>
                {contact.description}
              </Text>
            </View>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions rapides */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Actions rapides</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View 
                style={[
                  styles.actionIcon,
                  { backgroundColor: action.color }
                ]}
              >
                <Ionicons name={action.icon} size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Message de bienvenue */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bienvenue 🤗</Text>
        <Text style={styles.welcomeText}>
          Cette application est un espace sécurisé pour partager vos sentiments 
          et recevoir du soutien. Vous n'êtes jamais seul.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    backgroundColor: '#667eea',
    padding: 30,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  contactCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  welcomeSection: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;