import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { View, Text, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useAuth } from '@/components/auth-context';
import UserMarker from '@/components/user-marker';
import { useAppTheme } from '@/contexts/theme-context';
import { darkMapStyle } from '@/constants/map-styles';
import { SlideScreen } from '@/components/slide-screen';
import { makeStyles } from './_styles';

export default function Map() {
  const { colors: C, resolved } = useAppTheme();
  const styles = useMemo(() => makeStyles(C), [resolved]);

  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const mapRef = useRef<MapView>(null);
  const { profile } = useAuth();

  const initials = profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) ?? '?';

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    async function setupLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setPermissionGranted(false);
        return;
      }

      setPermissionGranted(true);

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(currentLocation);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (updatedLocation) => {
          setUserLocation(updatedLocation);
        }
      );
    }

    setupLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  if (permissionGranted === null || (permissionGranted === true && userLocation === null)) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', gap: 12, backgroundColor: C.bg }]}>
        <ActivityIndicator size="large" color={C.accent} />
        <Text style={{ color: C.text }}>Getting your location...</Text>
      </View>
    );
  }

  if (permissionGranted === false) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24, backgroundColor: C.bg }]}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: C.text }}>Location access is required to use the map.</Text>
        <Text style={{ textAlign: 'center', color: C.textSecondary }}>Please enable it in your device settings.</Text>
        <TouchableOpacity
          onPress={() => Linking.openSettings()}
          style={{ marginTop: 8, backgroundColor: C.mapOpenSettingsBtn, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ fontWeight: '600' }}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SlideScreen index={0}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          userInterfaceStyle={resolved}
          customMapStyle={resolved === 'dark' ? darkMapStyle : []}
          initialRegion={{
            latitude: userLocation!.coords.latitude,
            longitude: userLocation!.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <UserMarker
            coordinate={{
              latitude: userLocation!.coords.latitude,
              longitude: userLocation!.coords.longitude,
            }}
            avatarUrl={profile?.avatar_url ?? null}
            initials={initials}
          />
        </MapView>
      </View>
    </SlideScreen>
  );
}
