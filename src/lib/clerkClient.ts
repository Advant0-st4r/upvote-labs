import { ClerkProvider } from '@clerk/clerk-react';

export const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API as string;
export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

if (!clerkFrontendApi || !clerkPublishableKey) {
  console.warn('Missing Clerk frontend keys in .env.local');
}

// Use <ClerkProvider frontendApi={clerkFrontendApi}> in App.tsx
