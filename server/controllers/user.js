const { User } = require('../models/users');

const allUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.status(200).json(users);
  });
};

module.exports.allUsers = allUsers;
