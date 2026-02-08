import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudifyLogo from '../../components/StudifyLogo';
import AppText from '../../components/AppText';
import FormInput from '../../components/AppInput';
import Card from '../../components/Card';
import AppButton from '../../components/AppButton';
import AppLink from '../../components/AppLink';
import { loginUser } from '../../api/authService';
import { useAuthError } from '../../hooks/useAuthError';
import EmailCheckModal from './EmailCheckModal';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { error, clearError, setFieldError, handleApiError, handleBusinessError } = useAuthError();

  const handleLogin = async () => {
  clearError();

  if (!login || !password) {
    if (!login) setFieldError("email", "Le login/email est requis");
    if (!password) setFieldError("password", "Le mot de passe est requis");
    return;
  }

  try {
    setLoading(true);
    const response = await loginUser({ email: login, password });

    if (response.success) {
      const { token, user } = response;
      await AsyncStorage.setItem("authToken", token);
      navigation.replace("Home", { user });
    } else {
      // Gérer les erreurs de l'API pour le login
      if (response.errors) {
        // Erreurs par champ (validation)
        Object.keys(response.errors).forEach((key) => {
          setFieldError(key, response.errors[key]);
        });
      } else if (response.message) {
        // Mapper le message d'erreur au bon champ
        const msg = response.message.toLowerCase();
        if (msg.includes("password") || msg.includes("mot de passe") || msg.includes("incorrect") || msg.includes("connexion") || msg.includes("serveur")) {
          setFieldError("password", response.message);
        } else if (msg.includes("email") || msg.includes("login") || msg.includes("utilisateur")) {
          setFieldError("email", response.message);
        } else {
          // Erreur générale sinon
          handleBusinessError(response);
        }
      } else {
        handleBusinessError(response);
      }
    }
  } catch (err) {
    // Gérer les erreurs de l'appel API (exception)
    const response = err.response;
    if (response) {
      const status = response.status;
      const data = response.data;
      
      if ((status === 400 || status === 422) && data?.errors) {
        Object.keys(data.errors).forEach((key) => {
          setFieldError(key, data.errors[key]);
        });
      } else if (status === 401) {
        const msg = (data?.message || data?.error || err.message || "").toLowerCase();
        if (msg.includes("password") || msg.includes("mot de passe") || msg.includes("incorrect") || msg.includes("connexion") || msg.includes("serveur")) {
          setFieldError("password", data?.message || data?.error || "Mot de passe incorrect");
        } else if (msg.includes("email") || msg.includes("login") || msg.includes("utilisateur") || msg.includes("存在しない")) {
          setFieldError("email", data?.message || data?.error || "Email incorrect");
        } else {
          handleApiError(err);
        }
      } else {
        handleApiError(err);
      }
    } else {
      handleApiError(err);
    }
  } finally {
    setLoading(false);
  }
};



  

  const handleForgotPassword = () => {
    setShowModal(true);
  };


  // Effacer l'erreur quand l'utilisateur tape
  const handleLoginChange = (text) => {
    setLogin(text);
    clearError('email');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    clearError('password');
  };


  return (
    <View style={styles.container}>
      <View style={styles.banner}>
      </View>
    
      <Card style={styles.card}>
        <StudifyLogo source={require("../../assets/images/Logo.png")}/>
        <ScrollView>
          <AppText text={"Connexion"} style={styles.formTitle}/>
          
          <FormInput 
            label={"Login"} 
            value={login} 
            onChangeText={handleLoginChange}
            placeholder={"yombisse@gmail.com"} 
            keyboardType="email-address" 
            error={error.email}
            iconContainerStyle={styles.inputBox}
          />

          <FormInput 
            label={"Password"} 
            value={password} 
            onChangeText={handlePasswordChange}
            secureTextEntry={true} 
            placeholder={"********"} 
            error={error.password}
            iconContainerStyle={styles.inputBox}
          />

          <AppButton 
            text={loading ? "Connexion..." : "Login"} 
            onPress={handleLogin} 
            style={styles.loginButton}
          />
        </ScrollView>

        <AppLink
            text="Mot de passe oublie ?"
            onPress={handleForgotPassword}
            textStyle={styles.forgotLink}
          />

          <EmailCheckModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            navigation={navigation}
          />

        {/* Sign up section */}
        <View style={styles.signupRow}>
          <AppText 
            text="Pas de compte ?" 
            style={styles.signupText}
          />

          <AppLink 
            text=" S'inscrire"
            onPress={() => navigation.navigate("SignIn")}
            textStyle={styles.signupLink}
          />
        </View>

      </Card>
    </View>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  banner: {
    height:'50%',
    backgroundColor: '#1E88E5',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
     paddingVertical: 20,
  },
  bannerTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#E8F4FF',
    marginTop: 10,
  },

  card: {
    width:'90%',
    marginBottom:10,
    justifyContent:'center',
    marginHorizontal: 20,
    marginTop: "-70%",
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical:10,
    elevation: 4,
  },

  forgotContainer: {
    marginTop: 10,
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:5
  },

  signupText: {
    fontSize: 15,
    color: '#64748B',
    textAlign:'center'
  },
  signupLink: {
    fontSize: 18,
    color: '#0B59A7',
    textAlign:'center'
  },

  formTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 10,
    textAlign:'center'
  },

  label: {
    fontSize: 20,
    color: '#475569',
    marginBottom: 8,
  },

  inputBox: {
    height: 50,
    borderRadius: 100,
    borderColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  forgotLink: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '600',
    textAlign:'center'
  },

  loginButton: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#1E88E5',
    
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },


  signupButton: {
    height: 50,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },

  note: {
    fontSize: 16,
    color: '#9AA9C9',
    marginTop: 20,
    textAlign: 'center',
  },

  footerLogo: {
    marginTop: 100,
    alignItems: 'center',
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E88E5',
  },
});

