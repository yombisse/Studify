import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-reanimated-carousel';
import AppHeader from '../components/AppHeader'
import AppAvatar from '../components/Avatar'
import AppText from '../components/AppText'
import AppButton from '../components/AppButton'
import { Divider } from 'react-native-paper'
import Card from '../components/Card'
import { formatDateTime } from '../utils/util';


const StudentDetailScreen = ({ route, navigation }) => {
  const carouselRef = useRef(null);
  const { students, initialIndex } = route.params;
  const  width = Dimensions.get('window').width;
  const  height = Dimensions.get('window').height;
  const [currentIndex, setCurrentIndex] =useState(initialIndex);

 const renderItem = ({ item }) => {
  return (
    <View style={styles.Item}>
      <Card style={styles.infoCard}>
        
        {/* Zone fixe */}
        <View style={styles.profileinfo}>
          <AppAvatar image={item.profile_url} size={145} style={styles.avatar}/>
          <AppText text={`${item.nom} ${item.prenom}`} style={styles.profileValue} />
        </View>
        <Divider style={styles.divider} bold />

        {/* Zone scrollable */}
        <ScrollView 
          style={styles.scrollArea}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.infoRow}>
            <AppText text="Sexe" style={styles.infoLabel} />
            <AppText text={item.sexe} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Adresse" style={styles.infoLabel} />
            <AppText text={item.adresse} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Téléphone" style={styles.infoLabel} />
            <AppText text={item.telephone} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Email" style={styles.infoLabel} />
            <AppText text={item.email} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Âge" style={styles.infoLabel} />
            <AppText text={item.age} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Filière" style={styles.infoLabel} />
            <AppText text={item.filiere} style={styles.infoValue} />
          </View>
          <Divider style={styles.divider} bold />

          <View style={styles.infoRow}>
            <AppText text="Inscrit le" style={styles.infoLabel} />
            <AppText text={formatDateTime(item.created_at)} style={styles.infoValue} />
          </View>
        </ScrollView>
      </Card>

      {/* Boutons navigation */}
      <View style={styles.navButtons}>
        <AppButton text="Précédent" onPress={() => carouselRef.current?.scrollTo({ index: currentIndex - 1 })}/>
        <AppButton text="Suivant" onPress={() => carouselRef.current?.scrollTo({ index: currentIndex + 1 })}/>
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Détail"
        style={styles.header}
        titleStyle={styles.headerTitle}
        onLeftPress={() => navigation.goBack()}
      />


  <Carousel
    ref={carouselRef}
    loop
    width={width}
    height={height * 0.9}
    data={students}
    defaultIndex={initialIndex}
    scrollAnimationDuration={1000}
    renderItem={renderItem}
    onSnapToItem={(index) => setCurrentIndex(index)} // callback
  />
      
      
    </View>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({

  container: {
    flex:1,
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

  // Profile cardprofileLabel
  profileinfo: {

  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

  avatar: {
    width:150,
    height:150,
    borderRadius:75,
    borderWidth: 1,
    borderColor: '#cfeaff',
    backgroundColor: '#E8F4FF',
  },
  
  profileValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    flexShrink:1,
    flexWrap:'wrap',
    textAlign:'center',
    
  },

  // Info fields
  infoCard: {
    width:'90%',
    maxHeight: '80%',
    margin:15,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6eefb',
    paddingHorizontal: 10,
    elevation:2
    
  },
  infoRow: {
    marginHorizontal: 8,
    backgroundColor:'#fff',
    width:'90%',
    flexDirection:'row',
  },
    scrollArea: {
      maxHeight: Dimensions.get('window').height * 0.5, // moitié de l’écran
    },
    navButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flexShrink:1,
    flexWrap:'wrap',
    alignSelf:'center'
    

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
