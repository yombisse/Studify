import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStudent, updateStudent } from '../../api/studentService'
import { isValidEmail, isValidPhone } from '../../utils/util';
// import { isValidNumber } from 'react-native-phone-entry';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import FormInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import ProfileImagePicker from '../../components/profileImagePicker';
import useStudentError from '../../hooks/useStudentError';



const AddForm = ({route,navigation}) => {
        const { student, user } = route.params || {};
    
    const [nom,setNom]=useState("");
    const [prenom,setPrenom]=useState("");
    const [age,setAge]=useState("");
    const [telephone,setTelephone]=useState("");
    const [adresse,setAdresse]=useState("");
    const [photoUri, setPhotoUri] = useState("");
    const [email,setEmail]=useState("");
    const [filiere,setFiliere]=useState("");
    const [sexe,setSexe]=useState("M");
    const { error, clearError, setFieldError, handleApiError, handleBusinessError } = useStudentError();

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
          setTelephone(student.telephone);
        }
      }
    }, [student]);


    function validateForm() {
      clearError();
      
      let isValid = true;

      if (!nom.trim() || nom.length < 2) {
        setFieldError('nom', "Le nom est requis (min. 2 caractères)");
        isValid = false;
      }
      if (!prenom.trim() || prenom.length < 2) {
        setFieldError('prenom', "Le prénom est requis (min. 2 caractères)");
        isValid = false;
      }
      if (!age.trim() || isNaN(Number(age))) {
        setFieldError("age", "L'âge est requis et doit être un nombre");
        isValid = false;
      }
      if (sexe.trim().toUpperCase() !== "M" && sexe.trim().toUpperCase() !== "F") {
        setFieldError('sexe', "Le sexe est invalide. Utilisez M ou F");
        isValid = false;
      }
      if (!adresse.trim() || adresse.length < 5) {
        setFieldError('adresse', "L'adresse est invalide (min. 5 caractères)");
        isValid = false;
      }
      if (!telephone.trim() || !isValidPhone(telephone)) {
        setFieldError('telephone', "Le téléphone est invalide (ex: +226xxxxxxxx)");
        isValid = false;
      }
      if (!email.trim() || !isValidEmail(email)) {
        setFieldError('email', "L'email est invalide");
        isValid = false;
      }
      if (!filiere.trim()) {
        setFieldError('filiere', "La filière est requise");
        isValid = false;
      }

      return isValid;
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
      
      if (!validateForm()){
        return;
      }
      
      if(student){
        try {
          const response = await updateStudent(student.id, newStudent);
          if (response.success) {
            navigation.goBack();
          } else {
            handleBusinessError(response);
          }
        } catch (err) {
          handleApiError(err);
        }
        return;
      }
      else{
          try {
            const response = await createStudent(newStudent);
            if (response.success) {
              navigation.goBack();
            } else {
              handleApiError(response.errors);
            }
          } catch (err) {
            handleApiError(err);
          }
        }
    }
    
    // Effacer l'erreur quand l'utilisateur tape
    const handleNomChange = (text) => {
      setNom(text);
      clearError('nom');
    };
    
    const handlePrenomChange = (text) => {
      setPrenom(text);
      clearError('prenom');
    };
    
    const handleAgeChange = (text) => {
      setAge(text);
      clearError('age');
    };
    
    const handleSexeChange = (text) => {
      setSexe(text);
      clearError('sexe');
    };
    
    const handleTelephoneChange = (text) => {
      setTelephone(text);
      clearError('telephone');
    };
    
    const handleEmailChange = (text) => {
      setEmail(text);
      clearError('email');
    };
    
    const handleAdresseChange = (text) => {
      setAdresse(text);
      clearError('adresse');
    };
    
    const handleFiliereChange = (text) => {
      setFiliere(text);
      clearError('filiere');
    };

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
          <FormInput
            label="Nom" 
            labelStyle={styles.label} 
            value={nom} 
            onChangeText={handleNomChange}
            placeholder="Nom" 
            error={error.nom}
          />
          <FormInput 
            label="Prénom(s)" 
            labelStyle={styles.label} 
            value={prenom} 
            onChangeText={handlePrenomChange}
            placeholder="Prénom(s)" 
            error={error.prenom}
          />
          <FormInput 
            label="Âge" 
            labelStyle={styles.label} 
            value={age} 
            onChangeText={handleAgeChange}
            placeholder="Âge" 
            keyboardType="numeric"
            error={error.age} 
          />
          <FormInput 
            label="Sexe" 
            labelStyle={styles.label} 
            value={sexe} 
            onChangeText={handleSexeChange}
            placeholder="Sexe: M ou F" 
            error={error.sexe}
          />

          <FormInput
          label="Téléphone"
          value={telephone}
          onChangeText={handleTelephoneChange}
          placeholder={"+22606913191"}
          autoValidate={true}
          error={error.telephone}
           />

          <FormInput 
            label="Email" 
            labelStyle={styles.label} 
            value={email} 
            onChangeText={handleEmailChange}
            placeholder="Email" 
            keyboardType="email-address" 
            autoValidate
            error={error.email}
          />
          <FormInput 
            label="Adresse domicile" 
            labelStyle={styles.label} 
            value={adresse} 
            onChangeText={handleAdresseChange}
            placeholder="Adresse" 
            error={error.adresse}
          />

          <FormInput 
            label="Filière" 
            labelStyle={styles.label} 
            value={filiere} 
            onChangeText={handleFiliereChange}
            placeholder="Filière" 
            error={error.filiere}
          />

          <ProfileImagePicker
            image={photoUri}
            onChange={(uri)=>setPhotoUri(uri)}
          />


          {error.general && (
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
              <AppText text={error.general} style={styles.error} />
            </View>
          )}
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

