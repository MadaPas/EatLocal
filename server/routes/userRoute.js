const express = require('express');

const router = express.Router();
const { getAllUsers, getUser } = require('../controllers/user');

router.get('/', getAllUsers);

router.get('/:okta_id', getUser);

module.exports = router;
