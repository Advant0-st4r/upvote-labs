// src/components/ui/DeploymentPanel.tsx
import React, { useState } from "react";
import Button from "./Button";
import { supabase } from "../../lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import posthog from "../../utils/posthogClient";

interface DeploymentPanelProps {
  problemTitle: string;
  features: string[];
}

const DeploymentPanel: React.FC<DeploymentPanelProps> = ({ problemTitle, features }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useUser();

  const deployToSupabase = async () => {
    setLoading(true);
    try {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("projects")
        .insert([{ title: problemTitle, features, user_id: user.id, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;

      setSuccess(true);
      posthog?.capture?.("deploy_project", { projectId: (data as any).id, problemTitle });
    } catch (err) {
      console.error("deploy error:", err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-l border-gray-200 p-4 w-80 flex-shrink-0 bg-white">
      <h2 className="text-xl font-bold mb-4">Instant Deployment</h2>
      <p className="text-gray-600 mb-4">
        Deploy your MVP instantly to Supabase and track analytics with PostHog.
      </p>
      <Button onClick={deployToSupabase} disabled={loading}>
        {loading ? "Deploying..." : "Deploy Now"}
      </Button>
      {success && <p className="text-green-600 mt-2">Deployment successful! 🎉</p>}
    </div>
  );
};

export default DeploymentPanel;

