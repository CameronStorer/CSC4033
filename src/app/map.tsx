// Required imports
import { View, StyleSheet, Platform } from 'react-native';
import MapComponent from '@/components/MapComponent';
import { Stack } from 'expo-router';

// page layout
export default function Map() {
  return (
  // code to ensure that the page content doesn't fall under the nav bar
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapComponent />
    </View>
  );
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});