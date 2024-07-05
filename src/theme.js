import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    h5: {
      fontWeight: 500,
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  shadows: ["none", "0px 4px 10px rgba(0, 0, 0, 0.1)"]
});

export default theme;
