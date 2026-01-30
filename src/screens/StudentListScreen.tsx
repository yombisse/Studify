import React, { useEffect, useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import FormInput from '../components/AppInput';
import AppText from '../components/AppText';
import AppAvatar from '../components/Avatar';
import AppButton from '../components/AppButton';
import Ionicons from '@react-native-vector-icons/ionicons';
import { deleteStudent, fetchStudents } from '../api/studentService';
import ConfirmDeleteModal from '../components/ModalConfirm';

export default function StudentListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(false);

  async function getStudents() {
    try {
      setErr('');
      setLoading(true);
      const studentsData = await fetchStudents();
      setStudents(studentsData.data); // backend renvoie directement un tableau
    } catch (error) {
      setErr(
        error?.response?.data?.message ||
        error?.message ||
        'Erreur lors de la récupération des étudiants'
      );
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getStudents();
    setRefreshing(false);
  };

  useEffect(() => {
    getStudents();
    const unsubscribe = navigation.addListener('focus', getStudents);
    return unsubscribe;
  }, [navigation]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.nom, s.prenom, s.telephone, s.email]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(q))
    );
  }, [search, students]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() =>
        navigation.navigate('Detail', {
          students,
          initialIndex: index,
        })
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

        {/* Actions alignées */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Add', { student: item })}>
            <Ionicons name="create-outline" size={22} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                setSelectedStudent(item);
                setShowDeleteModal(true);
              }}
            >
              <Ionicons name="trash-outline" size={22} style={[styles.actionIcon, { color: 'red' }]} />
            </TouchableOpacity>

          <Ionicons name="chevron-forward" size={22} style={styles.arrow} />
        </View>
      </View>

      <View style={styles.studentCoordonnees}>
         <AppText text={item.email || ''} style={styles.studentSubInfo} />
        <AppText text={item.telephone || ''} style={styles.studentSubInfo} />
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
        title="Etudiants"
        style={styles.header}
        titleStyle={styles.headerTitle}
      />

      <FormInput
        placeholder="Rechercher un étudiant"
        value={search}
        onChangeText={setSearch}
        type="search"
        iconContainerStyle={styles.input}
      />

      {loading && !refreshing ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : err ? (
        <View style={{ padding: 16 }}>
          <AppText text={err} style={{ color: 'red', marginBottom: 8 }} />
          <AppButton text="Réessayer" onPress={getStudents} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingVertical: 16 }}
          data={filteredStudents}
          keyExtractor={(item, index) => String(item.id || item._id || index)}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={<AppText text="Aucun etudiant trouvé" style={styles.emptyFlatlist} />}
        />
      )}

      <AppButton style={styles.fab} onPress={() => navigation.navigate('Add')}>
        <Ionicons name="add-circle" size={60} color="#1E88E5" />
      </AppButton>
      <ConfirmDeleteModal
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={async () => {
          if (selectedStudent) {
            await deleteStudent(selectedStudent.id);
            setShowDeleteModal(false);
            getStudents(); // rafraîchir la liste
          }
        }}
        nom={selectedStudent?.nom || ''}
        prenom={selectedStudent?.prenom || ''}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFF' },
  header: {
    height: 100,
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  headerTitle: { color: '#fff', fontSize: 36, fontWeight: '700' },
  searchBar: { margin: 10 },

  input: { 
    borderWidth: 1, 
    borderRadius: 100 ,
    margin:15,

  },

  studentCard: {
    marginHorizontal: 10,
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

  emptyFlatlist:{
    textAlign:'center',
    color:'red',
    fontSize:20,
    fontStyle:'italic',
    paddingTop:'50%',
  },
  actionsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12, // espace entre les icônes
},
actionIcon: {
  color: '#1E88E5',
  marginHorizontal: 4,
},

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
