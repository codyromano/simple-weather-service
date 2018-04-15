const fetch = require('node-fetch');
const queryString = require('query-string');
const weatherResponseAdapter = require('./weatherResponseAdapter');

module.exports = class WeatherAPIClient {
  constructor(weatherApiKey) {
    if (typeof weatherApiKey === 'string' && weatherApiKey.length) {
      this.weatherApiKey = weatherApiKey;
    } else {
      throw new Error('Invalid weather API key');
    }
  }
  /**
  * @returns Promise
  */
  async getLocalWeather(lat, lon) {
    // https://darksky.net/dev/docs
    const optionalParams = queryString.stringify({
      exclude: 'hourly,daily,alerts,flags'
    });

    const location = [lat, lon].join(',');
    const endpoint = `https://api.darksky.net/forecast/${this.weatherApiKey}` +
      `/${location}?${optionalParams}`;

    const response = await fetch(endpoint).then(raw => raw.json());
    return Promise.resolve(weatherResponseAdapter(response));
  }
}
