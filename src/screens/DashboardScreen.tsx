import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchStats, fetchStudents } from '../api/studentService';
import ConfirmDeleteModal from '../components/ModalConfirm';
import AppAvatar from '../components/Avatar';
import AppLink from '../components/AppLink';

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchStats();
        const response= await fetchStudents()
        if (res.success && response.success) {
          setStats(res.stats);
          setStudents(response.data.slice(0,2));
        }
      } catch (error) {
        console.log('Erreur stats ou etudiant:', error.message);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
    const unsubscribe = navigation.addListener('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.loader}>
        <AppText text="Impossible de charger les statistiques" />
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() =>
        navigation.navigate('Students', {screen:'Student'})
      }
    >
      <View style={styles.StudentRow}>
        {/* Infos étudiant */}
        <View style={styles.studentInfo}>
          <AppAvatar image={item.profile_url} style={styles.avatar} />
          <View style={styles.studentInfoContent}>
            <AppText text={`${item.nom || ''} ${item.prenom || ''}`} style={styles.studentName} />
            <AppText text={item.age ? `${item.age} ans` : ''} style={styles.studentSubInfo} />
          </View>
        </View>

        
      </View>
      <View style={styles.studentCoordonnees}>
         <AppText text={item.email || ''} style={styles.studentSubInfo} />
        <AppText text={item.telephone || ''} style={styles.studentSubInfo} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title="Tableau de bord"
        leftIcon="menu"
        onLeftPress={() => navigation.openDrawer()}
      />
      <Card >
        <ScrollView style={styles.container}>
          <View style={styles.cardGroup}>
            
            {/* Total étudiants */}
            <Card style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
              <MaterialCommunityIcons name="account-group" size={40} color="#1E88E5" />
              <AppText text="Total inscrits" style={styles.cardTitle} />
              <AppText text={stats.global.total_etudiants} style={styles.cardValueTotal} />
            </Card>

              {/* Garçons / Filles */}
            <View style={styles.rowCards}>
              <Card style={[styles.smallStatCard, { backgroundColor: '#E8F5E9' }]}>
                <MaterialCommunityIcons
                  name="human-male"
                  size={38}
                  color="#26db96"
                />
                <AppText text="Garçons" style={styles.cardTitle} />
                <AppText
                  text={stats.global.total_hommes}
                  style={styles.cardValueGarcon}
                />
              </Card>

              <Card style={[styles.smallStatCard, { backgroundColor: '#F3E5F5' }]}>
                <MaterialCommunityIcons
                  name="human-female"
                  size={38}
                  color="#b726db"
                />
                <AppText text="Filles" style={styles.cardTitle} />
                <AppText
                  text={stats.global.total_femmes}
                  style={styles.cardValueFille}
                />
              </Card>
            </View>

            {/* Actions rapides */}
            <Card style={styles.quickActionCard}>
              <AppText
                text="Actions rapides"
                style={styles.sectionTitle}
              />

              <AppButton
                onPress={() =>
                  navigation.navigate('Students', {
                    screen: 'Add',
                  })
                }
                style={styles.bigActionButton}
              >
                <MaterialCommunityIcons
                  name="account-plus"
                  size={24}
                  color="#fff"
                />
                <AppText
                  text="Ajouter un étudiant"
                  style={styles.actionButtonText}
                />
              </AppButton>
            </Card>
            {/* Etudiants récents */}
            <Card style={styles.studentsSection}>
              <View style={styles.sectionHeader}>
                <AppText
                  text="Étudiants récents"
                  style={styles.sectionTitle}
                />
              </View>

              <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
              <AppButton
                text="Voir tous les étudiants"
                onPress={() =>
                  navigation.navigate('Students', {
                    screen: 'Student',
                  })
                }
                style={styles.secondaryButton}
              />
            </Card>
          </View>
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7FC',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardGroup: {
    paddingBottom: 40,
  },

  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 10,
    fontWeight: '600',
  },

  cardValueTotal: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1E88E5',
    marginTop: 8,
  },

  cardValueGarcon: {
    fontSize: 34,
    fontWeight: '800',
    color: '#26db96',
  },

  cardValueFille: {
    fontSize: 34,
    fontWeight: '800',
    color: '#b726db',
  },

  rowCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  smallStatCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },

  quickActionCard: {
    marginTop: 10,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 5,
  },

  studentsSection: {
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },

  sectionHeader: {
    marginBottom: 8,
  },

  bigActionButton: {
    minHeight: 62,
    marginBottom: 12,
    borderRadius: 18,
  },

  secondaryButton: {
    minHeight: 56,
    borderRadius: 18,
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },

  studentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  StudentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  studentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  studentInfoContent: {
    flex: 1,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 14,
  },

  studentName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
  },

  studentSubInfo: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  studentCoordonnees: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});