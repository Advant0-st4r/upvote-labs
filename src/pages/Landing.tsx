import { useNavigate } from "@solidjs/router";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/discovery");
  };

  return (
    <div class="landing-page flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 class="text-4xl font-bold mb-6">Welcome to UpvoteLabs</h1>
      <p class="text-lg mb-4 text-center max-w-md">
        Discover high-value problems and instantly map out actionable projects.
      </p>
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}
