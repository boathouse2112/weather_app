import { getCoordinates, getWeather } from './weather.js';

const main = function () {
  getWeather('Rochester').then((weather) => {
    console.log(weather);
  });
};

main();
