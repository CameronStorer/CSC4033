// default file that expo will grab for the import in map.tsx
// if you are using Expo Go/are on mobile
import React, { useMemo, useState } from 'react';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { currentUser, friends, UserLocation } from '@/data/mockLocations';
import { getDistanceMeters, formatDistance } from '@/utils/distance';
import * as Location from 'expo-location';

export default function MapComponent() {

  // the current selected friend, then use the function, base on select state
  const[selectedFriend, setSelectedFriend] = useState< UserLocation| null>(null); // null default
  const[selectedPlaceName, setSelectedPlaceName] = useState<string>('Loading location...');

  // useMemo only recompute distance text when selected friend change
  const distanceText = useMemo( () => {
    if (!selectedFriend) return '';
    const meters = getDistanceMeters(currentUser, selectedFriend);
    return formatDistance(meters);
  }, [selectedFriend]); //recompute distance text when we have selected friend

  // function get the name of place, async- get data from server
  async function handleFriendPress(friend: UserLocation){
    setSelectedFriend(friend);
    setSelectedPlaceName('Loading Location...');
    try {
      const results = await Location.reverseGeocodeAsync({
        latitude: friend.latitude,
        longitude: friend.longitude,
      });

      if (results.length > 0) {
        const place = results[0];
        const label =
          [
            place.name,
            place.street,
            place.city,
            place.region,
          ]
            .filter(Boolean)
            .join(', ') || 'Location found';
        setSelectedPlaceName(label);
      } else {
        setSelectedPlaceName('No place name found');
      }
    } catch (error) {
      setSelectedPlaceName('Could not load location name');
      console.log('Reverse geocoding error:', error);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: currentUser.latitude,
            longitude: currentUser.longitude,
          }}
          title={currentUser.name}
          description="Your location"
        /> 
        
        {friends.map( (friend) => (
          <Marker
            key = {friend.id}
            coordinate={{
              latitude: friend.latitude,
              longitude: friend.longitude
            }}
            onPress={() => handleFriendPress(friend)}
          >
            <Callout>
              <View style={styles.calloutBox}>
                <Text style={styles.calloutTitle}>{friend.name}</Text>
                <Text>Friend</Text>
                <Text>
                  Location: {friend.latitude.toFixed(4)}, {friend.longitude.toFixed(4)}
                </Text>
                <Text>Distance: {distanceText || formatDistance(getDistanceMeters(currentUser, friend))}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {selectedFriend && (
          <Polyline
            coordinates={[
              {
                latitude: currentUser.latitude,
                longitude: currentUser.longitude,
              },
              {
                latitude: selectedFriend.latitude,
                longitude: selectedFriend.longitude,
              },
            ]}
            strokeColor="#15fbef"
            strokeWidth={6}
          />
        )}
      </MapView>

      {selectedFriend && (
        <View style={styles.bottomCard}>
          <Text style={styles.cardTitle}>{selectedFriend.name}</Text>
          <Text>Type: Friend</Text>
          <Text>
            Location: {selectedFriend.latitude.toFixed(4)}, {selectedFriend.longitude.toFixed(4)}
          </Text>
          <Text>Hey, I’m at {selectedPlaceName} now !! </Text>
          <Text>Distance: {distanceText}</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutBox: {
    minWidth: 160,
    padding: 4,
  },
  calloutTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  bottomCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 90,
    backgroundColor: "#80e0db",
    padding: 16,
    borderRadius: 16,

  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
    color:"white",
    
  },
});
