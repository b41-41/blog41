import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography'

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
      fontFamily: {
        righteous: ['Righteous', 'sans-serif'],
        jua: ['Jua', 'sans-serif'],
        dela: ['Dela Gothic One', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
        notoJP: ['Noto Sans JP', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        title: ['Righteous', 'Jua', 'Dela Gothic One', 'sans-serif'],
      },
      borderWidth: {
        thin: '0.5px',
        normal: '1px',
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
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideLeftToRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        carMove: 'carMove 3s ease-in-out forwards',
        scaleMove: 'scaleMove 3s ease-in-out forwards',
        shakeMove: 'shakeMove 3s ease-in-out forwards',
        'gradient-slow': 'gradient 3s ease-in-out infinite',
        'slide': 'slideLeftToRight 150s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            'h1': {
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem'
            },
            'h2': {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.75rem'
            },
            'p': {
              marginBottom: '1rem',
              lineHeight: '1.75'
            },
            'code': {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
            },
            'pre': {
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
              color: 'var(--foreground)',
              position: 'relative',
              '&::before': {
                content: 'attr(data-language)',
                position: 'absolute',
                top: '0.25rem',
                right: '0.5rem',
                fontSize: '0.75rem', 
                color: '#666',
                textTransform: 'uppercase',
              },
              '.copy-button': {
                position: 'absolute',
                bottom: '0.25rem',
                right: '0.5rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                color: '#666',
                cursor: 'pointer',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: 'none',
                '&:hover': {
                  color: '#2563eb',
                },
              }
            },
            'ul': {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              marginBottom: '1rem'
            },
            'ol': {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
              marginBottom: '1rem'
            },
            'a': {
              color: '#2563eb',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }
        }
      }
    },
  },
  plugins: [
    typography,
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.pause-on-hover:hover': {
          'animation-play-state': 'paused',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config;
