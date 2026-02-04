import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({route}) {
  const { user } = route.params || {};
  console.log("DrawerNavigator user:", user);
  console.log("Utilisateur dans DrawerNavigator:", user);
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} initialParams={{ user }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ user }} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})