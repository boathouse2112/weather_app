var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const CURRENT_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'b6ac5c14c7faaea915d6957bc12196a9';
const isCoords = function (variable) {
    const variableCoord = variable;
    return (typeof variableCoord.lat === 'number' &&
        typeof variableCoord.lon === 'number');
};
/**
 * Get coordinates for the given city.
 * @param city 'city' | 'city, state' | 'city, state, country'
 */
const getCoordinates = function (city) {
    return __awaiter(this, void 0, void 0, function* () {
        // Query OpenWeather geocoding API with city name
        const queryURL = new URL(GEOCODING_API_URL);
        queryURL.searchParams.append('q', city);
        queryURL.searchParams.append('appid', API_KEY);
        const response = yield fetch(queryURL.href, { mode: 'cors' });
        const searchResults = yield response.json();
        const coordData = searchResults[0];
        const coords = { lat: coordData.lat, lon: coordData.lon };
        if (isCoords(coords)) {
            return coords;
        }
        else {
            console.error(`Could not parse coordinate from response.`);
            console.error(coordData);
            throw Error(`Could not parse coordinate from response.`);
        }
    });
};
function getWeatherData(searchLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const coords = typeof searchLocation === 'string'
            ? yield getCoordinates(searchLocation)
            : searchLocation;
        // Query OpenWeather weather API with latitude, longitude, and API key
        const queryURL = new URL(CURRENT_WEATHER_API_URL);
        queryURL.searchParams.append('lat', coords.lat.toString());
        queryURL.searchParams.append('lon', coords.lon.toString());
        queryURL.searchParams.append('appid', API_KEY);
        const response = yield fetch(queryURL.href, { mode: 'cors' });
        const weatherData = yield response.json();
        return weatherData;
    });
}
export const exportedForTesting = {
    isCoords,
};
export { getCoordinates, getWeatherData };
