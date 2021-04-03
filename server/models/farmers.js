const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organic: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  hostType: {
    type: String,
    required: true,
  },
  propertyArea: {
    type: String,
    required: true,
  },
  methodologies: {
    type: String,
    required: true,
  },
  practices: {
    type: String,
    required: true,
  },
  animals: {
    type: String,
    required: true,
  },
  products: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
  },
});

const Farmer = mongoose.model('farmers', farmerSchema);

module.exports.Farmer = Farmer;
