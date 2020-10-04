const fetch = require("node-fetch");
const { asyncPipe } = require("./util");

const fetchCurrentWeather = (apiKey) => (zip) =>
  asyncPipe(buildURL(apiKey), fetch, json)(zip);

const buildURL = (apiKey) => (zip) =>
  `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

const json = (response) => response.json();

const formatWeather = (data) =>
  [
    data.name,
    `Temp:\t\t${formatTemp(data.main.temp)}`,
    `Feels Like:\t${formatTemp(data.main.feels_like)}`,
  ].join("\n");

const formatTemp = (temp) => `${Math.round(temp).toString()} F`;

module.exports = { fetchCurrentWeather, formatWeather };
