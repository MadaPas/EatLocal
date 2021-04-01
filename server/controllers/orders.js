const { Order } = require('../models/orders');

const registerOrder = async (req, res) => {
  const {
    orderId, oktaId, boxId, email, firstName, lastName, street, postalCode, city, people, price,
  } = req.body;

  const orderExists = await Order.findOne({ orderId });

  if (orderExists) {
    return res.status(400).json('Something went wrong.');
  }

  const order = await Order.create({
    orderId,
    oktaId,
    boxId,
    email,
    firstName,
    lastName,
    address: {
      street,
      postalCode,
      city,
    },
    people,
    price,
  });

  return res.status(201).json(order);
};

module.exports.registerOrder = registerOrder;
