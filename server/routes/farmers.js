const express = require('express');

const router = express.Router();
const {
  getAllFarmers,
  getFarmer,
} = require('../controllers/farmers');

router.get('/', getAllFarmers);
router.get('/:id', getFarmer);
module.exports = router;
