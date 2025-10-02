export type MVPSuggestion = {
  feature: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
};

export type GuidanceStep = {
  step: string;
  description: string;
};

// Simulated AI output for MVP & guidance
export async function getMVPSuggestions(problemTitle: string): Promise<MVPSuggestion[]> {
  // Replace this with actual AI integration later
  return [
    { feature: 'Basic User Login', description: `Allow users to log in to interact with ${problemTitle}`, priority: 'High' },
    { feature: 'Problem Dashboard', description: 'Visualize core problem metrics', priority: 'High' },
    { feature: 'Feedback Form', description: 'Collect early user feedback', priority: 'Medium' },
  ];
}

export async function getLazyBuildGuidance(projectTitle: string): Promise<GuidanceStep[]> {
  return [
    { step: 'Add Analytics', description: `Integrate basic analytics to track usage for ${projectTitle}` },
    { step: 'Prototype Features', description: 'Create clickable mockups for rapid feedback' },
    { step: 'Plan Marketing', description: 'Outline go-to-market plan' },
  ];
}
