// utils/logoutHandler.js
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../api/authService'; // ton appel API

export const logoutHandler = (navigation) => {
  Alert.alert(
    "Déconnexion",
    "Voulez-vous vraiment vous déconnecter ?",
    [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await logoutUser();
            if (res.success) {
              await AsyncStorage.removeItem('authToken');
              // ⚡ redirige vers Login dans WelcomeStack
              navigation.replace('Welcome', { screen: 'Login' });
            } else {
              console.log('Erreur déconnexion:', res.message);
            }
          } catch (error) {
            console.log('Erreur logout:', error);
          }
        }
      }
    ]
  );
};
