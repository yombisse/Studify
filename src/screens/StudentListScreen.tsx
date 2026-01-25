import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import FormInput from '../components/AppInput';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import AppText from '../components/AppText';
import AppAvatar from '../components/Avatar';
import AppButton from '../components/AppButton';

export default function StudentListScreen({navigation}) {
    const [search,setSearch]=useState('');
    const data=[
        {
            "id":1,
            "name":"FANDIE",
            "firstname":"Michel",
            "age":23,
            "telephone":"06913191",
        },
        {
            "id":2,
            "name":"Ayoro",
            "firstname":"Michel",
            "age":23,
            "telephone":"06913191",
        },
        {
            "id":3,
            "name":"FANDIE",
            "firstname":"Bekouena",
            "age":25,
            "telephone":"76913191",
        },
        {
            "id":4,
            "name":"FANDIE",
            "firstname":"Michel",
            "age":23,
            "telephone":"06913191",
        },
        {
            "id":5,
            "name":"Ayoro",
            "firstname":"Michel",
            "age":23,
            "telephone":"06913191",
        },
        {
            "id":6,
            "name":"FANDIE",
            "firstname":"Bekouena",
            "age":25,
            "telephone":"76913191",
        },
    ]
    const renderItem=({item,index})=>{
        return(
            <TouchableOpacity 
              style={styles.studentCard}
              onPress={()=>navigation.navigate('Detail',{ students: data, "initialIndex": index })}
              >
                
                <View style={styles.StudentRow}>
                  <View style={styles.studentInfo}>
                    <AppAvatar initials={"FM"} style={styles.avatar} />
                    <AppText text={item.name} style={styles.studentName}/>
                    <AppText text={item.firstname} style={styles.studentfirstName} numberOfLines={1} ellipsizeMode={'tail'}/>
                  </View>
                    <Ionicons name="chevron-forward" fontSize={22} style={styles.arrow}/>
                </View>
                <View style={styles.studentMeta}>
                    <AppText text={item.age +' '+'ans'} style={styles.studentSubInfo}/>
                    <AppText text={item.telephone} style={styles.studentSubInfo}/>
                </View>
            </TouchableOpacity>
        );
    }
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <AppHeader leftIcon='arrow-back' onLeftPress={()=>navigation.goBack()} title={"Etudiants"} style={styles.header} titleStyle={styles.headerTitle}/>
        </View>
        <FormInput icon="search" value={search} onChangeText={(text)=>setSearch(text)} placeholder={"Rechercher un etudiant"} containerStyle={styles.searchBar} inputStyle={styles.input} />
        <FlatList
          contentContainerStyle={{paddingVertical:16}} 
            data={data}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={renderItem}
            />
        <AppButton style={styles.fab} onPress={() => navigation.navigate('Add')}
        >
          <Ionicons name="add-circle" size={60} color="#1E88E5" />
        </AppButton>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },

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

  headerAddBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerAddText: {
    color: '#ffffff',
    fontSize: 40,
  },

  searchBar: {
    margin:10,
    
    
  },
  input:{
    borderWidth:1,
    borderRadius:100,
  },

  searchText: {
    fontSize: 22,
    color: '#6b7280',
  },

  studentCard: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal:10,
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E88E5',
  },
  StudentRow:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
  },

  studentInfo: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    
  },
  studentSubInfo:{
    fontSize:16,
    marginHorizontal:10,
  },

  studentName: {
    fontSize: 20,
    color: '#334155',
    fontWeight:'bold',

    
  },
  studentfirstName: {
    fontSize: 20,
    color: '#334155',
    marginHorizontal:2,
    fontWeight:'bold',
    flexShrink:1,
    
  },

  studentMeta: {
    fontSize: 22,
    color: '#6b7280',
    marginTop: -30,
    marginLeft:100,
    flexDirection:'row',
  },

  arrow: {
    fontSize: 36,
    color: '#9AA9C9',
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fabText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
});
