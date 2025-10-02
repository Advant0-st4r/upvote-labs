import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import Landing from './pages/Landing';
import Discovery from './pages/Discovery';
import { useEffect } from 'react';
import { initAnalytics } from './lib/analytics';

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API || '';

function App() {
  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => window.history.pushState(null, '', to)}
    >
      <Router>
        <Routes>
          {/* Landing page (only for logged-out users) */}
          <Route
            path="/"
            element={
              <SignedOut>
                <Landing />
              </SignedOut>
            }
          />

          {/* Discovery (only for signed-in users) */}
          <Route
            path="/discovery"
            element={
              <SignedIn>
                <AnalyticsWrapper>
                  <Discovery />
                </AnalyticsWrapper>
              </SignedIn>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      initAnalytics(user.id, user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  return <>{children}</>;
}

export default App;
