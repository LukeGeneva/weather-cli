#! /usr/bin/env node

const fetch = require("node-fetch");
const os = require("os");
const path = require("path");
const { argv } = require("yargs");
const yaml = require("js-yaml");
const fs = require("fs");

const CONFIG_PATH = path.join(os.homedir(), ".weather-cli/config.yml");

const asyncPipe = (...fns) => (x) => fns.reduce(async (y, f) => f(await y), x);

const trace = (data) => {
  console.log(data);
  return data;
};

const { openWeatherMapApiKey } = yaml.safeLoad(
  fs.readFileSync(CONFIG_PATH).toString()
);

const API_URL = `http://api.openweathermap.org/data/2.5/weather?zip=${argv.zip}&appid=${openWeatherMapApiKey}&units=imperial`;

const fetchCurrentWeather = () =>
  fetch(API_URL).then((response) => response.json());

const formatWeatherInfo = (data) =>
  [
    data.name,
    `Temp:\t\t${formatTemp(data.main.temp)}`,
    `Feels Like:\t${formatTemp(data.main.feels_like)}`,
  ].join("\n");

const formatTemp = (temp) => `${Math.round(temp).toString()} F`;

asyncPipe(fetchCurrentWeather, formatWeatherInfo, trace)();
