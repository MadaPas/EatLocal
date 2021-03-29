/* eslint-disable no-new */
require('dotenv').config();
const config = require('./config/config');
const WebServer = require('./server');

new WebServer(config.webServer);
