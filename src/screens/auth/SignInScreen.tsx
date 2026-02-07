import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import StudifyLogo from '../../components/StudifyLogo';
import Card from '../../components/Card';
import FormInput from '../../components/AppInput';
import { createUser } from '../../api/authService';
import AppLink from '../../components/AppLink';
import { useAuthError } from '../../hooks/useAuthError';


export default function SignInScreen({ navigation }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [username,setUsername]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const { error, setFieldError, clearError, handleApiError } = useAuthError();

  // Validation avec messages d'erreur
  function validator() {
    const newErrors = {};
    let isValid = true;

    if (username.length < 3) {
      newErrors.nom_utilisateur = "Le nom d'utilisateur doit contenir au moins 3 caractères";
      isValid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,12}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule, un chiffre et un caractère spécial.";
      isValid = false;
    }

    if (password !== confirm) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Adresse email invalide";
      isValid = false;
    }

    // Appliquer toutes les erreurs
    Object.keys(newErrors).forEach((key) => {
      setFieldError(key, newErrors[key]);
    });

    return isValid;
  }

  async function handleSubmit() {
    // Effacer les erreurs précédentes
    clearError();

    try {
      if (validator()) {
        const userData = {
          nom_utilisateur: username,
          email,
          password,
          role: "student",
        };

        const response = await createUser(userData);
        console.log("Réponse signup:", response);

        if (response.success) {
          Alert.alert("Succès", "Compte créé !");
          navigation.replace("Login", { user: response.data });
        }
      }
    } catch (err) {
      console.error("Erreur signup:", err.response?.data || err.message);
      handleApiError(err);
    }
  }

  // Effacer les erreurs quand l'utilisateur tape
  const handleUsernameChange = (text) => {
    setUsername(text);
    clearError('nom_utilisateur');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    clearError('email');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    clearError('password');
    clearError('password_confirmation');
  };

  const handleConfirmChange = (text) => {
    setConfirm(text);
    clearError('password_confirmation');
  };


    
    return (
    <View style={styles.container}>
      <View style={styles.banner}>
      </View>
      
      <View style={styles.card}>
        <StudifyLogo source={require("../../assets/images/Logo.png")}/>
        <AppText text="Inscription" style={styles.formTitle}/>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingVertical:16 }}
            showsVerticalScrollIndicator={false}
        >
            <FormInput 
              label="Username" 
              value={username} 
              onChangeText={handleUsernameChange} 
              placeholder="username" 
              keyboardType="default" 
              error={error.nom_utilisateur}
              iconContainerStyle={styles.inputBox}
            />
            <FormInput 
              label="Email" 
              value={email} 
              onChangeText={handleEmailChange} 
              placeholder="exemple@mail.com" 
              keyboardType="email-address" 
              error={error.email}
              iconContainerStyle={styles.inputBox}
            />
            <FormInput 
              label="Mot de passe" 
              value={password} 
              onChangeText={handlePasswordChange} 
              placeholder="********" 
              secureTextEntry={true} 
              error={error.password}
              iconContainerStyle={styles.inputBox}
            />
            <FormInput 
              label="Confirmer mot de passe" 
              value={confirm} 
              onChangeText={handleConfirmChange} 
              placeholder="********" 
              secureTextEntry={true} 
              error={error.password_confirmation}
              iconContainerStyle={styles.inputBox}
            />
            {/* Erreur générale */}
            {error.general && (
              <AppText 
                text={error.general} 
                style={styles.generalError}
              />
            )}
            <AppButton text="S'inscrire" onPress={handleSubmit} style={styles.loginButton}/>
            
        </ScrollView>
        <View style={styles.signupRow}>
          <AppText 
            text="deja un compte ?" 
            style={styles.signupText}
          />

          <AppLink 
            text=" Se Connecter"
            onPress={() => navigation.navigate("Login")}
            textStyle={styles.LoginLink}
          />
        </View>
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
    height: '50%',
    backgroundColor: '#1E88E5',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
     paddingVertical: 20,
  },

  card: {
    flex:1,
    marginBottom:10,
    justifyContent:'center',
    marginHorizontal: 20,
    marginTop: "-90%",
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical:10,
    elevation: 4,
  },

  formTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0B59A7',
    marginBottom: 40,
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
    
  },

  

  showPassword: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    fontSize: 18,
    color: '#9AA9C9',
  },

  loginButton: {
    backgroundColor: '#1E88E5',
    marginTop:0
    
    
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },

  signupRow: {
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:10,
   
  },
  signupText: {
    fontSize: 16,
    color: '#475569',
  },
  LoginLink: {
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

  generalError: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 14,
  },


});
