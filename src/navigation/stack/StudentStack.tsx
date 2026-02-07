import { createStackNavigator } from "@react-navigation/stack";
import AddForm from "../../screens/student/AddStudentForm";
import StudentListScreen from "../../screens/student/StudentListScreen";
import StudentDetailScreen from "../../screens/student/StudentDetailScreen";


const Stack=createStackNavigator()

export  function StudentStack({route}){
    const { user } = route.params || {};
    console.log("User in StudentStack:", user);

    return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Student" component={StudentListScreen} initialParams={{ user }}/>
                <Stack.Screen name="Add" component={AddForm} initialParams={{ user }}/>
                <Stack.Screen name="Detail" component={StudentDetailScreen} initialParams={{ user }}/>
            </Stack.Navigator>
        
    )
}
