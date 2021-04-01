const express = require('express');

const router = express.Router();
const { registerOrder } = require('../controllers/orders');

router.post('/', registerOrder);

module.exports = router;
