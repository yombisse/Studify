import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen";
import StudentListScreen from "../screens/StudentListScreen";
import AddForm from "../forms/AddForm";
import StudentDetailScreen from "../screens/StudentDetailScreen";
import SignInScreen from "../screens/SignInScreen";



const Stack=createStackNavigator()

export default function StackScreen(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="Home" component={StudentListScreen}/>
                <Stack.Screen name="Add" component={AddForm}/>
                <Stack.Screen name="Detail" component={StudentDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

