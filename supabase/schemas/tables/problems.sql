-- supabase/schemas/tables/problems.sql

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subreddit text,
  trend text,
  complexity int4 default 5,
  impact int4 default 5,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- trigger function to update updated_at on modification
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.problems;
create trigger set_updated_at
  before update on public.problems
  for each row
  execute procedure public.set_updated_at();

-- indexes for performance
create index if not exists idx_problems_complexity_created_at on public.problems (complexity, created_at desc);
create index if not exists idx_problems_title_lower on public.problems ((lower(title)));
