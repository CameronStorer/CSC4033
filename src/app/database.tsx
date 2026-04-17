/*////////////////////////////////////////////////////////////////////////
DATABASE VIEW PAGE
  - A sleek, decoupled, data-driven view of our Supabase database.
  - To add/modify a table, edit the DATABASE_CONFIG object at the top.
*/////////////////////////////////////////////////////////////////////////

// TabTwoScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { styles } from '@/components/db/admin_panel_styles'; 
import { DATABASE_CONFIG, fetchTableData, deleteRow } from '@/db/db-react-logic';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const activeConfig = DATABASE_CONFIG.users;

  const loadData = async () => {
    try {
      const result = await fetchTableData(activeConfig.table);
      setData(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);
  
  // page contents
  return (
  // code to ensure that the page content doesn't fall under the nav bar
  <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a0f',
      paddingTop: Platform.OS === 'web' ? 80 : 0}} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>{activeConfig.label}</Text>
        
        <View style={styles.tableCard}>
          <ScrollView horizontal>
            <View>
              {/* Header Row */}
              <View style={styles.colHeaderRow}>
                {/* {activeConfig.showColumns.map((col: keyof typeof activeConfig.widths) => (
                <Text key={col} style={[styles.dataCell, { width: activeConfig.widths[col] || 140 }]}>{String(item[col] ?? '—')}</Text>
              ))} */}
              </View>
              
              {/* Data Rows */}
              {loading ? <ActivityIndicator style={{marginTop: 20}} /> : 
                
                // Ensure you have (item) right here:
                data.map((item, idx) => ( 
                  <View key={item.id} style={styles.dataRow}>
                    {activeConfig.showColumns.map((col) => {
                      const columnKey = col as string;
                      return (
                        <Text 
                          key={columnKey} 
                          style={[styles.dataCell, { width: (activeConfig.widths as any)[columnKey] || 140 }]}
                        >
                          {/* Now 'item' is defined and can be accessed here */}
                          {String(item[columnKey] ?? '—')}
                        </Text>
                      );
                    })}
                  </View>
                ))
                
                }
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}