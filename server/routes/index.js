const express = require('express');
const userRoutes = require('./userRoute.js');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;
