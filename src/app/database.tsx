import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, ScrollView, Platform, 
  ActivityIndicator, TouchableOpacity, Alert, Dimensions, Modal, TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { supabase } from '@/components/db/supabase';

// 1. CONFIGURATION
const DATABASE_CONFIG = {
  users: {
    table: 'users',
    label: 'User Management',
    showColumns: ['id', 'username', 'email', 'created_at'],
    widths: { id: 80, username: 120, email: 200, created_at: 150 }
  }
};

const chartConfig = {
  backgroundColor: "#0a0a0f",
  backgroundGradientFrom: "#16161d",
  backgroundGradientTo: "#16161d",
  decimalPlaces: 0, 
  color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

// 2. COMPONENT
export default function TabTwoScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ username: '', email: '' });

  const activeConfig = DATABASE_CONFIG.users;
  const screenWidth = Dimensions.get("window").width;

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from(activeConfig.table)
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setData(result || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!formData.username || !formData.email) return Alert.alert("Required", "Fill all fields");
    
    const action = editingId 
      ? supabase.from(activeConfig.table).update(formData).eq('id', editingId)
      : supabase.from(activeConfig.table).insert([formData]);

    const { error } = await action;
    if (error) Alert.alert("Error", error.message);
    else {
      setModalVisible(false);
      setEditingId(null);
      setFormData({ username: '', email: '' });
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", style: 'destructive', onPress: async () => {
          const { error } = await supabase.from(activeConfig.table).delete().eq('id', id);
          if (!error) loadData();
      }}
    ]);
  };

  const processChartData = () => {
    if (!data || data.length === 0) return { labels: ["None"], datasets: [{ data: [0] }] };
    const counts: { [key: string]: number } = {};
    data.forEach(user => {
      const date = new Date(user.created_at).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
      counts[date] = (counts[date] || 0) + 1;
    });
    const sortedDates = Object.keys(counts).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());
    let total = 0;
    const cumulative = sortedDates.map(d => { total += counts[d]; return total; });
    return { labels: sortedDates.slice(-5), datasets: [{ data: cumulative.slice(-5) }] };
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingId ? 'Edit User' : 'Add User'}</Text>
            <TextInput style={styles.input} placeholder="Username" value={formData.username} onChangeText={t => setFormData({...formData, username: t})} placeholderTextColor="#666" />
            <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={t => setFormData({...formData, email: t})} placeholderTextColor="#666" />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.cancelBtn}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.saveButtonActive} onPress={handleSave}><Text style={styles.saveBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerActionRow}>
          <Text style={styles.pageTitle}>{activeConfig.label}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Add User</Text>
          </TouchableOpacity>
        </View>

        {!loading && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Total User Growth</Text>
            <LineChart data={processChartData()} width={screenWidth - 40} height={180} chartConfig={chartConfig} bezier style={{ borderRadius: 12 }} />
          </View>
        )}

        <View style={styles.tableCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.colHeaderRow}>
                {activeConfig.showColumns.map(col => <Text key={col} style={[styles.headerCell, { width: (activeConfig.widths as any)[col] || 140 }]}>{col.toUpperCase()}</Text>)}
                <Text style={[styles.headerCell, { width: 120 }]}>ACTIONS</Text>
              </View>
              {loading ? <ActivityIndicator style={{ margin: 20 }} /> : data.map(item => (
                <View key={item.id} style={styles.dataRow}>
                  {activeConfig.showColumns.map(col => <Text key={col} style={[styles.dataCell, { width: (activeConfig.widths as any)[col] || 140 }]}>{String(item[col] ?? '—')}</Text>)}
                  <View style={[styles.actionCell, { width: 120 }]}>
                    <TouchableOpacity onPress={() => { setEditingId(item.id); setFormData({username: item.username, email: item.email}); setModalVisible(true); }}><Text style={styles.editBtn}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}><Text style={styles.deleteBtn}>Del</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 3. STYLES
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0a0a0f', paddingTop: Platform.OS === 'web' ? 20 : 0 },
  container: { padding: 20 },
  headerActionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  addButton: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8 },
  chartCard: { marginBottom: 25 },
  chartTitle: { color: '#aaa', marginBottom: 10 },
  tableCard: { backgroundColor: '#16161d', borderRadius: 12, overflow: 'hidden' },
  colHeaderRow: { flexDirection: 'row', backgroundColor: '#1f1f27', paddingVertical: 12 },
  headerCell: { color: '#888', fontWeight: 'bold', paddingHorizontal: 10 },
  dataRow: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
  dataCell: { color: '#eee', paddingHorizontal: 10 },
  actionCell: { flexDirection: 'row', justifyContent: 'space-around' },
  editBtn: { color: '#4dabf7' },
  deleteBtn: { color: '#ff6b6b' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#16161d', padding: 25, borderRadius: 15, width: '85%', maxWidth: 400 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#0a0a0f', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#444' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  cancelBtn: { color: '#aaa', fontWeight: 'bold', marginRight: 20 },
  saveButtonActive: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8 },
  saveBtnText: { color: '#fff', fontWeight: 'bold' }
});