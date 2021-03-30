const { User } = require('../models/users');

const getAllUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.status(200).json(users);
  });
};

const getUser = (req, res) => {
  // if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  //   return res.status(404).json('Wrong user id format. Try again.');
  // }
  console.log(req.headers.user);
  
  return User.find({ okta_id: req.params.okta_id }, (err, user) => {
    if (!user || user.length === 0) {
      return res.status(404).json('No user found. Try again.');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(user);
  });
};

const registerUser = async (req, res) => {

  const { okta_id, email, first_name, last_name } = req.body;
  
  const userExists = await User.findOne({ okta_id });

  if (userExists) {
    return res.status(400).json({
      message: 'This user already exists',
      user: {
        okta_id: userExists.okta_id,
        firstName: userExists.first_name,
        lastName: userExists.last_name,
        email: userExists.email,
      }

    });
    // throw new Error('User already exists.');
  }

  const user = await User.create({ okta_id, email, first_name, last_name });

  return res.status(201).json({
    okta_id: user.okta_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  });
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.registerUser = registerUser;
