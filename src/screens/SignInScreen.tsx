import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import StudifyLogo from '../components/StudifyLogo';
import Card from '../components/Card';
import FormInput from '../components/AppInput';

export default function SignInScreen({ navigation }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <AppText text="Bienvenue" style={styles.bannerTitle}/> 
        <AppText text="Créez votre compte pour accéder à la gestion des étudiants" style={styles.bannerSubtitle}/>  
      </View>
      
      <View style={styles.card}>
        <StudifyLogo source={require("../../assets/images/Logo.png")}/>
        <AppText text="Inscription" style={styles.formTitle}/>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <FormInput label="Nom" value={nom} onChangeText={setNom} placeholder="Nom" keyboardType="default" iconContainerStyle={styles.inputBox}/>
            <FormInput label="Prénom" value={prenom} onChangeText={setPrenom} placeholder="Prénom" keyboardType="default" iconContainerStyle={styles.inputBox}/>
            <FormInput label="Email" value={email} onChangeText={setEmail} placeholder="exemple@mail.com" keyboardType="email-address" iconContainerStyle={styles.inputBox}/>
            <FormInput label="Mot de passe" value={password} onChangeText={setPassword} placeholder="********" secureTextEntry={true} iconContainerStyle={styles.inputBox}/>
            <FormInput label="Confirmer mot de passe" value={confirm} onChangeText={setConfirm} placeholder="********" secureTextEntry={true} iconContainerStyle={styles.inputBox}/>
            
            <AppButton text="S'inscrire" onPress={()=>navigation.navigate('Home')} style={styles.loginButton}/>
            <View style={styles.signupRow}>
            <AppText text="Déjà inscrit ?" style={styles.signupText}/> 
            <AppButton text="Login" onPress={()=>navigation.navigate('Login')} style={styles.signupButton} textStyle={styles.signupText} />
            </View> 
        </ScrollView>
        </View>
 
    </View>
  )
}



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
    flex:1,
    marginHorizontal: 40,
    marginTop: -60,
    marginBottom:10,
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
    marginTop: 40,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#475569',
  },
  signupLink: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '600',
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
