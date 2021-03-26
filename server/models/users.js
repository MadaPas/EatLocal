const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      street: {
        type: String,
        required: true,
        select: false,
      },
      postalCode: {
        type: Number,
        required: true,
        select: false,
      },
      city: {
        type: String,
        required: true,
        select: false,
      },
    },
  },
);

const User = mongoose.model('users', userSchema);

module.exports.User = User;
