import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = () => {
  const [isSupporter, setIsSupporter] = useState(false);
  const [loading, setLoading] = useState(false);

  const supporterBenefits = [
    {
      icon: 'heart',
      title: 'Soutien bienveillant',
      description: 'Répondez aux publications avec empathie'
    },
    {
      icon: 'people',
      title: 'Communauté active',
      description: 'Rejoignez un réseau de personnes engagées'
    },
    {
      icon: 'shield-checkmark',
      title: 'Espace sécurisé',
      description: 'Contribuez à maintenir un environnement sûr'
    },
    {
      icon: 'star',
      title: 'Reconnaissance',
      description: 'Obtenez des badges de reconnaissance'
    }
  ];

  const supporterGuidelines = [
    'Respecter la confidentialité des échanges',
    'Faire preuve d\'empathie et de bienveillance',
    'Ne pas donner de conseils médicaux',
    'Signaler tout contenu inquiétant',
    'Maintenir un environnement sécurisé pour tous'
  ];

  const handleBecomeSupporter = () => {
    Alert.alert(
      'Devenir Supporter',
      'Vous engagez-vous à respecter les guidelines de notre communauté ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Je m\'engage',
          onPress: () => {
            setLoading(true);
            // Simulation d'inscription
            setTimeout(() => {
              setLoading(false);
              setIsSupporter(true);
              Alert.alert(
                'Félicitations !',
                'Vous êtes maintenant un supporter de notre communauté 🤗'
              );
            }, 1500);
          }
        }
      ]
    );
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Ressources professionnelles',
      'En cas de détresse sévère, contactez :',
      [
        {
          text: 'SOS Dépression - 0800 00 00 00',
          onPress: () => Linking.openURL('tel:0800000000')
        },
        {
          text: 'Écoute Suicide - 3114',
          onPress: () => Linking.openURL('tel:3114')
        },
        {
          text: 'Annuler',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="heart" size={40} color="white" />
        </View>
        <Text style={styles.heroTitle}>Devenez Supporter</Text>
        <Text style={styles.heroSubtitle}>
          Rejoignez notre communauté de soutien et aidez les autres
        </Text>
      </View>

      {isSupporter ? (
        // Vue si déjà supporter
        <View style={styles.supporterView}>
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
            <Text style={styles.successTitle}>
              Vous êtes supporter !
            </Text>
            <Text style={styles.successText}>
              Merci de votre engagement dans notre communauté.
              Continuez à soutenir les autres membres avec bienveillance.
            </Text>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Votre impact</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Soutiens donnés</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Commentaires</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Membres aidés</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // Vue pour devenir supporter
        <View style={styles.becomeSupporterView}>
          {/* Avantages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤗 Pourquoi devenir supporter ?</Text>
            <View style={styles.benefitsGrid}>
              {supporterBenefits.map((benefit, index) => (
                <View key={index} style={styles.benefitCard}>
                  <View style={styles.benefitIcon}>
                    <Ionicons name={benefit.icon} size={24} color="#667eea" />
                  </View>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Guidelines */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Engagements du supporter</Text>
            <View style={styles.guidelinesCard}>
              {supporterGuidelines.map((guideline, index) => (
                <View key={index} style={styles.guidelineItem}>
                  <Ionicons name="checkmark" size={16} color="#4CAF50" />
                  <Text style={styles.guidelineText}>{guideline}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <TouchableOpacity
              style={[
                styles.ctaButton,
                loading && styles.buttonDisabled
              ]}
              onPress={handleBecomeSupporter}
              disabled={loading}
            >
              <Text style={styles.ctaButtonText}>
                {loading ? 'Inscription...' : 'Devenir Supporter'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Notice importante */}
      <View style={styles.noticeSection}>
        <View style={styles.noticeHeader}>
          <Ionicons name="warning" size={20} color="#ff9800" />
          <Text style={styles.noticeTitle}>Important</Text>
        </View>
        <Text style={styles.noticeText}>
          En tant que supporter, vous n'êtes pas un professionnel de santé. 
          En cas de détresse sévère ou d'idées suicidaires, orientez la personne 
          vers les ressources professionnelles appropriées.
        </Text>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergencyCall}
        >
          <Text style={styles.emergencyButtonText}>
            Voir les ressources d'urgence
          </Text>
        </TouchableOpacity>
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
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
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
  supporterView: {
    padding: 20,
  },
  successCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  becomeSupporterView: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  benefitCard: {
    width: '47%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  guidelinesCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  guidelineText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  ctaSection: {
    padding: 20,
  },
  ctaButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  noticeSection: {
    backgroundColor: '#fff8e1',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  noticeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  emergencyButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 5,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#ff9800',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SupportScreen;