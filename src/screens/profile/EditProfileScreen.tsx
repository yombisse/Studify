import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUser } from '../../api/authService';
import AppText from '../../components/AppText';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/AppInput';
import ProfileImagePicker from '../../components/profileImagePicker'



const EditProfileScreen = ({ route,navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = route.params || {};
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profileUrl, setProfileUrl] = useState(user.profile_url || "");
  




  useEffect(() => {
    if (user) {
      setNomUtilisateur(user.nom_utilisateur || "");
      setNom(user.nom || "");
      setPrenom(user.prenom || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setProfileUrl(user.profile_url || "");
    }
    setLoading(false);
  }, [user]);
  
  const handleSave = async () => {
    setSaving(true);

    try {

      const payload = {
        nom_utilisateur: nomUtilisateur,
        nom: nom,
        prenom: prenom,
        email: email,
        role: role,
        profile_url: profileUrl,
      };

      console.log("User ID:", user.id);
      console.log("Données de l'user à soumettre:", payload);

      const res = await updateUser(user.id, payload);

      if (res.success) {
        console.log("Profil mis à jour");
        navigation.goBack();
      } else {
        console.log("Erreur update:", res.message);
      }

    } catch (error) {
      console.log("Erreur update:", error.response?.data || error.message);
    } finally {
      setSaving(false);
    }
  };




  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loader}>
        <AppText text="Impossible de charger le profil" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Modifier Profil"
        titleStyle={styles.headerTitle}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Card style={styles.formCard}>
            <AppText text="Nom d'utilisateur" style={styles.label} />
            <FormInput
                value={nomUtilisateur}
                onChangeText={(text) => setNomUtilisateur(text)}
            />

            <AppText text="Nom" style={styles.label} />
            <FormInput
                value={nom}
                onChangeText={(text) => setNom(text)}
            />

            <AppText text="Prénom" style={styles.label} />
            <FormInput
                value={prenom}
                onChangeText={(text) => setPrenom(text)}
            />

            <AppText text="Email" style={styles.label} />
            <FormInput
                value={ email}
                onChangeText={(text) => setEmail(text)}
            />

            <AppText text="Rôle" style={styles.label} />
            <FormInput
                value={role}
                onChangeText={(text) => setRole(text)}
            />
            <ProfileImagePicker
              image={profileUrl}
              onChange={setProfileUrl}
            />
            </Card>


        <View style={styles.actions}>
          <AppButton
            text={saving ? "Enregistrement..." : "Sauvegarder"}
            style={styles.btnPrimary}
            textStyle={styles.btnPrimaryText}
            onPress={handleSave}
           
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7FAFF' 
  },
  loader: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    color: '#ffffff', 
    fontSize: 22, 
    fontWeight: '700' 
  },
  scrollArea: { 
    padding: 16 

  },
  formCard: { 
    borderRadius: 12, 
    backgroundColor: '#fff', 
    padding: 16, 
    elevation: 2 },
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
  actions: { marginTop: 20, alignItems: 'center' },
  btnPrimary: { backgroundColor: '#1E88E5', width: 200, height: 50 },
  btnPrimaryText: { color: '#ffffff' },
});
