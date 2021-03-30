const express = require('express');

const router = express.Router();
const { getAllUsers, getUser, registerUser } = require('../controllers/user');

router.get('/', getAllUsers);
router.get('/:okta_id', getUser);
router.post('/register', registerUser);
module.exports = router;
