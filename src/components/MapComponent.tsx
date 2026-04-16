// default file that expo will grab for the import in map.tsx
// if you are using Expo Go/are on mobile

import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

export default function MapComponent() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 40.7128,
        longitude: -74.0060,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
