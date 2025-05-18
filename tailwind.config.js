/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',         // White background 
        secondary: '#21d55a',       // Green accent
        accent: '#111827',          // Dark text color
        dark: '#111827',            // Text color
        light: '#FFFFFF',           // White
        'believe-gray': '#6B7280',  // Secondary text
        'believe-light': '#F9FAFB', // Light background
        'dark-bg': '#000000',       // Dark mode background (true black)
        'dark-surface': '#121212',  // Dark mode surface (near black)
        'dark-border': '#1E1E1E',   // Dark mode border (dark gray)
      },
      fontFamily: {
        sans: ['Open Runde', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Open Runde', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right, #FFFFFF, #F9FAFB)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}; 