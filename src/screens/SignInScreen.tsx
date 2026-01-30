import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import StudifyLogo from '../components/StudifyLogo';
import Card from '../components/Card';
import FormInput from '../components/AppInput';
import { createUser } from '../api/userService';
import { create } from 'react-test-renderer';

export default function SignInScreen({ navigation }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [username,setUsername]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [errors, setErrors] = useState({});
  const [error,setError]=useState("");

function validator() {
  const newErrors = {};

  if (username.length < 3) {
    newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,12}$/;
  if (!passwordRegex.test(password)) {
    newErrors.password = "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, un chiffre et un caractère spécial.";
  }

  if (password !== confirm) {
    newErrors.confirm = "Les mots de passe ne correspondent pas";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    newErrors.email = "Adresse email invalide";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return false;
  }

  setErrors({});
  return true;
}

  async function handleSubmit() {
    try {
      if(validator()){
      // Proceed with sign up
      const userData = {
        username,
        email,
        password,
      };
      await createUser(userData);
      navigation.navigate('Home');
    }
    } catch (error) {
      setError(error.message);
      return;
      
    }
  }

    
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
            <FormInput label="Username" value={username} onChangeText={setUsername} placeholder="username" keyboardType="default" error={errors.username} iconContainerStyle={styles.inputBox}/>
            <FormInput label="Email" value={email} onChangeText={setEmail} placeholder="exemple@mail.com" keyboardType="email-address" error={errors.email} iconContainerStyle={styles.inputBox}/>
            <FormInput label="Mot de passe" value={password} onChangeText={setPassword} placeholder="********" secureTextEntry={true} error={errors.password} iconContainerStyle={styles.inputBox}/>
            <FormInput label="Confirmer mot de passe" value={confirm} onChangeText={setConfirm} placeholder="********" secureTextEntry={true} error={errors.password} iconContainerStyle={styles.inputBox}/>
            <AppText text={error} style={{color:'red', textAlign:'center', marginBottom:10}}/>
            <AppButton text="S'inscrire" onPress={handleSubmit} style={styles.loginButton}/>
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
