// Required imports
import { View, StyleSheet, Platform } from 'react-native';
import DatabaseComponent from '@/components/database';
import { Stack } from 'expo-router';


// page layout
export default function Database() {
  return (
  // code to ensure that the page content doesn't fall under the nav bar
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <DatabaseComponent />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});