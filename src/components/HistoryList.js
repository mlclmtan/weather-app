import { useContext, useState } from 'react';
import AppContext from '../provider/appContext';
import { getWeatherByCityCoord } from '../services/weatherService';
import uniqueHistory from '../utils/uniqueHistory';
import { useSnackbar } from 'notistack';
import GlassBox from './GlassBox';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const HistoryList = () => {
  // Get app state
  const [loading, setLoading] = useState(false);
  const {
    app: { searchHistory, isDark },
    dispatchApp,
  } = useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Format date
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // Handle delete button click
  const handleDelete = ({ coord }) => {
    setLoading(true);
    let deletedLocation = '';
    const newHistory = searchHistory.filter((item) => {
      if (`${item.coord.lon},${item.coord.lat}` !== `${coord.lon},${coord.lat}`) {
        return true;
      } else {
        deletedLocation = `${item.location.city}, ${item.location.country}`;
        return false;
      }
    });
    dispatchApp({ type: 'SEARCH_HISTORY', payload: newHistory });
    enqueueSnackbar(`${deletedLocation} deleted`, { variant: 'success' });
    setLoading(false);
  };

  // Handle search button click
  const handleSearch = async (params) => {
    setLoading(true);
    enqueueSnackbar(`Seaching ${params.location.city} weather`, { variant: 'info' });
    try {
      // Fetch weather data
      const {
        coord: { lon, lat },
        location,
      } = params;
      const data = await getWeatherByCityCoord(lon, lat, location.city);
      // Destructure response data
      const {
        coord,
        sys: { country },
        name: city,
      } = data;

      // Update app weather state
      dispatchApp({
        type: 'GEO_COORDS',
        payload: coord,
      });
      dispatchApp({ type: 'WEATHER', payload: data });
      dispatchApp({ type: 'LOCATION', payload: `${city}, ${country}` });
      dispatchApp({ type: 'SEARCH_INPUT', payload: `${city}, ${country}` });

      // Add to search history without duplicate
      const newHistory = [...searchHistory, { timestamp: Date.now(), location: { city, country }, coord }];
      dispatchApp({ type: 'SEARCH_HISTORY', payload: uniqueHistory(newHistory) });
      enqueueSnackbar(`${city}, ${country} found`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Error fetching weather data: ${error.response.data.message}`, { variant: 'error' });
    }
    setLoading(false);
  };

  return (
    <>
      {searchHistory.length !== 0 && (
        <GlassBox
          sx={{
            marginTop: { xs: 3, sm: 3 },
            padding: { xs: 2.5, sm: 3 },
            paddingLeft: { xs: 2, sm: 3.5 },
            borderRadius: '24px !important',
            borderWidth: '0',
            border: 'none',
            backgroundColor: `${isDark ? theme.palette.primary.darkPurple + '70' : theme.palette.primary.white + '40'} `,
            backdropFilter: 'none',
            height: '100%',
            boxShadow: 'none',
          }}
        >
          <Typography variant='body1' color={isDark ? 'white' : 'initial'}>
            Search History
          </Typography>
          <Box sx={{ width: '100%' }}>
            <List>
              {searchHistory.map((item) => (
                <ListItem
                  disablePadding
                  key={`${item.coord.lon},${item.coord.lat}`}
                  sx={{
                    marginTop: { xs: 1, sm: 1.5 },
                    marginBottom: { xs: 1, sm: 1.5 },
                  }}
                >
                  <ListItemButton
                    disableGutters
                    sx={{
                      bgcolor: `${isDark ? theme.palette.primary.darkGray + '50' : theme.palette.primary.white + '80'}`,
                      borderRadius: '16px',
                      paddingLeft: { xs: 1, sm: 2 },
                      paddingRight: { xs: 1, sm: '16px !important' },
                      paddingTop: { xs: 1, sm: 1 },
                      paddingBottom: { xs: 1, sm: 1 },
                      '&:hover': {
                        bgcolor: `${isDark ? theme.palette.primary.white + 50 : theme.palette.primary.white + '50'}`,
                      },
                      cursor: 'unset',
                    }}
                  >
                    <ListItemText
                      id={`list-label-${item.coord.lon + item.coord.lat}`}
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {!lessThanSmall ? (
                            <>
                              <Typography
                                variant='body1'
                                color={isDark ? 'white' : 'initial'}
                                sx={{ flex: 1 }}
                              >{`${item.location.city}, ${item.location.country}`}</Typography>
                              <Typography
                                variant='body1'
                                color={isDark ? theme.palette.primary.white + '50' : ''}
                                sx={{ fontSize: 14, marginRight: { xs: 1, sm: 1 } }}
                              >{`${formatter.format(item.timestamp)}`}</Typography>
                            </>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                              <Typography
                                variant='body1'
                                color={isDark ? 'white' : 'initial'}
                                sx={{ flex: 1 }}
                              >{`${item.location.city}, ${item.location.country}`}</Typography>
                              <Typography
                                variant='body1'
                                color={isDark ? theme.palette.primary.white + '50' : ''}
                                sx={{ fontSize: '0.75rem !important' }}
                              >{`${formatter.format(item.timestamp)}`}</Typography>
                            </Box>
                          )}
                          <IconButton
                            aria-label='search this record from history'
                            onClick={() => handleSearch(item)}
                            disabled={loading}
                            sx={{
                              bgcolor: `${isDark ? '' : 'white'}`,
                              filter: `drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))`,
                              marginRight: { xs: 1, sm: 1 },
                              outline: `${isDark ? `2px solid ${theme.palette.primary.white}50` : ''}`,
                              '&:hover': {
                                bgcolor: `${isDark ? theme.palette.primary.white + 50 : ''}`,
                              },
                            }}
                          >
                            <SearchIcon fontSize='small' sx={{ color: `${isDark ? theme.palette.primary.white + '50' : ''}` }} />
                          </IconButton>
                          <IconButton
                            aria-label='delete this record search history'
                            onClick={() => handleDelete(item)}
                            disabled={loading}
                            sx={{
                              bgcolor: `${isDark ? '' : 'white'}`,
                              filter: `drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.10))`,
                              outline: `${isDark ? `2px solid ${theme.palette.primary.white}50` : ''}`,
                              '&:hover': {
                                bgcolor: `${isDark ? theme.palette.primary.white + 50 : ''}`,
                              },
                            }}
                          >
                            <DeleteIcon fontSize='small' sx={{ color: `${isDark ? theme.palette.primary.white + '50' : ''}` }} />
                          </IconButton>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </GlassBox>
      )}
    </>
  );
};

export default HistoryList;
