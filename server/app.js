const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Our API is running...');
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
