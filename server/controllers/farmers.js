const {
  Farmer,
} = require('../models/farmers');

const getAllFarmers = async (req, res) => {
  await Farmer.find({}, (err, farmers) => {
    if (err) res.status(500).send(err);
    res.status(200).json(farmers);
  });
};

const getFarmer = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong farmer id format. Try again.');
  }
  return Farmer.findById(req.params.id, (err, farmer) => {
    if (farmer === null || farmer.length === 0) {
      return res.status(404).json('No farmer found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(farmer);
  });
};

module.exports.getAllFarmers = getAllFarmers;
module.exports.getFarmer = getFarmer;
