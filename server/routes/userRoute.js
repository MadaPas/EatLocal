const express = require('express');

const router = express.Router();
const { allUsers } = require('../controllers/user');

router.get('/', allUsers);

module.exports = router;
