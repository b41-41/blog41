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
        secondary: {
          dark: '#1f2937', // 어두운 톤
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#4b5563',
          tertiary: '#6b7280',
        },
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
      },
      zIndex: {
        lowest: '-10',
        low: '10',
        medium: '50',
        high: '100',
        highest: '999',
      },
      borderWidth: {
        thin: '1px',
        normal: '2px',
        thick: '4px',
        heavy: '8px',
      },
      borderRadius: {
        none: '0',
        small: '2px',
        middle: '4px',
        large: '8px',
        full: '9999px',
      },
      keyframes: {
        carMove: {
          '0%': { transform: 'translateX(100%)' },
          '10%': { transform: 'translateX(85%)' },
          '90%': { transform: 'translateX(-2%)' },
          '100%': { transform: 'translateX(-2%)' },
        },
        scaleMove: {
          '0%': { transform: 'translateX(100%) scale(0.8)' },
          '50%': { transform: 'translateX(50%) scale(1)' },
          '100%': { transform: 'translateX(-50%) scale(0.8)' },
        },
        shakeMove: {
          '0%': { transform: 'translateX(100%) rotate(0deg)' },
          '25%': { transform: 'translateX(75%) rotate(1deg)' },
          '50%': { transform: 'translateX(50%) rotate(-1deg)' },
          '75%': { transform: 'translateX(25%) rotate(0.5deg)' },
        },
      },
      animation: {
        carMove: 'carMove 3s ease-in-out forwards',
        scaleMove: 'scaleMove 3s ease-in-out forwards',
        shakeMove: 'shakeMove 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
