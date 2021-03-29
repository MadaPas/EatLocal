/* eslint-disable no-console */
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const mongoose = require('mongoose');
const { connectDB } = require('./db/index');

const templateDir = path.join(__dirname, '.', 'common', 'views');
const frontendDir = path.join(__dirname, '.', 'common', 'assets');

const routes = require('./routes/index.js');

module.exports = function WebServer(config, extraOidcOptions, homePageTemplateName) {
  const oidc = new ExpressOIDC({
    issuer: config.oidc.issuer,
    client_id: config.oidc.clientId,
    client_secret: config.oidc.clientSecret,
    appBaseUrl: config.oidc.appBaseUrl,
    scope: config.oidc.scope,
    testing: config.oidc.testing,
    ...extraOidcOptions || {},
  });

  const app = express();

  app.use(session({
    secret: 'this-should-be-very-random',
    resave: true,
    saveUninitialized: false,
  }));

  // Provide the configuration to the view layer because we show it on the homepage
  const displayConfig = {

    ...config.oidc,
    clientSecret: `****${config.oidc.clientSecret.substr(config.oidc.clientSecret.length - 4, 4)}`,
  };

  app.locals.oidcConfig = displayConfig;

  // This server uses mustache templates located in views/ and css assets in assets/
  app.use('/assets', express.static(frontendDir));
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', templateDir);

  app.use(oidc.router);

  app.get('/auth', (req, res) => {
    const template = homePageTemplateName || 'home';
    const userinfo = req.userContext && req.userContext.userinfo;
    res.render(template, {
      isLoggedIn: !!userinfo,
      userinfo,
    });
  });

  app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    // Convert the userinfo object into an attribute array, for rendering with mustache
    const userinfo = req.userContext && req.userContext.userinfo;
    const attributes = Object.entries(userinfo);
    res.render('profile', {
      isLoggedIn: !!userinfo,
      userinfo,
      attributes,
    });
  });

  app.get('/', async (req, res) => {
    res.send('Our API is running...');
  });

  app.use('/api', oidc.ensureAuthenticated(), routes);

  connectDB();

  oidc.on('ready', () => {
    app.listen(config.port, () => console.log(`App started on port ${config.port}`));
  });

  oidc.on('error', err => {
    console.error('OIDC ERROR: ', err);
  });

  oidc.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB: Connection closed.');
      oidc.exit(0);
    });
  });
};
