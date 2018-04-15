const getValue = require('get-value');

const PRECIP_TYPE_RAIN = 'rain';

module.exports = (response) => {
  // https://darksky.net/dev/docs
  const adapted = {
    summary: getValue(response, 'minutely.summary'),
    latitude: getValue(response, 'latitude'),
    longitude: getValue(response, 'longitude'),
    rainIntensity: 0
  };

  const precipIntensity = getValue(response, 'currently.precipIntensity');
  const precipType = getValue(response, 'currently.precipType');

  if (precipType === PRECIP_TYPE_RAIN) {
    adapted.rainIntensity = precipIntensity;
  }

  return adapted;
};
