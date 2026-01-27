import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormInput from '../components/AppInput'
import AppHeader from '../components/AppHeader'
import AppButton from '../components/AppButton';
import { createStudent } from '../api/studentService'
import { isValidEmail } from '../utils/util';
import { PhoneInput, isValidNumber } from 'react-native-phone-entry';
import { launchImageLibrary } from 'react-native-image-picker';
import AppText from '../components/AppText'

const AddForm = ({navigation}) => {
    
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [age,setAge]=useState(16);
    const [telephone,setTelephone]=useState("+226");
    const [phoneCountry,setPhoneCountry]=useState("BF");
    const [adresse,setAdresse]=useState("");
    const [photoUri, setPhotoUri] = useState("");
    const [email,setEmail]=useState("");
    const [filiere,setFiliere]=useState(16);
    const [sexe,setSexe]=useState(16);

    
    function validator(){
      if(!nom.trim() || nom.length<2){
        alert("Le nom est requis");
        return false;
      }
      if(!prenom.trim() || prenom.length<2){
        alert("Le prenom est requis");
        return false;
      }
      if(!telephone.trim() || !isValidNumber(telephone, phoneCountry)){
        alert("Le téléphone est invalide. Utilisez le format international (ex: +229xxxxxxxx)");
        return false;
      }
      if(!email.trim() || !isValidEmail(email)){
        alert("L'email est invalide");
        return false;
      }
      return true;
    }

    async function handleSubmit() {
      if (!validator()) return;

    const newStudent = {
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



      try {
        await createStudent(newStudent);
        navigation.goBack();
      } catch (err) {
        console.error("Erreur lors de la création:", err);
        alert("Impossible d'ajouter l'étudiant. Vérifiez vos données.");
      }
    }

    
  return (
    <SafeAreaView style={styles.container}>
        <AppHeader title={"Ajouter un etudiant"} titleStyle={styles.headerTitle} style={styles.header} leftIcon='arrow-back' onLeftPress={()=>navigation.goBack()}/>
      <ScrollView contentContainerStyle={{paddingVertical:16}} showsVerticalScrollIndicator={false} style={styles.formGroup}>
        <FormInput label={"NOM"} labelStyle={styles.label} value={nom} onChangeText={(text)=>setNom(text)} iconContainerStyle={styles.inputBox}placeholder={"nom"}/>
        <FormInput label={"Prenom(s)"} labelStyle={styles.label} value={prenom} onChangeText={(text)=>setPrenom(text)} iconContainerStyle={styles.inputBox} placeholder={"prenom"}/>
        <FormInput label={"Age"} labelStyle={styles.label} value={age} onChangeText={(text)=>setAge(text)} iconContainerStyle={styles.inputBox} placeholder={"age"} keyboardType='numeric'/>
        <View style={{marginBottom:20}}>
          <AppText text={"Telephone"} style={styles.label} />
          <PhoneInput
              value={telephone}
              defaultValues={{ callingCode: '+226', countryCode: 'BF', phoneNumber: '' }}
              onChangeText={(text) => setTelephone(text)}
              onChangeCountry={(country) => setPhoneCountry(country?.cca2)}
              maskInputProps={{ placeholder: '+226 65 19 38 44' }}
            />

        </View>
        
        <FormInput label={"Adresse domicile"} labelStyle={styles.label} value={adresse} onChangeText={(text)=>setAdresse(text)} iconContainerStyle={styles.inputBox} placeholder={"adresse"}/>
        <FormInput label={"email"} labelStyle={styles.label} value={email} onChangeText={(text)=>setEmail(text)} iconContainerStyle={styles.inputBox} placeholder={"email"} keyboardType='email-text'/>
        <FormInput label={"filiere"} labelStyle={styles.label} value={filiere} onChangeText={(text)=>setFiliere(text)} iconContainerStyle={styles.inputBox} placeholder={"Filiere"}/>
        <FormInput label={"Sexe"} labelStyle={styles.label} value={sexe} onChangeText={(text)=>setSexe(text)} iconContainerStyle={styles.inputBox} placeholder={"sexe: M ou F"}/>
        
      </ScrollView>
      <AppButton text={"Ajouter"} onPress={handleSubmit} style={styles.saveButton} />
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
