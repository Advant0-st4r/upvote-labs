// src/pages/GamifiedDashboard.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProgressTracker from "../components/ui/ProgressTracker";
import AIRecommendation from "../components/ui/AIRecommendation";
import posthog from "../utils/posthogClient";
import { useUser } from "@clerk/clerk-react";

interface Project {
  id: string;
  title: string;
  features: string[];
  created_at: string;
}

const GamifiedDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useUser();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("user_id", user?.id || "");
      if (error) throw error;
      setProjects((data as any[]) || []);
    } catch (err) {
      console.error("fetchProjects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    posthog?.capture?.("view_gamified_dashboard", { userId: user?.id });
  }, [user]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Gamified Progress Dashboard</h1>
      {projects.map((p) => {
        const completedFeatures = Math.floor(Math.random() * Math.max(1, p.features.length));
        return (
          <div key={p.id} className="mb-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <ProgressTracker completed={completedFeatures} total={p.features.length} />
            <AIRecommendation problemTitle={p.title} />
          </div>
        );
      })}
    </div>
  );
};

export default GamifiedDashboard;
