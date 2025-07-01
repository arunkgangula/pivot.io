/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-nav': 'var(--bg-nav)',
        'bg-nav-hover': 'var(--bg-nav-hover)',
        'bg-active-nav': 'var(--bg-active-nav)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-inverted': 'var(--text-inverted)',
        'text-nav': 'var(--text-nav)',
        'border-primary': 'var(--border-primary)',
        'border-nav': 'var(--border-nav)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
