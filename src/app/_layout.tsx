import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { Colors } from '@/constants/theme';


export default function RootLayout() {

  const colorScheme = useColorScheme();
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
          <NativeTabs
            backgroundColor={colors.background}
            indicatorColor={colors.backgroundElement}
            labelStyle={{ selected: { color: colors.text } }}>
            <NativeTabs.Trigger name="login/index">
              <Label>Login</Label>
              <Icon src={require('@/assets/images/home-icon.png')} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="map/index">
              <Label>Map</Label>
              <Icon src={require('@/assets/images/map-icon.png')} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="database/index">
              <Label>Database</Label>
              <Icon src={require('@/assets/images/database-icon.png')} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings/index">
              <Label>Settings</Label>
              <Icon src={require('@/assets/images/settings-icon.png')} />
            </NativeTabs.Trigger>{/* 
            <NativeTabs.Trigger name="profile">
              <Label>Profile</Label>
              <Icon src={require('@/assets/images/profile-icon.png')} />
            </NativeTabs.Trigger> */}
          </NativeTabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}