const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    okta_id: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      street: {
        type: String,
        select: false,
      },
      postalCode: {
        type: Number,
        select: false,
      },
      city: {
        type: String,
        select: false,
      },
    },
  },
);

const User = mongoose.model('users', userSchema);

module.exports.User = User;
