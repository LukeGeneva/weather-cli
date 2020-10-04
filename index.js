#! /usr/bin/env node
const { argv } = require("yargs");
const { asyncPipe, trace } = require("./util");
const { fetchCurrentWeather, formatWeather } = require("./weather");
const { getConfig } = require("./config");

const { apiKey, defaultZip } = getConfig();
const zip = argv.zip || defaultZip;
asyncPipe(fetchCurrentWeather(apiKey), formatWeather, trace)(zip);
