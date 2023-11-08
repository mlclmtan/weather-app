/**
 * @description
 * Get your openweathermap.org api key and paste it into the .env file.
 * If you don't see an .env file, then rename sample.env to .env
 * and follow the instructions there.
 * @link https://home.openweathermap.org/api_keys
 */
const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const config = {
  WEATHER_API_ENDPOINT: `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHERMAP_API_KEY}&`,
  WEATHER_CITY_SEARCH_ENDPOINT: `https://api.openweathermap.org/geo/1.0/direct?&appid=${OPENWEATHERMAP_API_KEY}&limit=5&`,
};

export default config;
