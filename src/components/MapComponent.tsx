// default file that expo will grab for the import in map.tsx
// if you are using Expo Go/are on mobile

import MapView, {Marker} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { currentUser, friendUser } from '@/data/mockLocations';


export default function MapComponent() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 32.526542,
        longitude: -92.648977,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
        }}
        title={currentUser.name}
        description="Current user"
      />

      <Marker
        coordinate={{
          latitude: friendUser.latitude,
          longitude: friendUser.longitude,
        }}
        title={friendUser.name}
        description="Friend"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
