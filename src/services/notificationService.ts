import { supabase } from '@/components/supabase';

export async function getIncomingFriendRequests(currentUserId: number) {
  const { data, error } = await supabase
    .from('friend_requests')
    .select(`
      id,
      sender_id,
      status,
      users:sender_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('receiver_id', currentUserId)
    .eq('status', 'pending');

  if (error) throw error;

  return data ?? [];
}

export async function acceptFriendRequest(
  requestId: number,
  currentUserId: number,
  senderId: number
) {
  const { error: requestError } = await supabase
    .from('friend_requests')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (requestError) throw requestError;

  const { error: friendshipError } = await supabase
    .from('friendships')
    .insert([
      {
        user_id: currentUserId,
        friend_id: senderId,
      },
      {
        user_id: senderId,
        friend_id: currentUserId,
      },
    ]);

  if (friendshipError) throw friendshipError;
}

export async function deleteFriendRequest(requestId: number) {
  const { error } = await supabase
    .from('friend_requests')
    .delete()
    .eq('id', requestId);

  if (error) throw error;
}