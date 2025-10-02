// src/components/ui/MVPPreview.tsx
import React, { useState } from "react";

interface MVPPreviewProps {
  title: string;
  features: string[];
}

const MVPPreview: React.FC<MVPPreviewProps> = ({ title, features }) => {
  const [editableFeatures, setEditableFeatures] = useState(features);

  const updateFeature = (index: number, value: string) => {
    const updated = [...editableFeatures];
    updated[index] = value;
    setEditableFeatures(updated);
  };

  return (
    <div className="border p-4 rounded-lg mt-4 bg-gray-50">
      <h3 className="text-2xl font-bold mb-2">MVP Preview: {title}</h3>
      {editableFeatures.map((feat, i) => (
        <input
          key={i}
          type="text"
          value={feat}
          onChange={(e) => updateFeature(i, e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-lg"
        />
      ))}
      <div className="mt-2">
        <strong>Preview Output:</strong>
        <ul className="list-disc list-inside mt-1">
          {editableFeatures.map((feat, i) => (
            <li key={i}>{feat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MVPPreview;
