CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    name text,
    created_at timestamp with time zone DEFAULT now()
);
