import { getCoordinates, getWeatherData } from './weather.js';

const main = function () {
  getWeatherData('Rochester').then((weather) => {
    console.log(weather);
  });
};

main();
