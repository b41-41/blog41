import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          blue: '#2563eb', // 기본 파란색
          light: '#60a5fa', // 밝은 톤
          dark: '#1e40af', // 어두운 톤
          orange: '#c2410c', // 가을
          green: '#15803d', // 봄
          yellow: '#ca8a04', // 여름
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#4b5563',
          tertiary: '#6b7280',
        },
      },
      zIndex: {
        lowest: '-10',
        low: '10',
        medium: '50',
        high: '100',
        highest: '999',
      },
    },
  },
  plugins: [],
} satisfies Config;
