
import {  StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppHeader from './src/components/AppHeader';
import StudifyLogo from './src/components/StudifyLogo';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}> 
        <AppNavigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
});

export default App;
