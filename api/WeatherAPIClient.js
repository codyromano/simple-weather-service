const fetch = require('node-fetch');

module.exports = class WeatherAPIClient {
  constructor(weatherApiKey) {
    if (typeof weatherApiKey === 'string' && weatherApiKey.length) {
      this.weatherApiKey = weatherApiKey;
    } else {
      throw new Error('Invalid weather API key');
    }
  }
  getCityId(name, longitude, latitude) {
    // TODO: Find city id in JSON manifest
    const seattleCityId = 5809844;
    return Promise.resolve(seattleCityId);
  }
  /**
  * @returns Promise
  */
  async getLocalWeather(cityId) {
    const endpoint = `http://api.openweathermap.org/data/2.5/` +
      `forecast?id=${cityId}&APPID=${this.weatherApiKey}`;
    const response = await fetch(endpoint);
    return response.json();
  }
}
