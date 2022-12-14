const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  4.5: '1.125rem',
  5: '1.25rem',
  5.5: '1.375rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  22: '5.5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  112: '28rem',
  128: '32rem',
  144: '36rem',
};

export const theme = {
  borderRadius: {
    none: '0px',
    '2xs': '0.5px',
    xs: '1px',
    sm: '0.125rem',
    base: '0.25rem',
    lg: '0.375rem',
    xl: '0.5rem',
    '2xl': '0.75rem',
    '3xl': '1rem',
    half: '50%',
    full: '9999px',
  },
  borderWidth: {
    0: '0px',
    base: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    6: '6px',
  },
  breakpoints: {
    xs: '30rem',
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#FFF',
    blackAlpha: {
      50: 'rgba(0, 0, 0, 0.04)',
      100: 'rgba(0, 0, 0, 0.06)',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.16)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.36)',
      600: 'rgba(0, 0, 0, 0.48)',
      700: 'rgba(0, 0, 0, 0.64)',
      800: 'rgba(0, 0, 0, 0.80)',
      900: 'rgba(0, 0, 0, 0.92)',
    },
    whiteAlpha: {
      50: 'rgba(255, 255, 255, 0.04)',
      100: 'rgba(255, 255, 255, 0.06)',
      200: 'rgba(255, 255, 255, 0.08)',
      300: 'rgba(255, 255, 255, 0.16)',
      400: 'rgba(255, 255, 255, 0.24)',
      500: 'rgba(255, 255, 255, 0.36)',
      600: 'rgba(255, 255, 255, 0.48)',
      700: 'rgba(255, 255, 255, 0.64)',
      800: 'rgba(255, 255, 255, 0.80)',
      900: 'rgba(255, 255, 255, 0.92)',
    },
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    primary: {
      50: '#ebf8ff',
      100: '#bee3f8',
      200: '#90cdf4',
      300: '#63b3ed',
      400: '#4299e1',
      500: '#3182ce',
      600: '#2b6cb0',
      700: '#2c5282',
      800: '#2a4365',
      900: '#1A365D',
    },
    primaryAlpha: {
      50: 'rgba(49, 130, 206, 0.04)',
      100: 'rgba(49, 130, 206, 0.06)',
      200: 'rgba(49, 130, 206, 0.08)',
      300: 'rgba(49, 130, 206, 0.16)',
      400: 'rgba(49, 130, 206, 0.24)',
      500: 'rgba(49, 130, 206, 0.36)',
      600: 'rgba(49, 130, 206, 0.48)',
      700: 'rgba(49, 130, 206, 0.64)',
      800: 'rgba(49, 130, 206, 0.80)',
      900: 'rgba(49, 130, 206, 0.92)',
    },
    secondary: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#C05621',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },
    secondaryAlpha: {
      50: 'rgba(221, 107, 32, 0.04)',
      100: 'rgba(221, 107, 32, 0.06)',
      200: 'rgba(221, 107, 32, 0.08)',
      300: 'rgba(221, 107, 32, 0.16)',
      400: 'rgba(221, 107, 32, 0.24)',
      500: 'rgba(221, 107, 32, 0.36)',
      600: 'rgba(221, 107, 32, 0.48)',
      700: 'rgba(221, 107, 32, 0.64)',
      800: 'rgba(221, 107, 32, 0.80)',
      900: 'rgba(221, 107, 32, 0.92)',
    },
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
    success: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    warning: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15',
      500: '#EAB308',
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
    },
    info: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#06B6D4',
      600: '#0891B2',
      700: '#0E7490',
      800: '#155E75',
      900: '#164E63',
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: '300',
    medium: '600',
    bold: '700',
  },
  height: {
    auto: 'auto',
    ...spacing,
    full: '100%',
    screen: '100vh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
  lineHeight: {
    none: 0,
    xs: 0.75,
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    '2xl': 1.375,
    '3xl': 1.5,
  },
  margin: {
    auto: 'auto',
    center: '0 auto',
    ...spacing,
  },
  maxHeight: {
    none: 'none',
    ...spacing,
    full: '100%',
    screen: '100vh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
  maxWidth: {
    none: 'none',
    ...spacing,
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '40rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    full: '100%',
    screen: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
  minHeight: {
    0: '0px',
    full: '100%',
    screen: '100vh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
  minWidth: {
    0: '0px',
    full: '100%',
    screen: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
  padding: spacing,
  space: spacing,
  width: {
    auto: 'auto',
    ...spacing,
    full: '100%',
    screen: '100vw',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
  },
};
