import axios from 'axios';
import config from '../config/config';

async function getCityCoords(city) {
  const { data: response } = await axios.get(`${config.WEATHER_API_ENDPOINT}q=${city}`);
  const {
    coord,
    sys: { country },
  } = response;
  return { ...coord, country };
}

async function getCityNames(city) {
  const { data: response } = await axios.get(`${config.WEATHER_CITY_SEARCH_ENDPOINT}q=${city}`);
  return response;
}

async function getWeatherByCityCoord(lon, lat, location) {
  const { data: response } = await axios.get(`${config.WEATHER_API_ENDPOINT}lon=${lon}&lat=${lat}&q=${location}&units=metric`);
  return response;
}

async function getWeatherByCoord(lon, lat) {
  const { data: response } = await axios.get(`${config.WEATHER_API_ENDPOINT}lon=${lon}&lat=${lat}&units=metric`);
  return response;
}

async function getWeatherByName(location) {
  const { data: response } = await axios.get(`${config.WEATHER_API_ENDPOINT}q=${location}&units=metric`);
  return response;
}

export { getCityCoords, getCityNames, getWeatherByCityCoord, getWeatherByCoord, getWeatherByName };
