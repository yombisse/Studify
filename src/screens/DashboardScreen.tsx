import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchStats } from '../api/studentService';

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (error) {
        console.log('Erreur stats:', error);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title="Tableau de bord"
        leftIcon="menu"
        onLeftPress={() => navigation.openDrawer()}
      />
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
          <AppText text="Actions rapides" style={[styles.cardTitle, { marginTop: 20 }]} />
          <AppButton 
            title="Ajouter un étudiant" 
            icon={<MaterialCommunityIcons name="plus-circle" size={20} color="#fff" />} 
            onPress={() => navigation.navigate('AddStudent')} 
            style={{ backgroundColor: '#1E88E5', marginVertical: 10 }}
          />

        </View>
      </ScrollView>
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
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
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
    marginTop: 4,
  },
  cardValueGarcon: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#26db96',
    marginTop: 4,
  },
  cardValueFille: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#b726db',
    marginTop: 4,
  },
  rowCards: {
    flexDirection: 'row',
    gap: 12,
  },
});
