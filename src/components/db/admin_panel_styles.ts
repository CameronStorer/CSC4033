// db-styles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 1000, paddingHorizontal: Spacing.four },
  tableCard: {
    backgroundColor: '#0f0f1a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e1e2e',
    overflow: 'hidden',
  },
  colHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#13131f',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e2e',
  },
  colHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#818cf8',
    textTransform: 'uppercase',
  },
  dataRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#13131f',
    alignItems: 'center',
  },
  dataCell: { fontSize: 13, color: '#94a3b8' },

  pageTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#f1f5f9', 
    letterSpacing: -0.75,
    marginBottom: 4 
  },
  pageSubtitle: { 
    fontSize: 13, 
    color: '#64748b', 
    marginBottom: Spacing.five 
  },
  // ... (Keep other specific modal and button styles here)
});