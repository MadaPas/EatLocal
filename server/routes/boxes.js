const express = require('express');

const router = express.Router();
const {
  getAllBoxes,
  getBox,
} = require('../controllers/boxes');

router.get('/', getAllBoxes);
router.get('/:id', getBox);

module.exports = router;
