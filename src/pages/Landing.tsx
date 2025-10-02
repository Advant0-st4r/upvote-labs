// src/pages/Landing.tsx
import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Button from '../components/ui/Button';

const Landing: Component = () => {
  const nav = useNavigate();

  return (
    <main class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-8">
      <section class="max-w-4xl w-full bg-white rounded-2xl shadow px-8 py-12">
        <h1 class="text-4xl font-extrabold mb-4">Welcome to UpvoteLabs</h1>
        <p class="text-lg text-slate-600 mb-6">
          Discover high-value problems from communities, instantly preview MVPs, and launch projects — fast.
        </p>

        <div class="flex gap-4">
          <Button onClick={() => nav('/discovery')}>Get Started</Button>
          <Button variant="outline" onClick={() => nav('/about')}>Learn More</Button>
        </div>

        <div class="mt-8 text-sm text-slate-500">
          <p>
            Built for quick iteration — sign up, browse vetted problems, generate an MVP preview, export and ship.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Landing;
