import { createClient, processLock } from '@supabase/supabase-js'
import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://api.latechsmp.net'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc1ODY2NzYzLCJleHAiOjE5MzM1NDY3NjN9.jzCAiod983BBI34dpNoT4CegqRf5AN4kBCPJvNLtOM4'


// To import and use the supabase database system anywhere in the app,
// add this command to the boilerplate:
// import { supabase } from '@/db/supabase'


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
    lock: processLock,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}

/*
set up login component
-creates and exports your Supabase client
-uses AsyncStorage on mobile to keep the login session saved
-enables token auto-refresh
-starts/stops refresh based on whether the app is active on mobile
*/