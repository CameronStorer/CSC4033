// db-service.ts
import { supabase } from '@/db/supabase';

export const DATABASE_CONFIG = {
  users: {
    label: 'App Users',
    table: 'users',
    // 'as const' makes this a read-only tuple of specific strings
    showColumns: ['id', 'username', 'full_name', 'email', 'status', 'last_online'] as const, 
    widths: { 
      id: 80, 
      username: 140,
      full_name: 180, 
      email: 200, 
      status: 100,
      last_online: 200 
    } as Record<string, number> // Record allows indexing with any string
  }
};

export const fetchTableData = async (tableName: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const deleteRow = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName).delete().eq('id', id);
  if (error) throw error;
};