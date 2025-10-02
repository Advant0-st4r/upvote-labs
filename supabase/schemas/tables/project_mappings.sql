CREATE TABLE IF NOT EXISTS project_mappings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES projects(id),
    problem_id uuid REFERENCES problems(id),
    added_at timestamp with time zone DEFAULT now()
);

