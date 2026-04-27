// Required imports
import { View, StyleSheet, Platform } from 'react-native';
import SettingsComponent from '@/components/settings';
import { Stack } from 'expo-router';


// page layout
export default function Settings() {
  return (
  // code to ensure that the page content doesn't fall under the nav bar
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SettingsComponent />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});