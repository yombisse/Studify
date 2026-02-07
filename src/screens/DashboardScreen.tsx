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
      <Card style={styles.container}>
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
              <Card style={[styles.card, { backgroundColor: '#E8F5E9', flex: 1 }]}>
                <MaterialCommunityIcons name="human-male" size={40} color="#26db96" />
                <AppText text="Garçons" style={styles.cardTitle} />
                <AppText text={stats.global.total_hommes} style={styles.cardValueGarcon} />
              </Card>

              <Card style={[styles.card, { backgroundColor: '#F3E5F5', flex: 1 }]}>
                <MaterialCommunityIcons name="human-female" size={40} color="#b726db" />
                <AppText text="Filles" style={styles.cardTitle} />
                <AppText text={stats.global.total_femmes} style={styles.cardValueFille} />
              </Card>
            </View>

                        {/* Actions rapides */}
            <Card style={[styles.card, { marginTop: 20, paddingVertical: 15 }]}>
              <AppText text="Actions récentes" style={styles.cardTitle} />
              
              <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10, gap: 12 }}
              />

              <View style={styles.actionsRow}>
                <AppButton 
                  onPress={() => navigation.navigate('Students', { screen:'Add' })}
                  style={styles.actionButton}
                >
                  <MaterialCommunityIcons name="plus-circle" size={20} color="#053d31" />
                  <AppText text="Ajouter un étudiant" style={{ marginLeft: 5 }} />
                </AppButton>

                <AppLink 
                  text="Voir plus" 
                  onPress={() => navigation.navigate('Students', { screen:'Student' }) }
                  textStyle={styles.seeMoreLink}
                />
              </View>
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
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardGroup: {
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    fontWeight: 'bold',
  },
  cardValueTotal: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1E88E5',
    
  },
  cardValueGarcon: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#26db96',
  },
  cardValueFille: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#b726db',
  },
  rowCards: {
    flexDirection: 'row',
    gap: 12,
    justifyContent:'space-between',
    alignItems:'center'
  },
  studentCard: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6eefb',
    shadowColor: '#0e4ea1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  actionsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 12,
},

actionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#E3F2FD',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 12,
  elevation: 2,
},

seeMoreLink: {
  fontSize: 16,
  color: '#1E88E5',
  fontWeight: '600',
},

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StudentRow: { 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center' ,
    flexWrap:'wrap'
  },

  studentInfo: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  studentInfoContent: { 
    flex: 1,
    flexDirection: 'column',
  },

  studentSubInfo: { 
    fontSize: 14, 
    color: '#6b7280', 
    marginTop: 4 
  },

  studentName: { 
    fontSize: 18, 
    color: '#334155', 
    fontWeight: '700' ,
    flexShrink:1,
    flexWrap:'wrap',
  },

  studentCoordonnees: { 
    marginTop: 8, 
    flexDirection: 'row',
    alignSelf: 'center',
    
  },
  arrow: { 
    color: '#9AA9C9'
   },
  

});
