// src/components/ui/AIRecommendation.tsx
import React, { useState, useEffect } from "react";

interface AIRecommendationProps {
  problemTitle: string;
}

const mockRecommendations = [
  "Consider adding multi-language support",
  "Integrate real-time notifications",
  "Optimize onboarding flow for first-time users",
  "Add analytics for user retention",
  "Create email campaign templates"
];

const AIRecommendation: React.FC<AIRecommendationProps> = ({ problemTitle }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Mock AI recommendations; replace with API call to OpenAI / Claude later
    setRecommendations(mockRecommendations);
  }, [problemTitle]);

  return (
    <div className="p-4 bg-white border rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">AI Suggestions for "{problemTitle}"</h2>
      <ul className="list-disc list-inside">
        {recommendations.map((r, i) => (
          <li key={i} className="text-gray-700">{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIRecommendation;
