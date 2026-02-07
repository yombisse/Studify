import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader'
import Card from '../components/Card'
import AppText from '../components/AppText'
import { PieChart } from 'react-native-gifted-charts'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchStats } from '../api/studentService'

const StatScreen = ({ navigation }) => {
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
    return unsubscribe
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

  // Préparer le graphique hommes / femmes
  const genderData = [
    { value: parseInt(stats.global.total_hommes), color: '#4A90E2', text: 'Garçons' },
    { value: parseInt(stats.global.total_femmes), color: '#9B59B6', text: 'Filles' },
  ]

  return (
    <View style={styles.container}>
      <AppHeader 
        title="Statistiques essentielles" 
        leftIcon="arrow-back" 
        onLeftPress={() => navigation.goBack()} 
      />

      <ScrollView contentContainerStyle={styles.cardGroup}>
        {/* Global Stats */}
        <Card style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="people-outline" size={24} color="#4A90E2" />
            <AppText text="Total Étudiants" style={styles.cardTitle} />
          </View>
          <AppText text={stats.global.total_etudiants.toString()} style={styles.cardValue} />
          <AppText text={`Âge moyen : ${parseFloat(stats.global.age_moyen).toFixed(1)} ans`} style={styles.cardSub} />
        </Card>

        {/* Graphique Hommes / Femmes */}
        <Card style={styles.card}>
          <AppText text="Répartition par Genre" style={styles.cardTitle} />
          <PieChart
            data={genderData}
            donut
            showText
            textColor="#000"
            radius={90}
            innerRadius={50}
            textSize={16}
          />
        </Card>
      </ScrollView>
    </View>
  )
}

export default StatScreen

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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 6,
  },
  cardSub: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
})
