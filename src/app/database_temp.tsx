// // Database example page: Cameron
// ///////////////////////////////////////////////////////////////////////
// // First import required libraries,
// // importantly, the database:
// import { supabase } from '@/db/supabase';
// // other basic react imports
// import React, { useEffect, useState } from 'react';
// import { Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Collapsible } from '@/components/ui/collapsible';
// import { useTheme } from '@/hooks/use-theme';

// ///////// Types /////////////////////////////////////////////////////////

// type Users = {
//   id: string;
//   username: string;
//   email: string;
//   created_at: string;
// };

// type Friendship = {
//   id: string;
//   user_id_1: string;
//   user_id_2: string;
//   status: string;
// };

// type Block = {
//   id: string;
//   blocker_id: string;
//   blocked_id: string;
// };

// /////// Component /////////////////////////////////////////////////////////

// export default function TabTwoScreen() {
//   const safeAreaInsets = useSafeAreaInsets();
//   const insets = {
//     ...safeAreaInsets,
//     bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
//   };
//   const theme = useTheme();
//   const contentPlatformStyle = Platform.select({
//     android: {
//       paddingTop: insets.top,
//       paddingLeft: insets.left,
//       paddingRight: insets.right,
//       paddingBottom: insets.bottom,
//     },
//     web: {
//       paddingTop: Spacing.six,
//       paddingBottom: Spacing.four,
//     },
//   });

//   ////// State /////////////////////////////////////////////////////////

//   const [users, setUsers] = useState<any[]>([])
//   const [friendships, setFriendships] = useState<any[]>([])
//   const [blocks, setBlocks] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null);

//   ///// Fetch All Tables ////////////////////////////////////////////////


//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true)
//       const [usersRes, friendsRes, blocksRes] = await Promise.all([
//         supabase.from('users').select('*'),
//         supabase.from('friendships').select('*'),
//         supabase.from('blocks').select('*'),
//       ])
//       setUsers(usersRes.data ?? [])
//       setFriendships(friendsRes.data ?? [])
//       setBlocks(blocksRes.data ?? [])
//       setLoading(false)
//     }
//     fetchAll()
//   }, [])
//   ////// Render /////////////////////////////////////////////////////////



// /////// Styles /////////////////////////////////////////////////////////

// const styles = StyleSheet.create({
//   scrollView: { flex: 1 },
//   contentContainer: { flexDirection: 'row', justifyContent: 'center' },
//   container: { maxWidth: MaxContentWidth, flexGrow: 1 },
//   titleContainer: {
//     gap: Spacing.three,
//     alignItems: 'center',
//     paddingHorizontal: Spacing.four,
//     paddingVertical: Spacing.six,
//   },
//   centerText: { textAlign: 'center' },
//   sectionsWrapper: {
//     gap: Spacing.five,
//     paddingHorizontal: Spacing.four,
//     paddingTop: Spacing.three,
//   },
//   collapsibleContent: { alignItems: 'flex-start', gap: Spacing.two, padding: Spacing.two },
//   row: {
//     paddingVertical: Spacing.two,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     width: '100%',
//   },
//   rowTitle: { fontWeight: '600', fontSize: 14 },
//   rowSub: { fontSize: 12, color: '#666', marginTop: 2 },
//   status: { textAlign: 'center', padding: Spacing.three, color: '#888' },
//   error: { textAlign: 'center', padding: Spacing.three, color: 'red' },
// });
// }