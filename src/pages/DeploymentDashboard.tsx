// src/pages/DeploymentDashboard.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "../components/ui/Button";
import { useUser } from "@clerk/clerk-react";
import posthog from "../utils/posthogClient";

interface Project {
  id: string;
  title: string;
  features: string[];
  created_at: string;
  user_id?: string;
}

const DeploymentDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useUser();

  const fetchProjects = async () => {
    try {
      const q = supabase.from("projects").select("*");
      // filter to user projects if logged in
      const { data, error } = await (user?.id
        ? (q.eq("user_id", user.id) as any)
        : q);

      if (error) throw error;
      setProjects(data as Project[]);
    } catch (err) {
      console.error("fetchProjects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    posthog?.capture?.("view_deployment_dashboard", { userId: user?.id });
  }, [user]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Your Deployed Projects</h1>
      <Button onClick={fetchProjects}>Refresh</Button>
      <div className="mt-6 space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="p-4 bg-white rounded-lg border">
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="text-gray-500 text-sm">Created at: {new Date(p.created_at).toLocaleString()}</p>
            <ul className="list-disc list-inside mt-2">
              {p.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentDashboard;
