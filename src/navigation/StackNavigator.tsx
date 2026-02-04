import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen";
import StudentListScreen from "../screens/StudentListScreen";
import AddForm from "../forms/AddForm";
import StudentDetailScreen from "../screens/StudentDetailScreen";
import SignInScreen from "../screens/SignInScreen";
import DashboardScreen from "../screens/DashboardScreen";
import StatScreen from "../screens/StatScreen";



const Stack=createStackNavigator()

export  function StudentStack({route}){
    const { user } = route.params || {};
    console.log("User in StudentStack:", user);

    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={StudentListScreen} initialParams={{ user }}/>
                <Stack.Screen name="Add" component={AddForm} initialParams={{ user }}/>
                <Stack.Screen name="Detail" component={StudentDetailScreen} initialParams={{ user }}/>
            </Stack.Navigator>
        
    )
}

export  function DashboardStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Dashboard" component={DashboardScreen}/>
            </Stack.Navigator>
        
    )
}

export  function StatStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Stats" component={StatScreen}/>
            </Stack.Navigator>
        
    )
}
export  function WelcomeStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
            </Stack.Navigator>
        
    )
}

