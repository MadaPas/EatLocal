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
    street: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    city: {
      type: String,
    },
  },
);

const User = mongoose.model('users', userSchema);

module.exports.User = User;
