// src/components/ui/ExportPanel.tsx
import React from "react";
import Button from "./Button";
import { generateProjectZip } from "../../utils/exportUtils";
import posthog from "../../utils/posthogClient";

interface ExportPanelProps {
  problemTitle: string;
  features: string[];
}

const ExportPanel: React.FC<ExportPanelProps> = ({ problemTitle, features }) => {
  const onDownload = async () => {
    await generateProjectZip(problemTitle, features);
    try {
      posthog?.capture?.("export_zip", { problemTitle });
    } catch (e) {
      console.warn("PostHog capture failed", e);
    }
  };

  return (
    <div className="border-l border-gray-200 p-4 w-80 flex-shrink-0 bg-white">
      <h2 className="text-xl font-bold mb-4">Export MVP</h2>
      <p className="text-gray-600 mb-4">
        Download a ready-to-use project with frontend and backend scaffold.
      </p>
      <Button onClick={onDownload}>Download ZIP</Button>
    </div>
  );
};

export default ExportPanel;


export default ExportPanel;
