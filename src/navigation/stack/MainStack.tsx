import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../../screens/auth/LoginScreen";
import SignInScreen from "../../screens/auth/SignInScreen";
import WelcomeScreen from "../../screens/WelcomeScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";

const Stack=createStackNavigator()

export  function MainStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="UpdatePassword" component={ForgotPasswordScreen}/>
            </Stack.Navigator>
        
    )
}

