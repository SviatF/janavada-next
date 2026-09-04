/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-instrument)', 'Georgia', 'serif'],
        logo: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#111827',
        ashoka: '#1E3A8A',
        saffron: '#F97316',
        emerald: '#059669',
        gold: '#D4A017',
        ivory: '#FAF8F4',
        border: '#E8E3DA',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,24,39,.04), 0 8px 28px rgba(17,24,39,.05)',
      }
    }
  },
  plugins: [],
};
