const { User } = require('../models/users');

const getAllUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.status(200).json(users);
  });
};

const getUser = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('No user found');
  }
  return User.findById(req.params.id, (err, user) => {
    if (user.length === 0) {
      return res.status(404).json('No user found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(user);
  });
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
