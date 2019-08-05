const request = require("request");

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicG9tZWdyYW5pdGVkZXNpZ24iLCJhIjoiY2p2d3JwaTcyNGZuejRhcXJjbWRvdG80diJ9.R1jM1Lh_b5habQO0CJ4mFg`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find location", undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
