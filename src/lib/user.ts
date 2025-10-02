import { supabase } from './supabaseClient';

export async function createOrUpdateUser(clerkId: string, email: string, name?: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ clerk_id: clerkId, email, name })
    .select();

  if (error) console.error('Error creating/updating user:', error);
  return data;
}
