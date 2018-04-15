const express = require('express');
const cors = require('cors');

const config = require('./config');
const methodCacheDecorator = require('./utils/methodCacheDecorator');
const WeatherAPIClient = require('./api/WeatherAPIClient');
const APIResponse = require('./api/APIResponse');

const app = express();
app.use(cors());

const weatherApiClient = new WeatherAPIClient(config.weatherApiKey);
const TEN_MINUTES = 1000 * 60 * 60 * 10;

weatherApiClient.getLocalWeather = methodCacheDecorator(
  weatherApiClient.getLocalWeather.bind(weatherApiClient),
  TEN_MINUTES
);

// TODO: Configure ESLint to understand "async"
app.get('/weather/:latitude/:longitude', async function(req, res) {
  const response = new APIResponse();

  /*
  const latitude = 47.608013;
  const longitude = 122.335167;
  */
  const { latitude, longitude } = req.params;

  try {
    response.data = await weatherApiClient.getLocalWeather(latitude, longitude);

  } catch (error) {
    response.error = error;
    response.userMessage = 'There was a problem fetching weather data.';
  }
  res.send(response.toString());
});

console.log(`Listening on ${config.port}`);
app.listen(config.port);
