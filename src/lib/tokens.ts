export const colors = {
  background: {
    primary: '#0A0807',
    secondary: '#0F0C0B',
  },
  surface: {
    primary: '#151110',
    glass: 'rgba(15, 12, 11, 0.7)',
  },
  text: {
    primary: '#F0EBE6',
    secondary: '#A89890',
    muted: '#5C4E48',
  },
  accent: {
    primary: '#C0957B',
    hover: '#D4A98C',
    deep: '#8B553F',
    burgundy: '#3E1011',
    amber: '#C9903A',
  },
  border: {
    subtle: 'rgba(192, 149, 123, 0.08)',
    visible: 'rgba(192, 149, 123, 0.15)',
  },
}

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '96px',
  10: '128px',
  11: '160px',
  12: '240px',
}

export const motion = {
  duration: {
    xs: '120ms',
    s: '180ms',
    m: '250ms',
    l: '400ms',
    xl: '600ms',
    xxl: '900ms',
    xxxl: '1400ms',
  },
  ease: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
}

export const typography = {
  fonts: {
    display: 'var(--font-cormorant)',
    body: 'var(--font-inter)',
  },
  size: {
    display: 'clamp(5rem, 14vw, 12rem)',
    h1: 'clamp(3rem, 8vw, 7rem)',
    h2: 'clamp(2rem, 5vw, 4rem)',
    h3: 'clamp(1.5rem, 3vw, 2.5rem)',
    bodyLg: '1.125rem',
    body: '1rem',
    caption: '0.875rem',
    label: '0.75rem',
  },
}

export const radius = {
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  full: '9999px',
}