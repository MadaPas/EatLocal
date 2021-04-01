const express = require('express');

const router = express.Router();
const {
  getAllUsers, getUser, registerUser, updateUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/user', getUser);
router.post('/register', registerUser);
router.put('/', updateUser);

module.exports = router;
