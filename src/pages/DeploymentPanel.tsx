// src/pages/DeploymentDashboard.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Button from "../components/ui/Button";

interface Project {
  id: string;
  title: string;
  features: string[];
  created_at: string;
}

const DeploymentDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.error(error);
    else setProjects(data as Project[]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

