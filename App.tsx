
import {  StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppHeader from './src/components/AppHeader';
import StudifyLogo from './src/components/StudifyLogo';
import StackScreen from './src/navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}> 
        <StackScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
