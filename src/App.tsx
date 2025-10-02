// src/App.tsx
import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { supabase } from './lib/supabaseClient';
import Discovery from './pages/Discovery';

// Read Clerk frontend API from env
const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API as string;

if (!clerkFrontendApi) {
  console.warn('VITE_CLERK_FRONTEND_API is missing in .env.local');
}

const App: React.FC = () => {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi} navigate={(to) => (window.location.href = to)}>
      {/* Only signed-in users can access Discovery */}
      <SignedIn>
        <Discovery supabase={supabase} />
      </SignedIn>

      {/* Redirect signed-out users to sign-in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default App;
