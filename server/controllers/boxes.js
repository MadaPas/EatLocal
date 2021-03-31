/* eslint-disable camelcase */
const { Box } = require('../models/boxes');

const getAllBoxes = async (req, res) => {
  await Box.find({}, (err, boxes) => {
    if (err) res.status(500).send(err);
    res.status(200).json(boxes);
  });
};

const getBox = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong user id format. Try again.');
  }
  return Box.findById(req.params.id, (err, box) => {
    if (box === null || box.length === 0) {
      return res.status(404).json('No box found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(box);
  });
};

module.exports.getAllBoxes = getAllBoxes;
module.exports.getBox = getBox;
