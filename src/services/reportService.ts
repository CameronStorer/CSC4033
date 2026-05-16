import { supabaseAdmin } from '@/components/supabase';

export async function createReport(
  blockerId: number,
  blockedId: number,
  reason: string,
) {
  const { data, error } = await supabaseAdmin
    .from('reports')
    .insert([
      {
        blocker_id: blockerId,
        blocked_id: blockedId,
        report_reason: reason,
        report_status: 'pending',
      },
    ])
    .select();

  if (error) {
    console.log('createReport error:', JSON.stringify(error));
    throw error;
  }

  return data;
}
