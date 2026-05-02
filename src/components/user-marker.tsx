import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { Marker } from 'react-native-maps';

export type UserMarkerProps = {
    coordinate: { 
        latitude: number; longitude: number 
    };
    avatarUrl: string | null; // subject to change, depends on how supabase image caching works out
};

export default function UserMarker({ coordinate, avatarUrl }: UserMarkerProps) {
    return (
        <Marker
            coordinate={coordinate}
            anchor={{ x: 0.5, y: 1 }}
            tracksViewChanges={true}
        >
            <View style={styles.pin}>
                <View style={styles.avatarCircle}>
                    <Image
                        source={ avatarUrl ? { uri: avatarUrl } : require('@/assets/images/default-avatar.png') }
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.point} />
            </View>
        </Marker>
    );
}

const styles = StyleSheet.create({
    pin: {
        alignItems: 'center',
    },
    avatarCircle: {
        width: 30,
        height: 30,
        borderRadius: 21,
        borderWidth: 3,
        borderColor: '#154bfb',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    avatar: {
        width: 24,
        height: 25,
        borderRadius: 21,
    },
    point: {
        width: 0,
        height: 0,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#15fbef',
    },
});