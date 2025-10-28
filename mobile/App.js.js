import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import PostsScreen from './src/screens/PostsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import SupportScreen from './src/screens/SupportScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Publications') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Exprimer') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Soutien') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#667eea',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Accueil" 
          component={HomeScreen}
          options={{ title: 'Soutien Ensemble' }}
        />
        <Tab.Screen 
          name="Publications" 
          component={PostsScreen}
          options={{ title: 'Espace d\'Expression' }}
        />
        <Tab.Screen 
          name="Exprimer" 
          component={CreatePostScreen}
          options={{ title: 'Partager' }}
        />
        <Tab.Screen 
          name="Soutien" 
          component={SupportScreen}
          options={{ title: 'Devenir Supporter' }}
        />
        <Tab.Screen 
          name="Profil" 
          component={ProfileScreen}
          options={{ title: 'Mon Profil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}