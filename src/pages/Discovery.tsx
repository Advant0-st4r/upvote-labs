// src/pages/Discovery.tsx
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { createOrUpdateUser } from '../lib/user';
import { Problem, fetchProblems } from '../lib/problem';
import { getMVPSuggestions, getLazyBuildGuidance, MVPSuggestion, GuidanceStep } from '../lib/ai';
import { exportProject } from '../lib/export';
import { trackEvent } from '../lib/analytics';
import { addProgress, awardBadge } from '../lib/gamification';

type Project = { id: string; title: string; description: string };

export default function Discovery() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [filters, setFilters] = useState<{ subreddit?: string; trend?: string }>({});
  const [mvpSuggestions, setMvpSuggestions] = useState<MVPSuggestion[]>([]);
  const [guidanceSteps, setGuidanceSteps] = useState<GuidanceStep[]>([]);

  // Ensure user exists in DB
  useEffect(() => {
    if (user) createOrUpdateUser(user.id, user.emailAddresses[0].emailAddress, user.firstName || '');
  }, [user]);

  // Fetch user's projects
  useEffect(() => {
    if (!user) return;
    const fetchUserProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      else setProjects(data as Project[]);
    };
    fetchUserProjects();
  }, [user]);

  // Fetch problems with filters
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems(filters);
        setProblems(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProblems();
  }, [filters]);

  // Adaptive problem scoring
  useEffect(() => {
    const scoreProblems = async () => {
      if (!user) return;
      const scored = await Promise.all(
        problems.map(async (p) => ({
          ...p,
          fitScore: await calculateFitScore(p, projects, user.id),
        }))
      );
      scored.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
      setFilteredProblems(scored);
    };
    scoreProblems();
  }, [projects, problems, user]);

  // Fetch AI suggestions when problem selected
  useEffect(() => {
    if (!selectedProblem) {
      setMvpSuggestions([]);
      setGuidanceSteps([]);
      return;
    }

    const fetchAISuggestions = async () => {
      const mvp = await getMVPSuggestions(selectedProblem.title);
      setMvpSuggestions(mvp);

      const guidance = await getLazyBuildGuidance(newProjectTitle || selectedProblem.title);
      setGuidanceSteps(guidance);
    };

    fetchAISuggestions();
  }, [selectedProblem, newProjectTitle]);

  // Select problem
  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    trackEvent('Problem Selected', { problemId: problem.id, title: problem.title });
  };

  // Add new project
  const handleAddProject = async () => {
    if (!user || !newProjectTitle) return;

    const { data, error } = await supabase
      .from('projects')
      .insert([{ title: newProjectTitle, description: selectedProblem?.title || '', created_by: user.id }])
      .select()
      .single();

    if (error) console.error(error);
    else {
      setProjects([data as Project, ...projects]);

      if (selectedProblem) {
        await supabase.from('project_mappings').insert([{ project_id: data.id, problem_id: selectedProblem.id }]);
      }

      await addProgress(user.id, data.id, 'Created', 5);

      if (projects.length + 1 === 5) await awardBadge(user.id, 'exporter-badge-uuid');

      setNewProjectTitle('');
      setSelectedProblem(null);
      trackEvent('Project Created', { projectId: data.id, title: data.title, basedOnProblem: selectedProblem?.id });
    }
  };

  // Export project
  const handleExport = async () => {
    if (!newProjectTitle && !selectedProblem) return;
    const title = newProjectTitle || selectedProblem?.title || 'project';
    await exportProject(title, mvpSuggestions, guidanceSteps);

    const lastProject = projects[0];
    if (lastProject && user) await addProgress(user.id, lastProject.id, 'Exported', 15);

    trackEvent('Project Exported', { title });
  };

  return (
    <div className="discovery-page">
      <h1>Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress}</h1>

      {/* Filters */}
      <div className="filters">
        <select
          value={filters.subreddit || ''}
          onChange={(e) => setFilters({ ...filters, subreddit: e.target.value || undefined })}
        >
          <option value="">All Subreddits</option>
          <option value="technology">Technology</option>
          <option value="gaming">Gaming</option>
        </select>
        <select
          value={filters.trend || ''}
          onChange={(e) => setFilters({ ...filters, trend: e.target.value || undefined })}
        >
          <option value="">All Trends</option>
          <option value="hot">Hot</option>
          <option value="rising">Rising</option>
        </select>
      </div>

      {/* Create Project */}
      <div className="create-project">
        <input
          type="text"
          placeholder="Project Title"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
        />
        {selectedProblem && <p>Based on problem: {selectedProblem.title}</p>}
        <button onClick={handleAddProject}>Add Project</button>
      </div>

      {/* Problems */}
      <div className="problems-section">
        {filteredProblems.map((p) => (
          <div
            key={p.id}
            className={`problem-card ${selectedProblem?.id === p.id ? 'selected' : ''}`}
            onClick={() => handleSelectProblem(p)}
          >
            <h3>{p.title}</h3>
            <p>Subreddit: {p.subreddit}</p>
            <p>Trend: {p.trend}</p>
            <p>Complexity: {p.complexity}</p>
            <p>Impact: {p.impact}</p>
            <p>Fit Score: {p.fitScore?.toFixed(1)}</p>
          </div>
        ))}
      </div>

      {/* User Projects */}
      <div className="projects-section">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>

      {/* MVP Preview */}
      {selectedProblem && (
        <div className="mvp-preview">
          <h2>Instant MVP Suggestions</h2>
          {mvpSuggestions.map((s, i) => (
            <div key={i} className="mvp-card">
              <h3>
                {s.feature} ({s.priority})
              </h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Lazy-Build Guidance */}
      {selectedProblem && (
        <div className="lazy-guidance">
          <h2>Next Steps Guidance</h2>
          {guidanceSteps.map((g, i) => (
            <div key={i} className="guidance-card">
              <strong>Step {i + 1}:</strong> {g.step}
              <p>{g.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Export Project */}
      {(selectedProblem || newProjectTitle) && (
        <div className="export-section">
          <button onClick={handleExport}>Export Project</button>
        </div>
      )}
    </div>
  );
}

// Helper: calculateFitScore adapted for adaptive ranking
async function calculateFitScore(problem: Problem, userProjects: Project[], userId?: string) {
  let baseScore = problem.complexity * 0.2 + problem.impact * 0.5;

  const attempted = userProjects.some((p) => p.description === problem.title);
  if (!attempted) baseScore += 10;

  if (problem.trend === 'hot') baseScore += 5;

  if (userId) {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .ilike('project_id', `%${problem.id}%`);
    if (data && data.length > 0) baseScore -= 3;
  }

  return baseScore;
}

