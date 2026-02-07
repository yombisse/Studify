import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import EditProfileScreen from "../../screens/profile/EditProfileScreen";
import UpdatePasswordScreen from "../../screens/profile/EditPasswordScreen";


const Stack=createStackNavigator()
export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={UpdatePasswordScreen} />
    </Stack.Navigator>
  );
}