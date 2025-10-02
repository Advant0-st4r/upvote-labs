// src/pages/Discovery.tsx
import { Component, createResource, createSignal, createEffect, For, Show } from 'solid-js';
import { useUser } from '@clerk/clerk-react'; // if you still use Clerk React bindings; otherwise use your auth wrapper
import { supabase } from '../lib/supabaseClient';
import { fetchProblems as fetchProblemsLib, Problem } from '../lib/problem';
import { getMVPSuggestions, getLazyBuildGuidance } from '../lib/ai';
import { exportProject } from '../lib/export';
import { addProgress, awardBadge } from '../lib/gamification';

type Project = { id: string; title: string; description: string };

const Discovery: Component = () => {
  // Clerk useUser is kept as-is if you're using Clerk React wrapper; otherwise swap with your auth hook
  const { user } = useUser() as any;

  const [projects, setProjects] = createSignal<Project[]>([]);
  const [filters, setFilters] = createSignal<{ subreddit?: string; trend?: string }>({});
  const [selectedProblem, setSelectedProblem] = createSignal<Problem | null>(null);
  const [newProjectTitle, setNewProjectTitle] = createSignal('');
  const [mvpSuggestions, setMvpSuggestions] = createSignal<any[]>([]);
  const [guidanceSteps, setGuidanceSteps] = createSignal<any[]>([]);

  // Problems resource with reactive filters
  const [problemsRes, { refetch }] = createResource(filters, async (f) => {
    return await fetchProblemsLib(f);
  });

  // load projects for user
  createEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setProjects(data as Project[]);
    })();
  });

  // adaptive scoring - simplified synchronous approach: call serverless helper or calculate client-side
  const [scoredProblems, setScoredProblems] = createSignal<Problem[]>([]);
  createEffect(async () => {
    const list = problemsRes();
    if (!list) {
      setScoredProblems([]);
      return;
    }
    // naive scoring (client-side) — keep cheap
    const scored = await Promise.all(
      list.map(async (p) => {
        // simple fit score
        const fitScore = p.impact * 10 - p.complexity * 3 + (p.trend === 'hot' ? 15 : p.trend === 'rising' ? 7 : 0);
        return { ...p, fitScore };
      })
    );
    scored.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
    setScoredProblems(scored);
  });

  // When a problem is selected, fetch AI suggestions
  createEffect(() => {
    const p = selectedProblem();
    if (!p) {
      setMvpSuggestions([]);
      setGuidanceSteps([]);
      return;
    }
    (async () => {
      const m = await getMVPSuggestions(p.title);
      setMvpSuggestions(m);
      const g = await getLazyBuildGuidance(newProjectTitle() || p.title);
      setGuidanceSteps(g);
    })();
  });

  // Add project linked to user/problem
  async function handleAddProject() {
    if (!user || !newProjectTitle()) return;
    const { data, error } = await supabase
      .from('projects')
      .insert([{ title: newProjectTitle(), description: selectedProblem()?.title || '', created_by: user.id }])
      .select()
      .single();
    if (!error && data) {
      setProjects([data as Project, ...projects()]);
      if (selectedProblem()) {
        await supabase.from('project_mappings').insert([{ project_id: data.id, problem_id: selectedProblem()!.id }]);
      }
      await addProgress(user.id, data.id, 'Created', 5);
      if (projects().length + 1 === 5) await awardBadge(user.id, 'exporter-badge-uuid');
      setNewProjectTitle('');
      setSelectedProblem(null);
    } else {
      console.error('Add project error', error);
    }
  }

  // Export
  async function handleExport() {
    const title = newProjectTitle() || selectedProblem()?.title || 'project';
    await exportProject(title, mvpSuggestions(), guidanceSteps());
    const lastProject = projects()[0];
    if (lastProject && user) await addProgress(user.id, lastProject.id, 'Exported', 15);
  }

  return (
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Discovery</h1>

      <section class="mb-6">
        <div class="flex gap-3">
          <select
            value={filters().subreddit || ''}
            onInput={(e) => setFilters({ ...filters(), subreddit: (e.target as HTMLSelectElement).value || undefined })}
            class="border rounded px-2 py-1"
          >
            <option value="">All Subreddits</option>
            <option value="technology">Technology</option>
            <option value="gaming">Gaming</option>
          </select>

          <select
            value={filters().trend || ''}
            onInput={(e) => setFilters({ ...filters(), trend: (e.target as HTMLSelectElement).value || undefined })}
            class="border rounded px-2 py-1"
          >
            <option value="">All Trends</option>
            <option value="hot">Hot</option>
            <option value="rising">Rising</option>
          </select>
        </div>
      </section>

      <section class="grid grid-cols-3 gap-6">
        <div class="col-span-2">
          <h2 class="text-xl font-semibold mb-2">Problems</h2>
          <Show when={problemsRes.loading}>
            <p>Loading problems...</p>
          </Show>
          <For each={scoredProblems()}>
            {(p) => (
              <article
                class={`border rounded p-4 mb-3 cursor-pointer ${selectedProblem()?.id === p.id ? 'ring-2 ring-indigo-400' : ''}`}
                onClick={() => setSelectedProblem(p)}
              >
                <h3 class="font-bold">{p.title}</h3>
                <p class="text-sm text-slate-600">Subreddit: {p.subreddit} — Trend: {p.trend}</p>
                <div class="mt-2 text-sm">
                  <span class="mr-3">Impact: {p.impact}</span>
                  <span>Complexity: {p.complexity}</span>
                </div>
                <div class="mt-2 text-xs text-slate-500">Fit Score: {(p as any).fitScore?.toFixed?.(1) ?? '-'}</div>
              </article>
            )}
          </For>
        </div>

        <aside class="col-span-1 space-y-4">
          <div class="border rounded p-4">
            <h3 class="font-semibold">Create Project</h3>
            <input
              class="w-full border rounded p-2 mt-2"
              placeholder="Project Title"
              value={newProjectTitle()}
              onInput={(e) => setNewProjectTitle((e.target as HTMLInputElement).value)}
            />
            <Show when={selectedProblem()}>
              <p class="text-sm text-slate-600 mt-2">Based on: {selectedProblem()!.title}</p>
            </Show>
            <div class="mt-3 flex gap-2">
              <button class="btn btn-primary" onClick={handleAddProject}>
                Add Project
              </button>
              <button class="btn" onClick={handleExport}>
                Export Project
              </button>
            </div>
          </div>

          <div class="border rounded p-4">
            <h3 class="font-semibold">MVP Suggestions</h3>
            <For each={mvpSuggestions()}>
              {(s) => (
                <div class="mb-2">
                  <div class="font-medium">{s.feature} <span class="text-xs text-slate-500">({s.priority})</span></div>
                  <div class="text-sm text-slate-600">{s.description}</div>
                </div>
              )}
            </For>
          </div>

          <div class="border rounded p-4">
            <h3 class="font-semibold">Guidance</h3>
            <For each={guidanceSteps()}>
              {(g, i) => (
                <div class="mb-2">
                  <div class="font-medium">Step {i() + 1}: {g.step}</div>
                  <div class="text-sm text-slate-600">{g.description}</div>
                </div>
              )}
            </For>
          </div>
        </aside>
      </section>

      <section class="mt-8">
        <h2 class="text-xl font-semibold mb-2">Your Projects</h2>
        <For each={projects()}>
          {(p) => (
            <div class="border rounded p-3 mb-2">
              <h4 class="font-bold">{p.title}</h4>
              <p class="text-sm text-slate-600">{p.description}</p>
            </div>
          )}
        </For>
      </section>
    </div>
  );
};

export default Discovery;

