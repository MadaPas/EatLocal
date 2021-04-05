/* eslint-disable consistent-return */
require('dotenv').config();
const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.js');
const boxesRoutes = require('./routes/boxes.js');
const ordersRoutes = require('./routes/orders.js');
const farmersRoute = require('./routes/farmers.js');

const {
  connectDB,
} = require('./db/index');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(cors());

const config = require('./config');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: config.resourceServer.oidc.clientId,
  issuer: config.resourceServer.oidc.issuer,
  assertClaims: config.resourceServer.assertClaims,
  testing: config.resourceServer.oidc.testing,
});

/**
 * A simnple middleware that asserts valid access tokens and sends 401 responses
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
app.use('/api/farmers', farmersRoute);

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
    messages: [{
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

app.post('/api/payment', async (req, res) => {
  const {
    email, pm, priceId, stripeId,
  } = req.body;
  try {
    let customer;
    if (!stripeId) {
      customer = await stripe.customers.create({
        email,
        payment_method: pm,
        invoice_settings: {
          default_payment_method: pm,
        },
      });
    } else {
      await stripe.paymentMethods.attach(pm, {
        customer: stripeId || customer.id,
      });
    }
    await stripe.customers.update(
      stripeId || customer.id, {
        invoice_settings: {
          default_payment_method: pm,
        },
      },
    );

    const subscription = await stripe.subscriptions.create({
      customer: stripeId || customer.id,
      items: [{
        price: priceId,
      }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.send(subscription);
  } catch (error) {
    return res.status('500').send({
      error: {
        message: error.message,
      },
    });
  }
});

app.post('/api/create-customer', authenticationRequired, async (req, res) => {
  const {
    email,
    pm,
  } = req.body;
  const customer = await stripe.customers.create({
    email,
    payment_method: pm,
    invoice_settings: {
      default_payment_method: pm,
    },
  });
  res.json(customer);
});

app.post('/api/create-subscription', async (req, res) => {
  console.log(req.body, '#');
  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('500').send({
      error: {
        message: error.message,
      },
    });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    },
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{
      price: req.body.priceId,
    }],
    expand: ['latest_invoice.payment_intent'],
  });

  res.send(subscription);
});

app.post(
  '/stripe-webhook',
  bodyParser.raw({
    type: 'application/json',
  }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(err);
      console.log('Webhook signature verification failed.');
      console.log(
        'Check the env file and enter the correct webhook secret.',
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;
    console.log(dataObject);
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      default:
        // Unexpected event type
    }
    res.sendStatus(200);
  },
);

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
