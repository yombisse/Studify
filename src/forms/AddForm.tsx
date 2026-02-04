import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormInput from '../components/AppInput'
import AppHeader from '../components/AppHeader'
import AppButton from '../components/AppButton';
import { createStudent, updateStudent } from '../api/studentService'
import { isValidEmail } from '../utils/util';
import { PhoneInput, isValidNumber } from 'react-native-phone-entry';
import { launchImageLibrary } from 'react-native-image-picker';
import AppText from '../components/AppText'

const AddForm = ({route,navigation}) => {
        const { student, user } = route.params || {};
    
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [age,setAge]=useState(16);
    const [telephone,setTelephone]=useState("");
    const [phoneCountry,setPhoneCountry]=useState("");
    const [adresse,setAdresse]=useState("");
    const [photoUri, setPhotoUri] = useState("");
    const [email,setEmail]=useState("");
    const [filiere,setFiliere]=useState("");
    const [sexe,setSexe]=useState("M");
    const [callingCode,setCallingCode]=useState("+226");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [photo,setPhoto]=useState(null);
    const [error,setError]=useState("");
    const [errors,setErrors]=useState({});

    useEffect(() => {
      if (student) {
        setNom(student.nom || "");
        setPrenom(student.prenom || "");
        setAge(student.age ? String(student.age) : "");
        setEmail(student.email || "");
        setAdresse(student.adresse || "");
        setFiliere(student.filiere || "");
        setSexe(student.sexe || "");
        setPhotoUri(student.profile_url || "");

        if (student.telephone) {
          console.log("Chargement du téléphone:", student.telephone);
          setTelephone(student.telephone); // ✅ charge directement le numéro complet
          
        }
      }
    }, [student]);


    function validator() {
      const newErrors = {};

      if (!nom.trim() || nom.length < 2) {
        newErrors.nom = "Le nom est requis (min. 2 caractères)";
      }
      if (!prenom.trim() || prenom.length < 2) {
        newErrors.prenom = "Le prénom est requis (min. 2 caractères)";
      }
      if (isNaN(Number(age))) {
        newErrors.age = "L'âge est requis et doit être un nombre";
      }
      if (sexe.trim().toUpperCase() !== "M" && sexe.trim().toUpperCase() !== "F") {
        newErrors.sexe = "Le sexe est invalide. Utilisez M ou F";
      }
      if (!adresse.trim() || adresse.length < 1) {
        newErrors.adresse = "L'adresse est invalide (min. 5 caractères)";
      }
      if (!telephone.trim() || !isValidNumber(telephone, phoneCountry)) {
        newErrors.telephone = "Le téléphone est invalide (ex: +229xxxxxxxx)";
      }
      if (!email.trim() || !isValidEmail(email)) {
        newErrors.email = "L'email est invalide";
      }
      if (!filiere.trim()) {
        newErrors.filiere = "La filière est requise";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }


    async function handleSubmit() {
      const newStudent = {
        user_id:user?.id,
        nom,
        prenom,
        age: Number(age),
        telephone,
        email,
        profile_url: photoUri || "",
        filiere: String(filiere),
        sexe: String(sexe),
        adresse,
      };
      console.log("Données de l'étudiant à soumettre:", newStudent);
      if (!validator()){
        return;
      }
      
      if(student){
        try {
          await updateStudent(student.id, newStudent);
          navigation.goBack();
        } catch (error) {
          setError(error.message || "Une erreur est survenue lors de la mise à jour.");
          
        }
        return;
      }
      else{

          try {
            await createStudent(newStudent);
            navigation.goBack();
          } catch (err) {
            setError(err.message || "Une erreur est survenue lors de la création.");
          }
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title={student ? "Modifier un étudiant" : "Ajouter un étudiant"} 
        titleStyle={styles.headerTitle} 
        style={styles.header} 
        leftIcon='arrow-back' 
        onLeftPress={() => navigation.goBack()} 
      />

      <ScrollView 
        contentContainerStyle={{ paddingVertical: 16 }} 
        showsVerticalScrollIndicator={false} 
        style={styles.formGroup}
      >
        {/* Informations personnelles */}
        <FormInput 
          label="Nom" 
          labelStyle={styles.label} 
          value={nom} 
          onChangeText={setNom} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Nom" 
          error={errors.nom}
        />
        <FormInput 
          label="Prénom(s)" 
          labelStyle={styles.label} 
          value={prenom} 
          onChangeText={setPrenom} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Prénom(s)" 
          error={errors.prenom}
        />
        <FormInput 
          label="Âge" 
          labelStyle={styles.label} 
          value={age} 
          onChangeText={setAge} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Âge" 
          keyboardType="numeric"
          error={errors.age} 
        />
        <FormInput 
          label="Sexe" 
          labelStyle={styles.label} 
          value={sexe} 
          onChangeText={setSexe} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Sexe: M ou F" 
          error={errors.sexe}
        />

        {/* Coordonnées */}
        <FormInput
          type="phone"
          label="Téléphone"
          labelStyle={styles.label}
          value={telephone}
          onChangeText={setTelephone}
          onChangeCountry={(country) => {
            setPhoneCountry(country?.cca2);
            setCallingCode(`+${country?.callingCode}`);
          }}
          placeholder="Téléphone"
          error={errors.telephone}
        />
        <FormInput 
          type="email" 
          label="Email" 
          labelStyle={styles.label} 
          value={email} 
          onChangeText={setEmail} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Email" 
          keyboardType="email-address" 
          error={errors.email}
        />
        <FormInput 
          label="Adresse domicile" 
          labelStyle={styles.label} 
          value={adresse} 
          onChangeText={setAdresse} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Adresse" 
          error={errors.adresse}
        />

        {/* Informations académiques */}
        <FormInput 
          label="Filière" 
          labelStyle={styles.label} 
          value={filiere} 
          onChangeText={setFiliere} 
          iconContainerStyle={styles.inputBox} 
          placeholder="Filière" 
          error={errors.filiere}
        />

        {/* Photo de profil */}
        <FormInput
          type="file"
          label="Photo de profil"
          labelStyle={styles.label}
          value={photoUri}
          onFileSelect={(uri) => setPhotoUri(uri)}
          placeholder="Choisir une image"
        />

        {/* Affichage des erreurs */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <AppText text={error} style={styles.error} />
        </View>
      </ScrollView>

      {/* Bouton d’action */}
      <AppButton 
        text={student ? "Modifier" : "Ajouter"} 
        onPress={handleSubmit} 
        style={styles.saveButton} 
      />
    </SafeAreaView>

  )
}
export default AddForm;



const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

  // En-tête
  header: {
    height: 100,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
  },

  // Groupe de champs
  formGroup: {
    marginHorizontal: 20,
  },

  label: {
    fontSize: 20,
    color: '#475569',
    textAlign:'center',
  },
  error:{
    fontSize:16,
    color:'red',
    textAlign:'center',
  },
  inputBox: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e6eefb',
    paddingHorizontal: 20,
    justifyContent: 'center',
   
  },

  placeholder: {
    fontSize: 20,
    color: '#9aa9c9',
  },

  sexeOptions: {
    fontSize: 20,
    color: '#334155',
  },

  // Bouton Enregistrer
  saveButton: {
    width: '90%',
    marginTop: 5,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  avatarPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    marginTop: 10,
  },
});
