// src/pages/ProblemDetail.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProblems } from "../data/mockProblems";
import MVPPreview from "../components/ui/MVPPreview";
import LazyBuildSidebar from "../components/ui/LazyBuildSidebar";
import ExportPanel from "../components/ui/ExportPanel";
import DeploymentPanel from "../components/ui/DeploymentPanel";
import Button from "../components/ui/Button";
import posthog from "../utils/posthogClient";
import { useUser } from "@clerk/clerk-react";

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const problem = mockProblems.find((p) => p.id === id);

  const initialFeatures = ["User authentication", "Basic dashboard", "Analytics snapshot"];

  useEffect(() => {
    if (problem) {
      try {
        posthog?.capture?.("view_problem", { problemId: problem.id, title: problem.title, userId: user?.id });
      } catch (e) {
        console.warn("posthog capture failed", e);
      }
    }
  }, [problem, user]);

  if (!problem) return <p className="p-8">Problem not found.</p>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 p-8">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          ← Back
        </Button>

        <h1 className="text-4xl font-bold mt-4">{problem.title}</h1>
        <p className="text-gray-600 mt-2">{problem.description}</p>
        <p className="mt-2 text-sm text-gray-500">
          Subreddit: {problem.subreddit} | Trend: {problem.trend} | Complexity: {problem.complexity} | Impact: {problem.impact} | Industry: {problem.industry}
        </p>

        <MVPPreview title={problem.title} features={initialFeatures} />
      </div>

      <LazyBuildSidebar />

      <ExportPanel problemTitle={problem.title} features={initialFeatures} />

      <DeploymentPanel problemTitle={problem.title} features={initialFeatures} />
    </div>
  );
};

export default ProblemDetail;
