import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS変数ではなく直接定義
        ecruWhite: 'var(--ecruWhite)', // RGBからHEXに変換
        darkGreen: 'var(--darkGreen)',
        semiDarkGreen: 'var(--semiDarkGreen)',
        middleGreen: 'var(--middleGreen)',
        lightGreen: 'var(--lightGreen)',
        accentOrange: 'var(--accentOrange)',
        accentLightOrange: 'var(--accentLightOrange)',
        gray: 'var(--gray)',
      },
    },
  },
  plugins: [],
} satisfies Config;
