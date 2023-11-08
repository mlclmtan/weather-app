import { useContext } from 'react';
import AppContext from '../provider/appContext';
import { Box, Typography } from '@mui/material';
import Sun from '../static/sun.png';
import Cloud from '../static/cloud.png';
import { capitalizeFirstLetter } from '../utils/strings';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const WeatherCard = () => {
  // Get app state
  const {
    app: { weather, location, isDark },
  } = useContext(AppContext);
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Format date
  const date = new Date(weather.dt * 1000);
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  });
  const dayFormatter = Intl.DateTimeFormat([], {
    weekday: 'long',
  });

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ flexGrow: 0, flexShrink: 0, flexBasis: '50%' }}>
          <Typography variant='body1' color={isDark ? 'white' : 'initial'}>
            Today's Weather
          </Typography>
          <Typography variant='h1' color={isDark ? 'white' : 'primary'} sx={{ lineHeight: { xs: '4.5rem', sm: '7rem' } }}>
            {Math.trunc(weather.main.temp)}°
          </Typography>
          <Typography variant='body1' color={isDark ? 'white' : 'initial'}>
            H: {Math.trunc(weather.main.temp_max)}° L: {Math.trunc(weather.main.temp_min)}°
          </Typography>
          {lessThanSmall ? (
            <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'} sx={{ fontWeight: 700 }}>
              {location}
            </Typography>
          ) : (
            ''
          )}
        </Box>
        <Box
          component='img'
          sx={{
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: '50%',
            position: 'absolute',
            top: {xs:'5rem', sm:'-6rem'},
            right: 0,
            width: '50%',
          }}
          src={isDark ? Cloud : Sun}
        />
        {lessThanSmall ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              alignItems: 'end',
              position: 'relative',
              marginLeft: 'auto',
            }}
          >
            <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
              {capitalizeFirstLetter(weather.weather[0].main)}
            </Typography>
            <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
              {dayFormatter.format(date)}, {formatter.format(date)}
            </Typography>
          </Box>
        ) : (
          ''
        )}
      </Box>
      {!lessThanSmall ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'} sx={{ fontWeight: 700 }}>
            {location}
          </Typography>
          <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
            {dayFormatter.format(date)}, {formatter.format(date)}
          </Typography>
          <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
            Humidity: {weather.main.humidity}%
          </Typography>
          <Typography variant='body1' color={isDark ? 'white' : theme.palette.primary.darkGray + '90'}>
            {capitalizeFirstLetter(weather.weather[0].main)}
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default WeatherCard;
