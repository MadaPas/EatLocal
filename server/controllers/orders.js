const {
  Order,
} = require('../models/orders');

const registerOrder = async (req, res) => {
  const {
    orderId,
    oktaId,
    stripeId,
    subscriptionId,
    boxId,
    email,
    firstName,
    lastName,
    street,
    postalCode,
    city,
    people,
    price,
    priceId,
    date,
  } = req.body;

  const orderExists = await Order.findOne({
    orderId,
  });

  if (orderExists) {
    return res.status(400).json('Something went wrong.');
  }

  const order = await Order.create({
    orderId,
    oktaId,
    stripeId,
    subscriptionId,
    boxId,
    email,
    firstName,
    lastName,
    street,
    postalCode,
    city,
    people,
    price,
    priceId,
    date,
  });

  return res.status(201).json(order);
};

const getOrders = async (req, res) => {
  await Order.find({
    oktaId: req.body.oktaId,
  }, (err, orders) => {
    if (err) res.status(500).send(err);
    res.status(200).json(orders);
  });
};

module.exports.registerOrder = registerOrder;
module.exports.getOrders = getOrders;
