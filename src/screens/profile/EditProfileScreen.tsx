import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUser } from '../../api/authService';
import AppText from '../../components/AppText';
import AppHeader from '../../components/AppHeader';
import Card from '../../components/Card';
import AppButton from '../../components/AppButton';
import FormInput from '../../components/AppInput';
import ProfileImagePicker from '../../components/profileImagePicker';
import useAuthError from '../../hooks/useAuthError';

const EditProfileScreen = ({ route, navigation }) => {
  const { error, setFieldError, clearError, handleApiError, handleBusinessError } = useAuthError();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = route.params || {};
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profileUrl, setProfileUrl] = useState(user?.profile_url || "");

  

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
    clearError(); // On efface toutes les erreurs avant l'envoi
    setSaving(true);

    try {
      const payload = {
        nom_utilisateur: nomUtilisateur,
        nom,
        prenom,
        email,
        role,
        profile_url: profileUrl,
      };

      console.log("User ID:", user.id);
      console.log("Données de l'user à soumettre:", payload);

      const res = await updateUser(user.id, payload);

      if (res.success) {
        console.log("Profil mis à jour");
        navigation.goBack();
      } else {
        console.log("Erreur update:", res);
        handleBusinessError(res); // Mapper les erreurs sur les champs ou général
      }

    } catch (error) {
      handleApiError(error); // Erreurs réseau ou serveur
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
            onChangeText={(text) => { setNomUtilisateur(text); clearError("nom_utilisateur"); }}
            error={error.nom_utilisateur}
          />

          <AppText text="Nom" style={styles.label} />
          <FormInput
            value={nom}
            onChangeText={(text) => { setNom(text); clearError("nom"); }}
            error={error.nom}
          />

          <AppText text="Prénom" style={styles.label} />
          <FormInput
            value={prenom}
            onChangeText={(text) => { setPrenom(text); clearError("prenom"); }}
            error={error.prenom}
          />

          <AppText text="Email" style={styles.label} />
          <FormInput
            value={email}
            onChangeText={(text) => { setEmail(text); clearError("email"); }}
            error={error.email}
          />

          <AppText text="Rôle" style={styles.label} />
          <FormInput
            value={role}
            onChangeText={(text) => { setRole(text); clearError("role"); }}
            error={error.role}
          />

          <ProfileImagePicker
            image={profileUrl}
            onChange={setProfileUrl}
          />

          {error.general && <AppText text={error.general} style={styles.error} />}
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
