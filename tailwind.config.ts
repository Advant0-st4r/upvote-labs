/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue for buttons and accents
        secondary: '#10B981', // Green for success states
        background: '#F9FAFB', // Light background
        muted: '#E5E7EB', // Muted background for gradients
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}