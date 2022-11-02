'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotSchema = new Schema({
  title: String,
  type: String,
  cost: String,
  description: String,
  location: String,
});

module.exports = mongoose.model('Spot', SpotSchema);
