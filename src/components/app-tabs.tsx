import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
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
        <Label>Login</Label>
        <Icon src={require('@/assets/images/home-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Icon src={require('@/assets/images/map-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="database">
        <Label>Database</Label>
        <Icon src={require('@/assets/images/database-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon src={require('@/assets/images/settings-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon src={require('@/assets/images/profile-icon.png')} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}