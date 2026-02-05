import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import AppAvatar from '../components/Avatar';
import AppText from '../components/AppText';
import Card from '../components/Card';
 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-paper';
import { fetchProfile,logoutUser } from '../api/authService';
import { logoutHandler } from '../utils/logoutHandler';
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        console.log('Données profil:', res);
        if (res.success) {
          setUser(res.data);
        }
      } catch (error) {
        console.log('Erreur chargement profil:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

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
      {/* Header */}
      <AppHeader
        title="Mon Profil"
        titleStyle={styles.headerTitle}
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {/* Avatar + Nom */}
        <View style={styles.profileSection}>
          <AppAvatar image={user.profile_url} size={120} style={styles.avatar} />
          <AppText text={`${user.nom} ${user.prenom}`} style={styles.profileName} />
          <AppText text={`@${user.nom_utilisateur}`} style={styles.profileSubInfo} />
        </View>

        {/* Infos utilisateur */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <AppText text="Email" style={styles.infoLabel} />
            <AppText text={user.email} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <AppText text="Nom d'utilisateur" style={styles.infoLabel} />
            <AppText text={user.nom_utilisateur} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <AppText text="Nom" style={styles.infoLabel} />
            <AppText text={user.nom} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <AppText text="Prénom" style={styles.infoLabel} />
            <AppText text={user.prenom} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <AppText text="Rôle" style={styles.infoLabel} />
            <AppText text={user.role} style={styles.infoValue} />
          </View>
        </Card>

        {/* Actions */}

        <View style={styles.actions}>
          {/* Modifier profil */}
          <MaterialCommunityIcons 
            name="account-edit" 
            size={40} 
            color="#1E88E5" 
            onPress={() => navigation.navigate('EditProfile', { user })} 
            style={styles.actionIcon}
          />

          {/* Déconnexion */}
          <MaterialCommunityIcons 
            name="logout" 
            size={40} 
            color="#D32F2F" 
            onPress={() => logoutHandler(navigation)} 
            style={styles.actionIcon}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFF' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#ffffff', fontSize: 22, fontWeight: '700' },
  scrollArea: { padding: 16 },
  profileSection: { alignItems: 'center', marginVertical: 20 },
  avatar: { borderWidth: 2, borderColor: '#4A90E2' },
  profileName: { fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 10 },
  profileSubInfo: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  infoCard: { borderRadius: 12, backgroundColor: '#fff', padding: 16, marginVertical: 10, elevation: 2 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  infoLabel: { fontSize: 16, color: '#6b7280' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#111827' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  btnPrimary: { backgroundColor: '#1E88E5', width: 150, height: 50 },
  btnPrimaryText: { color: '#ffffff' },
  btnDanger: { backgroundColor: '#D32F2F', width: 150, height: 50 },
  btnDangerText: { color: '#ffffff' },
  actions: {
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
},
actionIcon: {
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 50,
  elevation: 3, // petite ombre
},

});
