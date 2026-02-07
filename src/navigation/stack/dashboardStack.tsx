import { createStackNavigator } from "@react-navigation/stack"
import DashboardScreen from "../../screens/DashboardScreen"
import AddForm from "../../screens/student/AddStudentForm"
import StudentListScreen from "../../screens/student/StudentListScreen"
import EditProfileScreen from "../../screens/profile/EditProfileScreen"


const Stack=createStackNavigator()
export default function DashboardStack(){
    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Dashboard" component={DashboardScreen}/>
                <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
                <Stack.Screen name="Add" component={AddForm}/>
                <Stack.Screen name="Student" component={StudentListScreen}/>
            </Stack.Navigator>
        
    )
}
    