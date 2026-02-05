import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import { fetchProfile, updateUser } from '../api/authService'; // ⚡ tes fonctions API
import AppInput from '../components/AppInput';

const EditProfileScreen = ({ route,navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = route.params || {};
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setNomUtilisateur(user.nom_utilisateur || "");
      setNom(user.nom || "");
      setPrenom(user.prenom || "");
      setEmail(user.email || "");
      setRole(user.role || "");
    }
    setLoading(false);
  }, [user]);
  
  const handleSave = async () => {
    setSaving(true);
    try {
        const payload = {
        nom_utilisateur: user.nom_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        };
        console.log('Payload update:', payload);
        const res = await updateUser(payload);
        if (res.success) {
        console.log('Profil mis à jour');
        navigation.goBack();
        } else {
        console.log('Erreur update:', res.message);
        }
    } catch (error) {
        console.log('Erreur update:', error.response?.data || error.message);
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
            <AppInput
                value={nomUtilisateur}
                onChangeText={(text) => setNomUtilisateur(text)}
            />

            <AppText text="Nom" style={styles.label} />
            <AppInput
                value={nom}
                onChangeText={(text) => setNom(text)}
            />

            <AppText text="Prénom" style={styles.label} />
            <AppInput
                value={prenom}
                onChangeText={(text) => setPrenom(text)}
            />

            <AppText text="Email" style={styles.label} />
            <AppInput
                value={ email}
                onChangeText={(text) => setEmail(text)}
            />

            <AppText text="Rôle" style={styles.label} />
            <AppInput
                value={role}
                onChangeText={(text) => setRole(text)}
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
  container: { flex: 1, backgroundColor: '#F7FAFF' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  scrollArea: { padding: 16 },
  formCard: { borderRadius: 12, backgroundColor: '#fff', padding: 16, elevation: 2 },
  label: { fontSize: 16, color: '#6b7280', marginTop: 12 },
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
