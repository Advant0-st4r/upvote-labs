import { supabase } from './supabaseClient';

export const getIdeas = async () => [
  { id: 1, title: 'AI-Powered Recipe App', description: 'Generate recipes from fridge items.', upvotes: 42 },
  { id: 2, title: 'Virtual Fitness Coach', description: 'Personalized workouts via AR.', upvotes: 28 },
  { id: 3, title: 'Eco-Tracking Wallet', description: 'Track carbon footprint in spending.', upvotes: 35 },
];

export const getIdeaById = async (id: number) => getIdeas().then(ideas => ideas.find(i => i.id === id));

export const getForumPosts = async () => [
  { id: 1, title: 'Feedback on my MVP', content: 'Loving the wizard—here's my prototype.', comments: 5 },
  { id: 2, title: 'Best tools for ideation?', content: 'Recommendations for AI tools?', comments: 12 },
];
