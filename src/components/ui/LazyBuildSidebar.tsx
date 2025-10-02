// src/components/ui/LazyBuildSidebar.tsx
import React, { useState } from "react";

interface LazyBuildSidebarProps {
  suggestions?: string[];
}

const defaultSuggestions = [
  "Add user authentication module",
  "Integrate basic analytics dashboard",
  "Create a settings page for admin",
  "Add notifications system",
  "Optimize onboarding workflow"
];

const LazyBuildSidebar: React.FC<LazyBuildSidebarProps> = ({ suggestions = defaultSuggestions }) => {
  const [completed, setCompleted] = useState<boolean[]>(Array(suggestions.length).fill(false));

  const toggleComplete = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div className="w-80 p-4 bg-white border-l border-gray-200 flex-shrink-0">
      <h2 className="text-xl font-bold mb-4">Next Steps</h2>
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li
            key={i}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
              completed[i] ? "line-through text-gray-400" : ""
            }`}
            onClick={() => toggleComplete(i)}
          >
            {s}
            <span className="text-green-600 font-bold">{completed[i] ? "✓" : ""}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LazyBuildSidebar;
