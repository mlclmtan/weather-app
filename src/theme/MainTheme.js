import { createTheme } from '@mui/material/styles';

let theme = createTheme();


export const MainTheme = createTheme(theme, {
  palette: {
    primary: {
      main: '#6C40B5',
      gray: '#666666',
      darkGray: '#1A1A1A',
      darkPurple: '#28124D',
      white: '#FFFFFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root.MuiAutocomplete-inputRoot': {
            background: 'none',
          },
        },
      },
      defaultProps: {
        inputProps: {
          style: {
            fontSize: '11.8px',
          },
        },
      },
    },
  },
  typography: {
    body1: {
      fontFamily: `'Noto Sans', 'Roboto', sans-serif`,
      fontSize: '1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
    h1: {
      fontFamily: `'Noto Sans', 'Roboto', sans-serif`,
      fontWeight: 700,
      fontSize: '7rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '4.5rem',
      },
    },
  },
});
