// default file that expo will grab for the import in map.tsx
// if you are using Expo Go/are on mobile
import React, { useMemo, useState } from 'react';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import { 
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList, } from 'react-native';
import { currentUser, friends, UserLocation } from '@/data/mockLocations';
import { getDistanceMeters, formatDistance } from '@/utils/distance';
import * as Location from 'expo-location';
import { searchUserByUserName, sendFriendRequest } from '@/services/friendService';
import type { UserLocation as FriendSearchUser } from '@/types/friend';

export default function MapComponent() {

  // the current selected friend, then use the function, base on select state
  const[selectedFriend, setSelectedFriend] = useState< UserLocation| null>(null); // null default
  const[selectedPlaceName, setSelectedPlaceName] = useState<string>('Loading location...');

    // add friend modal states
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<FriendSearchUser[]>([]);
  const [requestedIds, setRequestedIds] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // replace this with your real logged-in user id later if needed
 const currentUserId = Number(currentUser.id ?? 1);

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

  /// function for Handling for Search Bar - add friend 
  async function handleSearchChange(text: string) {
    setSearchText(text);

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const users = await searchUserByUserName(text);

      // do not show yourself in search result
      const filteredUsers = users.filter((user) => user.id !== currentUserId);
      setSearchResults(filteredUsers);
    } catch (error) {
        console.log('search users error:', error);
      setSearchResults([]);
    } finally {
        setIsSearching(false);
    }
  }

  async function handleAddFriend(targetUserId: number) {
    const isRequested = requestedIds.includes(targetUserId);

    if (isRequested) {
      setRequestedIds((prev) => prev.filter((id) => id !== targetUserId));
      return;
    }

    setRequestedIds((prev) => [...prev, targetUserId]);

    try {
      await sendFriendRequest(currentUserId, targetUserId);
    } catch (error) {
      console.log('send friend request error:', error);

      // rollback if request failed
      setRequestedIds((prev) => prev.filter((id) => id !== targetUserId));
    }
  }

  function closeSearchModal() {
    setSearchModalVisible(false);
    setSearchText('');
    setSearchResults([]);
    setIsSearching(false);
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

        {friends.map((friend) => (
          <Marker
            key={friend.id}
            coordinate={{
              latitude: friend.latitude,
              longitude: friend.longitude,
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
                <Text>
                  Distance: {distanceText || formatDistance(getDistanceMeters(currentUser, friend))}
                </Text>
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

      {/* add friend button */}
      <TouchableOpacity
        style={styles.addFriendCircle}
        onPress={() => setSearchModalVisible(true)}
      >
        <Text style={styles.circleButtonText}>+</Text>
      </TouchableOpacity>

      {/* notification bell UI only for now */}
      <TouchableOpacity style={styles.bellCircle}>
        <Text style={styles.circleButtonText}>🔔</Text>
      </TouchableOpacity>

      {/* search modal */}
      <Modal
        visible={searchModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeSearchModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.searchHeader}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search username..."
                value={searchText}
                onChangeText={handleSearchChange}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={closeSearchModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {isSearching ? <Text style={styles.searchInfoText}>Searching...</Text> : null}

            {!isSearching && searchText.trim() && searchResults.length === 0 ? (
              <Text style={styles.searchInfoText}>No users found</Text>
            ) : null}

            <FlatList
              data={searchResults}
              extraData={requestedIds}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const isRequested = requestedIds.includes(item.id);

                return (
                  <View style={styles.resultRow}>
                    <View style={styles.resultTextBox}>
                      <Text style={styles.resultName}>
                        {item.full_name || item.username}
                      </Text>
                      <Text style={styles.resultUsername}>@{item.username}</Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        isRequested && styles.requestedButton,
                      ]}
                      onPress={() => handleAddFriend(item.id)}
                    >
                      <Text style={styles.addButtonText}>
                        {isRequested ? 'Requested' : 'Add Friend'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#80e0db',
    padding: 16,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 6,
    color: 'white',
  },

  addFriendCircle: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#4da6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellCircle: {
    position: 'absolute',
    top: 135,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#75d1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    paddingTop: 110,
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 16,
    maxHeight: '70%',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginRight: 10,
    backgroundColor: '#fafafa',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  searchInfoText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 12,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultTextBox: {
    flex: 1,
    marginRight: 10,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultUsername: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#4da6ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  requestedButton: {
    backgroundColor: '#9e9e9e',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});