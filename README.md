UpvoteLabs
A React SPA for discovering and validating startup ideas with community feedback. Built with Vite, TypeScript, Clerk (auth), Supabase (backend prep), and shadcn-ui.
Quick Start

Clone: git clone https://github.com/Advant0-st4r/upvotelabs
Install: npm install
Env: Copy .env.example to .env and add Clerk/Supabase keys
Dev: npm run dev
Build: npm run build

Structure

src/pages/: Routes (Landing, Discovery, etc.)
src/components/ui/: shadcn-ui components
src/lib/: Utils, mocks, Supabase client

APIs

Auth: Clerk (client-side)
Data: Supabase (mocks in mockData.ts; replace with real queries)

Troubleshooting

Blank page: Check console (F12) for errors; ensure VITE_CLERK_PUBLISHABLE_KEY in .env.
Missing components: Verify src/components/ui/ has all shadcn-ui files.

Hosted on Supabase.
