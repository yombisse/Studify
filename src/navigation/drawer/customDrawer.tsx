import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutHandler} from '../../utils/logoutHandler'; 

export default function CustomDrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Tableau de bord"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profil"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        )}
        onPress={() => navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Déconnexion"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" size={size} color="#D32F2F" />
        )}
        onPress={() => logoutHandler(navigation)}
      />
    </DrawerContentScrollView>
  );
}