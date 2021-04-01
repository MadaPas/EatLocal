/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/usersRoutes.js');
const boxesRoutes = require('./routes/boxesRoutes.js');
const ordersRoutes = require('./routes/ordersRoutes.js');

const { connectDB } = require('./db/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

const config = require('./config');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: config.resourceServer.oidc.clientId,
  issuer: config.resourceServer.oidc.issuer,
  assertClaims: config.resourceServer.assertClaims,
  testing: config.resourceServer.oidc.testing,
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
const authenticationRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];
  const audience = config.resourceServer.assertClaims.aud;
  return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      console.log(err.message, '##');
      res.status(401).send(err.message);
    });
};

app.get('/', async (req, res) => {
  res.send('Our API is running...');
});

app.use('/api/users', authenticationRequired, usersRoutes);
app.use('/api/orders', authenticationRequired, ordersRoutes);
app.use('/api/boxes', boxesRoutes);

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello!  There\'s not much to see here :)',
  });
});

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => res.json(req.jwt));

/**
 * Another example route that requires a valid access token for
 *authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json({
    messages: [
      {
        date: new Date(),
        text: 'Hey I heard about this extremely cool food box subscription app! ',
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Should we implement REDUX for no obvious reasons?!',
      },
    ],
  });
});

connectDB().then(async () => {
  app.listen(config.resourceServer.port, () => {
    console.log(`Resource Server Ready on port ${config.resourceServer.port}`);
  });
});

// Gracefully close connection to MongoDB when turning off the server.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB: Connection closed.');
    process.exit(0);
  });
});
