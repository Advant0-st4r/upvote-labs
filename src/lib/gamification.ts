import { supabase } from './supabaseClient';
import { trackEvent } from './analytics';

export async function addProgress(userId: string, projectId: string, stage: string, points = 0) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert([{ user_id: userId, project_id: projectId, stage, points }], { onConflict: ['user_id', 'project_id'] })
    .select()
    .single();
  if (error) console.error(error);
  else trackEvent('Project Progress Updated', { userId, projectId, stage, points });
  return data;
}

export async function awardBadge(userId: string, badgeId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .insert([{ user_id: userId, badge_id: badgeId }])
    .select()
    .single();
  if (error) console.error(error);
  else trackEvent('Badge Awarded', { userId, badgeId });
  return data;
}
