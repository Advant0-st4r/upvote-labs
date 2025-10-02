import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  component: () => JSX.Element;
}

export const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
        </svg>
      </div>
    );
  }

  if (!isSignedIn) {
    toast({
      title: 'Authentication Required',
      description: 'Please sign in to access this page.',
    });
    return <Navigate to={`/?redirect_to=${encodeURIComponent(location.pathname)}`} />;
  }

  return <Component />;
};
