import { supabase } from './supabaseClient';

export type Problem = {
  id: string;
  title: string;
  subreddit: string;
  trend: 'hot' | 'rising' | 'evergreen';
  complexity: number;
  impact: number;
  fitScore?: number;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
};

/**
 * Fetch problems from Supabase
 * Optionally filter by subreddit or trend
 */
export async function fetchProblems(filters?: { subreddit?: string; trend?: string }): Promise<Problem[]> {
  let query = supabase.from('problems').select('*');

  if (filters?.subreddit) query = query.eq('subreddit', filters.subreddit);
  if (filters?.trend) query = query.eq('trend', filters.trend);

  const { data, error } = await query;
  if (error) throw error;

  return (data || []) as Problem[];
}

/**
 * Calculate the fit score of a problem for a given user
 * @param problem Problem to score
 * @param userProjectHistory Projects the user has already created
 * @param userId Optional user ID for adaptive scoring
 */
export async function calculateFitScore(
  problem: Problem,
  userProjectHistory: Project[],
  userId?: string
): Promise<number> {
  let baseScore = problem.complexity * 0.2 + problem.impact * 0.5;

  // Reward problems not attempted yet
  const attempted = userProjectHistory.some((p) => p.description === problem.title);
  if (!attempted) baseScore += 10;

  // Trend bonus
  if (problem.trend === 'hot') baseScore += 5;
  if (problem.trend === 'rising') baseScore += 3;

  // Adaptive bonus/penalty based on user progress
  if (userId) {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .ilike('project_id', `%${problem.id}%`);
    if (data && data.length > 0) baseScore -= 3; // already done → deprioritize slightly
  }

  return baseScore;
}


