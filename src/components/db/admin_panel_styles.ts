// db-styles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Spacing } from '@/constants/theme';

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    paddingBottom: 100 
  },
  headerActionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  addButton: { 
    backgroundColor: '#6200ee', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 8 
  },
  chartCard: { 
    marginBottom: 25, 
    alignItems: 'center' 
  },
  chartTitle: { 
    color: '#aaa', 
    marginBottom: 10, 
    alignSelf: 'flex-start' 
  },
  tableCard: { 
    backgroundColor: '#16161d', 
    borderRadius: 12, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333'
  },
  colHeaderRow: { 
    flexDirection: 'row', 
    backgroundColor: '#1f1f27', 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  headerCell: { 
    color: '#888', 
    fontWeight: 'bold', 
    paddingHorizontal: 10 
  },
  dataRow: { 
    flexDirection: 'row', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#222',
    alignItems: 'center'
  },
  dataCell: { 
    color: '#eee', 
    paddingHorizontal: 10 
  },
  actionCell: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  editBtn: { 
    color: '#4dabf7', 
    fontWeight: '600' 
  },
  deleteBtn: { 
    color: '#ff6b6b', 
    fontWeight: '600' 
  }
});