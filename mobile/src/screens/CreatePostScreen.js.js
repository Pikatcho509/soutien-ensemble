import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreatePostScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    mood: 'triste',
    isAnonymous: false
  });
  const [loading, setLoading] = useState(false);

  const moods = [
    { value: 'triste', label: '😔 Triste', emoji: '😔' },
    { value: 'anxieux', label: '😰 Anxieux', emoji: '😰' },
    { value: 'colère', label: '😠 Colère', emoji: '😠' },
    { value: 'calme', label: '😌 Calme', emoji: '😌' },
    { value: 'espoir', label: '✨ Plein d\'espoir', emoji: '✨' },
    { value: 'mélancolique', label: '🌧️ Mélancolique', emoji: '🌧️' },
    { value: 'confus', label: '😵 Confus', emoji: '😵' },
    { value: 'fatigué', label: '😴 Fatigué', emoji: '😴' }
  ];

  const categories = [
    { value: 'general', label: 'Général' },
    { value: 'depression', label: 'Dépression' },
    { value: 'anxiety', label: 'Anxiété' },
    { value: 'solitude', label: 'Solitude' },
    { value: 'espoir', label: 'Message d\'espoir' },
    { value: 'temoinage', label: 'Témoignage' },
    { value: 'conseil', label: 'Demande de conseil' }
  ];

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et le contenu');
      return;
    }

    setLoading(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Publication créée',
        'Votre message a été partagé avec la communauté 🤗',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Publications')
          }
        ]
      );
    }, 2000);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Partagez vos sentiments</Text>
        <Text style={styles.subtitle}>
          Votre voix compte. Exprimez-vous en toute sécurité.
        </Text>
      </View>

      <View style={styles.form}>
        {/* Titre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Comment vous sentez-vous aujourd'hui ?"
            value={formData.title}
            onChangeText={(text) => updateField('title', text)}
            maxLength={200}
          />
          <Text style={styles.charCount}>
            {formData.title.length}/200
          </Text>
        </View>

        {/* Contenu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Votre message *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Décrivez vos sentiments, vos pensées, ce que vous traversez..."
            value={formData.content}
            onChangeText={(text) => updateField('content', text)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={5000}
          />
          <Text style={styles.charCount}>
            {formData.content.length}/5000
          </Text>
        </View>

        {/* Humeur */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Humeur actuelle</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.moodScroll}
          >
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.value}
                style={[
                  styles.moodOption,
                  formData.mood === mood.value && styles.moodSelected
                ]}
                onPress={() => updateField('mood', mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>
                  {mood.label.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Catégorie */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Catégorie</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.value}
                style={[
                  styles.categoryOption,
                  formData.category === category.value && styles.categorySelected
                ]}
                onPress={() => updateField('category', category.value)}
              >
                <Text style={[
                  styles.categoryText,
                  formData.category === category.value && styles.categoryTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Publication anonyme */}
        <View style={styles.anonymousSection}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Publier anonymement</Text>
            <Switch
              value={formData.isAnonymous}
              onValueChange={(value) => updateField('isAnonymous', value)}
              trackColor={{ false: '#767577', true: '#667eea' }}
              thumbColor={formData.isAnonymous ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.anonymousHint}>
            Votre nom d'utilisateur ne sera pas affiché
          </Text>
        </View>

        {/* Boutons d'action */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              (!formData.title.trim() || !formData.content.trim()) && styles.buttonDisabled
            ]}
            onPress={handleSubmit}
            disabled={loading || !formData.title.trim() || !formData.content.trim()}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Publication...' : 'Partager'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  moodScroll: {
    marginHorizontal: -5,
  },
  moodOption: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: 70,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  categoryOption: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categorySelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
  anonymousSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  anonymousHint: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default CreatePostScreen;