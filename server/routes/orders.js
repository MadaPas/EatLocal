const express = require('express');

const router = express.Router();
const { registerOrder, getOrders } = require('../controllers/orders');

router.post('/', registerOrder);
router.post('/user', getOrders);

module.exports = router;
