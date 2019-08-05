const request = require("request");

const forecast = (lat, lon, cb) => {
  const url = `https://api.darksky.net/forecast/ac110a1d0b2f8348da430013c1de73d4/${lon},${lat}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to forecast services", undefined);
    } else if (body.error) {
      cb("Unable to find the location", undefined);
    } else {
      cb(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        }°C degrees out. There is ${
          body.currently.precipProbability
        }% chance of rain `
      );
    }
  });
};

module.exports = forecast;
