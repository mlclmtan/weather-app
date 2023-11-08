import { createContext } from 'react';

const initialAppState = {
  weather: {
    weather: [
      {
        main: 'Clouds',
        icon: '04n',
      },
    ],
    main: {
      temp: 26.6,
      temp_min: 25.64,
      temp_max: 27.05,
      humidity: 86,
    },
    dt: 1699728305,
    sys: {
      country: 'SG',
    },
    name: 'Bright Hill Crescent',
  },
  unit: 'C',
  location: 'Bright Hill Crescent, SG',
  isDark: false,
  geoCoords: {
    lon: null,
    lat: null,
  },
  searchHistory: [],
  searchInput: '',
  searchResults: [],
};

// const _devState = {
  //   weather: {
  //     coord: {
  //       lon: 103.8589,
  //       lat: 1.3368,
  //     },
  //     weather: [
  //       {
  //         id: 803,
  //         main: 'Clouds',
  //         description: 'broken clouds',
  //         icon: '04n',
  //       },
  //     ],
  //     base: 'stations',
  //     main: {
  //       temp: 26.6,
  //       feels_like: 26.6,
  //       temp_min: 25.64,
  //       temp_max: 27.05,
  //       pressure: 1010,
  //       humidity: 86,
  //     },
  //     visibility: 10000,
  //     wind: {
  //       speed: 2.06,
  //       deg: 350,
  //     },
  //     clouds: {
  //       all: 75,
  //     },
  //     dt: 1699728305,
  //     sys: {
  //       type: 1,
  //       id: 9470,
  //       country: 'SG',
  //       sunrise: 1699742814,
  //       sunset: 1699786229,
  //     },
  //     timezone: 28800,
  //     id: 1880755,
  //     name: 'Bright Hill Crescent',
  //     cod: 200,
  //   },
  //   unit: 'C',
  //   location: 'Bright Hill Crescent, SG',
  //   isDark: false,
  //   geoCoords: {
  //     lon: 103.858946,
  //     lat: 1.336763,
  //   },
  //   searchHistory: [
  //     { timestamp: 1635728305, location: { city: 'Kuala Lumpur', country: 'MY' }, coord: { lat: 3.1516964, lon: 101.6942371 } },
  //     { timestamp: 1635728306, location: { city: 'Taiwan', country: 'TW' }, coord: { lat: 23.5983227, lon: 120.83537694479215 } },
  //     { timestamp: 1635728301, location: { city: 'Taiwan', country: 'AE' }, coord: { lat: 25.2401252, lon: 55.18543220472973 } },
  //     { timestamp: 1635728302, location: { city: 'Taiwan', country: 'PG' }, coord: { lat: -6.3315938, lon: 146.3632284 } },
  //     { timestamp: 1635728303, location: { city: 'Taiwán', country: 'CR' }, coord: { lat: 10.2804258, lon: -84.9656911 } },
  //     { timestamp: 1635728304, location: { city: 'Newton', country: 'US' }, coord: { lat: 42.3370414, lon: -71.2092214 } },
  //     { timestamp: 1635728304, location: { city: 'Newton, Iowa', country: 'US' }, coord: { lat: 41.6997139, lon: -93.0538852 } },
  //     { timestamp: 1635728304, location: { city: 'Newton, Kansas', country: 'US' }, coord: { lat: 38.0469166, lon: -97.3447244 } },
  //     { timestamp: 1635728304, location: { city: 'Newton, North Carolina', country: 'US' }, coord: { lat: 35.6630887, lon: -81.2219363 } },
  //   ],
  //   searchInput: 'aasdasd',
  //   searchResults: [
  //     {
  //       name: 'Taiwan',
  //       lat: 23.5983227,
  //       lon: 120.83537694479215,
  //       country: 'TW',
  //     },
  //     {
  //       name: 'Taiwan',
  //       lat: 25.2401252,
  //       lon: 55.18543220472973,
  //       country: 'AE',
  //       state: 'Dubai',
  //     },
  //     {
  //       name: 'Taiwan',
  //       lat: -6.3315938,
  //       lon: 146.3632284,
  //       country: 'PG',
  //       state: 'Morobe',
  //     },
  //     {
  //       name: 'Taiwán',
  //       lat: 10.2804258,
  //       lon: -84.9656911,
  //       country: 'CR',
  //     },
  //   ],
// };
function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'WEATHER':
      return { ...state, weather: payload };
    case 'LOCATION':
      return { ...state, location: payload };
    case 'UNIT':
      return { ...state, unit: payload };
    case 'GEO_COORDS':
      return { ...state, geoCoords: payload };
    case 'IS_DARK':
      return { ...state, isDark: payload };
    case 'SEARCH_INPUT':
      return { ...state, searchInput: payload };
    case 'SEARCH_HISTORY':
      return { ...state, searchHistory: payload };
    case 'SEARCH_RESULTS':
      return { ...state, searchResults: payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export { appReducer, initialAppState };
export default AppContext;
