import { createSignal, createEffect, onMount } from "solid-js";
import { useUser } from "@clerk/clerk-solid";
import { supabase } from "../lib/supabaseClient";
import { fetchProblems, Problem } from "../lib/problem";

export default function Discovery() {
  const { user } = useUser();
  const [problems, setProblems] = createSignal<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = createSignal<Problem | null>(null);

  onMount(async () => {
    if (!user()) return;
    const data = await fetchProblems({});
    setProblems(data);
  });

  const selectProblem = (p: Problem) => setSelectedProblem(p);

  return (
    <div class="discovery-page p-6">
      <h1>Welcome, {user()?.firstName || user()?.emailAddresses[0].emailAddress}</h1>
      <div class="problems-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {problems().map((p) => (
          <div
            class={`problem-card p-4 border rounded cursor-pointer ${
              selectedProblem()?.id === p.id ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => selectProblem(p)}
          >
            <h3 class="font-semibold">{p.title}</h3>
            <p>Subreddit: {p.subreddit}</p>
            <p>Trend: {p.trend}</p>
            <p>Complexity: {p.complexity}</p>
            <p>Impact: {p.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

