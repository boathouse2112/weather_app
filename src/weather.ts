const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const CURRENT_WEATHER_API_URL =
  'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b6ac5c14c7faaea915d6957bc12196a9';

interface Coords {
  lat: number;
  lon: number;
}

const isCoords = function (variable: any): variable is Coords {
  const variableCoord = variable as Coords;
  return (
    typeof variableCoord.lat === 'number' &&
    typeof variableCoord.lon === 'number'
  );
};

/**
 * Get coordinates for the given city.
 * @param city 'city' | 'city, state' | 'city, state, country'
 */
const getCoordinates = async function (city: string): Promise<Coords> {
  // Query OpenWeather geocoding API with city name
  const queryURL = new URL(GEOCODING_API_URL);
  queryURL.searchParams.append('q', city);
  queryURL.searchParams.append('appid', API_KEY);

  const response = await fetch(queryURL.href, { mode: 'cors' });
  const searchResults = await response.json();
  const coordData = searchResults[0];

  const coords = { lat: coordData.lat, lon: coordData.lon };
  if (isCoords(coords)) {
    return coords;
  } else {
    console.error(`Could not parse coordinate from response.`);
    console.error(coordData);
    throw Error(`Could not parse coordinate from response.`);
  }
};

/**
 * Gets weather data at the given city.
 * @param city 'city' | 'city, state' | 'city, state, country'
 */
async function getWeatherData(city: string): Promise<void>;
/**
 * Gets weather data at the given coordinates
 * @param coords
 */
async function getWeatherData(coords: Coords): Promise<void>;

async function getWeatherData(searchLocation: string | Coords) {
  const coords =
    typeof searchLocation === 'string'
      ? await getCoordinates(searchLocation)
      : searchLocation;

  // Query OpenWeather weather API with latitude, longitude, and API key
  const queryURL = new URL(CURRENT_WEATHER_API_URL);
  queryURL.searchParams.append('lat', coords.lat.toString());
  queryURL.searchParams.append('lon', coords.lon.toString());
  queryURL.searchParams.append('appid', API_KEY);

  const response = await fetch(queryURL.href, { mode: 'cors' });
  const weatherData = await response.json();

  return weatherData;
}

export { getCoordinates, getWeatherData };
