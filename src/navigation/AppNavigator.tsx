import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStack } from "./stack/MainStack";
import Drawer from "./drawer/Drawer";

const Stack = createStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={MainStack} />
          <Stack.Screen name="Home" component={Drawer} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
