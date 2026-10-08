import type { Config } from 'tailwindcss'

/**
 * Skiplist design system.
 *
 * Every colour below resolves to a CSS custom property declared in app/globals.css
 * so that dark (default) and light themes share one token contract. Do not add raw
 * hex codes in components — add a token here instead.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces, from furthest back to furthest forward.
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        overlay: 'rgb(var(--c-overlay) / <alpha-value>)',

        // Ink.
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',

        // Hairlines.
        line: 'rgb(var(--c-line) / <alpha-value>)',
        'line-strong': 'rgb(var(--c-line-strong) / <alpha-value>)',

        // The single high-signal accent. CTAs, focus rings, active states only.
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          hover: 'rgb(var(--c-accent-hover) / <alpha-value>)',
          fg: 'rgb(var(--c-accent-fg) / <alpha-value>)',
          soft: 'rgb(var(--c-accent-soft) / <alpha-value>)',
        },

        // Sequential heat scale (cool -> hot), 7 steps. Perceptually ordered and
        // colour-vision-deficiency safe: it varies in luminance, never red vs green.
        heat: {
          0: 'rgb(var(--c-heat-0) / <alpha-value>)',
          1: 'rgb(var(--c-heat-1) / <alpha-value>)',
          2: 'rgb(var(--c-heat-2) / <alpha-value>)',
          3: 'rgb(var(--c-heat-3) / <alpha-value>)',
          4: 'rgb(var(--c-heat-4) / <alpha-value>)',
          5: 'rgb(var(--c-heat-5) / <alpha-value>)',
          6: 'rgb(var(--c-heat-6) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid scale. Min is the 360px value, max is the >=1280px value.
        'display-1': ['clamp(2.5rem, 1.35rem + 5.1vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-2': ['clamp(2rem, 1.3rem + 3.1vw, 3.5rem)', { lineHeight: '1.03', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h1': ['clamp(1.75rem, 1.25rem + 2.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        'h2': ['clamp(1.375rem, 1.1rem + 1.2vw, 1.875rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem)', { lineHeight: '1.3', letterSpacing: '-0.012em', fontWeight: '600' }],
        'lead': ['clamp(1rem, 0.94rem + 0.3vw, 1.1875rem)', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'body': ['0.9375rem', { lineHeight: '1.65' }],
        'small': ['0.8125rem', { lineHeight: '1.55' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      spacing: {
        // 8px grid extensions used by section rhythm.
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        content: '1200px',
        wide: '1280px',
        prose: '68ch',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        // Hairlines over shadows. These are deliberately almost invisible.
        lift: '0 1px 2px rgb(0 0 0 / 0.18), 0 8px 24px -12px rgb(0 0 0 / 0.35)',
        'lift-lg': '0 2px 4px rgb(0 0 0 / 0.2), 0 20px 48px -20px rgb(0 0 0 / 0.45)',
        ring: '0 0 0 1px rgb(var(--c-line-strong) / 1)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '240': '240ms',
        '400': '400ms',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
