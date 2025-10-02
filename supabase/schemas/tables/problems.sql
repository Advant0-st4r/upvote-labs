CREATE TABLE IF NOT EXISTS problems (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    subreddit text,
    trend text,
    complexity integer,
    impact integer,
    created_at timestamp with time zone DEFAULT now()
);
