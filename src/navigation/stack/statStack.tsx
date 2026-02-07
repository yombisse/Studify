import { createStackNavigator } from "@react-navigation/stack"
import StatScreen from "../../screens/StatScreen"

const Stack=createStackNavigator()
export default  function StatStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Stats" component={StatScreen}/>
            </Stack.Navigator>
        
    )
}