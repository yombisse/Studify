import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { logoutUser } from '../api/authService'; // ta fonction logout
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutHandler} from '../utils/logoutHandler'; // fonction de déconnexion centralisée
import { ProfileStack } from './StackNavigator';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Tableau de bord"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profil"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Déconnexion"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" size={size} color="#D32F2F" />
        )}
        onPress={() => logoutHandler(navigation)}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator({route}) {
  const { user } = route.params || {};
  console.log("DrawerNavigator user:", user);
  console.log("Utilisateur dans DrawerNavigator:", user);
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} initialParams={{ user }} />
      <Drawer.Screen name="Profile" component={ProfileStack} initialParams={{ user }} />
    </Drawer.Navigator>
  )
}
