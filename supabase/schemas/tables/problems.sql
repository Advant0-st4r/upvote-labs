create table if not exists problems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subreddit text,
  trend text,
  complexity integer,
  impact integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_problems_difficulty_created on problems(complexity, created_at);

