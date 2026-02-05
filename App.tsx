
import {  StatusBar, StyleSheet} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaView style={styles.container}> 
    <StatusBar 
        barStyle="light-content"         
        backgroundColor="#1E88E5"         
      />
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
