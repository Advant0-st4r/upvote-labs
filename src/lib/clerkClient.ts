// src/lib/clerkClient.ts
export const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API as string | undefined;
export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

if (!clerkFrontendApi) {
  console.warn('VITE_CLERK_FRONTEND_API not set in .env.local');
}

/**
 * Helper for opening Clerk hosted sign-in in a new window/tab.
 * You can replace this with @clerk/clerk-js widget integration if preferred.
 */
export function openClerkSignIn() {
  if (!clerkFrontendApi) {
    throw new Error('Clerk frontend API not configured');
  }
  // Clerk's hosted sign-in url structure (short form). If you use Clerk widget/sdk, integrate that instead.
  const url = `https://${clerkFrontendApi}.clerk.accounts`;
  window.open(url, '_blank');
}
