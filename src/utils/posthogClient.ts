// src/utils/posthogClient.ts
import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY as string;
const apiHost = (import.meta.env.VITE_POSTHOG_API_HOST as string) || "https://app.posthog.com";

if (key) {
  posthog.init(key, {
    api_host: apiHost,
    autocapture: true,
    capture_pageview: true
  });
} else {
  // no-op if no key (avoids runtime errors)
  // You can still import and call posthog.capture safely but it will be an noop.
}

export default posthog;
