// src/components/layout/Navbar.tsx
import { Component, createSignal } from 'solid-js';
import { Link } from '@solidjs/router';

const Navbar: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
    <nav class="w-full bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <Link href="/" class="text-xl font-bold">UpvoteLabs</Link>
          </div>

          <div class="hidden md:flex items-center space-x-4">
            <Link href="/discovery" class="text-sm hover:underline">Discovery</Link>
            <Link href="/projects" class="text-sm hover:underline">Projects</Link>
            <Link href="/about" class="text-sm hover:underline">About</Link>
          </div>

          <div class="md:hidden">
            <button onClick={() => setOpen(!open())} aria-label="Toggle menu" class="p-2 rounded">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class={`md:hidden ${open() ? 'block' : 'hidden'} px-4 pb-4`}>
        <Link href="/discovery" class="block py-2">Discovery</Link>
        <Link href="/projects" class="block py-2">Projects</Link>
        <Link href="/about" class="block py-2">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
