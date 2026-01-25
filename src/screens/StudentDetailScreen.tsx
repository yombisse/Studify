import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../components/AppHeader'
import AppAvatar from '../components/Avatar'
import AppText from '../components/AppText'
import AppButton from '../components/AppButton'
import { Divider } from 'react-native-paper'
import Card from '../components/Card'


const StudentDetailScreen = ({ route, navigation }) => {
  const { students, initialIndex } = route.params;
  const { width } = Dimensions.get('window');

 const renderItem = ({ item }) => {
  return (
    <View style={styles.Item}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <AppAvatar initials="FM" size={80} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <AppText text={item.name} style={styles.profileName} />
          <AppText text={item.firstname} style={styles.profileValue} />
          <AppText text={`Inscrit le ${item.registeredAt}`} style={styles.profileLabel} />
        </View>
      </View>

      {/* Info Fields */}
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <AppText text="Age" style={styles.infoLabel} />
          <AppText text={item.age} style={styles.infoValue} />
        </View>
        <Divider style={styles.divider} bold />

        <View style={styles.infoRow}>
          <AppText text="Téléphone" style={styles.infoLabel} />
          <AppText text={item.telephone} style={styles.infoValue} />
        </View>
        <Divider style={styles.divider} bold />

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <AppButton
            text="Modifier"
            style={styles.btnModifier}
            textStyle={styles.btnModifierText}
          />
          <AppButton
            text="Supprimer"
            style={styles.btnSupprimer}
            textStyle={styles.btnSupprimerText}
          />
        </View>
      </Card>
    </View>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Détail"
        style={styles.header}
        titleStyle={styles.headerTitle}
        onLeftPress={() => navigation.goBack()}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={students}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={renderItem}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ( { length: width, offset: width * index, index } )}
        
        />
      
    </SafeAreaView>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
    justifyContent:'center',
    alignItems:'center'
  },

  Item:{
     
     
    },


  // Header
  header: {
    height: 100,
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },

  // Profile card
  profileCard: {
  marginHorizontal: 16,
  marginVertical: 10,
  borderRadius: 16,
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#e6eefb',
  padding: 16,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

  avatar: {
    borderWidth: 1,
    borderColor: '#cfeaff',
    backgroundColor: '#E8F4FF',
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0B59A7',
  },
  profileLabel: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 6,
  },
  profileValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },

  // Info fields
  infoCard: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 10,
    alignSelf:'center'
  },
  infoRow: {
    flexDirection:'row',
    height: 50,
    marginHorizontal: 8,
    alignItems:'center',
    

    
  },
  divider: { 
  height: 1, 
  backgroundColor: '#E5E7EB', // gris clair neutre 
  marginVertical: 12, 
  opacity: 0.8, 
},

  infoLabel: {
    fontSize: 18,
    color: '#6b7280',
    marginRight:5,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },

  // Action buttons
  actionRow: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:10,
    backgroundColor:'#FFF'
  },
  
  btnModifier: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#1E88E5',
    width:140,
    height:60,
    marginRight:10,
  },
  btnModifierText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E88E5',
  },
  btnSupprimer: {
    backgroundColor: '#FFF',
    borderWidth:2,
    borderColor:"#D32F2F",
    width:140,
    height:60
  },
  btnSupprimerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D32F2F',
  },
});
