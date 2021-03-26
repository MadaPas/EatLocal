/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

require('dotenv').config();
const { connectDB } = require('./db/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('Our API is running...');
});

app.use('/api', routes);

connectDB().then(async () => {
  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB: Connection closed.');
    process.exit(0);
  });
});
