const express = require('express');

const config = require('./config');
const methodCacheDecorator = require('./utils/methodCacheDecorator');
const WeatherAPIClient = require('./api/WeatherAPIClient');
const APIResponse = require('./api/APIResponse');

const app = express();
const weatherApiClient = new WeatherAPIClient(config.weatherApiKey);
const TEN_MINUTES = 1000 * 60 * 60 * 10;

weatherApiClient.getLocalWeather = methodCacheDecorator(
  weatherApiClient.getLocalWeather.bind(weatherApiClient),
  TEN_MINUTES
);

app.get('/weather/:name', async function(req, res) {
  const response = new APIResponse();

  try {
    const cityId = await weatherApiClient.getCityId(req.params.name);
    response.data = await weatherApiClient.getLocalWeather(cityId);

  } catch (error) {
    console.error(error);
    response.error = error;
    response.userMessage = 'There was a problem fetching weather data.';
  }
  res.send(response.toString());
});

console.log(`Listening on ${config.port}`);
app.listen(config.port);

