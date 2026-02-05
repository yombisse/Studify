import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { DashboardStack, StatStack, StudentStack } from './StackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab=createBottomTabNavigator();

const BottomTabNavigator = ({route}) => {
  const { user } = route.params || {};
  console.log("Utilisateur dans BottomTabNavigator:", user);
  return (
    
        <Tab.Navigator 
        screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
          if (route.name==='Dashboard'){
            iconName=focused? 'home' : 'home-outline';
          }
          
          else if(route.name==='Students'){
            iconName=focused? 'people' : 'people-outline';
          }
          
          else if(route.name==='Stats'){
            iconName= focused? 'stats-chart' : 'stats-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#111827',
        headerShown:false,
        tabBarHideOnKeyboard:true,
        tabBarStyle: { backgroundColor: '#1E88E5' }
      })
    }>
            <Tab.Screen name='Dashboard' component={DashboardStack} initialParams={{ user }}/>
            <Tab.Screen name='Students' component={StudentStack} initialParams={{ user }}/>
            <Tab.Screen name='Stats' component={StatStack} initialParams={{ user }}/>
        </Tab.Navigator>
    
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})