import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStudent, updateStudent } from '../../api/studentService'
import { isValidEmail } from '../../utils/util';
import { isValidNumber } from 'react-native-phone-entry';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import FormInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import ProfileImagePicker from '../../components/profileImagePicker';



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
        newErrors.telephone = "Le téléphone est invalide (ex: +226xxxxxxxx)";
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
        leftIcon='arrow-back' 
        onLeftPress={() => navigation.goBack()} 
      />

      <Card style={styles.formCard}>
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
            placeholder="Nom" 
            error={errors.nom}
          />
          <FormInput 
            label="Prénom(s)" 
            labelStyle={styles.label} 
            value={prenom} 
            onChangeText={setPrenom} 
            placeholder="Prénom(s)" 
            error={errors.prenom}
          />
          <FormInput 
            label="Âge" 
            labelStyle={styles.label} 
            value={age} 
            onChangeText={setAge} 
            placeholder="Âge" 
            keyboardType="numeric"
            error={errors.age} 
          />
          <FormInput 
            label="Sexe" 
            labelStyle={styles.label} 
            value={sexe} 
            onChangeText={setSexe} 
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
            error={errors.telephone}
          />
          <FormInput 
            label="Email" 
            labelStyle={styles.label} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Email" 
            keyboardType="email-address" 
            error={errors.email}
          />
          <FormInput 
            label="Adresse domicile" 
            labelStyle={styles.label} 
            value={adresse} 
            onChangeText={setAdresse} 
            placeholder="Adresse" 
            error={errors.adresse}
          />

          {/* Informations académiques */}
          <FormInput 
            label="Filière" 
            labelStyle={styles.label} 
            value={filiere} 
            onChangeText={setFiliere} 
            placeholder="Filière" 
            error={errors.filiere}
          />

          <ProfileImagePicker
            image={photoUri}
            onChange={(uri)=>setPhotoUri(uri)}
          />


          {/* Affichage des erreurs */}
          <View style={{ alignItems: 'center', marginBottom: 5 }}>
            <AppText text={error} style={styles.error} />
          </View>
          <AppButton 
          text={student ? "Modifier" : "Ajouter"} 
          onPress={handleSubmit} 
          style={styles.saveButton} 
        />
        </ScrollView>
      </Card>
      
       
      
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
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },


  error:{
    fontSize:16,
    color:'red',
    textAlign:'center',
  },
  formCard: { 
    flex:1,
    borderRadius: 12, 
    backgroundColor: '#fff', 
    padding: 16, 
    elevation: 2, 
  

  },

  label: { 
    fontSize: 16, 
    color: '#6b7280', 
    marginTop: 12 
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 4,
    color: '#111827',
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
    height: 45,
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
