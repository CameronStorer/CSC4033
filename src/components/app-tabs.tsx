import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
        
      <NativeTabs.Trigger name="login">
        <NativeTabs.Trigger.Label>Login</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/home-icon.png')}
          renderingMode="template"
        />
        </NativeTabs.Trigger>
          <NativeTabs.Trigger name="map">
            <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              src={require('@/assets/images/map-icon.png')}
              renderingMode="template"
        />
      </NativeTabs.Trigger>
          <NativeTabs.Trigger name="database">
            <NativeTabs.Trigger.Label>Database</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              src={require('@/assets/images/database-icon.png')}
              renderingMode="template"
        />
        </NativeTabs.Trigger>
          <NativeTabs.Trigger name="settings">
            <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              src={require('@/assets/images/settings-icon.png')}
              renderingMode="template"
        />
        </NativeTabs.Trigger>
          <NativeTabs.Trigger name="profile">
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              src={require('@/assets/images/profile-icon.png')}
              renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
