import { View, StyleSheet } from 'react-native';
import MapComponent from '@/components/MapComponent';
import { Stack } from 'expo-router';

export default function Map() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});