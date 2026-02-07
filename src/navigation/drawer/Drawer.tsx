import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './customDrawer';
import BottomTabNavigator from '../tab/BottomTabNavigator';
import ProfileStack from '../stack/profileStack';

const drawer = createDrawerNavigator();

export default function Drawer({route}) {
  const { user } = route.params || {};
  console.log("DrawerNavigator user:", user);
  console.log("Utilisateur dans DrawerNavigator:", user);
  return (
    <drawer.Navigator screenOptions={{headerShown:false}} drawerContent={(props) => <CustomDrawerContent{...props} />}>
      <drawer.Screen name="Home" component={BottomTabNavigator} initialParams={{ user }} />
      <drawer.Screen name="Profile" component={ProfileStack} initialParams={{ user }} />
    </drawer.Navigator>
  )
}
