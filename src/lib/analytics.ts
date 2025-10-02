import posthog from 'posthog-js';

/**
 * Initialize PostHog analytics for the logged-in user.
 * @param userId - Clerk user ID
 * @param email - User email
 */
export function initAnalytics(userId?: string, email?: string) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_API_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    loaded: (ph) => {
      if (userId) {
        ph.identify(userId, { email });
      }
    },
  });
}

/**
 * Capture a custom event in PostHog.
 * @param event - Name of the event
 * @param properties - Optional additional properties
 */
export function trackEvent(event: string, properties?: Record<string, any>) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_API_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST) return;

  posthog.capture(event, properties);
}

/**
 * Optional: Capture page view
 * @param pathname - Path of the page
 */
export function trackPageview(pathname: string) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_API_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST) return;

  posthog.capture('$pageview', { pathname });
}
