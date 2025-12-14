import { createTheme } from '@mui/material/styles';

// Dark theme inspired by the reference design but with dark mode
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFCE45', // Golden yellow
      light: '#FFD966',
      dark: '#E6B83D',
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#FFCE45', // Golden yellow accent
      light: '#FFD966',
      dark: '#E6B83D',
      contrastText: '#0A0A0A',
    },
    background: {
      default: '#0A0A0A', // Deep black
      paper: '#111111',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          overflowX: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1.0625rem',
        },
        contained: {
          boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: '#FFCE45',
          color: '#0A0A0A',
          fontWeight: 600,
          '&:hover': {
            background: '#E6B83D',
            boxShadow: '0 8px 24px rgba(255, 206, 69, 0.4)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          '&:hover': {
            borderWidth: '1.5px',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 206, 69, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 500,
        },
        outlined: {
          borderColor: 'rgba(255, 206, 69, 0.3)',
          borderWidth: '1.5px',
          color: '#FFCE45',
          backgroundColor: 'rgba(255, 206, 69, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default theme;

