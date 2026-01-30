import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import Card from '../components/Card'
import AppText from '../components/AppText'
import Ionicons from '@react-native-vector-icons/ionicons'
import { fetchStats } from '../api/studentService'
import { SafeAreaView } from 'react-native-safe-area-context'

const DashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchStats()
        if (res.success) {
          setStats(res.stats)
        }
      } catch (error) {
        console.log('Erreur stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
    const unsubscribe = navigation.addListener('focus', loadStats)
    return unsubscribe;
  }, [navigation])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    )
  }

  if (!stats) {
    return (
      <View style={styles.loader}>
        <AppText text="Impossible de charger les statistiques" />
      </View>
    )
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
        <Card style={styles.card}>
          <AppText text="Total des étudiants inscrits" style={styles.cardTitle} />
          <AppText 
            text={stats.global.total_etudiants} 
            style={styles.cardValueTotal} 
          />
        </Card>

        {/* Garçons / Filles */}
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.cardStudent}>
            <View style={styles.row}>
              <Ionicons name="male-outline" size={28} color="#2E86C1" />
              <AppText text="Garçons" style={styles.cardTitle} />
            </View>
            <AppText 
              text={stats.global.total_hommes} 
              style={styles.cardValueGarcon} 
            />
          </View>

          <View style={styles.cardStudent}>
            <View style={styles.row}>
              <Ionicons name="female-outline" size={28} color="#9B59B6" />
              <AppText text="Filles" style={styles.cardTitle} />
            </View>
            <AppText 
              text={stats.global.total_femmes} 
              style={styles.cardValueFille} 
            />
          </View>
        </Card>

        {/* Top Filières */}
        <Card style={styles.card}>
          <AppText text="Top 5 des Filières" style={styles.cardTitle} />
        </Card>
        {stats.par_filiere.map((filiere, idx) => (
          <Card key={idx} style={styles.card}>
            <AppText 
              text={`${filiere.filiere.trim()} : ${filiere.total}`} 
              style={styles.cardSub} 
            />
          </Card>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardScreen

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
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardStudent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardValueTotal: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  cardValueGarcon: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#26db96',
    textAlign: 'center',
  },
  cardValueFille: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#b726db',
    textAlign: 'center',
  },
  cardSub: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
})
