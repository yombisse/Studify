import { StyleSheet, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import StudifyLogo from '../components/StudifyLogo';
import AppText from '../components/AppText';

const WelcomeScreen = ({ navigation }) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {

    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    // Redirection après 3 secondes
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <View style={styles.container}>
      
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <StudifyLogo 
          source={require("../assets/images/Logo.png")} 
          style={styles.logo}
        />
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <AppText 
          text={"Bienvenue dans Studify"} 
          style={styles.title}
        />
        <AppText 
          text={"Chargement..."} 
          style={styles.subtitle}
        />
      </Animated.View>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
  },

  logo: {
    width: 120,
    height: 120,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    textAlign: 'center',
    marginTop: 10,
  },
});
