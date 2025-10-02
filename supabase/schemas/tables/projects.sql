CREATE TABLE IF NOT EXISTS projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    created_by uuid REFERENCES users(id),
    created_at timestamp with time zone DEFAULT now()
);
