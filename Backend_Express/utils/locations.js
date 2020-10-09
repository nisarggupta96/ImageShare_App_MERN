const fetch = require('node-fetch');
const HttpError = require('../models/http-error');

const API_KEY = process.env.API_KEY;

const getCoordinatesFromAddress = async (address) => {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${API_KEY}`).then(res => res.json());

  if (!response || response.features.length === 0) {
    throw new HttpError('Could not find location for specified address', 422);
  }

  const coordinates = {
    lat: response.features[0].geometry.coordinates[0],
    lng: response.features[0].geometry.coordinates[1],
  };

  return coordinates;
};

module.exports = getCoordinatesFromAddress;
