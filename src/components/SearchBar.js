/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useCallback } from 'react';
import geoCoords from '../utils/geoCoords.js';
import AppContext from '../provider/appContext';
import { getCityNames, getWeatherByCityCoord, getWeatherByCoord, getWeatherByName } from '../services/weatherService';
import debounce from 'lodash/debounce';
import uniqueHistory from '../utils/uniqueHistory';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

export default function SearchBar() {
  const [loading, setLoading] = useState(false); // Loading state for get my location button
  const [textInputloading, settextInputloading] = useState(false); // Loading state for text input
  const [open, setOpen] = useState(false); // Open state for autocomplete
  const {
    app: { isDark, searchInput, searchHistory, searchResults },
    dispatchApp,
  } = useContext(AppContext); // Get app state

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  // Handle get my location button click
  const handleClick = async () => {
    setLoading(true);
    enqueueSnackbar(`Seaching your location weather`, { variant: 'info' });
    try {
      const { longitude, latitude } = await geoCoords();
      const weatherResponse = await getWeatherByCoord(longitude, latitude);
      updateWeatherState(weatherResponse);
      dispatchApp({ type: 'SEARCH_INPUT', payload: '' });
    } catch (error) {
      enqueueSnackbar(`Error fetching weather data: ${error.response.data.message}`, { variant: 'error' });
    }
    setLoading(false);
  };

  // Update app state with weather data
  const updateWeatherState = (weatherData) => {
    const {
      coord,
      sys: { country },
      name: city,
    } = weatherData;
    dispatchApp({
      type: 'GEO_COORDS',
      payload: coord,
    });
    dispatchApp({ type: 'WEATHER', payload: weatherData });
    dispatchApp({ type: 'LOCATION', payload: `${city}, ${country}` });
    dispatchApp({ type: 'IS_DARK', payload: weatherData.weather[0].icon.includes('n') });
    enqueueSnackbar(`${city}, ${country} found`, { variant: 'success' });

    // Add to search history without duplicate
    const newHistory = [...searchHistory, { timestamp: Date.now(), location: { city, country }, coord }];
    dispatchApp({ type: 'SEARCH_HISTORY', payload: uniqueHistory(newHistory) });
  };

  // Debounce search weather by city name
  const delayedCityNamesSearch = useCallback(
    debounce(async (location) => {
      try {
        const cityNamesData = await getCityNames(location);
        dispatchApp({ type: 'SEARCH_RESULTS', payload: cityNamesData });
      } catch (error) {
        enqueueSnackbar(`Error fetching city names data: ${error.response.data.message}`, { variant: 'error' });
      }
      settextInputloading(false);
    }, 1000),
    []
  );

  // Debounce search weather by city name
  const handleOptionChange = async (_, selectedLocation) => {
    setLoading(true);
    enqueueSnackbar(`Seaching ${selectedLocation.name} , ${selectedLocation.country} weather`, { variant: 'info' });

    const locationName = `${selectedLocation.name}, ${selectedLocation.state ? `${selectedLocation.state}, ` : ''}${
      selectedLocation.country
    }`;
    dispatchApp({ type: 'SEARCH_INPUT', payload: locationName });

    try {
      const weatherResponse = await getWeatherByCityCoord(selectedLocation.lon, selectedLocation.lat, selectedLocation.name);
      updateWeatherState(weatherResponse);
    } catch (error) {
      if (error.response.data.message === 'city not found') {
        // if city not found, try to search by name
        try {
          const weatherResponse = await getWeatherByName(`${selectedLocation.name}, ${selectedLocation.country}`);
          updateWeatherState(weatherResponse);
        } catch (error) {
          if (error.response.data.message === 'city not found') {
            // if city not found, try to search by coord
            try {
              const weatherResponse = await getWeatherByCoord(selectedLocation.lon, selectedLocation.lat);
              updateWeatherState(weatherResponse);
            } catch (error) {
              enqueueSnackbar(`Error fetching weather data: ${error.response.data.message}`, { variant: 'error' });
            }
          }
        }
      }
    }
    setLoading(false);
  };

  // Handle search input change
  const handleTextChange = (event) => {
    settextInputloading(true);
    const { value: inputText } = event.target;
    dispatchApp({ type: 'SEARCH_INPUT', payload: inputText });
    delayedCityNamesSearch(inputText);
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        id='box'
        sx={{
          flex: 1,
          borderRadius: { xs: '8px', sm: '20px' },
          background: `${isDark ? theme.palette.primary.darkPurple + '70' : theme.palette.primary.white + '60'} `,
          boxShadow:`0 4px 30px rgba(0, 0, 0, 0.1)`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box id='boxbox' sx={{ paddingLeft: { xs: 1, sm: 2.5 } }}>
          <Autocomplete
            id='autocomplete'
            fullWidth
            forcePopupIcon={false}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={handleOptionChange}
            isOptionEqualToValue={(option, value) => option.lon === value.lon}
            getOptionLabel={(location) => `${location.name}, ${location.state ? `${location.state}, ` : ''}${location.country}`}
            options={searchResults}
            loading={textInputloading}
            sx={{
              background: 'none',
              '& .MuiFilledInput-root:hover, & .MuiFilledInput-root:focus': {
                background: 'none',
              },
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label='Search City or Country'
                  placeholder='Location'
                  value={searchInput}
                  onChange={handleTextChange}
                  variant='filled'
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      paddingLeft: { xs: 1, sm: 99 },
                      '& .MuiFilledInput-root': {
                        paddingLeft: '10px!important',
                      },
                      color: `${isDark ? theme.palette.primary.white : theme.palette.common.black}`,
                    },
                    disableUnderline: true,
                    autoComplete: 'new-password',
                  }}
                  InputLabelProps={{
                    sx: {
                      color: `${isDark ? theme.palette.primary.white + '90 !important' : theme.palette.primary.main + '80'}`,
                    },
                  }}
                />
              );
            }}
          />
        </Box>
      </Box>
      <Tooltip title='Get my location'>
        <IconButton
          sx={{
            ml: 1,
            bgcolor: `${isDark ? theme.palette.primary.darkPurple : theme.palette.primary.main}`,
            borderRadius: 3,
            '& .MuiTouchRipple-root .MuiTouchRipple-child': {
              borderRadius: 3,
            },
            height: { xs: '3.25rem' },
            width: { xs: '3.25rem' },
          }}
          aria-label='get my location button'
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size='1.5rem' sx={{ color: 'white' }} />
          ) : (
            <MyLocationIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
