const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    oktaId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
