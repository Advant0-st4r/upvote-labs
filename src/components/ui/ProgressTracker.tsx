// src/components/ui/ProgressTracker.tsx
import React from "react";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ completed, total }) => {
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  return (
    <div className="w-full bg-gray-200 rounded-lg h-6 relative">
      <div
        className="bg-green-500 h-6 rounded-lg transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute w-full text-center text-white font-bold top-0 left-0">
        {percentage}% Complete
      </span>
    </div>
  );
};

export default ProgressTracker;
