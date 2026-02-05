import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import AppAvatar from '../components/Avatar';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { Divider } from 'react-native-paper';
import Card from '../components/Card';
import { formatDateTime } from '../utils/util';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StudentDetailScreen = ({ route, navigation }) => {
  const { students, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const student = students[currentIndex]; // étudiant courant

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <AppHeader
          title="Détail"
          titleStyle={styles.headerTitle}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.navContainer}>
          {/* Bouton précédent */}
          <TouchableOpacity 
            onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            style={styles.navButton}
          >
            <Ionicons name="chevron-back-outline" size={40} color="#4A90E2" />
          </TouchableOpacity>

          {/* Carte étudiant */}
          <Card style={styles.infoCard}>
            {/* Zone fixe */}
              <View style={styles.profileinfo}>
                <AppAvatar image={student.profile_url} size={90} style={styles.avatar}/>
                <AppText text={`${student.nom} ${student.prenom}`} style={styles.profileValue} />
              </View>
              <Divider style={styles.divider} bold />

              {/* Zone scrollable */}
              <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.infoRow}>
                  <AppText text="Sexe" style={styles.infoLabel} />
                  <AppText text={student.sexe} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Adresse" style={styles.infoLabel} />
                  <AppText text={student.adresse} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Téléphone" style={styles.infoLabel} />
                  <AppText text={student.telephone} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Email" style={styles.infoLabel} />
                  <AppText text={student.email} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Âge" style={styles.infoLabel} />
                  <AppText text={student.age} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Filière" style={styles.infoLabel} />
                  <AppText text={student.filiere} style={styles.infoValue} />
                </View>
                <Divider style={styles.divider} bold />

                <View style={styles.infoRow}>
                  <AppText text="Inscrit le" style={styles.infoLabel} />
                  <AppText text={formatDateTime(student.created_at)} style={styles.infoValue} />
                </View>
              </ScrollView>
          </Card>

          {/* Bouton suivant */}
          <TouchableOpacity 
            onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, students.length - 1))}
            disabled={currentIndex === students.length - 1}
            style={styles.navButton}
          >
            <Ionicons name="chevron-forward-outline" size={40} color="#4A90E2" />
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F7FAFF',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    padding:10,
  },
  infoCard: {
    width:'80%',
    maxHeight: '90%',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 10,
    elevation:2
  },
  profileinfo: {
     alignItems: 'center' 
    },
  avatar: {
    width:90,
    height:90,
    borderRadius:45,
    borderWidth: 1,
    borderColor: '#cfeaff',
    backgroundColor: '#E8F4FF',
  },
  profileValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign:'center',
  },
  scrollArea: {
    maxHeight: Dimensions.get('window').height * 0.5,
  },
    navButtons: { 
      backgroundColor: 'transparent', 
      padding: 5, // espace interne 
      justifyContent: 'center', 
      alignItems: 'center', 
    },

    infoRow: {
    paddingHorizontal: 10,
 
  },
  infoLabel: {
    fontSize: 18,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  divider: { 
    height: 1, 
    backgroundColor: '#E5E7EB', 
    marginVertical: 12, 
    opacity: 0.8, 
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },
});


