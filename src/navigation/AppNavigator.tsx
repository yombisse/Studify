import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { WelcomeStack } from "./StackNavigator";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeStack} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
