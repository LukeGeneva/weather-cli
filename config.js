const fs = require("fs");
const os = require("os");
const path = require("path");
const yaml = require("js-yaml");

const CONFIG_PATH = path.join(os.homedir(), ".weather-cli/config.yml");

const getConfig = () => yaml.safeLoad(fs.readFileSync(CONFIG_PATH).toString());

module.exports = { getConfig };
