import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        coal: '#0c0d0f',
        graphite: '#16181d',
        cream: '#f4ede2',
        bronze: '#b58a56',
        smoke: '#a9a39a'
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        ambient: '0 20px 70px rgba(0,0,0,0.45)'
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 10%, rgba(181,138,86,0.12), transparent 42%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
