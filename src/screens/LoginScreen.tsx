import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import StudifyLogo from '../components/StudifyLogo'
import AppText from '../components/AppText';
import FormInput from '../components/AppInput';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { loginUser, fetchProfile } from '../api/userService'; // ⚡ ton fichier API
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!login || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        try {
            setLoading(true);

            // ⚡ Appel API backend
            const response = await axios.post( "http://10.0.2.2:8000/api/users/login", { email: login, password }, { withCredentials: true }); // ⚡ important pour la session );

            if (response.success) {
                // ✅ Connexion réussie → récupérer le profil
                const profile = await fetchProfile();
                console.log("Profil connecté:", profile);

                Alert.alert("Succès", "Connexion réussie !");
                navigation.navigate("Home", { user: profile.data });
            } else {
                Alert.alert("Erreur", response.message || "Identifiants invalides");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Impossible de se connecter au serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <AppText text={"Bienvenue"} style={styles.bannerTitle}/> 
                <AppText text={"Accéder à la gestion des étudiants"} style={styles.bannerSubtitle}/>
            </View>
        
            <Card style={styles.card}>
                <StudifyLogo source={require("../../assets/images/Logo.png")}/>
                <ScrollView>
                    <AppText text={"Connexion"} style={styles.formTitle}/>
                    
                    <FormInput 
                        label={"Login"} 
                        value={login} 
                        onChangeText={setLogin} 
                        placeholder={"yombisse@gmail.com"} 
                        keyboardType="email-address" 
                        iconContainerStyle={styles.inputBox}
                    />

                    <FormInput 
                        label={"Password"} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={true} 
                        placeholder={"********"} 
                        iconContainerStyle={styles.inputBox}
                    />

                    <AppButton 
                        text={loading ? "Connexion..." : "Login"} 
                        onPress={handleLogin} 
                        style={styles.loginButton}
                    />
                </ScrollView>

                <View style={styles.signupRow}>
                    <AppText text={"Pas de compte ?"} style={styles.signupText}/> 
                    <AppButton 
                        text={"SignIn"} 
                        onPress={() => navigation.navigate("SignIn")} 
                        style={styles.signupButton} 
                        textStyle={styles.signupText} 
                    />
                </View> 
            </Card>
        </View>
    )
}

export default LoginScreen;


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  banner: {
    height: 200,
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
    marginHorizontal: 40,
    marginBottom:20,
    marginTop: -60,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#243b61',
    paddingHorizontal: 40,
    elevation: 4,
  },

  formTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 40,
  },

  label: {
    fontSize: 20,
    color: '#475569',
    marginBottom: 8,
  },

  inputBox: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#fffff0',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },

  placeholder: {
    fontSize: 20,
    color: '#9AA9C9',
  },

  showPassword: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    fontSize: 18,
    color: '#9AA9C9',
  },

  forgotLink: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '600',
    marginTop: 20,
  },

  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
    justifyContent: 'center',
  },
  separatorLine: {
    height: 1,
    width: 300,
    backgroundColor: '#E6EEF8',
  },
  separatorText: {
    fontSize: 18,
    color: '#9AA9C9',
    marginHorizontal: 20,
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

  signupRow: {
    flexDirection:'row',

  },
  signupText: {
    fontSize: 16,
    color: '#475569',
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
