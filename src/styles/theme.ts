/**
 * Theme Configuration
 * 
 * Este arquivo contém as cores e configurações do tema.
 * As variáveis CSS são definidas em globals.css
 * 
 * Para usar em componentes React, use as classes CSS:
 * - bg-theme-primary, bg-theme-secondary, etc.
 * - text-theme-primary, text-theme-secondary, etc.
 * - border-theme-primary, etc.
 * 
 * Ou use as variáveis CSS diretamente:
 * - var(--color-primary)
 * - var(--color-secondary)
 */

export const colors = {
  primary: {
    DEFAULT: 'var(--color-primary)',
    light: 'var(--color-primary-light)',
    dark: 'var(--color-primary-dark)',
  },
  secondary: {
    DEFAULT: 'var(--color-secondary)',
    light: 'var(--color-secondary-light)',
    dark: 'var(--color-secondary-dark)',
  },
  accent: {
    DEFAULT: 'var(--color-accent)',
    light: 'var(--color-accent-light)',
    dark: 'var(--color-accent-dark)',
  },
  background: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    dark: 'var(--color-bg-dark)',
    card: 'var(--color-bg-card)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    light: 'var(--color-text-light)',
    muted: 'var(--color-text-muted)',
  },
  status: {
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  },
  border: {
    light: 'var(--color-border-light)',
    medium: 'var(--color-border-medium)',
  },
} as const;

/**
 * Valores hexadecimais para referência
 * Atualize em globals.css para alterar o tema
 */
export const colorValues = {
  primary: {
    DEFAULT: '#820AD1',
    light: '#A020F0',
    dark: '#5A0B91',
  },
  secondary: {
    DEFAULT: '#9B4DCA',
    light: '#BA68C8',
    dark: '#7B1FA2',
  },
  accent: {
    DEFAULT: '#E91E63',
    light: '#F48FB1',
    dark: '#C2185B',
  },
} as const;

export const fonts = {
  family: {
    primary: '"Inter", "Segoe UI", "Roboto", sans-serif',
    mono: '"Fira Code", "Consolas", monospace',
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;
