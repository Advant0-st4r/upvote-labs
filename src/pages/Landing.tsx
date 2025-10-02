import { useNavigate } from 'react-router-dom';
import { SignInButton } from '@clerk/clerk-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to UpvoteLabs</h1>
      <p>Discover high-value problems and launch your startup instantly.</p>
      <SignInButton mode="modal">
        <button className="get-started-btn">Get Started</button>
      </SignInButton>
    </div>
  );
}

