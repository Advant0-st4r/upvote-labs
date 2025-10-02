// src/components/ui/ProblemCard.tsx
import React from "react";
import { Problem } from "../../data/mockProblems";

interface ProblemCardProps {
  problem: Problem;
  onSelect: (problem: Problem) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSelect }) => (
  <div
    onClick={() => onSelect(problem)}
    className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
  >
    <h2 className="font-bold text-xl">{problem.title}</h2>
    <p className="text-gray-500 text-sm">{problem.subreddit}</p>
    <div className="mt-2 flex justify-between text-sm">
      <span>Trend: {problem.trend}</span>
      <span>Complexity: {problem.complexity}</span>
      <span>Impact: {problem.impact}</span>
    </div>
  </div>
);

export default ProblemCard;
