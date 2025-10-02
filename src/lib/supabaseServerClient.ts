import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), 'backend.env');

if (!fs.existsSync(envPath)) {
  throw new Error('backend.env not found. Place your server keys in backend.env');
}

// Load environment variables manually
const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
lines.forEach((line) => {
  const [key, ...rest] = line.split('=');
  if (key && !process.env[key]) {
    process.env[key] = rest.join('=').trim();
  }
});

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or Service Role Key missing in backend.env');
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
export const clerkServerKey = process.env.CLERK_SECRET_KEY!;
