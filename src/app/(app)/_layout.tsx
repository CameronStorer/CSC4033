import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export default function AppLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  // navigation bar initialization upon entering (app)/
  // `NativeTabs.Trigger`is a button to expo router that goes to that
  // referenced page in the 'name' prop
  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="map/index">
        <Label>Map</Label>
        <Icon src={require('@/assets/images/map-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings/index">
        <Label>Settings</Label>
        <Icon src={require('@/assets/images/settings-icon.png')} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile/index">
        <Label>Profile</Label>
        <Icon src={require('@/assets/images/profile-icon.png')} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
