const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    oktaId: {
      type: String,
      required: true,
    },
    boxId: {
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
    street: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    city: {
      type: String,
    },
    people: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
);

const Order = mongoose.model('orders', orderSchema);

module.exports.Order = Order;
