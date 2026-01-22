import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormInput from '../components/AppInput'
import AppHeader from '../components/AppHeader'
import AppButton from '../components/AppButton'

const AddForm = ({navigation}) => {
    const [name,setName]=useState("");
    const [firstname,setFirstname]=useState("");
    const [age,setAge]=useState(16);
    const [telephone,setTelephone]=useState("");
    const [sexe,setSexe]=useState("");
    
  return (
    <SafeAreaView style={styles.container}>
        <AppHeader title={"Ajouter un etudiant"} titleStyle={styles.headerTitle} style={styles.header} leftIcon='arrow-back' onLeftPress={()=>navigation.goBack()}/>
      <ScrollView contentContainerStyle={{paddingVertical:16}} showsVerticalScrollIndicator={false} style={styles.formGroup}>
        <FormInput label={"NOM"} labelStyle={styles.label} value={name} onChangeText={(text)=>setName(text)} inputStyle={styles.inputBox}placeholder={"nom"}/>
        <FormInput label={"Prenom(s)"} labelStyle={styles.label} value={firstname} onChangeText={(text)=>setFirstname(text)} inputStyle={styles.inputBox} placeholder={"prenom"}/>
        <FormInput label={"Age"} labelStyle={styles.label} value={age} onChangeText={(text)=>setAge(text)} inputStyle={styles.inputBox} placeholder={"age"} keyboardType='numeric'/>
        <FormInput label={"Telephone"} labelStyle={styles.label} value={telephone} onChangeText={(text)=>setTelephone(text)} inputStyle={styles.inputBox} placeholder={"telephone"} keyboardType='numeric'/>
        <FormInput label={"Sexe"} labelStyle={styles.label} value={sexe} onChangeText={(text)=>setSexe(text)} inputStyle={styles.inputBox} placeholder={"sexe: M ou F"}/>
        <AppButton text={"Ajouter"} onPress={()=>navigation.navigate('Home')} />
      </ScrollView>
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
    marginTop: 80,
    marginHorizontal: 60,
    height: 96,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
});
