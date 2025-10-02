// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { mockProblems, Problem } from "../data/mockProblems";
import ProblemCard from "../components/ui/ProblemCard";
import FilterBar from "../components/ui/FilterBar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [trend, setTrend] = useState("");
  const [search, setSearch] = useState("");

  const filteredProblems = mockProblems.filter((p) => {
    return (
      (!industry || p.industry === industry) &&
      (!trend || p.trend === trend) &&
      (!search || p.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.firstName || "Founder"}!</h1>

      <FilterBar
        industry={industry}
        setIndustry={setIndustry}
        trend={trend}
        setTrend={setTrend}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onSelect={() => navigate(`/problem/${problem.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

