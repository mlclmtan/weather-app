import { useReducer, useContext } from 'react';
import AppContext, { appReducer, initialAppState } from './provider/appContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { ThemeProvider } from '@mui/material/styles';
import { MainTheme } from './theme/MainTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import GlassBox from './components/GlassBox';
import { SnackbarProvider } from 'notistack';
import { createTheme } from '@mui/material/styles';
import bgLight from './static/bg-light.png';
import bgDark from './static/bg-dark.png';

function App() {
  const {
    app: { isDark },
  } = useContext(AppContext);
  const theme = createTheme(MainTheme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `url(${isDark ? bgDark : bgLight})`,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='false' disableGutters sx={{ maxWidth: '700px', paddingLeft: { xs: 2 }, paddingRight: { xs: 2 } }}>
        <SearchBar />
        <GlassBox>
          <WeatherCard />
          <HistoryList />
        </GlassBox>
      </Container>
    </ThemeProvider>
  );
}

export default function IntegrationNotistack() {
  const [app, dispatchApp] = useReducer(appReducer, initialAppState);
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <AppContext.Provider value={{ app, dispatchApp }}>
        <App />
      </AppContext.Provider>
    </SnackbarProvider>
  );
}

